import React from 'react';
import { brandsCreatedFor } from '../data/portfolioData';

export default function BrandsCreatedFor() {
  // Seamless duplicated track to ensure an infinite loop with no gaps
  const marqueeBrands = [...brandsCreatedFor, ...brandsCreatedFor];

  return (
    <section className="py-14 sm:py-18 border-y border-slate-200/80 bg-white/60 backdrop-blur-md overflow-hidden relative shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-8 text-center space-y-1.5">
        {/* Section Heading & Subtitle */}
        <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-slate-500 font-mono">
          Brands I've Created For
        </h2>
      </div>

      {/* Marquee Track Container with Gradient Edge Fades */}
      <div className="relative w-full overflow-hidden flex items-center">
        
        {/* Left Edge Gradient Fade */}
        <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#f8f8fb] via-[#f8f8fb]/80 to-transparent z-10 pointer-events-none" />

        {/* Right Edge Gradient Fade */}
        <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#f8f8fb] via-[#f8f8fb]/80 to-transparent z-10 pointer-events-none" />

        {/* Continuous Scrolling Track */}
        <div className="animate-marquee flex items-center gap-10 sm:gap-14 md:gap-16 lg:gap-20 whitespace-nowrap py-2 select-none">
          {marqueeBrands.map((brand, index) => (
            <div 
              key={`${brand.name}-${index}`} 
              className="flex items-center gap-10 sm:gap-14 md:gap-16 lg:gap-20"
            >
              <span className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-slate-800 hover:text-slate-950 transition-colors font-sans uppercase opacity-90 hover:opacity-100">
                {brand.name}
              </span>
              
              {/* Subtle Elegant Separator Dot */}
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 pointer-events-none" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
