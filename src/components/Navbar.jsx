import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar({ onOpenProjectModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'System', href: '#system' },
    { name: 'Work', href: '#work' },
    { name: 'About', href: '#about' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const whatsappNavMessage = encodeURIComponent(
    "Hi Baskaran, I came across your website and I'd like to discuss a content project with you."
  );

  return (
    <header className="absolute top-0 left-0 right-0 z-30 w-full flex justify-center px-4 sm:px-6 pt-5 sm:pt-6 pointer-events-none">
      <nav
        className="w-full max-w-5xl rounded-full px-5 sm:px-6 py-3 flex items-center justify-between transition-all duration-300 ease-out backdrop-blur-xl bg-white/85 border border-slate-200/90 shadow-[0_8px_28px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.02)] pointer-events-auto"
      >
        {/* Brand Logo */}
        <a
          href="#"
          className="flex items-center gap-2 group"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <span className="font-bold tracking-tight text-lg text-slate-950 transition-colors font-sans">
            BASKARAN
          </span>
          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-700 border border-slate-200/80 hidden sm:inline-flex shadow-2xs">
            Partner
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-full border border-slate-200/70 shadow-2xs">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="px-4 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-950 hover:bg-white rounded-full transition-all duration-200 hover:shadow-2xs"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right Actions: Let's Talk WhatsApp CTA */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <a
            href={`https://wa.me/916374654886?text=${whatsappNavMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-1.5 bg-slate-950 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold px-4.5 py-2 rounded-full transition-all duration-200 shadow-[0_4px_14px_rgba(0,0,0,0.12)] hover:shadow-[0_6px_18px_rgba(0,0,0,0.18)] active:scale-95 border border-slate-800"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="p-2 rounded-full md:hidden text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer (Natural dropdown) */}
      {mobileMenuOpen && (
        <div className="absolute top-20 left-4 right-4 z-40 bg-white/95 backdrop-blur-2xl rounded-3xl p-6 border border-slate-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.12)] space-y-4 md:hidden animate-fadeIn pointer-events-auto">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-4 py-3 text-base font-semibold text-slate-800 hover:text-black rounded-2xl hover:bg-slate-100 transition-colors flex items-center justify-between"
              >
                <span>{link.name}</span>
                <span className="text-xs text-slate-400 font-mono">0{navLinks.indexOf(link) + 1}</span>
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProjectModal();
              }}
              className="w-full flex items-center justify-center gap-2 bg-slate-950 text-white font-semibold py-3 rounded-2xl shadow-[0_4px_14px_rgba(0,0,0,0.15)] text-xs sm:text-sm"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
