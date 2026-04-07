import React, { useState, useEffect } from 'react';
import { ChevronDown, Copy, Check, Sun, Moon, Play, X, Code2, Globe, Github } from 'lucide-react';
import { Toaster, toast, ToastPosition, themes, animations, ToastAnimation } from './components/toast';
import { toastSourceCode } from './lib/toast-source';
import { motion, AnimatePresence } from 'motion/react';

const translations = {
  en: {
    intro: "Introduction",
    demo: "Demo",
    installation: "Installation",
    usage: "Usage",
    customization: "Customization",
    api: "API Reference",
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
    introDesc: "shuakami/toast is a motion-driven React toast system built for polished product experiences. It combines layered stacking, expressive transitions, and flexible APIs so notifications feel precise instead of noisy.",
    demoDesc: "Interact with the buttons below to see the toast system in action.",
    usageDesc: "Master the toast system in minutes. It's designed to be incredibly intuitive.",
    setupTitle: "1. Setup the Toaster",
    setupDesc: "Place the <Toaster /> component at the root of your app. You only need one.",
    basicTitle: "2. Basic Toasts",
    basicDesc: "Call the toast function from anywhere in your app. It's not a hook, so you can use it in regular functions too!",
    durationTitle: "3. Custom Duration & Persistent Toasts",
    durationDesc: "Control how long a toast stays on screen. Set duration to Infinity to make it stay until the user interacts with it.",
    promiseTitle: "4. Promises & Async Operations",
    promiseDesc: "Automatically handle loading, success, and error states for async operations.",
    builtinTitle: "5. Built-in Themes & Animations",
    builtinDesc: "The system comes with several beautifully crafted themes and physics-based animations out of the box. You can easily switch between them using the theme and animation props.",
    customTitle: "Advanced Customization",
    customDesc: "Experience the ultimate Developer Experience (DX). You have complete control over every pixel and every frame. Customize themes and animations effortlessly.",
    themeTitle: "Custom Themes",
    themeDesc: "Pass a custom theme object to the <Toaster /> component. You can use Tailwind classes or standard CSS classes to style every element.",
    animTitle: "Custom Animations",
    animDesc: "Build your own physics-based animations using Framer Motion variants. The system provides context (index, offset, position) to help you create complex stacking effects.",
    typeDesc: "The visual style and icon of the toast.",
    titleDesc: "The main heading of the toast.",
    descDesc: "Secondary text for additional context.",
    promiseApiDesc: "Automatically updates the toast based on a promise's state.",
    updateApiDesc: "Dynamically update a toast's state, title, description, or actions.",
    sharePhoto: "Share Photo",
    uploadFile: "Upload File",
    interactiveUpdate: "Interactive Update",
    lowBattery: "Low Battery",
    backupError: "Backup Error",
    deleteMessage: "Delete Message",
    processPayment: "Process Payment",
    networkError: "Network Error",
    topRight: "Top Right",
    topLeft: "Top Left",
    topCenter: "Top Center",
    bottomRight: "Bottom Right",
    bottomLeft: "Bottom Left",
    bottomCenter: "Bottom Center",
    expandCode: "Expand Code",
    collapseCode: "Collapse Code",
    installDeps: "1. Install Dependencies",
    installDepsDesc: "First, install the required dependencies for animations and icons.",
    copyCode: "2. Copy Source Code",
    copyCodeDesc: "Copy the consolidated source code below into a new file in your project (e.g., components/toast.tsx).",
  },
  zh: {
    intro: "产品简介",
    demo: "功能演示",
    installation: "快速接入",
    usage: "操作指南",
    customization: "高级配置",
    api: "API 参考",
    lightMode: "浅色模式",
    darkMode: "深色模式",
    introDesc: "shuakami/toast 是一套以动效体验为核心的 React 通知组件。它把层叠动画、细腻过渡和灵活 API 结合在一起，让通知既有表现力，也不会打扰页面本身的节奏。",
    demoDesc: "您可以通过点击下方操作按钮，预览不同类型通知组件的实际运行效果。",
    usageDesc: "本文档将为您介绍如何快速接入并使用该组件。API 设计遵循标准规范，便于开发者快速集成。",
    setupTitle: "1. 全局组件挂载",
    setupDesc: "请在应用程序的根节点引入并渲染 <Toaster /> 组件。该组件为全局单例，仅需挂载一次。",
    basicTitle: "2. 基础调用方式",
    basicDesc: "支持在应用任意位置调用 toast 方法。该方法独立于 React Hook 生命周期，可直接在普通业务逻辑或网络请求拦截器中调用。",
    durationTitle: "3. 停留时长与常驻显示",
    durationDesc: "支持自定义通知的停留时长。若将 duration 参数设置为 Infinity，通知将保持常驻状态，直至用户手动触发关闭操作。",
    promiseTitle: "4. 异步状态管理 (Promise)",
    promiseDesc: "提供对异步操作状态的自动化管理，根据 Promise 的执行结果自动切换加载中、成功或失败的 UI 状态。",
    builtinTitle: "5. 内置主题与动画配置",
    builtinDesc: "系统预置了多款精心设计的视觉主题与物理引擎动画，您可以通过配置参数快速切换组件的视觉表现。",
    customTitle: "高级配置",
    customDesc: "提供高度灵活的扩展能力。您可以通过自定义配置项，对组件的视觉样式及动画轨迹进行深度定制。",
    themeTitle: "自定义主题",
    themeDesc: "支持通过传入 theme 配置对象来自定义主题。您可以使用 Tailwind CSS 类名或原生 CSS 样式覆盖默认的视觉表现。",
    animTitle: "自定义动画",
    animDesc: "支持基于 Framer Motion 的 variants 自定义动画效果。系统将在运行时注入上下文参数（如 index、offset、position），以辅助实现复杂的 3D 堆叠及过渡动画。",
    typeDesc: "通知组件的内置状态类型，用于决定基础视觉风格与默认图标。",
    titleDesc: "通知组件的主标题文本。",
    descDesc: "补充说明文本，用于提供详细的上下文信息（可选）。",
    promiseApiDesc: "监听 Promise 执行状态，并自动更新对应的通知视图。",
    updateApiDesc: "根据唯一标识符 (ID) 动态更新已存在通知的内容或状态。",
    sharePhoto: "隔空投送",
    uploadFile: "上传文件",
    interactiveUpdate: "系统更新",
    lowBattery: "电量不足",
    backupError: "备份失败",
    deleteMessage: "删除对话",
    processPayment: "支付成功",
    networkError: "网络异常",
    topRight: "右上角",
    topLeft: "左上角",
    topCenter: "顶部居中",
    bottomRight: "右下角",
    bottomLeft: "左下角",
    bottomCenter: "底部居中",
    expandCode: "展开代码",
    collapseCode: "折叠代码",
    installDeps: "1. 安装依赖",
    installDepsDesc: "首先，安装动画和图标所需的依赖包。",
    copyCode: "2. 复制代码",
    copyCodeDesc: "将下方整合后的源代码复制到您项目中的新文件里（例如：components/toast.tsx）。",
  }
};

