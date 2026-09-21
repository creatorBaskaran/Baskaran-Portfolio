import React from 'react';
import { ArrowUpRight, Compass, Target, Sparkles, TrendingUp, User, MapPin } from 'lucide-react';

export default function AboutAndProcess({ onOpenAboutModal, onOpenProjectModal }) {
  const processSteps = [
    {
      id: "01",
      title: "DISCOVER",
      desc: "We understand your brand, audience and goals.",
      icon: Compass,
      color: "text-purple-600",
      bg: "bg-purple-100/60"
    },
    {
      id: "02",
      title: "STRATEGY",
      desc: "We decide what content deserves to exist.",
      icon: Target,
      color: "text-blue-600",
      bg: "bg-blue-100/60"
    },
    {
      id: "03",
      title: "CREATE",
      desc: "I turn the strategy into videos and creatives.",
      icon: Sparkles,
      color: "text-pink-600",
      bg: "bg-pink-100/60"
    },
    {
      id: "04",
      title: "OPTIMIZE",
      desc: "We learn from the content and improve the system.",
      icon: TrendingUp,
      color: "text-emerald-600",
      bg: "bg-emerald-100/60"
    }
  ];

  return (
    <section id="about" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-24">
        
        {/* =========================================================================
            ABOUT SECTION
        ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Creator Portrait Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-[36px] overflow-hidden bg-gradient-to-tr from-slate-900 via-slate-800 to-indigo-950 p-2 shadow-[0_25px_60px_rgba(0,0,0,0.1)] border border-white/80">
              <div className="relative h-[420px] sm:h-[480px] w-full rounded-[28px] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80" 
                  alt="Baskaran — Content & Growth Partner"
                  className="w-full h-full object-cover object-center grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                {/* Floating Badge on Portrait */}
                <div className="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur-xl rounded-2xl p-4 border border-white/80 shadow-lg text-left">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-slate-950">Baskaran</div>
                      <div className="text-xs text-slate-500 font-medium">Content & Growth Partner</div>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                      <MapPin className="w-3 h-3 text-rose-500" />
                      <span>Tamil Nadu, India</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: About Copy */}
          <div className="lg:col-span-7 space-y-6 text-left lg:pl-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
              <User className="w-3.5 h-3.5 text-slate-900" />
              <span>About Baskaran</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-[-0.03em] leading-tight">
              The Person Behind the Content.
            </h2>

            <div className="space-y-4 text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
              <p>
                I'm <strong className="text-slate-950 font-semibold">Baskaran</strong> — a video editor and content-focused creative from Tamil Nadu.
              </p>
              <p>
                I started with video editing. Over time, I realized that good editing is only one part of good content.
              </p>
              <p>
                The real work starts before the timeline — understanding the audience, finding the right idea, creating the hook, and building content people actually want to consume.
              </p>
              <p className="font-medium text-slate-900 bg-white/60 p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                "That's why I'm building my work around one goal: Helping brands and creators turn their ideas into content that compounds."
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenAboutModal}
                className="group inline-flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-purple-600 transition-colors"
              >
                <span>More About Me</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>

        </div>

        {/* =========================================================================
            PROCESS SECTION ("How We Work")
        ========================================================================= */}
        <div id="process" className="pt-8">
          <div className="text-left md:text-center max-w-2xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
              <span>Workflow</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              How We Work
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              A transparent, high-execution four-phase framework.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {processSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.id}
                  className="group bg-white/70 backdrop-blur-xl border border-white/90 rounded-[28px] p-6 sm:p-7 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.07)] transition-all duration-300 hover:-translate-y-1 text-left"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-slate-400">
                        {step.id}
                      </span>
                      <div className={`w-8 h-8 rounded-xl ${step.bg} flex items-center justify-center`}>
                        <Icon className={`w-4 h-4 ${step.color}`} />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-slate-950 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
