import React from 'react';
import { ShieldCheck, BookOpen, ChevronRight, Shield, Mail, Phone, MapPin } from 'lucide-react';
import { NAVIGATION_ITEMS } from '../data/mouData';
import { useProject } from '../context/ProjectContext';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenSuperAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenSuperAdmin,
}) => {
  const { config } = useProject();

  return (
    <footer className="bg-[#051A33] text-white border-t-4 border-[#D4AF37] pt-16 pb-8 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/15">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              {config.logoUrl ? (
                <img src={config.logoUrl} alt={config.name} className="h-10 sm:h-12 w-auto object-contain shrink-0" />
              ) : (
                <div className="w-10 h-10 rounded-lg bg-[#0A4D8C] border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37] font-bold shadow">
                  <BookOpen className="w-5 h-5" />
                </div>
              )}
              <div>
                <span className="font-serif-heading text-lg font-bold text-white tracking-wide block">
                  {config.name} {config.badge}
                </span>
                <span className="text-[10px] text-[#D4AF37] uppercase tracking-widest font-semibold">
                  {config.tagline}
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed max-w-md">
              {config.footerDescription}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-gray-300">
              <span className="flex items-center text-emerald-400 font-semibold bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-1 rounded">
                <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                Government Regulatory Framework
              </span>
              <span className="text-[#D4AF37] bg-[#0A4D8C] border border-[#D4AF37]/40 px-2.5 py-1 rounded font-mono text-[11px]">
                Ref: {config.refNumber}
              </span>
            </div>
          </div>

          {/* Navigation Links Column */}
          <div className="space-y-3">
            <h4 className="font-serif-heading text-xs font-extrabold text-[#D4AF37] uppercase tracking-wider">
              Quick Directory
            </h4>
            <ul className="space-y-2 text-xs">
              {NAVIGATION_ITEMS.slice(0, 5).map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className="text-gray-300 hover:text-[#D4AF37] transition-colors flex items-center space-x-1 cursor-pointer"
                  >
                    <ChevronRight className="w-3 h-3 text-[#08783D]" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Framework Structure Column */}
          <div className="space-y-3">
            <h4 className="font-serif-heading text-xs font-extrabold text-[#D4AF37] uppercase tracking-wider">
              Framework Structure
            </h4>
            <ul className="space-y-2 text-xs">
              {NAVIGATION_ITEMS.slice(5).map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className="text-gray-300 hover:text-[#D4AF37] transition-colors flex items-center space-x-1 cursor-pointer"
                  >
                    <ChevronRight className="w-3 h-3 text-[#08783D]" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="space-y-3">
            <h4 className="font-serif-heading text-xs font-extrabold text-[#D4AF37] uppercase tracking-wider">
              Official Contact
            </h4>
            <div className="space-y-2 text-xs text-gray-300">
              <div className="flex items-start space-x-2">
                <Mail className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                <span className="text-[11px]">{config.contactEmail}</span>
              </div>
              <div className="flex items-start space-x-2">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                <span className="text-[11px]">{config.contactPhone}</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                <span className="text-[11px]">{config.officeAddress}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <div>
            <p>© {config.copyrightText}</p>
          </div>

          <div className="flex items-center space-x-4 text-[11px]">
            <button
              onClick={onOpenSuperAdmin}
              className="inline-flex items-center space-x-1 bg-[#B51D28] hover:bg-red-700 text-white px-3 py-1.5 rounded text-xs font-bold transition-colors cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Super Admin Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
