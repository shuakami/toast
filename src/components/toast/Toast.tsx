import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { ToastData, ToastPosition, ToastTheme, ToastAnimation, ToastAnimationContext } from './types';

const TOAST_LIFETIME = 4000;

const toastHeightCallbacks = new WeakMap<Element, (height: number) => void>();
let globalResizeObserver: ResizeObserver | null = null;

const observeHeight = (element: Element, callback: (height: number) => void) => {
  if (!globalResizeObserver) {
    globalResizeObserver = new ResizeObserver((entries) => {
      requestAnimationFrame(() => {
        for (const entry of entries) {
          const height = entry.borderBoxSize?.[0]?.blockSize ?? entry.target.getBoundingClientRect().height;
          const cb = toastHeightCallbacks.get(entry.target);
          if (cb) cb(Math.round(height));
        }
      });
    });
  }
  toastHeightCallbacks.set(element, callback);
  globalResizeObserver.observe(element);
  return () => {
    toastHeightCallbacks.delete(element);
    if (globalResizeObserver) {
      globalResizeObserver.unobserve(element);
    }
  };
};

const LoadingSpinner = React.memo(({ theme }: { theme: ToastTheme }) => (
  <motion.svg
    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"
    className={theme.spinner}
    animate={{ rotate: 360 }}
    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
  >
    <circle cx="12" cy="12" r="9" strokeOpacity="0.15" />
    <path d="M21 12a9 9 0 0 0-9-9" />
  </motion.svg>
));
LoadingSpinner.displayName = 'LoadingSpinner';

export interface ToastProps {
  toast: ToastData;
  index: number;
  onRemove: (id: string) => void;
  isHovered: boolean;
  position: ToastPosition;
  hoverOffset: number;
  onHeightChange: (id: string, height: number) => void;
  theme: ToastTheme;
  animation: ToastAnimation;
}

export const Toast = React.memo(({ toast, index, onRemove, isHovered, position, hoverOffset, onHeightChange, theme, animation }: ToastProps) => {
  const isBottom = position.startsWith('bottom');
  const sign = isBottom ? -1 : 1;
  const ref = useRef<HTMLDivElement>(null);
  const [dragExit, setDragExit] = useState<number | null>(null);

  const stackedOffset = index * 12; 
  const offset = isHovered ? hoverOffset : stackedOffset;
  
  const scale = isHovered ? 1 : 1 - index * 0.04;
  const opacity = isHovered ? 1 : Math.max(0, 1 - index * 0.15);
  const zIndex = toast.zIndex;

  const currentType = toast.type;
  const duration = toast.duration || 4000;

  useEffect(() => {
    if (!ref.current) return;
    return observeHeight(ref.current, (height) => onHeightChange(toast.id, height));
  }, [toast.id, onHeightChange]);

  useEffect(() => {
    if (isHovered || currentType === 'loading' || duration === Infinity) return;
    const timer = setTimeout(() => {
      onRemove(toast.id);
    }, duration);
    return () => clearTimeout(timer);
  }, [isHovered, currentType, toast.id, duration, onRemove]);

  const ctx: ToastAnimationContext = React.useMemo(() => ({
    index, isHovered, offset, sign, scale, opacity, position
  }), [index, isHovered, offset, sign, scale, opacity, position]);

  const initialAnimation = React.useMemo(() => animation.initial(ctx), [animation, ctx]);
  const animateAnimation = React.useMemo(() => animation.animate(ctx), [animation, ctx]);
  const exitAnimation = React.useMemo(() => animation.exit(ctx), [animation, ctx]);

  const styleObj = React.useMemo(() => ({ 
    zIndex,
    willChange: "transform, opacity, filter",
    filter: "blur(0px)"
  }), [zIndex]);

  return (
    <motion.div
      ref={ref}
      initial={initialAnimation}
      animate={animateAnimation}
      exit={dragExit !== null ? { x: dragExit, opacity: 0, filter: "blur(10px)", transition: { duration: 0.2, ease: "easeOut" } } : exitAnimation}
      transition={animation.transition}
      style={styleObj}
      className={`absolute ${isBottom ? 'bottom-0' : 'top-0'} w-full ${theme.borderRadius || 'rounded-xl'} ${theme.background} border ${theme.border} p-4 flex flex-col group pointer-events-auto ${theme.shadow}`}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={(e, info) => {
        if (Math.abs(info.offset.x) > 80 || Math.abs(info.velocity.x) > 500) {
          const direction = info.offset.x > 0 ? 1 : -1;
          setDragExit(direction * window.innerWidth);
          // Delay removal slightly to ensure the component re-renders with the new exit animation prop.
          setTimeout(() => {
            onRemove(toast.id);
          }, 10);
        }
      }}
    >
      <div className="flex items-start">
        <AnimatePresence>
          {currentType === 'loading' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, width: 0, marginRight: 0 }}
              animate={{ opacity: 1, scale: 1, width: 16, marginRight: 12 }}
              exit={{ opacity: 0, scale: 0.5, width: 0, marginRight: 0 }}
              transition={{ type: "spring", stiffness: 450, damping: 40 }}
              className="mt-[2px] shrink-0 overflow-hidden"
            >
              <LoadingSpinner theme={theme} />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex-1 flex flex-col gap-1 overflow-hidden">
          <div className="flex justify-between items-start">
            <div className="relative h-5 flex-1 overflow-hidden">
              <AnimatePresence initial={false}>
                <motion.h3
                  key={currentType}
                  initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                  transition={{ type: "spring", stiffness: 450, damping: 40 }}
                  className={`text-[14px] font-semibold ${theme.textPrimary} tracking-tight leading-snug absolute inset-0 flex items-center`}
                >
                  {currentType === 'loading' ? 'Processing request...' : 
                   currentType === 'success' && toast.type === 'loading' ? 'Completed successfully' : 
                   toast.title}
                </motion.h3>
              </AnimatePresence>
            </div>
            {!toast.action && (
              <button
                onClick={() => onRemove(toast.id)}
                className={`w-6 h-6 rounded-full flex items-center justify-center ${theme.closeButton} ${theme.closeButtonHover} opacity-0 group-hover:opacity-100 transition-all duration-200 focus:outline-none -mt-1 -mr-1 shrink-0 ml-2`}
              >
                <X size={14} strokeWidth={2.5} />
              </button>
            )}
          </div>
          {toast.description && (
            <p className={`text-[13px] font-normal ${theme.textSecondary} leading-snug pr-4`}>
              {toast.description}
            </p>
          )}
          {toast.action && (
            <div className="w-full flex justify-end gap-2 mt-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(toast.id);
                }}
                className={`px-3 py-1.5 bg-transparent ${theme.dismissButtonHover} ${theme.textSecondary} text-[12px] font-medium rounded-md transition-all active:scale-95`}
              >
                Dismiss
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toast.action!.onClick();
                }}
                className={`px-3 py-1.5 ${theme.buttonBg} ${theme.buttonHover} ${theme.buttonText} text-[12px] font-medium rounded-md transition-all active:scale-95 shadow-sm`}
              >
                {toast.action.label}
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
});
Toast.displayName = 'Toast';
