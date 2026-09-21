import React from 'react';
import { X, Sparkles, ArrowRight } from 'lucide-react';

export default function AboutModal({ isOpen, onClose, onOpenProjectModal }) {
  if (!isOpen) return null;

  const stack = [
    { name: "Adobe Premiere Pro", role: "Primary NLE & Assembly" },
    { name: "DaVinci Resolve", role: "Color Grading & Master Science" },
    { name: "After Effects", role: "Kinetic Typography & Motion Design" },
    { name: "CapCut Pro", role: "Short-Form Fast Iterations" },
    { name: "Notion & Frame.io", role: "System Roadmapping & Client Review" }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/40 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-white/95 backdrop-blur-2xl border border-slate-200/90 rounded-[32px] p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.14),0_1px_3px_rgba(0,0,0,0.02)] z-10 my-8 transition-all animate-fadeIn text-left space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-100 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Creator Philosophy</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
            Behind the Craft with Baskaran
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Based in Tamil Nadu • Partnering with creators and forward-thinking brands worldwide.
          </p>
        </div>

        {/* Narrative */}
        <div className="space-y-3.5 text-sm sm:text-base text-slate-600 leading-relaxed">
          <p>
            When I began my journey in video editing, I quickly observed a pattern: countless creators have incredible knowledge and businesses have phenomenal products, but their content gets buried in the noise.
          </p>
          <p>
            Simply adding subtitles and quick cuts is no longer enough. The algorithm rewards <strong>clarity, emotional resonance, narrative structure, and retention architecture</strong>.
          </p>
          <p>
            My role as your growth partner is to bridge the gap between creative storytelling and strategic execution. We engineer content designed to build real audience trust, spark meaningful dialogue, and compound over time.
          </p>
        </div>

        {/* Production Stack */}
        <div className="space-y-3 pt-3 border-t border-slate-100">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
            Production & Delivery Stack
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {stack.map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 flex flex-col">
                <span className="text-xs font-bold text-slate-900">{item.name}</span>
                <span className="text-[11px] text-slate-500">{item.role}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Footer */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-500">Ready to take your content to the next level?</span>
          <button
            onClick={() => {
              onClose();
              onOpenProjectModal();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full transition-all"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
