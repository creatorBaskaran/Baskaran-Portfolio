import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappMessage = encodeURIComponent(
    "Hi Baskaran, I came across your portfolio and I'm interested in working with you. I'd like to discuss a project with you."
  );

  const emailSubject = encodeURIComponent(
    "Project Inquiry — Video Editing & Content"
  );

  const emailBody = encodeURIComponent(
    "Hi Baskaran,\n\nI came across your portfolio and I'm interested in working with you.\n\nI'd like to discuss a project with you. Please let me know when you're available to connect.\n\nThanks!"
  );

  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/baskaran.ig/',
      isExternal: true,
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/baskaran-in/',
      isExternal: true,
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      )
    },
    {
      name: 'WhatsApp',
      href: `https://wa.me/916374654886?text=${whatsappMessage}`,
      isExternal: true,
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
          <path d="M9 10a2.4 2.4 0 0 0 1.5 1.5l1.2-.6a1 1 0 0 1 1 0l1.8 1.1a1 1 0 0 1 .4 1.1l-.5 1.4A2.4 2.4 0 0 1 12 16a6.9 6.9 0 0 1-6.9-6.9 2.4 2.4 0 0 1 1.5-2.4l1.4-.5a1 1 0 0 1 1.1.4l1.1 1.8a1 1 0 0 1 0 1l-.6 1.2z" />
        </svg>
      )
    },
    {
      name: 'Gmail',
      href: `mailto:thamizh2212@gmail.com?subject=${emailSubject}&body=${emailBody}`,
      isExternal: false,
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      )
    }
  ];

  return (
    <footer className="border-t border-slate-200/80 bg-white/40 backdrop-blur-md pt-12 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-slate-200/50">
          
          {/* Brand Info */}
          <div className="space-y-1 text-left">
            <span className="font-bold text-xl tracking-tight text-slate-950 font-sans">
              BASKARAN
            </span>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Social Media Content & Growth Partner
            </p>
          </div>

          {/* Social / Contact Icon Links & Scroll to Top */}
          <div className="flex items-center gap-4 sm:gap-5 self-start sm:self-auto">
            <div className="flex items-center gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  {...(social.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="w-9 h-9 rounded-full bg-white/90 hover:bg-white border border-slate-200/90 hover:border-slate-300 flex items-center justify-center text-slate-600 hover:text-slate-950 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_14px_rgba(0,0,0,0.08)] hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-hidden focus:ring-2 focus:ring-purple-500/40 focus:ring-offset-2"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <div className="h-4 w-px bg-slate-200" />

            {/* Scroll to Top */}
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="w-9 h-9 rounded-full bg-white/90 hover:bg-white border border-slate-200/90 hover:border-slate-300 flex items-center justify-center text-slate-600 hover:text-slate-950 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_14px_rgba(0,0,0,0.08)] hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-hidden focus:ring-2 focus:ring-purple-500/40 focus:ring-offset-2"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 text-xs text-slate-400 font-medium">
          <p>© 2026 Baskaran. All rights reserved.</p>
          <p className="font-mono text-[11px]">Let's create something!</p>
        </div>
      </div>
    </footer>
  );
}
