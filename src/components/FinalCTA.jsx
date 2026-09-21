import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function FinalCTA({ onOpenProjectModal }) {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        
        {/* Main CTA Card */}
        <div className="relative rounded-[36px] sm:rounded-[44px] overflow-hidden bg-gradient-to-br from-indigo-100/70 via-purple-50/60 to-pink-100/50 backdrop-blur-2xl border border-slate-200/90 p-8 sm:p-16 lg:p-20 text-center shadow-[0_20px_60px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.02)]">
          
          {/* Subtle Glow Spheres */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-purple-300/30 blur-[90px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-20 right-10 w-72 h-72 bg-pink-300/25 blur-[90px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            
            {/* Pill */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-white/80 text-xs font-semibold text-slate-700 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Let's collaborate</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-[-0.03em] leading-tight">
              Got ideas worth sharing?
            </h2>

            {/* Supporting Line */}
            <p className="text-base sm:text-xl text-slate-600 font-normal leading-relaxed">
              Let's turn them into content people remember.
            </p>

            {/* Action Button */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onOpenProjectModal}
                className="group inline-flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-800 text-white font-medium text-base sm:text-lg px-8 py-4 rounded-full transition-all duration-300 shadow-[0_12px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.22)] active:scale-[0.98] w-full sm:w-auto"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Small supporting text */}
            <p className="text-xs sm:text-sm font-mono tracking-wider text-slate-500 pt-3">
              Content • Strategy • Social Growth
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}
