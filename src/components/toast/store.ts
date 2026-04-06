import { ToastData, ToastType, ToastOptions } from './types';

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
