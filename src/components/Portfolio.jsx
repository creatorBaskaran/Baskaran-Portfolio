import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2,
  Film
} from 'lucide-react';
import { curatedPortfolioVideos } from '../data/portfolioData';

export default function Portfolio() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.85);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // Drag / Swipe State
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartXRef = useRef(0);

  const videoRefs = useRef([]);
  const stageRef = useRef(null);
  const activeVideoRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  const totalVideos = curatedPortfolioVideos.length;
  const currentVideo = curatedPortfolioVideos[currentIndex] || curatedPortfolioVideos[0];

  // Pause previous video and reset state on slide change
  const changeSlide = useCallback((newIndex) => {
    // Pause any playing video
    videoRefs.current.forEach((vid) => {
      if (vid) {
        vid.pause();
        vid.currentTime = 0;
      }
    });
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setDragOffset(0);
    setCurrentIndex(newIndex);
  }, []);

  const handlePrev = useCallback(() => {
    const nextIdx = (currentIndex - 1 + totalVideos) % totalVideos;
    changeSlide(nextIdx);
  }, [currentIndex, totalVideos, changeSlide]);

  const handleNext = useCallback(() => {
    const nextIdx = (currentIndex + 1) % totalVideos;
    changeSlide(nextIdx);
  }, [currentIndex, totalVideos, changeSlide]);

  // Desktop keyboard navigation (Left/Right arrows & Spacebar)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === ' ' && activeVideoRef.current) {
        const rect = stageRef.current?.getBoundingClientRect();
        if (rect && rect.top < window.innerHeight && rect.bottom > 0) {
          e.preventDefault();
          togglePlay();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  // Active video time & duration listeners
  const handleTimeUpdate = () => {
    if (activeVideoRef.current) {
      setCurrentTime(activeVideoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (activeVideoRef.current) {
      setDuration(activeVideoRef.current.duration || 0);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    if (activeVideoRef.current) {
      activeVideoRef.current.currentTime = 0;
    }
  };

  const togglePlay = () => {
    if (!activeVideoRef.current) return;
    if (isPlaying) {
      activeVideoRef.current.pause();
      setIsPlaying(false);
    } else {
      activeVideoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  };

  const toggleMute = () => {
    if (!activeVideoRef.current) return;
    const nextMuted = !isMuted;
    activeVideoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted && activeVideoRef.current.volume === 0) {
      activeVideoRef.current.volume = volume || 0.85;
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (activeVideoRef.current) {
      activeVideoRef.current.volume = val;
      activeVideoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    if (activeVideoRef.current && duration > 0) {
      const newTime = pos * duration;
      activeVideoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // Fullscreen handling on the active card
  const toggleFullscreen = () => {
    const activeEl = document.getElementById(`video-card-${currentIndex}`);
    if (!activeEl) return;

    if (!document.fullscreenElement) {
      activeEl.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Auto-hide controls when video is playing
  const handleMouseMoveControls = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2500);
    }
  };

  // Touch and Mouse Drag / Swipe Handlers
  const handleTouchStart = (e) => {
    setIsDragging(true);
    dragStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    setDragOffset(currentX - dragStartXRef.current);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset > 50) {
      handlePrev();
    } else if (dragOffset < -50) {
      handleNext();
    } else {
      setDragOffset(0);
    }
  };

  const handleMouseDown = (e) => {
    // Avoid dragging when clicking control buttons or sliders
    if (e.target.closest('button') || e.target.closest('input') || e.target.closest('.controls-bar')) return;
    setIsDragging(true);
    dragStartXRef.current = e.clientX;
  };

  const handleMouseMove = (e) => {
    handleMouseMoveControls();
    if (!isDragging) return;
    const currentX = e.clientX;
    setDragOffset(currentX - dragStartXRef.current);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset > 60) {
      handlePrev();
    } else if (dragOffset < -60) {
      handleNext();
    } else {
      setDragOffset(0);
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setDragOffset(0);
    }
    if (isPlaying) setShowControls(false);
  };

  // Format time (mm:ss)
  const formatTime = (secs) => {
    if (isNaN(secs) || secs < 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <section id="work" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-left md:text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            <Film className="w-3.5 h-3.5 text-slate-900" />
            <span>Curated Portfolio</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-[-0.03em] leading-tight font-sans">
            Work That Speaks Before I Do.
          </h2>
          
          <p className="text-slate-600 text-base sm:text-lg font-normal leading-relaxed max-w-2xl mx-auto">
            A selection of videos I've edited across different projects and industries.
          </p>
        </div>

        {/* =========================================================================
            CINEMATIC 3D HORIZONTAL 9:16 COVER-FLOW STAGE
        ========================================================================= */}
        <div 
          ref={stageRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative w-full py-6 sm:py-10 flex items-center justify-center cursor-grab active:cursor-grabbing"
          style={{
            perspective: '1200px',
            transformStyle: 'preserve-3d',
            minHeight: '620px',
          }}
        >
          {/* Flanking Desktop Navigation Arrow: Previous (Left) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Previous video"
            className="hidden lg:flex absolute left-4 xl:left-10 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white text-slate-800 border border-slate-200/80 shadow-[0_8px_25px_rgba(0,0,0,0.08)] hover:shadow-xl items-center justify-center transition-all hover:scale-110 active:scale-95 z-40"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Flanking Desktop Navigation Arrow: Next (Right) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next video"
            className="hidden lg:flex absolute right-4 xl:right-10 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-950 hover:bg-slate-800 text-white shadow-[0_8px_25px_rgba(0,0,0,0.15)] hover:shadow-xl items-center justify-center transition-all hover:scale-110 active:scale-95 z-40"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* 3D Arc Video Cards Container */}
          <div 
            className="relative w-full max-w-[320px] sm:max-w-[350px] md:max-w-[370px] aspect-[9/16] flex items-center justify-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {curatedPortfolioVideos.map((item, index) => {
              // Calculate shortest circular offset from active slide
              let offset = index - currentIndex;
              if (offset > totalVideos / 2) offset -= totalVideos;
              if (offset < -totalVideos / 2) offset += totalVideos;

              // Apply drag distance interpolator
              const effectiveOffset = offset - (isDragging ? dragOffset / 300 : 0);
              const absOffset = Math.abs(effectiveOffset);

              // Don't render cards that are too far in the arc
              if (absOffset > 3.5) return null;

              const isCenter = index === currentIndex;

              // 3D Spatial Transforms: curve away towards edges, center faces forward
              let translateX = 0;
              let translateZ = 0;
              let rotateY = 0;
              let scale = 1;
              let opacity = 1;
              let blur = 0;
              let zIndex = 30;

              if (effectiveOffset === 0) {
                translateX = 0;
                translateZ = 0;
                rotateY = 0;
                scale = 1;
                opacity = 1;
                blur = 0;
                zIndex = 30;
              } else {
                // Directional sign
                const sign = effectiveOffset > 0 ? 1 : -1;
                
                // Realistic progressive 3D spacing
                translateX = sign * (Math.pow(absOffset, 0.85) * 230);
                translateZ = -(absOffset * 95);
                rotateY = sign * -(Math.min(32, absOffset * 15));
                scale = Math.max(0.65, 1 - absOffset * 0.13);
                opacity = Math.max(0.1, 1 - absOffset * 0.28);
                blur = absOffset * 0.8;
                zIndex = Math.round(30 - absOffset * 5);
              }

              return (
                <div
                  key={item.id}
                  id={`video-card-${index}`}
                  onClick={() => {
                    if (!isCenter) {
                      changeSlide(index);
                    }
                  }}
                  style={{
                    transform: `translate3d(${translateX}px, 0, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                    opacity: opacity,
                    filter: blur > 0.2 ? `blur(${blur}px)` : 'none',
                    zIndex: zIndex,
                    aspectRatio: '9 / 16',
                    transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.5s ease, filter 0.5s ease',
                    willChange: 'transform, opacity, filter',
                  }}
                  className={`absolute inset-0 w-full h-full rounded-[28px] sm:rounded-[36px] overflow-hidden bg-slate-950 border border-white/90 ${
                    isCenter
                      ? 'shadow-[0_30px_90px_-15px_rgba(0,0,0,0.35),0_0_1px_1px_rgba(255,255,255,0.95)_inset] cursor-pointer'
                      : 'shadow-[0_15px_40px_rgba(0,0,0,0.2)] cursor-pointer hover:opacity-90'
                  }`}
                >
                  {/* Poster Image */}
                  <img
                    src={item.poster}
                    alt={`Baskaran Portfolio 9:16 Video Reel ${index + 1}`}
                    loading="lazy"
                    className={`w-full h-full object-cover pointer-events-none transition-opacity duration-500 ${
                      isCenter && isPlaying ? 'opacity-0' : 'opacity-95'
                    }`}
                  />

                  {/* Video Element */}
                  <video
                    ref={(el) => {
                      videoRefs.current[index] = el;
                      if (isCenter) activeVideoRef.current = el;
                    }}
                    src={item.video}
                    poster={item.poster}
                    muted={isMuted}
                    playsInline
                    preload={isCenter ? "metadata" : "none"}
                    onTimeUpdate={isCenter ? handleTimeUpdate : undefined}
                    onLoadedMetadata={isCenter ? handleLoadedMetadata : undefined}
                    onEnded={isCenter ? handleVideoEnded : undefined}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    className={`absolute inset-0 w-full h-full object-cover ${
                      isCenter ? 'pointer-events-auto' : 'pointer-events-none'
                    }`}
                    onClick={isCenter ? togglePlay : undefined}
                  />

                  {/* Subtle Cinematic Vignette */}
                  <div 
                    onClick={isCenter ? togglePlay : undefined}
                    className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" 
                  />

                  {/* =========================================================================
                      ACTIVE CENTER VIDEO CONTROLS ONLY
                  ========================================================================= */}
                  {isCenter && (
                    <>
                      {/* Central Play/Pause Overlay Button */}
                      {(!isPlaying || showControls) && (
                        <div 
                          onClick={togglePlay}
                          className="absolute inset-0 flex items-center justify-center pointer-events-auto cursor-pointer z-20"
                        >
                          {!isPlaying && (
                            <button
                              aria-label="Play video"
                              onClick={(e) => {
                                e.stopPropagation();
                                togglePlay();
                              }}
                              className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-slate-950 shadow-[0_15px_40px_rgba(0,0,0,0.5)] transition-all hover:scale-110 active:scale-95 group-hover:bg-white"
                            >
                              <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-slate-950 ml-1 text-slate-950" />
                            </button>
                          )}
                        </div>
                      )}

                      {/* Top Header Floating Pill: Reel indicator */}
                      <div className="absolute top-4 inset-x-4 flex items-center justify-between z-20 pointer-events-none">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono font-medium shadow-md">
                          <span>Reels 9:16</span>
                        </div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-mono font-bold tracking-wider shadow-md">
                          <span>{String(currentIndex + 1).padStart(2, '0')}</span>
                          <span className="text-white/40">/</span>
                          <span className="text-white/60">{String(totalVideos).padStart(2, '0')}</span>
                        </div>
                      </div>

                      {/* Bottom Glass Video Control Bar */}
                      <div
                        className={`controls-bar absolute bottom-0 inset-x-0 p-4 space-y-2 z-20 transition-opacity duration-300 ${
                          showControls || !isPlaying ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                        }`}
                      >
                        {/* Progress Bar with Seek */}
                        <div
                          onClick={handleSeek}
                          className="group/track relative w-full h-1.5 hover:h-2.5 bg-white/25 rounded-full cursor-pointer transition-all overflow-hidden flex items-center"
                        >
                          <div
                            className="h-full bg-gradient-to-r from-purple-400 via-indigo-400 to-pink-400 rounded-full transition-all duration-75 relative"
                            style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                          />
                        </div>

                        {/* Button controls row */}
                        <div className="flex items-center justify-between text-white text-xs font-mono pt-0.5">
                          {/* Left: Play/Pause, Time */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={togglePlay}
                              aria-label={isPlaying ? "Pause" : "Play"}
                              className="hover:text-purple-300 transition-colors p-1"
                            >
                              {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
                            </button>

                            <div className="flex items-center gap-1 text-white/90 text-[11px]">
                              <span>{formatTime(currentTime)}</span>
                              <span className="text-white/40">/</span>
                              <span className="text-white/60">{formatTime(duration)}</span>
                            </div>
                          </div>

                          {/* Right: Volume / Mute, Fullscreen */}
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5 group/volume">
                              <button
                                onClick={toggleMute}
                                aria-label={isMuted ? "Unmute" : "Mute"}
                                className="hover:text-purple-300 transition-colors p-1"
                              >
                                {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                              </button>

                              <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.05"
                                value={isMuted ? 0 : volume}
                                onChange={handleVolumeChange}
                                className="w-12 h-1 bg-white/30 accent-purple-400 rounded-full cursor-pointer hidden sm:block opacity-70 group-hover/volume:opacity-100 transition-opacity"
                              />
                            </div>

                            <button
                              onClick={toggleFullscreen}
                              aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                              className="hover:text-purple-300 transition-colors p-1"
                            >
                              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            CAROUSEL BOTTOM NAVIGATION & SLIDE DOTS
        ========================================================================= */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-lg mx-auto px-4">
          
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            aria-label="Previous video"
            className="px-4 py-2 rounded-full bg-white hover:bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200/90 shadow-xs flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {/* Slide Dots Indicator */}
          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            {curatedPortfolioVideos.map((video, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={video.id}
                  onClick={() => changeSlide(idx)}
                  aria-label={`Go to video ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isActive 
                      ? 'w-7 bg-slate-950' 
                      : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              );
            })}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            aria-label="Next video"
            className="px-4 py-2 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>

        </div>

      </div>
    </section>
  );
}
