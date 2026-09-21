import React, { useState, useEffect } from 'react';
import { 
  Target, 
  Compass, 
  Sparkles, 
  Send, 
  Sliders, 
  TrendingUp, 
  Repeat2,
  CheckCircle2
} from 'lucide-react';

export default function ContentSystem() {
  const [activeStage, setActiveStage] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const stages = [
    {
      id: "01",
      name: "GOAL",
      tagline: "Define Clear Objective",
      icon: Target,
      color: "text-amber-500",
      border: "border-amber-200",
      bg: "bg-amber-50",
      summary: "Define what the content needs to achieve.",
      details: "We align on clear business outcomes, target audience psychology, and what belief we need to shift before touching the timeline.",
      outcome: "Objective & Audience Target"
    },
    {
      id: "02",
      name: "STRATEGY",
      tagline: "Positioning & Framework",
      icon: Compass,
      color: "text-purple-500",
      border: "border-purple-200",
      bg: "bg-purple-50",
      summary: "Decide what to say, who to reach, and how.",
      details: "We build high-converting content angles, messaging pillars, and hook frameworks tailored to your positioning.",
      outcome: "Content Architecture & Hook Playbook"
    },
    {
      id: "03",
      name: "CREATE",
      tagline: "Precision Production",
      icon: Sparkles,
      color: "text-pink-500",
      border: "border-pink-200",
      bg: "bg-pink-50",
      summary: "Turn the strategy into high-quality content.",
      details: "Transforming raw footage with precision pacing, custom sound design, motion graphics, and frame-accurate attention anchors.",
      outcome: "Master 4K Video Assets"
    },
    {
      id: "04",
      name: "PUBLISH",
      tagline: "Strategic Distribution",
      icon: Send,
      color: "text-blue-500",
      border: "border-blue-200",
      bg: "bg-blue-50",
      summary: "Put the content in front of the right audience.",
      details: "Systematic multi-platform rollout, optimal release cadence, and platform-specific metadata to maximize early retention.",
      outcome: "Distribution & Cadence Engine"
    },
    {
      id: "05",
      name: "OPTIMIZE",
      tagline: "Performance Refinement",
      icon: Sliders,
      color: "text-cyan-500",
      border: "border-cyan-200",
      bg: "bg-cyan-50",
      summary: "Refine the content based on performance.",
      details: "Dissecting retention curves, hook drop-off rates, and audience interactions to identify exact improvement levers.",
      outcome: "Retention Diagnostics & Tuning"
    },
    {
      id: "06",
      name: "SCALE",
      tagline: "Compounding Growth",
      icon: TrendingUp,
      color: "text-emerald-500",
      border: "border-emerald-200",
      bg: "bg-emerald-50",
      summary: "Double down on what works.",
      details: "Multiplying top-performing formats, expanding content volume, and compounding audience growth across channels.",
      outcome: "Compounding Growth Velocity"
    }
  ];

  // Auto flywheel loop
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % stages.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [isAutoPlaying, stages.length]);

  return (
    <section id="system" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-left md:text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white text-slate-700 border border-slate-200 shadow-xs">
            <Repeat2 className="w-3.5 h-3.5 text-purple-600" />
            <span>Compounding Flywheel</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-[-0.03em] leading-tight">
            Don't Just Post.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-950 via-purple-900 to-slate-800">
              Build a System.
            </span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-normal leading-relaxed max-w-2xl mx-auto">
            Every piece of content gives you something to learn from. Use it to make the next one better.
          </p>
        </div>

        {/* Circular Flywheel Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Flywheel Interactive Ring (Desktop / Tablet) */}
          <div className="lg:col-span-7 relative flex items-center justify-center min-h-[460px] sm:min-h-[520px]">
            
            {/* SVG Orbit Path */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg className="w-[320px] h-[320px] sm:w-[440px] sm:h-[440px]" viewBox="0 0 440 440">
                <circle
                  cx="220"
                  cy="220"
                  r="170"
                  fill="none"
                  stroke="rgba(203, 213, 225, 0.45)"
                  strokeWidth="1.5"
                  strokeDasharray="6 6"
                />
                <circle
                  cx="220"
                  cy="220"
                  r="170"
                  fill="none"
                  stroke="url(#flywheelGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="200 850"
                  className="animate-spin"
                  style={{ transformOrigin: '220px 220px', animationDuration: '14s' }}
                />
                <defs>
                  <linearGradient id="flywheelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="50%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Center Core Glass Hub */}
            <div className="relative z-10 w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-white/90 backdrop-blur-2xl border border-slate-200/90 shadow-[0_12px_36px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center text-center p-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold">
                SYSTEM CORE
              </span>
              <span className="text-base sm:text-lg font-extrabold text-slate-950 tracking-tight mt-0.5 leading-tight">
                CONTENT<br />SYSTEM
              </span>
              <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-100">
                <Repeat2 className="w-3 h-3 animate-spin" style={{ animationDuration: '6s' }} />
                <span>Compounding</span>
              </div>
            </div>

            {/* 6 Orbiting Stage Nodes placed circularly */}
            {stages.map((stage, idx) => {
              const Icon = stage.icon;
              const isCurrent = activeStage === idx;
              
              const angle = (idx / stages.length) * 2 * Math.PI - Math.PI / 2;
              const radius = typeof window !== 'undefined' && window.innerWidth < 640 ? 135 : 170;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <div
                  key={stage.id}
                  style={{
                    transform: `translate(${x}px, ${y}px)`
                  }}
                  className="absolute z-20"
                >
                  <button
                    onClick={() => {
                      setActiveStage(idx);
                      setIsAutoPlaying(false);
                    }}
                    onMouseEnter={() => {
                      setActiveStage(idx);
                      setIsAutoPlaying(false);
                    }}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                    className={`group relative flex items-center gap-2 px-3 py-2 rounded-2xl transition-all duration-300 ${
                      isCurrent
                        ? 'bg-slate-950 text-white shadow-[0_12px_28px_rgba(0,0,0,0.18)] scale-110 ring-2 ring-purple-400/40'
                        : 'bg-white/90 hover:bg-white backdrop-blur-xl text-slate-800 border border-slate-200/90 shadow-[0_6px_20px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.02)] hover:scale-105'
                    }`}
                  >
                    <div className={`p-1.5 rounded-xl ${isCurrent ? 'bg-white/20' : stage.bg}`}>
                      <Icon className={`w-3.5 h-3.5 ${isCurrent ? 'text-white' : stage.color}`} />
                    </div>
                    <div className="text-left pr-1 hidden sm:block">
                      <div className="text-[9px] font-mono font-bold opacity-60">0{idx + 1}</div>
                      <div className="text-xs font-bold tracking-tight">{stage.name}</div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Right Column: Stage Details Display */}
          <div className="lg:col-span-5 text-left">
            <div className="bg-white/85 backdrop-blur-2xl border border-slate-200/90 rounded-[32px] p-6 sm:p-8 shadow-[0_16px_40px_rgba(0,0,0,0.05),0_1px_3px_rgba(0,0,0,0.02)] space-y-5">
              
              {/* Stage Badge & Step Indicator */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-mono font-medium">
                  <span>STAGE 0{activeStage + 1} / 06</span>
                  <span>•</span>
                  <span className="font-bold text-purple-700">{stages[activeStage].name}</span>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  {stages[activeStage].tagline}
                </span>
              </div>

              {/* Title & Summary */}
              <div className="space-y-2">
                <h3 className="text-2xl font-extrabold text-slate-950 tracking-tight">
                  {stages[activeStage].summary}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {stages[activeStage].details}
                </p>
              </div>

              {/* Tangible Outcome Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                    System Outcome
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">
                    {stages[activeStage].outcome}
                  </div>
                </div>
              </div>

              {/* Bottom Quick Flow Pills */}
              <div className="pt-2 flex items-center justify-between text-xs font-medium text-slate-500">
                <span>Goal → Strategy → Create → Publish → Optimize → Scale ↻</span>
                <span className="font-mono text-purple-600 font-bold">Iterative Engine</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
