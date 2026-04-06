import { ToastAnimation } from './types';

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
