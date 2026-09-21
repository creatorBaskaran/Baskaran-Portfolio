import React from 'react';
import { 
  Video, 
  Scissors, 
  Send, 
  Target, 
  Lightbulb, 
  Zap, 
  Film, 
  Share2, 
  LineChart, 
  Repeat2,
  ArrowRight,
  ArrowDown
} from 'lucide-react';

export default function Differentiator() {
  const editorSteps = [
    { label: "Footage", icon: Video, desc: "Raw video clips" },
    { label: "Edit", icon: Scissors, desc: "Cut & splice" },
    { label: "Deliver", icon: Send, desc: "MP4 file transfer" },
  ];

  const partnerSteps = [
    { label: "Goal", icon: Target, color: "text-amber-500", bg: "bg-amber-50" },
    { label: "Idea", icon: Lightbulb, color: "text-purple-500", bg: "bg-purple-50" },
    { label: "Hook", icon: Zap, color: "text-pink-500", bg: "bg-pink-50" },
    { label: "Content", icon: Film, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Publish", icon: Share2, color: "text-indigo-500", bg: "bg-indigo-50" },
    { label: "Learn", icon: LineChart, color: "text-cyan-500", bg: "bg-cyan-50" },
    { label: "Improve", icon: Repeat2, color: "text-emerald-500", bg: "bg-emerald-50" },
  ];

  return (
    <section className="py-24 sm:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-left md:text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            <span>The Mindset</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-[-0.03em] leading-tight">
            You don't need another content vendor.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-normal leading-relaxed">
            You need someone who understands why the content exists in the first place.
          </p>
        </div>

        {/* Visual Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left: Most Editors */}
          <div className="lg:col-span-4 bg-white/60 backdrop-blur-md border border-slate-200/80 rounded-[28px] p-6 sm:p-7 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                  TRADITIONAL APPROACH
                </span>
                <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  Transactional
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mt-4 mb-6">
                Most Editors
              </h3>

              {/* Steps Flow */}
              <div className="space-y-3">
                {editorSteps.map((step, idx) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.label} className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="w-8 h-8 rounded-xl bg-slate-200/70 flex items-center justify-center text-slate-600">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-bold text-slate-800">{step.label}</div>
                        <div className="text-[10px] text-slate-400">{step.desc}</div>
                      </div>
                      {idx < editorSteps.length - 1 && (
                        <ArrowDown className="w-3.5 h-3.5 text-slate-300 hidden sm:block" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-400">
              Focuses only on timeline assembly.
            </div>
          </div>

          {/* Right: Content Partner */}
          <div className="lg:col-span-8 bg-gradient-to-br from-white/95 via-white/80 to-purple-50/40 backdrop-blur-2xl border border-white/90 rounded-[28px] p-6 sm:p-8 flex flex-col justify-between shadow-[0_25px_60px_-15px_rgba(139,92,246,0.1),0_0_1px_1px_rgba(255,255,255,0.9)_inset] relative">
            
            {/* Top Bar */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-600 font-mono flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                  STRATEGIC ECOSYSTEM
                </span>
                <span className="text-[11px] font-semibold text-purple-700 bg-purple-100/80 px-2.5 py-0.5 rounded-full border border-purple-200/50">
                  Compounding Growth
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-950 mt-4 mb-6">
                Content Partner
              </h3>

              {/* Partner Steps Flow (Horizontal Grid / Flow) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
                {partnerSteps.map((step, idx) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={step.label}
                      className="group/item relative bg-white rounded-2xl p-3 border border-slate-200/70 shadow-xs flex flex-col items-center justify-center text-center transition-all duration-200 hover:-translate-y-1 hover:border-purple-300 hover:shadow-md"
                    >
                      <div className={`w-8 h-8 rounded-xl ${step.bg} flex items-center justify-center mb-2`}>
                        <Icon className={`w-4 h-4 ${step.color}`} />
                      </div>
                      <span className="text-xs font-bold text-slate-900 tracking-tight">
                        {step.label}
                      </span>
                      <span className="text-[9px] font-mono text-slate-400 mt-0.5">
                        Step 0{idx + 1}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Explanatory callout */}
              <div className="mt-6 p-4 rounded-2xl bg-white/70 border border-purple-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="text-xs text-slate-600 font-medium">
                  <strong className="text-slate-900 font-semibold">Continuous Feedback Loop:</strong> Every post generates data. We study what hooks, what holds attention, and compound learnings directly into the next cycle.
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 font-mono shrink-0 bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-100">
                  <Repeat2 className="w-3.5 h-3.5" />
                  <span>Iterative Cycle</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
              <span>Aligns creative execution with measurable audience retention.</span>
              <span className="text-purple-600 font-bold font-mono">01 → 07 Seamless Flow</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
