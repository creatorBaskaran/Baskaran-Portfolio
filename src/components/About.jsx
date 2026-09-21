import React from 'react';
import { ArrowUpRight, User, MapPin } from 'lucide-react';

export default function About({ onOpenAboutModal }) {
  return (
    <section id="about" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* About Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Creator Portrait Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-[36px] overflow-hidden bg-gradient-to-tr from-slate-900 via-slate-800 to-indigo-950 p-2 shadow-[0_25px_60px_rgba(0,0,0,0.1)] border border-white/80">
              <div className="relative h-[420px] sm:h-[480px] w-full rounded-[28px] overflow-hidden bg-slate-950">
                <img 
                  src="/baskaran - DP.png" 
                  alt="Baskaran — Video Editor and Content & Growth Partner based in Tamil Nadu, India"
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-all duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

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

          {/* Right Column: About Narrative Copy */}
          <div className="lg:col-span-7 space-y-6 text-left lg:pl-4">
            
            {/* Heading & Subtitle */}
            <div className="space-y-1">
              <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-[-0.03em] leading-tight font-sans">
                The Person Behind the Content
              </h2>
            </div>

            {/* Exact Narrative Paragraphs */}
            <div className="space-y-4 text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
              <p>
                I'm <strong className="text-slate-950 font-semibold">Baskaran</strong>, a video editor and content-focused creative from Tamil Nadu.
              </p>
              <p>
                I started with video editing. Over time, I realized that good editing is only one part of good content.
              </p>
              <p>
                The real work starts before the timeline , understanding the audience, finding the right idea, creating the hook, and building content people actually want to consume.
              </p>
            </div>

            {/* Modal Trigger */}
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

      </div>
    </section>
  );
}
