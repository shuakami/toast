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
