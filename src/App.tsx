import React, { useState, useEffect } from 'react';
import { ProjectProvider } from './context/ProjectContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { AboutFramework } from './components/AboutMOU';
import { Preamble } from './components/Preamble';
import { Objectives } from './components/Objectives';
import { Collaboration } from './components/Collaboration';
import { Roles } from './components/Roles';
import { Governance } from './components/Governance';
import { Timeline } from './components/Timeline';
import { Funding } from './components/Funding';
import { Signatories } from './components/Signatories';
import { Partners } from './components/Partners';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { SuperAdminPage } from './components/SuperAdminPage';

function AppContent() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isSuperAdminOpen, setIsSuperAdminOpen] = useState<boolean>(false);

  // Keyboard Shortcuts (Ctrl+K or Cmd+K for search, Esc to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Intersection Observer for active section highlighting
  useEffect(() => {
    const sectionIds = [
      'hero',
      'about',
      'preamble',
      'objectives',
      'collaboration',
      'roles',
      'governance',
      'timeline',
      'funding',
      'signatories',
      'partners',
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigateSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isSuperAdminOpen) {
    return <SuperAdminPage onClose={() => setIsSuperAdminOpen(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#F7F4ED] text-[#13213D] font-sans selection:bg-[#D5A52A] selection:text-[#071A46]">
      {/* Sticky Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigateSection}
        onOpenSuperAdmin={() => setIsSuperAdminOpen(true)}
        onOpenSearchModal={() => setIsSearchOpen(true)}
      />

      {/* Main Page Sections */}
      <main>
        {/* Hero Section */}
        <Hero
          onNavigate={handleNavigateSection}
          onOpenSuperAdmin={() => setIsSuperAdminOpen(true)}
        />

        {/* Animated Statistics Bar */}
        <Stats />

        {/* About Section */}
        <AboutFramework
          onNavigate={handleNavigateSection}
          onOpenSuperAdmin={() => setIsSuperAdminOpen(true)}
        />

        {/* Official Recitals / Preamble Section */}
        <Preamble />

        {/* Strategic Objectives Section */}
        <Objectives />

        {/* Areas of Collaboration Section */}
        <Collaboration />

        {/* Roles & Responsibilities Section */}
        <Roles />

        {/* Governance Structure Section */}
        <Governance />

        {/* Implementation Timeline Section */}
        <Timeline />

        {/* Funding, Disputes & Termination Section */}
        <Funding />

        {/* Members & Official Signatories Section */}
        <Signatories />

        {/* Partner Agencies Section */}
        <Partners />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigateSection}
        onOpenSuperAdmin={() => setIsSuperAdminOpen(true)}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigateSection={handleNavigateSection}
      />
    </div>
  );
}

export default function App() {
  return (
    <ProjectProvider>
      <AppContent />
    </ProjectProvider>
  );
}
