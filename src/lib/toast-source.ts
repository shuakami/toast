export const toastSourceCode = `/**
 * @author shuakami
 * @repository github.com/shuakami/toast
 */
import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';

export type ToastType = 'info' | 'success' | 'warning' | 'error' | 'loading';
export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastOptions {
  id?: string;
  description?: string;
  action?: ToastAction;
  duration?: number;
}

export interface ToastData extends ToastOptions {
  id: string;
  type: ToastType;
  title: string;
  zIndex: number;
}

export interface ToastTheme {
  name: string;
  background: string;
  border: string;
  textPrimary: string;
  textSecondary: string;
  buttonBg: string;
  buttonText: string;
  buttonHover: string;
  closeButton: string;
  closeButtonHover: string;
  dismissButtonHover: string;
  shadow: string;
  spinner: string;
  borderRadius?: string;
}

export interface ToastAnimationContext {
  index: number;
  isHovered: boolean;
  offset: number;
  sign: number;
  scale: number;
  opacity: number;
  position: ToastPosition;
}

export interface ToastAnimation {
  name: string;
  initial: (ctx: ToastAnimationContext) => any;
  animate: (ctx: ToastAnimationContext) => any;
  exit: (ctx: ToastAnimationContext) => any;
  transition: any;
}


export const themes: Record<string, { name: string, light: ToastTheme, dark: ToastTheme }> = {
  default: {
    name: 'Default (Glass)',
    light: {
      background: 'bg-white/60 backdrop-blur-2xl saturate-[1.5]',
      border: 'border-white/40',
      textPrimary: 'text-black/90',
      textSecondary: 'text-black/60',
      buttonBg: 'bg-black/90',
      buttonText: 'text-white',
      buttonHover: 'hover:bg-black',
      closeButton: 'text-black/30',
      closeButtonHover: 'hover:text-black/70 hover:bg-black/5',
      dismissButtonHover: 'hover:text-black hover:bg-black/5',
      shadow: 'shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.6)]',
      spinner: 'text-black/60'
    },
    dark: {
      background: 'bg-[#111111]/80 backdrop-blur-2xl',
      border: 'border-white/5',
      textPrimary: 'text-zinc-100',
      textSecondary: 'text-zinc-400',
      buttonBg: 'bg-white',
      buttonText: 'text-black',
      buttonHover: 'hover:bg-zinc-200',
      closeButton: 'text-zinc-500',
      closeButtonHover: 'hover:text-zinc-300 hover:bg-white/10',
      dismissButtonHover: 'hover:text-zinc-300 hover:bg-white/10',
      shadow: 'shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]',
      spinner: 'text-zinc-400'
    }
  },
  minimal: {
    name: 'Minimal',
    light: {
      background: 'bg-white',
      border: 'border-zinc-200',
      textPrimary: 'text-zinc-900',
      textSecondary: 'text-zinc-500',
      buttonBg: 'bg-zinc-900',
      buttonText: 'text-white',
      buttonHover: 'hover:bg-zinc-800',
      closeButton: 'text-zinc-400',
      closeButtonHover: 'hover:text-zinc-900 hover:bg-zinc-100',
      dismissButtonHover: 'hover:text-zinc-900 hover:bg-zinc-100',
      shadow: 'shadow-[0_8px_30px_rgb(0,0,0,0.12)]',
      spinner: 'text-zinc-500'
    },
    dark: {
      background: 'bg-zinc-900',
      border: 'border-zinc-700',
      textPrimary: 'text-zinc-100',
      textSecondary: 'text-zinc-400',
      buttonBg: 'bg-white',
      buttonText: 'text-zinc-900',
      buttonHover: 'hover:bg-zinc-200',
      closeButton: 'text-zinc-500',
      closeButtonHover: 'hover:text-zinc-300 hover:bg-zinc-800',
      dismissButtonHover: 'hover:text-zinc-300 hover:bg-zinc-800',
      shadow: 'shadow-[0_8px_30px_rgb(0,0,0,0.5)]',
      spinner: 'text-zinc-400'
    }
  },
  soft: {
    name: 'Soft',
    light: {
      background: 'bg-slate-50',
      border: 'border-slate-100',
      textPrimary: 'text-slate-700',
      textSecondary: 'text-slate-500',
      buttonBg: 'bg-white shadow-sm border border-slate-200',
      buttonText: 'text-slate-700',
      buttonHover: 'hover:bg-slate-100',
      closeButton: 'text-slate-400',
      closeButtonHover: 'hover:text-slate-700 hover:bg-slate-200/50',
      dismissButtonHover: 'hover:text-slate-700 hover:bg-slate-200/50',
      shadow: 'shadow-sm',
      spinner: 'text-slate-400'
    },
    dark: {
      background: 'bg-slate-800',
      border: 'border-slate-700/50',
      textPrimary: 'text-slate-200',
      textSecondary: 'text-slate-400',
      buttonBg: 'bg-slate-700 shadow-sm border border-slate-600',
      buttonText: 'text-slate-200',
      buttonHover: 'hover:bg-slate-600',
      closeButton: 'text-slate-400',
      closeButtonHover: 'hover:text-slate-200 hover:bg-slate-600/50',
      dismissButtonHover: 'hover:text-slate-200 hover:bg-slate-600/50',
      shadow: 'shadow-md',
      spinner: 'text-slate-400'
    }
  },
  outlined: {
    name: 'Outlined (Neo-brutalism)',
    light: {
      background: 'bg-white',
      border: 'border-2 border-black',
      textPrimary: 'text-black',
      textSecondary: 'text-zinc-700',
      buttonBg: 'bg-black',
      buttonText: 'text-white',
      buttonHover: 'hover:bg-zinc-800',
      closeButton: 'text-zinc-400',
      closeButtonHover: 'hover:text-black hover:bg-zinc-100',
      dismissButtonHover: 'hover:text-black hover:bg-zinc-100',
      shadow: 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]',
      spinner: 'text-black'
    },
    dark: {
      background: 'bg-zinc-950',
      border: 'border-2 border-white',
      textPrimary: 'text-white',
      textSecondary: 'text-zinc-300',
      buttonBg: 'bg-white',
      buttonText: 'text-black',
      buttonHover: 'hover:bg-zinc-200',
      closeButton: 'text-zinc-500',
      closeButtonHover: 'hover:text-white hover:bg-zinc-800',
      dismissButtonHover: 'hover:text-white hover:bg-zinc-800',
      shadow: 'shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]',
      spinner: 'text-white'
    }
  },
  warm: {
    name: 'Warm (Sepia)',
    light: {
      background: 'bg-stone-50',
      border: 'border-stone-200',
      textPrimary: 'text-stone-800',
      textSecondary: 'text-stone-500',
      buttonBg: 'bg-stone-200',
      buttonText: 'text-stone-800',
      buttonHover: 'hover:bg-stone-300',
      closeButton: 'text-stone-400',
      closeButtonHover: 'hover:text-stone-800 hover:bg-stone-200/50',
      dismissButtonHover: 'hover:text-stone-800 hover:bg-stone-200/50',
      shadow: 'shadow-lg shadow-stone-900/5',
      spinner: 'text-stone-500'
    },
    dark: {
      background: 'bg-stone-900',
      border: 'border-stone-700',
      textPrimary: 'text-stone-200',
      textSecondary: 'text-stone-400',
      buttonBg: 'bg-stone-800',
      buttonText: 'text-stone-200',
      buttonHover: 'hover:bg-stone-700',
      closeButton: 'text-stone-500',
      closeButtonHover: 'hover:text-stone-200 hover:bg-stone-800',
      dismissButtonHover: 'hover:text-stone-200 hover:bg-stone-800',
      shadow: 'shadow-lg shadow-black/40',
      spinner: 'text-stone-400'
    }
  },
  ocean: {
    name: 'Ocean Breeze',
    light: {
      background: 'bg-sky-50',
      border: 'border-sky-200',
      textPrimary: 'text-sky-900',
      textSecondary: 'text-sky-700',
      buttonBg: 'bg-sky-200',
      buttonText: 'text-sky-900',
      buttonHover: 'hover:bg-sky-300',
      closeButton: 'text-sky-400',
      closeButtonHover: 'hover:text-sky-900 hover:bg-sky-200/50',
      dismissButtonHover: 'hover:text-sky-900 hover:bg-sky-200/50',
      shadow: 'shadow-lg shadow-sky-900/5',
      spinner: 'text-sky-500'
    },
    dark: {
      background: 'bg-slate-900',
      border: 'border-sky-900/50',
      textPrimary: 'text-sky-100',
      textSecondary: 'text-sky-400',
      buttonBg: 'bg-sky-900/50',
      buttonText: 'text-sky-100',
      buttonHover: 'hover:bg-sky-800/50',
      closeButton: 'text-sky-600',
      closeButtonHover: 'hover:text-sky-200 hover:bg-sky-900/50',
      dismissButtonHover: 'hover:text-sky-200 hover:bg-sky-900/50',
      shadow: 'shadow-lg shadow-black/40',
      spinner: 'text-sky-500'
    }
  },
  macos: {
    name: 'macOS Glass',
    light: {
      background: 'bg-white/60 backdrop-blur-2xl saturate-[1.5]',
      border: 'border-white/40',
      textPrimary: 'text-black/90',
      textSecondary: 'text-black/60',
      buttonBg: 'bg-white/50 backdrop-blur-md border border-white/40 shadow-sm',
      buttonText: 'text-black/80',
      buttonHover: 'hover:bg-white/80',
      closeButton: 'text-black/30',
      closeButtonHover: 'hover:text-black/70 hover:bg-black/5',
      dismissButtonHover: 'hover:text-black/70 hover:bg-black/5',
      shadow: 'shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.6)]',
      spinner: 'text-black/50',
      borderRadius: 'rounded-[20px]'
    },
    dark: {
      background: 'bg-black/40 backdrop-blur-2xl saturate-[1.5]',
      border: 'border-white/10',
      textPrimary: 'text-white/90',
      textSecondary: 'text-white/60',
      buttonBg: 'bg-black/50 backdrop-blur-md border border-white/10 shadow-sm',
      buttonText: 'text-white/80',
      buttonHover: 'hover:bg-white/10',
      closeButton: 'text-white/30',
      closeButtonHover: 'hover:text-white/70 hover:bg-white/10',
      dismissButtonHover: 'hover:text-white/70 hover:bg-white/10',
      shadow: 'shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.1)]',
      spinner: 'text-white/50',
      borderRadius: 'rounded-[20px]'
    }
  }
};


export const defaultAnimation: ToastAnimation = {
  name: 'Default (Spring)',
  initial: ({ sign }) => ({ opacity: 0, y: -30 * sign, scale: 0.95, filter: "blur(16px)" }),
  animate: ({ opacity, offset, sign, scale }) => ({ opacity, y: offset * sign, scale, filter: "blur(0px)" }),
  exit: () => ({ opacity: 0, scale: 0.95, filter: "blur(16px)", transition: { duration: 0.25, ease: "easeOut" } }),
  transition: { type: "spring", stiffness: 350, damping: 35, mass: 1 }
};

export const slideAnimation: ToastAnimation = {
  name: 'Slide',
  initial: ({ sign }) => ({ opacity: 0, y: -60 * sign }),
  animate: ({ opacity, offset, sign, scale }) => ({ opacity, y: offset * sign, scale }),
  exit: ({ sign }) => ({ opacity: 0, y: -60 * sign, transition: { duration: 0.2 } }),
  transition: { type: "spring", stiffness: 400, damping: 40 }
};

export const fadeAnimation: ToastAnimation = {
  name: 'Fade',
  initial: ({ sign, offset }) => ({ opacity: 0, y: offset * sign, scale: 0.95 }),
  animate: ({ opacity, offset, sign, scale }) => ({ opacity, y: offset * sign, scale }),
  exit: ({ sign, offset }) => ({ opacity: 0, y: offset * sign, scale: 0.95, transition: { duration: 0.2 } }),
  transition: { duration: 0.2, ease: "easeOut" }
};

export const bounceAnimation: ToastAnimation = {
  name: 'Bounce',
  initial: ({ sign }) => ({ opacity: 0, y: -150 * sign }),
  animate: ({ opacity, offset, sign, scale }) => ({ opacity, y: offset * sign, scale }),
  exit: ({ sign }) => ({ opacity: 0, y: 150 * sign, transition: { duration: 0.2 } }),
  transition: { type: "spring", stiffness: 500, damping: 15, mass: 1 }
};

export const zoomAnimation: ToastAnimation = {
  name: 'Zoom',
  initial: ({ sign, offset }) => ({ opacity: 0, y: offset * sign, scale: 0.5 }),
  animate: ({ opacity, offset, sign, scale }) => ({ opacity, y: offset * sign, scale }),
  exit: ({ sign, offset }) => ({ opacity: 0, y: offset * sign, scale: 0.5, transition: { duration: 0.2 } }),
  transition: { type: "spring", stiffness: 400, damping: 30 }
};

export const flipAnimation: ToastAnimation = {
  name: 'Flip 3D',
  initial: ({ sign, offset }) => ({ opacity: 0, y: offset * sign, rotateX: 90 }),
  animate: ({ opacity, offset, sign, scale }) => ({ opacity, y: offset * sign, scale, rotateX: 0 }),
  exit: ({ sign, offset }) => ({ opacity: 0, y: offset * sign, rotateX: -90, transition: { duration: 0.2 } }),
  transition: { type: "spring", stiffness: 300, damping: 30 }
};

export const animations = [
  defaultAnimation,
  slideAnimation,
  fadeAnimation,
  bounceAnimation,
  zoomAnimation,
  flipAnimation
];


let toasts: ToastData[] = [];
let listeners: ((toasts: ToastData[]) => void)[] = [];
let toastCounter = 0;

export const toastStore = {
  subscribe(listener: (toasts: ToastData[]) => void) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  },
  addToast(toast: ToastData) {
    toasts = [toast, ...toasts].slice(0, 10);
    listeners.forEach(l => l(toasts));
  },
  removeToast(id: string) {
    toasts = toasts.filter(t => t.id !== id);
    listeners.forEach(l => l(toasts));
  },
  updateToast(id: string, data: Partial<ToastData>) {
    toasts = toasts.map(t => t.id === id ? { ...t, ...data } : t);
    listeners.forEach(l => l(toasts));
  }
};

const generateId = () => Math.random().toString(36).substring(2, 9);

const createToast = (title: string, type: ToastType, options?: ToastOptions) => {
  const id = options?.id || generateId();
  toastStore.addToast({
    ...options,
    id,
    title,
    type,
    zIndex: toastCounter++,
  });
  return id;
};

export interface ToastFn {
  (title: string, options?: ToastOptions & { type?: ToastType }): string;
  info: (title: string, options?: ToastOptions) => string;
  success: (title: string, options?: ToastOptions) => string;
  warning: (title: string, options?: ToastOptions) => string;
  error: (title: string, options?: ToastOptions) => string;
  loading: (title: string, options?: ToastOptions) => string;
  dismiss: (id: string) => void;
  update: (id: string, options: Partial<ToastOptions> & { type?: ToastType, title?: string }) => void;
  promise: <T>(
    promise: Promise<T> | (() => Promise<T>),
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((err: any) => string);
    },
    options?: ToastOptions
  ) => Promise<T>;
}

const toastFn = ((title: string, options?: ToastOptions & { type?: ToastType }) => 
  createToast(title, options?.type || 'info', options)) as ToastFn;

toastFn.info = (title, options) => createToast(title, 'info', options);
toastFn.success = (title, options) => createToast(title, 'success', options);
toastFn.warning = (title, options) => createToast(title, 'warning', options);
toastFn.error = (title, options) => createToast(title, 'error', options);
toastFn.loading = (title, options) => createToast(title, 'loading', options);
toastFn.dismiss = (id) => toastStore.removeToast(id);
toastFn.update = (id, options) => toastStore.updateToast(id, options as Partial<ToastData>);

toastFn.promise = <T>(
  promise: Promise<T> | (() => Promise<T>),
  messages: {
    loading: string;
    success: string | ((data: T) => string);
    error: string | ((err: any) => string);
  },
  options?: ToastOptions
) => {
  const id = toastFn.loading(messages.loading, options);
  const p = typeof promise === 'function' ? promise() : promise;
  
  // UX/Design principle: Minimum loading time to prevent UI flicker (Labor Illusion)
  const MIN_LOADING_TIME = 600; 
  const startTime = Date.now();
  
  p.then((data) => {
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);
    
    setTimeout(() => {
      toastStore.updateToast(id, {
        type: 'success',
        title: typeof messages.success === 'function' ? messages.success(data) : messages.success,
      });
    }, remainingTime);
  }).catch((err) => {
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);
    
    setTimeout(() => {
      toastStore.updateToast(id, {
        type: 'error',
        title: typeof messages.error === 'function' ? messages.error(err) : messages.error,
      });
    }, remainingTime);
  });

  return p;
};

export const toast = toastFn;


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
    willChange: "transform, opacity, filter"
  }), [zIndex]);

  return (
    <motion.div
      ref={ref}
      initial={initialAnimation}
      animate={animateAnimation}
      exit={exitAnimation}
      transition={animation.transition}
      style={styleObj}
      className={\`absolute \${isBottom ? 'bottom-0' : 'top-0'} w-full \${theme.borderRadius || 'rounded-xl'} \${theme.background} border \${theme.border} p-4 flex flex-col group pointer-events-auto \${theme.shadow}\`}
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
                  className={\`text-[14px] font-semibold \${theme.textPrimary} tracking-tight leading-snug absolute inset-0 flex items-center\`}
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
                className={\`w-6 h-6 rounded-full flex items-center justify-center \${theme.closeButton} \${theme.closeButtonHover} opacity-0 group-hover:opacity-100 transition-all duration-200 focus:outline-none -mt-1 -mr-1 shrink-0 ml-2\`}
              >
                <X size={14} strokeWidth={2.5} />
              </button>
            )}
          </div>
          {toast.description && (
            <p className={\`text-[13px] font-normal \${theme.textSecondary} leading-snug pr-4\`}>
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
                className={\`px-3 py-1.5 bg-transparent \${theme.dismissButtonHover} \${theme.textSecondary} text-[12px] font-medium rounded-md transition-all active:scale-95\`}
              >
                Dismiss
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toast.action!.onClick();
                }}
                className={\`px-3 py-1.5 \${theme.buttonBg} \${theme.buttonHover} \${theme.buttonText} text-[12px] font-medium rounded-md transition-all active:scale-95 shadow-sm\`}
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


const positionClasses: Record<ToastPosition, string> = {
  'top-right': 'top-4 right-4 sm:top-6 sm:right-6',
  'top-left': 'top-4 left-4 sm:top-6 sm:left-6',
  'top-center': 'top-4 left-1/2 -translate-x-1/2 sm:top-6',
  'bottom-right': 'bottom-4 right-4 sm:bottom-6 sm:right-6',
  'bottom-left': 'bottom-4 left-4 sm:bottom-6 sm:left-6',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2 sm:bottom-6',
};

export interface ToasterProps {
  position?: ToastPosition;
  theme?: string;
  isDarkMode?: boolean;
  animation?: ToastAnimation;
}

export const Toaster: React.FC<ToasterProps> = ({ 
  position = 'top-right', 
  theme = 'default',
  isDarkMode = false,
  animation = defaultAnimation
}) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [heights, setHeights] = useState<Record<string, number>>({});
  
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return toastStore.subscribe(setToasts);
  }, []);

  const currentTheme = themes[theme]?.[isDarkMode ? 'dark' : 'light'] || themes['default']['light'];

  const removeToast = useCallback((id: string) => {
    toastStore.removeToast(id);
    setHeights((prev) => {
      const newHeights = { ...prev };
      delete newHeights[id];
      return newHeights;
    });
  }, []);

  const handleHeightChange = useCallback((id: string, height: number) => {
    setHeights((prev) => {
      if (prev[id] === height) return prev;
      return { ...prev, [id]: height };
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 150);
  }, []);

  const { offsets, totalHeight } = useMemo(() => {
    let currentOffset = 0;
    const GAP = 12;
    const newOffsets: number[] = [];
    for (let i = 0; i < toasts.length; i++) {
      newOffsets.push(currentOffset);
      currentOffset += (heights[toasts[i].id] || 80) + GAP;
    }
    return { offsets: newOffsets, totalHeight: toasts.length > 0 ? currentOffset - GAP : 0 };
  }, [toasts, heights]);

  return (
    <div 
      className={\`fixed \${positionClasses[position]} w-[calc(100vw-32px)] sm:w-[360px] z-[100] pointer-events-none\`}
      style={{ height: toasts.length > 0 ? (isHovered ? totalHeight : 80) : 0 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-full h-full">
        <AnimatePresence mode="popLayout">
          {toasts.map((toastData, index) => (
            <Toast
              key={toastData.id}
              toast={toastData}
              index={index}
              onRemove={removeToast}
              isHovered={isHovered}
              position={position}
              hoverOffset={offsets[index]}
              onHeightChange={handleHeightChange}
              theme={currentTheme}
              animation={animation}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

`;
