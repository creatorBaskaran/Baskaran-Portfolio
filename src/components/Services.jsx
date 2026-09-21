import React from 'react';
import { ArrowUpRight, Compass, Sparkles, SlidersHorizontal, Check } from 'lucide-react';

export default function Services({ onOpenProjectModal }) {
  const serviceList = [
    {
      id: "01",
      title: "Content Strategy",
      subtitle: "Find what to say, who to say it to, and how to turn ideas into repeatable content.",
      icon: Compass,
      color: "text-purple-600",
      badgeBg: "bg-purple-100/90 text-purple-700 border border-purple-200/80",
      accentGlow: "from-purple-500/10 to-transparent",
      items: [
        "Content pillars",
        "Content planning",
        "Ideas & hooks",
        "Social positioning"
      ]
    },
    {
      id: "02",
      title: "Content Production",
      subtitle: "Turn raw ideas and footage into content designed for attention.",
      icon: Sparkles,
      color: "text-blue-600",
      badgeBg: "bg-blue-100/90 text-blue-700 border border-blue-200/80",
      accentGlow: "from-blue-500/10 to-transparent",
      items: [
        "Talking-head editing",
        "Reels & Shorts",
        "Long-form videos",
        "Motion design",
        "Social creatives"
      ]
    },
    {
      id: "03",
      title: "Growth System",
      subtitle: "Build a consistent content system instead of randomly posting and hoping.",
      icon: SlidersHorizontal,
      color: "text-emerald-600",
      badgeBg: "bg-emerald-100/90 text-emerald-700 border border-emerald-200/80",
      accentGlow: "from-emerald-500/10 to-transparent",
      items: [
        "Content calendars",
        "Platform strategy",
        "Performance review",
        "Content optimization",
        "Iteration"
      ]
    }
  ];

  return (
    <section id="services" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-left md:text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white border border-slate-200/90 shadow-2xs text-slate-700">
            <span>Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-[-0.03em] leading-tight">
            Everything Your Content Needs.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-normal leading-relaxed">
            From the first idea to the final post, I help turn content into something people actually want to watch.
          </p>
        </div>

        {/* 3 Glass Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {serviceList.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group relative bg-white/85 backdrop-blur-xl border border-slate-200/90 hover:border-slate-300 rounded-[28px] p-7 sm:p-8 flex flex-col justify-between shadow-[0_14px_38px_rgba(0,0,0,0.05),0_2px_6px_rgba(0,0,0,0.02)] hover:shadow-[0_22px_50px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1.5"
              >
                {/* Subtle Inner Glow */}
                <div className={`absolute inset-0 rounded-[28px] bg-gradient-to-b ${service.accentGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                <div className="space-y-6 relative z-10">
                  {/* Top Bar with Number & Icon */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold ${service.badgeBg}`}>
                        {service.id}
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-2xl bg-white shadow-2xs border border-slate-200/80 flex items-center justify-center text-slate-700 group-hover:scale-110 transition-transform duration-300">
                      <Icon className={`w-5 h-5 ${service.color}`} />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed font-normal">
                      {service.subtitle}
                    </p>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-2.5 pt-4 border-t border-slate-200/70">
                    {service.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                        <div className="w-4 h-4 rounded-full bg-slate-100 border border-slate-200/80 flex items-center justify-center text-slate-900 shrink-0">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="pt-8 relative z-10">
                  <button
                    onClick={onOpenProjectModal}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-slate-50 group-hover:bg-slate-950 text-slate-800 group-hover:text-white border border-slate-200/80 text-xs sm:text-sm font-semibold transition-all duration-300 shadow-2xs"
                  >
                    <span>Inquire About {service.title}</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
