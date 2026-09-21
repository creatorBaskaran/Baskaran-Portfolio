import React, { useEffect, useRef, useState, useMemo } from 'react';

export default function InteractiveGlassGrid() {
  const containerRef = useRef(null);
  const cursorGlowRef = useRef(null);
  const tilesRef = useRef([]);
  const animFrameId = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false, opacity: 0 });

  // Generate responsive tile distribution
  const tileDefinitions = useMemo(() => {
    const tiles = [];
    const cols = 12;
    const rows = 32;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const hash = (r * 37 + c * 19) % 100;
        // Moderate density for clean organic spacing
        if (hash > 60) continue;

        const sizeClass = hash % 3 === 0 ? 'w-24 h-24 sm:w-28 sm:h-28' : hash % 3 === 1 ? 'w-20 h-20 sm:w-24 sm:h-24' : 'w-16 h-16 sm:w-20 sm:h-20';
        const roundedClass = hash % 2 === 0 ? 'rounded-[24px]' : 'rounded-[26px]';
        
        // Soft lavender & translucent glass styling
        const tint = hash % 3 === 0 
          ? 'bg-purple-300/20 border-purple-200/50 shadow-[0_8px_24px_rgba(168,85,247,0.08)]' 
          : hash % 3 === 1
          ? 'bg-indigo-200/20 border-indigo-200/40 shadow-[0_8px_24px_rgba(99,102,241,0.06)]'
          : 'bg-white/40 border-white/60 shadow-[0_8px_24px_rgba(255,255,255,0.3)]';

        const top = (r / rows) * 100 + (hash % 5 - 2) * 0.3;
        const left = (c / cols) * 100 + (hash % 7 - 3) * 0.4;

        tiles.push({
          id: `tile-${r}-${c}`,
          top: Math.max(0.5, Math.min(99, top)),
          left: Math.max(1, Math.min(95, left)),
          sizeClass,
          roundedClass,
          tint,
        });
      }
    }
    return tiles;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const isInside = (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      );

      if (isInside) {
        mouseRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          active: true,
          opacity: 1
        };
      } else {
        mouseRef.current.active = false;
        mouseRef.current.opacity = 0;
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.opacity = 0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    let currentX = -1000;
    let currentY = -1000;
    let currentGlowOpacity = 0;

    const radius = 240; // Spotlight proximity radius (approx 180-280px)

    const updateSpotlight = () => {
      // Lerp mouse coordinates
      if (mouseRef.current.active) {
        currentX += (mouseRef.current.x - currentX) * 0.15;
        currentY += (mouseRef.current.y - currentY) * 0.15;
        currentGlowOpacity += (1 - currentGlowOpacity) * 0.1;
      } else {
        currentGlowOpacity += (0 - currentGlowOpacity) * 0.1;
      }

      // Update cursor glow element
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.transform = `translate3d(${currentX - 180}px, ${currentY - 180}px, 0)`;
        cursorGlowRef.current.style.opacity = `${currentGlowOpacity}`;
      }

      // Update tile proximity spotlights
      tilesRef.current.forEach((el) => {
        if (!el) return;
        
        if (!containerRef.current || currentGlowOpacity < 0.01) {
          el.style.opacity = '0';
          el.style.transform = 'translate3d(0, 0, 0) scale(1)';
          return;
        }

        const tileRect = el.getBoundingClientRect();
        const contRect = containerRef.current.getBoundingClientRect();

        const tileCenterX = tileRect.left - contRect.left + tileRect.width / 2;
        const tileCenterY = tileRect.top - contRect.top + tileRect.height / 2;

        const dx = currentX - tileCenterX;
        const dy = currentY - tileCenterY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < radius && mouseRef.current.active && currentGlowOpacity > 0.02) {
          const factor = (1 - dist / radius);
          // Soft non-linear ease for smooth spotlight fade
          const intensity = Math.pow(factor, 1.4);
          
          // Subtle lift toward cursor (4-6px)
          const moveX = (dx / dist) * intensity * 5;
          const moveY = (dy / dist) * intensity * 5;
          const scale = 1 + intensity * 0.028;
          const opacity = intensity * 0.85 * currentGlowOpacity;

          el.style.opacity = `${opacity}`;
          el.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) scale(${scale})`;
          el.style.borderColor = `rgba(216, 180, 254, ${0.3 + intensity * 0.5})`;
          el.style.boxShadow = `0 12px 30px -6px rgba(168, 85, 247, ${0.15 + intensity * 0.25}), inset 0 0 12px rgba(255, 255, 255, ${0.5 + intensity * 0.3})`;
        } else {
          el.style.opacity = '0';
          el.style.transform = 'translate3d(0, 0, 0) scale(1)';
          el.style.borderColor = '';
          el.style.boxShadow = '';
        }
      });

      animFrameId.current = requestAnimationFrame(updateSpotlight);
    };

    animFrameId.current = requestAnimationFrame(updateSpotlight);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="interactive-glass-background absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0"
      aria-hidden="true"
    >
      {/* =========================================================================
          1. SUBTLE CURSOR RADIAL GLOW (Active only within proximity)
      ========================================================================= */}
      <div
        ref={cursorGlowRef}
        style={{
          width: '360px',
          height: '360px',
          background: 'radial-gradient(circle, rgba(150, 120, 255, 0.14) 0%, rgba(150, 120, 255, 0.04) 35%, transparent 65%)',
          willChange: 'transform, opacity',
          opacity: 0,
        }}
        className="absolute top-0 left-0 rounded-full pointer-events-none transition-opacity duration-300"
      />

      {/* =========================================================================
          2. PROXIMITY-REVEALED GLASS TILES (Hidden by default, revealed near cursor)
      ========================================================================= */}
      <div className="relative w-full h-full">
        {tileDefinitions.map((tile, i) => (
          <div
            key={tile.id}
            ref={(el) => (tilesRef.current[i] = el)}
            style={{
              top: `${tile.top}%`,
              left: `${tile.left}%`,
              opacity: 0, // Inactive / invisible by default
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              transition: 'opacity 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
            }}
            className={`absolute ${tile.sizeClass} ${tile.roundedClass} ${tile.tint} border backdrop-blur-md will-change-transform`}
          >
            {/* Cushion Bevel Highlight */}
            <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/40 via-white/10 to-transparent pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  );
}