const CodeBlock = ({ children, codeString, isDarkMode, collapsible = false, defaultExpanded = false, expandText = 'Expand Code', collapseText = 'Collapse Code' }: { children: React.ReactNode, codeString: string, isDarkMode: boolean, collapsible?: boolean, defaultExpanded?: boolean, expandText?: string, collapseText?: string }) => {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(defaultExpanded);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`group relative border rounded-xl overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-zinc-50/80 border-zinc-100'}`}>
      <div className={`p-4 overflow-x-auto ${collapsible ? (expanded ? 'pb-14' : 'max-h-72 overflow-y-hidden') : ''}`}>
        <button
          onClick={handleCopy}
          className={`absolute top-3 right-3 p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-all focus:outline-none ${isDarkMode ? 'text-zinc-500 hover:text-zinc-300 hover:bg-white/10' : 'text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/50'} z-10`}
          aria-label="Copy code"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
        {children}
      </div>
      {collapsible && (
        <div className={`absolute bottom-0 left-0 right-0 flex justify-center items-end pb-3 pointer-events-none ${!expanded ? 'h-32 bg-gradient-to-t ' + (isDarkMode ? 'from-[#111111] to-transparent' : 'from-zinc-50 to-transparent') : ''}`}>
          <button 
            onClick={() => setExpanded(!expanded)}
            className={`pointer-events-auto text-[12px] font-medium px-4 py-1.5 rounded-full transition-all ${isDarkMode ? 'bg-white/10 text-zinc-300 hover:text-white hover:bg-white/20' : 'bg-black/5 text-zinc-600 hover:text-zinc-900 hover:bg-black/10'}`}
          >
            {expanded ? collapseText : expandText}
          </button>
        </div>
      )}
    </div>
  );
};

