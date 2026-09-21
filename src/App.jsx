import React, { useState } from 'react';
import Hero from './components/Hero';
import InteractiveGlassGrid from './components/InteractiveGlassGrid';
import BrandsCreatedFor from './components/BrandsCreatedFor';
import Services from './components/Services';
import ContentSystem from './components/ContentSystem';
import Portfolio from './components/Portfolio';
import About from './components/About';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import AboutModal from './components/AboutModal';

export default function App() {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  const handleOpenProjectModal = () => {
    setIsProjectModalOpen(true);
  };

  const handleOpenHeroVideo = () => {
    const workSection = document.querySelector('#work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenAboutModal = () => {
    setIsAboutModalOpen(true);
  };

  return (
    <div className="relative bg-[#f8f8fb] text-[#121214] min-h-screen selection:bg-purple-100 selection:text-purple-900 font-sans">
      
      {/* Main Content Sections */}
      <main>
        {/* 1. HERO SECTION (Encapsulates Navbar + Hero Content) */}
        <Hero 
          onOpenProjectModal={handleOpenProjectModal} 
          onOpenVideoModal={handleOpenHeroVideo}
        />

        {/* =========================================================================
            POST-HERO CONTINUOUS CONTAINER WITH INTERACTIVE GLASS TILE BACKGROUND
            Contains: Brands, Services, Content System, Portfolio, About, Final CTA
        ========================================================================= */}
        <div className="relative overflow-hidden">
          
          {/* Interactive Glass Tile Background Layer (z-0, proximity spotlight only) */}
          <InteractiveGlassGrid />

          {/* Foreground Sections (z-10) */}
          <div className="relative z-10">
            {/* 3. BRANDS ("Brands I've Created For") */}
            <BrandsCreatedFor />

            {/* 4. SERVICES ("Everything Your Content Needs.") */}
            <Services onOpenProjectModal={handleOpenProjectModal} />

            {/* 5. CONTENT SYSTEM ("Don't Just Post. Build a System." - Compounding Flywheel) */}
            <ContentSystem />

            {/* 6. PORTFOLIO ("Work That Speaks Before I Do." - Curated Video Carousel) */}
            <Portfolio />

            {/* 7. ABOUT ("The Person Behind the Content.") */}
            <About 
              onOpenAboutModal={handleOpenAboutModal}
            />

            {/* 8. FINAL CTA ("Got ideas worth sharing?") */}
            <FinalCTA onOpenProjectModal={handleOpenProjectModal} />
          </div>

        </div>
      </main>

      {/* 9. FOOTER */}
      <Footer />

      {/* Modals & Overlays */}
      <ProjectModal 
        isOpen={isProjectModalOpen} 
        onClose={() => setIsProjectModalOpen(false)} 
      />

      <AboutModal 
        isOpen={isAboutModalOpen} 
        onClose={() => setIsAboutModalOpen(false)}
        onOpenProjectModal={handleOpenProjectModal}
      />

    </div>
  );
}
