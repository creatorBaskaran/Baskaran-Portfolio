import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { graphicDesignCreatives } from '../data/graphicDesignData';

// ---------------------------------------------------------------------------
// Lightbox Component
// ---------------------------------------------------------------------------
function Lightbox({ creatives, startIndex, onClose }) {
  const [index, setIndex] = useState(startIndex);
  const current = creatives[index];

  const handlePrev = useCallback(() => {
    setIndex((i) => (i - 1 + creatives.length) % creatives.length);
  }, [creatives.length]);

  const handleNext = useCallback(() => {
    setIndex((i) => (i + 1) % creatives.length);
  }, [creatives.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [handlePrev, handleNext, onClose]);

  // Lock body scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Graphic design preview"
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" />

      {/* Panel */}
      <div
        className="relative z-10 flex flex-col items-center max-w-[90vw] max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <img
          key={current.id}
          src={current.src}
          alt={current.alt}
          className="max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-2xl shadow-2xl animate-fadeIn"
          draggable={false}
        />

        {/* Counter */}
        <p className="mt-3 text-xs font-mono text-white/50 select-none">
          {index + 1} / {creatives.length}
        </p>
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        aria-label="Close preview"
        className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-colors"
      >
        <X className="w-5 h-5 text-white" />
      </button>

      {/* Prev / Next — only if more than 1 creative */}
      {creatives.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            aria-label="Previous creative"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            aria-label="Next creative"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Grid Card
// ---------------------------------------------------------------------------
function DesignCard({ creative, index, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={`Open preview: ${creative.alt}`}
      className="group relative w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 text-left"
    >
      <img
        src={creative.src}
        alt={creative.alt}
        loading="lazy"
        className="w-full h-auto block object-contain transition-transform duration-500 group-hover:scale-[1.03]"
      />

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/30 transition-colors duration-300 flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
          <ZoomIn className="w-4 h-4 text-slate-950" />
        </div>
      </div>
    </button>
  );
}

// ---------------------------------------------------------------------------
// Main GraphicDesign Section
// ---------------------------------------------------------------------------
export default function GraphicDesign() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  if (graphicDesignCreatives.length === 0) return null;

  return (
    <>
      <section
        id="graphic-design"
        className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative"
      >
        <div className="max-w-6xl mx-auto">

          {/* Section Header — matches existing section heading pattern */}
          <div className="mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-[-0.03em] leading-tight font-sans max-w-xl">
              Graphic Design
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-500 font-normal leading-relaxed max-w-lg">
              Creative posts designed for brands, campaigns, and social media.
            </p>
          </div>

          {/* Responsive Grid: 3-col desktop / 2-col tablet / 1-col mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {graphicDesignCreatives.map((creative, idx) => (
              <DesignCard
                key={creative.id}
                creative={creative}
                index={idx}
                onClick={() => openLightbox(idx)}
              />
            ))}
          </div>

        </div>
      </section>

      {/* Lightbox — rendered outside section, at root level via portal-like positioning */}
      {lightboxIndex !== null && (
        <Lightbox
          creatives={graphicDesignCreatives}
          startIndex={lightboxIndex}
          onClose={closeLightbox}
        />
      )}
    </>
  );
}
