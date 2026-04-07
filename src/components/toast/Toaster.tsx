import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { ToastPosition, ToastData, ToastAnimation } from './types';
import { Toast } from './Toast';
import { AnimatePresence } from 'motion/react';
import { themes } from './themes';
import { toastStore } from './store';
import { defaultAnimation } from './animations';

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
  const toasterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return toastStore.subscribe(setToasts);
  }, []);

  useEffect(() => {
    const handleGlobalTouch = (e: TouchEvent) => {
      if (toasterRef.current && !toasterRef.current.contains(e.target as Node)) {
        setIsHovered(false);
      }
    };
    document.addEventListener('touchstart', handleGlobalTouch);
    return () => document.removeEventListener('touchstart', handleGlobalTouch);
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

  const handlePointerEnter = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return;
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsHovered(true);
  }, []);

  const handlePointerLeave = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return;
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 150);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === 'touch') {
      if ((e.target as HTMLElement).closest('button')) return;
      setIsHovered((prev) => !prev);
    }
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
      ref={toasterRef}
      className={`fixed ${positionClasses[position]} w-[calc(100vw-32px)] sm:w-[360px] z-[100] pointer-events-none`}
      style={{ height: toasts.length > 0 ? (isHovered ? totalHeight : 80) : 0 }}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
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
