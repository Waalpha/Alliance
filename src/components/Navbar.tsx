import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  ShieldCheck,
  Search,
  ChevronRight,
  BookOpen,
  Shield,
  Settings,
  Sun,
  Moon,
} from 'lucide-react';
import { NAVIGATION_ITEMS } from '../data/mouData';
import { useProject } from '../context/ProjectContext';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenSuperAdmin: () => void;
  onOpenSearchModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenSuperAdmin,
  onOpenSearchModal,
}) => {
  const { config, darkMode, toggleDarkMode, cloudSyncStatus } = useProject();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 no-print">
      {/* Official Top Bar */}
      <div className="bg-[#F0F4F8] text-[#0A4D8C] dark:bg-[#031021] dark:text-[#F5F7FA] text-xs py-1.5 px-4 border-b border-slate-200 dark:border-[#D4AF37]/30 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center font-bold text-white bg-[#0A4D8C] px-2.5 py-0.5 rounded border border-[#0A4D8C] shadow-sm uppercase text-[10px] tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-[#D4AF37]" />
              Official Portal
            </span>
            <span className="hidden sm:inline text-[#0A4D8C] dark:text-gray-300 font-semibold text-[11px]">
              Government of Kenya & Alliance of Theological Schools ({config.name}) Partnership
            </span>
          </div>

          <div className="flex items-center space-x-4 text-[11px] text-[#0A4D8C] dark:text-gray-300">
            <span className="hidden md:inline font-mono font-bold text-[#0A4D8C] dark:text-gray-300">Ref: {config.refNumber}</span>
            <span
              className={`hidden lg:inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-mono border ${
                cloudSyncStatus === 'synced'
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-500/40'
                  : cloudSyncStatus === 'syncing'
                  ? 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/80 dark:text-amber-300 dark:border-amber-500/40 animate-pulse'
                  : 'bg-red-100 text-red-800 border-red-300 dark:bg-red-950/80 dark:text-red-300 dark:border-red-500/40'
              }`}
              title="Firestore Database ID: alliance"
            >
              <span className={`w-1.5 h-1.5 rounded-full ${cloudSyncStatus === 'synced' ? 'bg-emerald-600 dark:bg-emerald-400' : 'bg-amber-600 dark:bg-amber-400'}`}></span>
              <span>Firestore: alliance</span>
            </span>
            
            {/* Theme Switcher Button */}
            <button
              onClick={toggleDarkMode}
              className="flex items-center space-x-1.5 text-[#0A4D8C] dark:text-[#D4AF37] hover:bg-slate-200/80 dark:hover:bg-[#0A4D8C] bg-white dark:bg-[#0A4D8C]/50 px-2 py-0.5 rounded border border-slate-300 dark:border-[#D4AF37]/30 transition-all cursor-pointer font-bold shadow-sm"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun className="w-3 h-3 text-amber-300" /> : <Moon className="w-3 h-3 text-[#0A4D8C]" />}
              <span className="text-[10px] uppercase font-extrabold">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>

            <button
              onClick={onOpenSearchModal}
              className="flex items-center space-x-1 text-[#0A4D8C] dark:text-[#D4AF37] hover:text-[#051A33] dark:hover:text-white transition-colors cursor-pointer font-bold"
              title="Search portal records"
            >
              <Search className="w-3.5 h-3.5 text-[#0A4D8C] dark:text-[#D4AF37]" />
              <span>Search Records</span>
            </button>
            <button
              onClick={onOpenSuperAdmin}
              className="inline-flex items-center space-x-1 bg-[#B51D28] hover:bg-red-700 text-white px-2.5 py-0.5 rounded font-extrabold text-[10px] tracking-wide cursor-pointer transition-colors shadow"
            >
              <Settings className="w-3 h-3" />
              <span>SUPER ADMIN</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar Taskbar - Clean White with Dark Blue Text */}
      <nav
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 dark:bg-[#0A2B4C]/95 backdrop-blur-md shadow-lg py-3 border-b-2 border-[#0A4D8C]/20 dark:border-[#D4AF37]/40'
            : 'bg-white dark:bg-[#0A2B4C] py-3.5 border-b-2 border-slate-200 dark:border-[#D4AF37]/30 shadow-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo & Emblem - Big Logo (~2cm / 70-80px) */}
            <div
              onClick={() => handleNavClick('hero')}
              className="flex items-center space-x-3 sm:space-x-4 cursor-pointer group"
            >
              {config.logoUrl ? (
                <img
                  src={config.logoUrl}
                  alt={config.name}
                  className="h-14 sm:h-18 w-auto object-contain max-w-[220px] group-hover:scale-105 transition-all duration-200 shrink-0"
                />
              ) : (
                <div className="relative w-14 h-14 sm:w-18 sm:h-18 rounded-xl bg-gradient-to-br from-[#0A4D8C] to-[#051A33] border-2 border-[#D4AF37] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200 shrink-0">
                  <div className="absolute inset-0 bg-[#08783D]/10 rounded-xl"></div>
                  <BookOpen className="w-8 h-8 text-[#D4AF37]" />
                  <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#B51D28] rounded-full border border-white"></div>
                </div>
              )}

              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-serif-heading text-xl sm:text-2xl font-extrabold text-[#0A4D8C] dark:text-white tracking-tight">
                    {config.name}
                  </span>
                  <span className="text-[10px] font-extrabold bg-[#08783D] text-white px-2 py-0.5 rounded tracking-widest uppercase shadow-sm">
                    {config.badge}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#08783D] dark:text-[#D4AF37] tracking-wider font-bold uppercase leading-tight mt-0.5">
                  {config.tagline}
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links - Dark Blue Words */}
            <div className="hidden lg:flex items-center space-x-1.5">
              {NAVIGATION_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'text-white bg-[#0A4D8C] shadow-md dark:text-[#D4AF37] dark:bg-[#051A33] dark:border dark:border-[#D4AF37]/60'
                        : 'text-[#0A4D8C] hover:text-[#051A33] hover:bg-slate-100 dark:text-gray-200 dark:hover:text-white dark:hover:bg-[#051A33]/60'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="hidden sm:flex items-center space-x-3">
              <button
                onClick={onOpenSuperAdmin}
                className="inline-flex items-center space-x-1.5 bg-[#B51D28] hover:bg-red-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-md border border-red-400/30 transition-all cursor-pointer hover:shadow-lg"
              >
                <Shield className="w-4 h-4" />
                <span>Super Admin</span>
              </button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex lg:hidden items-center space-x-2">
              <button
                onClick={toggleDarkMode}
                className="p-2 text-[#0A4D8C] dark:text-[#D4AF37] hover:bg-slate-100 rounded-lg bg-slate-50 border border-slate-200 dark:bg-[#051A33] dark:border-[#D4AF37]/30"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-[#0A4D8C]" />}
              </button>
              <button
                onClick={onOpenSearchModal}
                className="p-2 text-[#0A4D8C] dark:text-[#D4AF37] hover:bg-slate-100 rounded-lg bg-slate-50 border border-slate-200 dark:bg-[#051A33] dark:border-[#D4AF37]/30"
                aria-label="Search"
              >
                <Search className="w-4 h-4 text-[#0A4D8C] dark:text-[#D4AF37]" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-[#0A4D8C] dark:text-[#D4AF37] hover:bg-slate-100 bg-slate-50 border border-slate-200 dark:bg-[#051A33] dark:border-[#D4AF37]/30 focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-[#B51D28]" /> : <Menu className="w-6 h-6 text-[#0A4D8C] dark:text-[#D4AF37]" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-[#051A33] border-b-2 border-[#0A4D8C] dark:border-[#D4AF37] px-4 pt-3 pb-6 space-y-2 max-h-[80vh] overflow-y-auto shadow-2xl">
            <div className="text-xs font-bold text-[#0A4D8C] dark:text-[#D4AF37] uppercase tracking-wider px-2 pt-1 pb-2 border-b border-slate-200 dark:border-white/10">
              Portal Directory Navigation
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-2">
              {NAVIGATION_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-bold text-left transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#0A4D8C] text-white border-l-4 border-[#D4AF37] shadow-sm'
                        : 'text-[#0A4D8C] dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-[#0A4D8C]/50'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-col space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSuperAdmin();
                }}
                className="w-full flex items-center justify-center space-x-2 bg-[#B51D28] text-white py-2.5 px-4 rounded-lg text-xs font-bold shadow"
              >
                <Shield className="w-4 h-4" />
                <span>Open Super Admin Dashboard</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

