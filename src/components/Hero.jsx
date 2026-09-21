import React from 'react';
import { 
  ArrowRight, 
  ArrowDown, 
  CheckCircle2
} from 'lucide-react';
import Navbar from './Navbar';

export default function Hero({ onOpenProjectModal }) {
  return (
    <section className="hero relative min-h-screen flex items-center justify-center pt-24 pb-16 sm:pt-28 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#fbfbfd]">
      
      {/* =========================================================================
          1. NAVIGATION LAYER (Positioned directly on top of Hero, non-fixed/non-sticky)
      ========================================================================= */}
      <Navbar onOpenProjectModal={onOpenProjectModal} />

      {/* =========================================================================
          2. HERO BACKGROUND IMAGE LAYER (.hero-background)
          Using unmodified, unblurred /hero-background-HD.png from public folder
      ========================================================================= */}
      <div 
        className="hero-background absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none select-none"
        aria-hidden="true"
      >
        <img
          src="/hero-background-HD.png"
          alt="Baskaran — Creative studio environment"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* =========================================================================
          2. HERO FOREGROUND CONTENT (.hero-content)
          Highlighted with fine strokes, soft shadows, and clean contrast
      ========================================================================= */}
      <div className="hero-content relative z-[2] max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Copy & CTAs */}
          <div className="lg:col-span-8 space-y-7 text-left max-w-2xl">
            
            {/* Status Pill with fine stroke & soft shadow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-slate-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold text-slate-800">Available for freelance projects</span>
            </div>

            {/* Headline with high contrast */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-950 tracking-[-0.04em] leading-[1.06] drop-shadow-xs">
                Your One-Person <br />
                <span className="text-slate-900">
                  Content Team.
                </span>
              </h1>
            </div>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-700 max-w-xl font-medium leading-relaxed drop-shadow-xs">
              Strategy, content creation, and social growth, all working together to turn your ideas into content that gets attention, builds trust, and drives growth.
            </p>

            {/* CTAs with fine borders and soft shadows */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={onOpenProjectModal}
                className="group inline-flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-800 text-white font-semibold text-sm sm:text-base px-6 py-3.5 rounded-full transition-all duration-300 shadow-[0_10px_25px_rgba(0,0,0,0.18)] hover:shadow-[0_14px_32px_rgba(0,0,0,0.24)] border border-slate-800 active:scale-[0.98]"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href="#work"
                className="inline-flex items-center justify-center gap-2 bg-white/95 hover:bg-white text-slate-900 font-semibold text-sm sm:text-base px-5 py-3.5 rounded-full border border-slate-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-200 hover:border-slate-300 active:scale-[0.98]"
              >
                <span>View My Work</span>
                <ArrowDown className="w-4 h-4 text-slate-600" />
              </a>
            </div>

            {/* Micro Highlights with subtle border & soft shadow */}
            <div className="inline-flex flex-wrap items-center gap-4 sm:gap-6 p-2.5 sm:px-4 sm:py-2.5 rounded-2xl bg-white/90 border border-slate-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.04)] text-xs font-semibold text-slate-700 max-w-md">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-slate-950" />
                <span>Zero fluff</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-slate-950" />
                <span>Creator-first</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-slate-950" />
                <span>Engineered for retention</span>
              </div>
            </div>
          </div>

          {/* Empty Right Column: Allows the unblurred background visual environment to remain visible */}
          <div className="hidden lg:block lg:col-span-4" />

        </div>
      </div>
    </section>
  );
}