function AppContent() {
  const [position, setPosition] = useState<ToastPosition>('top-right');
  const [themeKey, setThemeKey] = useState<string>('macos');
  const [animationIndex, setAnimationIndex] = useState<number>(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [lang, setLang] = useState<'en' | 'zh'>('en');

  const t = translations[lang];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const controls = React.useMemo(() => (
    <div className="space-y-6 relative z-10">
      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <select
            value={position}
            onChange={(e) => setPosition(e.target.value as ToastPosition)}
            className={`pl-4 pr-10 py-2 rounded-xl border text-[13px] font-medium transition-colors focus:outline-none appearance-none cursor-pointer ${isDarkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-200 hover:bg-zinc-800' : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50'}`}
          >
            <option value="top-right">{t.topRight}</option>
            <option value="top-left">{t.topLeft}</option>
            <option value="top-center">{t.topCenter}</option>
            <option value="bottom-right">{t.bottomRight}</option>
            <option value="bottom-left">{t.bottomLeft}</option>
            <option value="bottom-center">{t.bottomCenter}</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
        </div>
        
        {/* Primary Purple Buttons */}
        <button
          onClick={() => toast.info('AirDrop', { description: '"iPhone" would like to share a photo.' })}
          className="px-4 py-2 rounded-xl bg-[#5c4b82] text-white text-[13px] font-medium hover:bg-[#4a3c68] transition-all focus:outline-none active:scale-95 shadow-sm"
        >
          {t.sharePhoto}
        </button>
        <button
          onClick={() => {
            toast.promise(
              new Promise((resolve) => setTimeout(resolve, 2000)),
              {
                loading: 'Uploading Files...',
                success: 'Files uploaded successfully!',
                error: 'Failed to upload files.',
              },
              { description: 'Please wait while we process your documents.' }
            );
          }}
          className="px-4 py-2 rounded-xl bg-[#5c4b82] text-white text-[13px] font-medium hover:bg-[#4a3c68] transition-all focus:outline-none active:scale-95 shadow-sm"
        >
          {t.uploadFile}
        </button>
        
        {/* Outline / Gray Buttons */}
        <button
          onClick={() => {
            const id = toast.info('Software Update', {
              description: 'macOS Sonoma 14.4 is now available.',
              duration: 8000,
              action: {
                label: 'Install',
                onClick: () => {
                  toast.update(id, {
                    type: 'loading',
                    title: 'Downloading...',
                    description: 'Estimating time remaining...',
                    action: undefined
                  });
                  setTimeout(() => {
                    toast.update(id, {
                      type: 'success',
                      title: 'Update Installed',
                      description: 'Your Mac will restart automatically.',
                      duration: 4000
                    });
                  }, 2500);
                }
              }
            });
          }}
          className={`px-4 py-2 rounded-xl border text-[13px] font-medium transition-all focus:outline-none active:scale-95 ${isDarkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-200 hover:bg-zinc-800' : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50'}`}
        >
          {t.interactiveUpdate}
        </button>
        <button
          onClick={() => toast.warning('Low Battery', { description: 'Your Mac will sleep soon unless plugged into a power outlet.' })}
          className={`px-4 py-2 rounded-xl border text-[13px] font-medium transition-all focus:outline-none active:scale-95 ${isDarkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-200 hover:bg-zinc-800' : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50'}`}
        >
          {t.lowBattery}
        </button>
        <button
          onClick={() => toast.error('Time Machine', { description: 'Backup Failed. The backup disk could not be found.' })}
          className={`px-4 py-2 rounded-xl border text-[13px] font-medium transition-all focus:outline-none active:scale-95 ${isDarkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-200 hover:bg-zinc-800' : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50'}`}
        >
          {t.backupError}
        </button>
        <button
          onClick={() => toast.info('Message Deleted', { description: 'The conversation has been moved to trash.', action: { label: 'Undo', onClick: () => console.log('Undo clicked') } })}
          className={`px-4 py-2 rounded-xl border text-[13px] font-medium transition-all focus:outline-none active:scale-95 ${isDarkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-200 hover:bg-zinc-800' : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50'}`}
        >
          {t.deleteMessage}
        </button>
        <button
          onClick={() => toast.success('Payment Successful', { description: 'Your receipt has been sent to your email.' })}
          className={`px-4 py-2 rounded-xl border text-[13px] font-medium transition-all focus:outline-none active:scale-95 ${isDarkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-200 hover:bg-zinc-800' : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50'}`}
        >
          {t.processPayment}
        </button>
        <button
          onClick={() => toast.error('Connection Lost', { description: 'Reconnecting to the server...' })}
          className={`px-4 py-2 rounded-xl border text-[13px] font-medium transition-all focus:outline-none active:scale-95 ${isDarkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-200 hover:bg-zinc-800' : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50'}`}
        >
          {t.networkError}
        </button>
      </div>
    </div>
  ), [position, isDarkMode, toast, setPosition, t]);

  return (
    <div className={`min-h-screen flex flex-col md:flex-row font-sans transition-colors duration-300 ${isDarkMode ? 'bg-zinc-950 text-zinc-200 selection:bg-zinc-800' : 'bg-white text-zinc-800 selection:bg-zinc-100'}`}>
      {/* Minimalist Sidebar */}
      <aside className={`w-full md:w-64 shrink-0 p-8 md:p-12 md:sticky md:top-0 md:h-screen flex flex-col border-r transition-colors duration-300 ${isDarkMode ? 'border-zinc-800/50' : 'border-zinc-100/50'}`}>
        <div className={`text-[15px] font-semibold tracking-wide mb-12 mt-1.5 transition-colors duration-300 ${isDarkMode ? 'text-zinc-100' : 'text-zinc-900'}`}>
          shuakami/toast
        </div>
        <nav className={`flex flex-col gap-5 text-[13px] font-medium transition-colors duration-300 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
          <button onClick={() => scrollToSection('introduction')} className={`text-left transition-colors ${isDarkMode ? 'hover:text-zinc-100' : 'hover:text-zinc-900'}`}>{t.intro}</button>
          <button onClick={() => scrollToSection('demo')} className={`text-left transition-colors ${isDarkMode ? 'hover:text-zinc-100' : 'hover:text-zinc-900'}`}>{t.demo}</button>
          <button onClick={() => scrollToSection('installation')} className={`text-left transition-colors ${isDarkMode ? 'hover:text-zinc-100' : 'hover:text-zinc-900'}`}>{t.installation}</button>
          <button onClick={() => scrollToSection('usage')} className={`text-left transition-colors ${isDarkMode ? 'hover:text-zinc-100' : 'hover:text-zinc-900'}`}>{t.usage}</button>
          <button onClick={() => scrollToSection('customization')} className={`text-left transition-colors ${isDarkMode ? 'hover:text-zinc-100' : 'hover:text-zinc-900'}`}>{t.customization}</button>
          <button onClick={() => scrollToSection('api')} className={`text-left transition-colors ${isDarkMode ? 'hover:text-zinc-100' : 'hover:text-zinc-900'}`}>{t.api}</button>
        </nav>

        <div className="mt-auto pt-8 space-y-6">
          <div className="space-y-3">
            <div className="relative">
              <select
                value={themeKey}
                onChange={(e) => setThemeKey(e.target.value)}
                className={`w-full pl-3 pr-8 py-1.5 rounded-lg border text-[13px] font-medium transition-colors focus:outline-none appearance-none cursor-pointer ${isDarkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-200 hover:bg-zinc-800' : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50'}`}
              >
                {Object.entries(themes).map(([key, t]) => (
                  <option key={key} value={key}>{t.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={animationIndex}
                onChange={(e) => setAnimationIndex(Number(e.target.value))}
                className={`w-full pl-3 pr-8 py-1.5 rounded-lg border text-[13px] font-medium transition-colors focus:outline-none appearance-none cursor-pointer ${isDarkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-200 hover:bg-zinc-800' : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50'}`}
              >
                {animations.map((anim, idx) => (
                  <option key={idx} value={idx}>{anim.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`flex items-center gap-2 text-[13px] font-medium transition-colors ${isDarkMode ? 'text-zinc-400 hover:text-zinc-100' : 'text-zinc-500 hover:text-zinc-900'}`}
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
              {isDarkMode ? t.lightMode : t.darkMode}
            </button>
            <button
              onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
              className={`flex items-center gap-2 text-[13px] font-medium transition-colors ${isDarkMode ? 'text-zinc-400 hover:text-zinc-100' : 'text-zinc-500 hover:text-zinc-900'}`}
            >
              <Globe size={16} />
              {lang === 'en' ? '中文' : 'English'}
            </button>
            <a
              href="https://github.com/shuakami/toast"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 text-[13px] font-medium transition-colors ${isDarkMode ? 'text-zinc-400 hover:text-zinc-100' : 'text-zinc-500 hover:text-zinc-900'}`}
            >
              <Github size={16} />
              GitHub
            </a>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-16 lg:p-24 flex justify-center">
        <div className="w-full max-w-4xl space-y-24">
          <div className="hidden md:flex w-full aspect-[21/9] min-h-[350px] relative rounded-3xl overflow-hidden flex-col items-center justify-center group border border-zinc-200/70 bg-[linear-gradient(135deg,_rgba(250,250,249,0.98)_0%,_rgba(244,244,245,0.94)_42%,_rgba(231,229,228,0.92)_100%)] shadow-[0_28px_90px_rgba(15,23,42,0.08)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_20%,_rgba(255,255,255,0.98),_transparent_32%),radial-gradient(circle_at_82%_18%,_rgba(191,219,254,0.42),_transparent_26%),radial-gradient(circle_at_76%_76%,_rgba(244,114,182,0.16),_transparent_22%),radial-gradient(circle_at_28%_82%,_rgba(251,191,36,0.18),_transparent_24%)]" />
            <div className="absolute inset-0 opacity-40 bg-[linear-gradient(rgba(255,255,255,0.62)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:42px_42px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_36%,_rgba(15,23,42,0.12)_100%)]" />
            <div className="absolute inset-[18px] rounded-[28px] border border-white/70 bg-[linear-gradient(135deg,_rgba(255,255,255,0.42),_rgba(255,255,255,0.12))] shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]" />
            <div className="absolute left-10 top-10 h-44 w-44 rounded-full bg-white/65 blur-3xl" />
            <div className="absolute right-14 top-8 h-36 w-36 rounded-full bg-sky-200/30 blur-3xl" />
            <div className="absolute bottom-8 left-24 h-28 w-28 rounded-full bg-rose-200/18 blur-3xl" />
            <div className="absolute bottom-10 right-20 h-32 w-32 rounded-full bg-amber-200/20 blur-3xl" />
            <div className="absolute inset-x-16 top-1/2 h-[190px] -translate-y-1/2 rounded-[34px] border border-white/55 bg-[linear-gradient(135deg,_rgba(255,255,255,0.52),_rgba(255,255,255,0.16))] shadow-[0_24px_80px_rgba(255,255,255,0.28),inset_0_1px_0_rgba(255,255,255,0.72)] backdrop-blur-2xl" />

            <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
              <div className="relative w-[320px] h-[92px]">
                <div className="absolute top-0 left-0 w-full bg-white/60 backdrop-blur-2xl saturate-[1.5] border border-white/40 rounded-[20px] p-4 flex items-center gap-3 shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.6)] transform scale-[0.80] translate-y-16 opacity-30 transition-all duration-500 group-hover:translate-y-20 group-hover:scale-[0.75]">
                  <div className="flex flex-col gap-1.5 flex-1">
                    <div className="h-3.5 w-28 bg-black/10 rounded" />
                    <div className="h-2.5 w-36 bg-black/5 rounded" />
                  </div>
                </div>
                <div className="absolute top-0 left-0 w-full bg-white/60 backdrop-blur-2xl saturate-[1.5] border border-white/40 rounded-[20px] p-4 flex items-center gap-3 shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.6)] transform scale-[0.85] translate-y-12 opacity-50 transition-all duration-500 group-hover:translate-y-16 group-hover:scale-[0.80]">
                  <div className="flex flex-col gap-1.5 flex-1">
                    <div className="h-3.5 w-24 bg-black/10 rounded" />
                    <div className="h-2.5 w-32 bg-black/5 rounded" />
                  </div>
                </div>
                <div className="absolute top-0 left-0 w-full bg-white/60 backdrop-blur-2xl saturate-[1.5] border border-white/40 rounded-[20px] p-4 flex items-center gap-3 shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.6)] transform scale-90 translate-y-8 opacity-70 transition-all duration-500 group-hover:translate-y-12 group-hover:scale-[0.85]">
                  <div className="flex flex-col gap-1.5 flex-1">
                    <div className="h-3.5 w-20 bg-black/10 rounded" />
                    <div className="h-2.5 w-40 bg-black/5 rounded" />
                  </div>
                </div>
                <div className="absolute top-0 left-0 w-full bg-white/60 backdrop-blur-2xl saturate-[1.5] border border-white/40 rounded-[20px] p-4 flex items-center gap-3 shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.6)] transform scale-95 translate-y-4 opacity-90 transition-all duration-500 group-hover:translate-y-6 group-hover:scale-[0.92]">
                  <div className="flex flex-col gap-1.5 flex-1">
                    <div className="h-3.5 w-24 bg-black/10 rounded" />
                    <div className="h-2.5 w-32 bg-black/5 rounded" />
                  </div>
                </div>
                <div className="absolute top-0 left-0 w-full bg-white/60 backdrop-blur-2xl saturate-[1.5] border border-white/40 rounded-[20px] p-4 flex items-center gap-3 shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.6)] transform scale-100 translate-y-0 opacity-100 transition-all duration-500 group-hover:-translate-y-1">
                  <div className="flex flex-col gap-0.5 flex-1">
                    <span className="text-[14px] font-medium text-black/90">New Notification</span>
                    <span className="text-[13px] text-black/60">Drag, stack, and copy the latest toast source code.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section id="introduction" className="space-y-4">
            <h1 className={`text-2xl font-semibold tracking-tight transition-colors duration-300 ${isDarkMode ? 'text-zinc-100' : 'text-zinc-900'}`}>shuakami/toast</h1>
            <p className={`text-[14px] leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              {t.introDesc}
            </p>
          </section>

          <section id="demo" className="space-y-6">
            <h2 className={`text-lg font-medium tracking-tight transition-colors duration-300 ${isDarkMode ? 'text-zinc-100' : 'text-zinc-900'}`}>{t.demo}</h2>
            <p className={`text-[14px] leading-relaxed transition-colors duration-300 mb-6 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              {t.demoDesc}
            </p>
            {controls}
          </section>

          <section id="installation" className="space-y-8">
            <h2 className={`text-lg font-medium tracking-tight transition-colors duration-300 ${isDarkMode ? 'text-zinc-100' : 'text-zinc-900'}`}>{t.installation}</h2>
            
            <div className="space-y-4">
              <h3 className={`text-[15px] font-medium transition-colors duration-300 ${isDarkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>{t.installDeps}</h3>
              <p className={`text-[14px] leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {t.installDepsDesc}
              </p>
              <CodeBlock codeString="npm install motion lucide-react" isDarkMode={isDarkMode}>
                <code className="text-[13px] font-mono leading-relaxed">
                  <span className="text-purple-600">npm</span> <span className={isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}>install motion lucide-react</span>
                </code>
              </CodeBlock>
            </div>

            <div className="space-y-4">
              <h3 className={`text-[15px] font-medium transition-colors duration-300 ${isDarkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>{t.copyCode}</h3>
              <p className={`text-[14px] leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {t.copyCodeDesc}
              </p>
              <CodeBlock 
                codeString={toastSourceCode} 
                isDarkMode={isDarkMode} 
                collapsible 
                expandText={t.expandCode}
                collapseText={t.collapseCode}
              >
                <pre className="text-[13px] font-mono leading-relaxed whitespace-pre-wrap">
                  <span className={isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}>
                    {toastSourceCode}
                  </span>
                </pre>
              </CodeBlock>
            </div>
          </section>

          <section id="usage" className="space-y-8">
            <div className="space-y-2">
              <h2 className={`text-lg font-medium tracking-tight transition-colors duration-300 ${isDarkMode ? 'text-zinc-100' : 'text-zinc-900'}`}>{t.usage}</h2>
              <p className={`text-[14px] leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {t.usageDesc}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className={`text-[15px] font-medium transition-colors duration-300 ${isDarkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>{t.setupTitle}</h3>
              <p className={`text-[14px] leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {t.setupDesc}
              </p>
              <CodeBlock codeString={`import { Toaster } from './components/toast';\n\nfunction App() {\n  return (\n    <>\n      <YourApp />\n      <Toaster position="bottom-right" theme="macos" />\n    </>\n  );\n}`} isDarkMode={isDarkMode}>
                <pre className="text-[13px] font-mono leading-relaxed">
                  <span className="text-purple-600">import</span> {'{ '}
                  <span className="text-amber-600">Toaster</span>
                  {' } '}
                  <span className="text-purple-600">from</span>{' '}
                  <span className="text-green-600">'./components/toast'</span>;
                  <br /><br />
                  <span className="text-purple-600">function</span> <span className="text-blue-600">App</span>() {'{'}
                  <br />
                  {'  '}<span className="text-purple-600">return</span> (
                  <br />
                  {'    '}&lt;&gt;
                  <br />
                  {'      '}&lt;<span className="text-amber-600">YourApp</span> /&gt;
                  <br />
                  {'      '}&lt;<span className="text-amber-600">Toaster</span> <span className="text-blue-400">position</span>=<span className="text-green-600">"bottom-right"</span> <span className="text-blue-400">theme</span>=<span className="text-green-600">"macos"</span> /&gt;
                  <br />
                  {'    '}&lt;/&gt;
                  <br />
                  {'  '});
                  <br />
                  {'}'}
                </pre>
              </CodeBlock>
            </div>

            <div className="space-y-4">
              <h3 className={`text-[15px] font-medium transition-colors duration-300 ${isDarkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>{t.basicTitle}</h3>
              <p className={`text-[14px] leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {t.basicDesc}
              </p>
              <CodeBlock codeString={`import { toast } from './components/toast';\n\n// Simple toast\ntoast.success('Profile updated');\n\n// With description\ntoast.info('New message', {\n  description: 'You have 3 unread messages.'\n});`} isDarkMode={isDarkMode}>
                <pre className="text-[13px] font-mono leading-relaxed">
                  <span className="text-purple-600">import</span> {'{ '}
                  <span className="text-amber-600">toast</span>
                  {' } '}
                  <span className="text-purple-600">from</span>{' '}
                  <span className="text-green-600">'./components/toast'</span>;
                  <br /><br />
                  <span className="text-zinc-500">// Simple toast</span>
                  <br />
                  <span className="text-blue-600">toast.success</span>(<span className="text-green-600">'Profile updated'</span>);
                  <br /><br />
                  <span className="text-zinc-500">// With description</span>
                  <br />
                  <span className="text-blue-600">toast.info</span>(<span className="text-green-600">'New message'</span>, {'{'}
                  <br />
                  {'  '}<span className="text-blue-400">description</span>: <span className="text-green-600">'You have 3 unread messages.'</span>
                  <br />
                  {'}'});
                </pre>
              </CodeBlock>
            </div>

            <div className="space-y-4">
              <h3 className={`text-[15px] font-medium transition-colors duration-300 ${isDarkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>{t.durationTitle}</h3>
              <p className={`text-[14px] leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {t.durationDesc}
              </p>
              <CodeBlock codeString={`// Stays for 10 seconds\ntoast.warning('Session expiring soon', {\n  duration: 10000\n});\n\n// Never disappears automatically (Persistent)\ntoast.error('Connection lost', {\n  description: 'Please check your internet connection.',\n  duration: Infinity\n});`} isDarkMode={isDarkMode}>
                <pre className="text-[13px] font-mono leading-relaxed">
                  <span className="text-zinc-500">// Stays for 10 seconds</span>
                  <br />
                  <span className="text-blue-600">toast.warning</span>(<span className="text-green-600">'Session expiring soon'</span>, {'{'}
                  <br />
                  {'  '}<span className="text-blue-400">duration</span>: <span className="text-amber-600">10000</span>
                  <br />
                  {'}'});
                  <br /><br />
                  <span className="text-zinc-500">// Never disappears automatically (Persistent)</span>
                  <br />
                  <span className="text-blue-600">toast.error</span>(<span className="text-green-600">'Connection lost'</span>, {'{'}
                  <br />
                  {'  '}<span className="text-blue-400">description</span>: <span className="text-green-600">'Please check your internet connection.'</span>,
                  <br />
                  {'  '}<span className="text-blue-400">duration</span>: <span className="text-amber-600">Infinity</span>
                  <br />
                  {'}'});
                </pre>
              </CodeBlock>
            </div>

            <div className="space-y-4">
              <h3 className={`text-[15px] font-medium transition-colors duration-300 ${isDarkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>{t.promiseTitle}</h3>
              <p className={`text-[14px] leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {t.promiseDesc}
              </p>
              <CodeBlock codeString={`const saveSettings = fetch('/api/settings', { method: 'POST' });\n\ntoast.promise(saveSettings, {\n  loading: 'Saving settings...',\n  success: 'Settings saved!',\n  error: 'Could not save settings.'\n});`} isDarkMode={isDarkMode}>
                <pre className="text-[13px] font-mono leading-relaxed">
                  <span className="text-purple-600">const</span> saveSettings = <span className="text-blue-600">fetch</span>(<span className="text-green-600">'/api/settings'</span>, {'{'} <span className="text-blue-400">method</span>: <span className="text-green-600">'POST'</span> {'}'});
                  <br /><br />
                  <span className="text-blue-600">toast.promise</span>(saveSettings, {'{'}
                  <br />
                  {'  '}<span className="text-blue-400">loading</span>: <span className="text-green-600">'Saving settings...'</span>,
                  <br />
                  {'  '}<span className="text-blue-400">success</span>: <span className="text-green-600">'Settings saved!'</span>,
                  <br />
                  {'  '}<span className="text-blue-400">error</span>: <span className="text-green-600">'Could not save settings.'</span>
                  <br />
                  {'}'});
                </pre>
              </CodeBlock>
            </div>

            <div className="space-y-4">
              <h3 className={`text-[15px] font-medium transition-colors duration-300 ${isDarkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>{t.builtinTitle}</h3>
              <p className={`text-[14px] leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {t.builtinDesc}
              </p>
              <CodeBlock codeString={`import { Toaster, animations } from './components/toast';\n\nfunction App() {\n  return (\n    <Toaster \n      position="bottom-right" \n      theme="glassmorphism" // 'macos' | 'ios' | 'windows' | 'material' | 'cyberpunk' | 'retro' | 'minimal' | 'glassmorphism'\n      animation={animations[1]} // Select from the exported animations array\n    />\n  );\n}`} isDarkMode={isDarkMode}>
                <pre className="text-[13px] font-mono leading-relaxed">
                  <span className="text-purple-600">import</span> {'{ '}
                  <span className="text-amber-600">Toaster</span>, <span className="text-amber-600">animations</span>
                  {' } '}
                  <span className="text-purple-600">from</span>{' '}
                  <span className="text-green-600">'./components/toast'</span>;
                  <br /><br />
                  <span className="text-purple-600">function</span> <span className="text-blue-600">App</span>() {'{'}
                  <br />
                  {'  '}<span className="text-purple-600">return</span> (
                  <br />
                  {'    '}&lt;<span className="text-amber-600">Toaster</span>
                  <br />
                  {'      '}<span className="text-blue-400">position</span>=<span className="text-green-600">"bottom-right"</span>
                  <br />
                  {'      '}<span className="text-blue-400">theme</span>=<span className="text-green-600">"glassmorphism"</span> <span className="text-zinc-500">// 'macos' | 'ios' | 'windows' | 'material' | 'cyberpunk' | 'retro' | 'minimal' | 'glassmorphism'</span>
                  <br />
                  {'      '}<span className="text-blue-400">animation</span>={'{'}<span className="text-amber-600">animations</span>[<span className="text-amber-600">1</span>]{'}'} <span className="text-zinc-500">// Select from the exported animations array</span>
                  <br />
                  {'    '}/&gt;
                  <br />
                  {'  '});
                  <br />
                  {'}'}
                </pre>
              </CodeBlock>
            </div>
          </section>

          <section id="customization" className="space-y-8">
            <div className="space-y-2">
              <h2 className={`text-lg font-medium tracking-tight transition-colors duration-300 ${isDarkMode ? 'text-zinc-100' : 'text-zinc-900'}`}>{t.customTitle}</h2>
              <p className={`text-[14px] leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {t.customDesc}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className={`text-[15px] font-medium transition-colors duration-300 ${isDarkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>{t.themeTitle}</h3>
              <p className={`text-[14px] leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {t.themeDesc}
              </p>
              <CodeBlock codeString={`import { Toaster, ToastTheme } from './components/toast';\n\nconst myCustomTheme: ToastTheme = {\n  name: 'cyberpunk',\n  background: 'bg-black',\n  border: 'border-neon-pink',\n  textPrimary: 'text-neon-blue',\n  textSecondary: 'text-zinc-400',\n  closeButton: 'text-zinc-500',\n  closeButtonHover: 'hover:text-neon-pink',\n  buttonBg: 'bg-neon-blue',\n  buttonHover: 'hover:bg-blue-400',\n  buttonText: 'text-black',\n  dismissButtonHover: 'hover:bg-white/10',\n  shadow: 'shadow-[0_0_15px_rgba(255,0,255,0.5)]',\n  spinner: 'text-neon-pink',\n  borderRadius: 'rounded-none',\n};\n\nfunction App() {\n  return <Toaster theme={myCustomTheme} />;\n}`} isDarkMode={isDarkMode}>
                <pre className="text-[13px] font-mono leading-relaxed">
                  <span className="text-purple-600">const</span> myCustomTheme: <span className="text-amber-600">ToastTheme</span> = {'{'}
                  <br />
                  {'  '}<span className="text-blue-400">name</span>: <span className="text-green-600">'cyberpunk'</span>,
                  <br />
                  {'  '}<span className="text-blue-400">background</span>: <span className="text-green-600">'bg-black'</span>,
                  <br />
                  {'  '}<span className="text-blue-400">border</span>: <span className="text-green-600">'border-neon-pink'</span>,
                  <br />
                  {'  '}<span className="text-blue-400">textPrimary</span>: <span className="text-green-600">'text-neon-blue'</span>,
                  <br />
                  {'  '}<span className="text-zinc-500">// ... style every element with Tailwind!</span>
                  <br />
                  {'}'};
                  <br /><br />
                  <span className="text-purple-600">function</span> <span className="text-blue-600">App</span>() {'{'}
                  <br />
                  {'  '}<span className="text-purple-600">return</span> &lt;<span className="text-amber-600">Toaster</span> <span className="text-blue-400">theme</span>={'{'}myCustomTheme{'}'} /&gt;;
                  <br />
                  {'}'}
                </pre>
              </CodeBlock>
            </div>

            <div className="space-y-4">
              <h3 className={`text-[15px] font-medium transition-colors duration-300 ${isDarkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>{t.animTitle}</h3>
              <p className={`text-[14px] leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {t.animDesc}
              </p>
              <CodeBlock codeString={`import { Toaster, ToastAnimation } from './components/toast';\n\nconst bounceAnimation: ToastAnimation = {\n  name: 'bounce',\n  initial: (ctx) => ({ opacity: 0, y: ctx.sign * 50, scale: 0.3 }),\n  animate: (ctx) => ({\n    opacity: ctx.opacity,\n    y: ctx.offset * ctx.sign,\n    scale: ctx.scale,\n  }),\n  exit: (ctx) => ({ opacity: 0, scale: 0.5, filter: 'blur(10px)' }),\n  transition: { type: 'spring', bounce: 0.5 },\n};\n\nfunction App() {\n  return <Toaster animation={bounceAnimation} />;\n}`} isDarkMode={isDarkMode}>
                <pre className="text-[13px] font-mono leading-relaxed">
                  <span className="text-purple-600">const</span> bounceAnimation: <span className="text-amber-600">ToastAnimation</span> = {'{'}
                  <br />
                  {'  '}<span className="text-blue-400">name</span>: <span className="text-green-600">'bounce'</span>,
                  <br />
                  {'  '}<span className="text-blue-600">initial</span>: (ctx) =&gt; ({'{'} <span className="text-blue-400">opacity</span>: <span className="text-amber-600">0</span>, <span className="text-blue-400">y</span>: ctx.sign * <span className="text-amber-600">50</span>, <span className="text-blue-400">scale</span>: <span className="text-amber-600">0.3</span> {'}'}),
                  <br />
                  {'  '}<span className="text-blue-600">animate</span>: (ctx) =&gt; ({'{'}
                  <br />
                  {'    '}<span className="text-blue-400">opacity</span>: ctx.opacity,
                  <br />
                  {'    '}<span className="text-blue-400">y</span>: ctx.offset * ctx.sign,
                  <br />
                  {'    '}<span className="text-blue-400">scale</span>: ctx.scale,
                  <br />
                  {'  }'}),
                  <br />
                  {'  '}<span className="text-blue-600">exit</span>: (ctx) =&gt; ({'{'} <span className="text-blue-400">opacity</span>: <span className="text-amber-600">0</span>, <span className="text-blue-400">scale</span>: <span className="text-amber-600">0.5</span>, <span className="text-blue-400">filter</span>: <span className="text-green-600">'blur(10px)'</span> {'}'}),
                  <br />
                  {'  '}<span className="text-blue-400">transition</span>: {'{'} <span className="text-blue-400">type</span>: <span className="text-green-600">'spring'</span>, <span className="text-blue-400">bounce</span>: <span className="text-amber-600">0.5</span> {'}'},
                  <br />
                  {'}'};
                  <br /><br />
                  <span className="text-purple-600">function</span> <span className="text-blue-600">App</span>() {'{'}
                  <br />
                  {'  '}<span className="text-purple-600">return</span> &lt;<span className="text-amber-600">Toaster</span> <span className="text-blue-400">animation</span>={'{'}bounceAnimation{'}'} /&gt;;
                  <br />
                  {'}'}
                </pre>
              </CodeBlock>
            </div>
          </section>

          <section id="api" className="space-y-4">
            <h2 className={`text-lg font-medium tracking-tight transition-colors duration-300 ${isDarkMode ? 'text-zinc-100' : 'text-zinc-900'}`}>{t.api}</h2>
            <div className="space-y-4">
              <div className={`border-b pb-4 transition-colors duration-300 ${isDarkMode ? 'border-zinc-800/50' : 'border-zinc-100/50'}`}>
                <h3 className={`text-[14px] font-medium mb-1 transition-colors duration-300 ${isDarkMode ? 'text-zinc-100' : 'text-zinc-900'}`}>type</h3>
                <p className={`text-[13px] font-mono mb-2 transition-colors duration-300 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>'info' | 'success' | 'warning' | 'error' | 'loading'</p>
                <p className={`text-[13px] transition-colors duration-300 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{t.typeDesc}</p>
              </div>
              <div className={`border-b pb-4 transition-colors duration-300 ${isDarkMode ? 'border-zinc-800/50' : 'border-zinc-100/50'}`}>
                <h3 className={`text-[14px] font-medium mb-1 transition-colors duration-300 ${isDarkMode ? 'text-zinc-100' : 'text-zinc-900'}`}>title</h3>
                <p className={`text-[13px] font-mono mb-2 transition-colors duration-300 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>string</p>
                <p className={`text-[13px] transition-colors duration-300 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{t.titleDesc}</p>
              </div>
              <div className={`border-b pb-4 transition-colors duration-300 ${isDarkMode ? 'border-zinc-800/50' : 'border-zinc-100/50'}`}>
                <h3 className={`text-[14px] font-medium mb-1 transition-colors duration-300 ${isDarkMode ? 'text-zinc-100' : 'text-zinc-900'}`}>description</h3>
                <p className={`text-[13px] font-mono mb-2 transition-colors duration-300 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>string (optional)</p>
                <p className={`text-[13px] transition-colors duration-300 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{t.descDesc}</p>
              </div>
              <div className={`border-b pb-4 transition-colors duration-300 ${isDarkMode ? 'border-zinc-800/50' : 'border-zinc-100/50'}`}>
                <h3 className={`text-[14px] font-medium mb-1 transition-colors duration-300 ${isDarkMode ? 'text-zinc-100' : 'text-zinc-900'}`}>toast.promise()</h3>
                <p className={`text-[13px] font-mono mb-2 transition-colors duration-300 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>{`toast.promise(promise, { loading, success, error })`}</p>
                <p className={`text-[13px] transition-colors duration-300 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{t.promiseApiDesc}</p>
              </div>
              <div className={`border-b pb-4 transition-colors duration-300 ${isDarkMode ? 'border-zinc-800/50' : 'border-zinc-100/50'}`}>
                <h3 className={`text-[14px] font-medium mb-1 transition-colors duration-300 ${isDarkMode ? 'text-zinc-100' : 'text-zinc-900'}`}>toast.update()</h3>
                <p className={`text-[13px] font-mono mb-2 transition-colors duration-300 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>{`toast.update(id, options)`}</p>
                <p className={`text-[13px] transition-colors duration-300 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{t.updateApiDesc}</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Toaster position={position} theme={themeKey} isDarkMode={isDarkMode} animation={animations[animationIndex]} />
    </div>
  );
}

export default function App() {
  return <AppContent />;
}
