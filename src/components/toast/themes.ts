import { ToastTheme } from './types';

type BuiltInToastTheme = Omit<ToastTheme, 'name'>;

export const themes: Record<string, { name: string, light: BuiltInToastTheme, dark: BuiltInToastTheme }> = {
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
