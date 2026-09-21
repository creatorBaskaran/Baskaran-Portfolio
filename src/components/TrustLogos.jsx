import React from 'react';
import { clientLogos } from '../data/portfolioData';

export default function TrustLogos() {
  return (
    <section className="py-12 border-y border-slate-200/60 bg-white/40 backdrop-blur-sm overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Trusted by teams, creators & brands
          </p>
        </div>

        {/* Client Logos Strip */}
        <div className="flex flex-wrap items-center justify-center gap-x-10 sm:gap-x-14 gap-y-6">
          {clientLogos.map((client) => (
            <div
              key={client.name}
              className="group flex flex-col items-center justify-center cursor-default transition-all duration-300 opacity-70 hover:opacity-100 hover:scale-105"
            >
              <span className="text-base sm:text-lg font-bold tracking-tight text-slate-800 group-hover:text-slate-950 transition-colors font-sans">
                {client.name}
              </span>
              <span className="text-[10px] text-slate-400 font-mono tracking-tight mt-0.5 group-hover:text-slate-600 transition-colors">
                {client.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
