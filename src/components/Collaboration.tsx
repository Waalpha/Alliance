import React, { useState } from 'react';
import {
  Building2,
  BookMarked,
  ShieldAlert,
  GraduationCap,
  Share2,
  CheckCircle,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { COLLABORATION_AREAS } from '../data/mouData';

export const Collaboration: React.FC = () => {
  const [activeAreaId, setActiveAreaId] = useState<string>(COLLABORATION_AREAS[0].id);

  const getAreaIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Building2 className="w-6 h-6 text-[#0A4D8C] dark:text-[#D4AF37]" />;
      case 1:
        return <BookMarked className="w-6 h-6 text-[#08783D]" />;
      case 2:
        return <ShieldAlert className="w-6 h-6 text-[#B51D28]" />;
      case 3:
        return <GraduationCap className="w-6 h-6 text-[#D4AF37]" />;
      case 4:
      default:
        return <Share2 className="w-6 h-6 text-[#0A4D8C] dark:text-sky-400" />;
    }
  };

  const activeArea = COLLABORATION_AREAS.find((a) => a.id === activeAreaId) || COLLABORATION_AREAS[0];

  return (
    <section id="collaboration" className="py-20 bg-[#F5F7FA] dark:bg-[#051428] relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="inline-flex items-center space-x-1.5 text-xs font-extrabold uppercase tracking-widest text-[#0A4D8C] dark:text-[#D4AF37] bg-[#D4AF37]/20 px-3.5 py-1 rounded-full border border-[#D4AF37]/40">
            <Layers className="w-3.5 h-3.5 text-[#0A4D8C] dark:text-[#D4AF37]" />
            <span>Pillars of Implementation</span>
          </span>
          <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#0A4D8C] dark:text-[#D4AF37]">
            Five Areas of Collaboration
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Interactive breakdown of statutory, academic, and operational activities under the 2026–2031 Framework.
          </p>
          <div className="w-24 h-1 bg-[#08783D] mx-auto rounded-full"></div>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {COLLABORATION_AREAS.map((area, idx) => {
            const isActive = activeAreaId === area.id;
            return (
              <div
                key={area.id}
                onClick={() => setActiveAreaId(area.id)}
                className={`bg-white dark:bg-[#0A2B4C] rounded-2xl p-6 border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-md hover:shadow-xl ${
                  isActive
                    ? 'border-[#D4AF37] bg-gradient-to-b from-amber-50/40 dark:from-[#0A2B4C] to-white dark:to-[#051A33] ring-2 ring-[#D4AF37]/30 scale-102'
                    : 'border-gray-200 dark:border-gray-700 hover:border-[#D4AF37]/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-[#F5F7FA] dark:bg-[#051A33] border border-[#D4AF37]/30">
                      {getAreaIcon(idx)}
                    </div>
                    <span className="font-serif-heading text-xl font-black text-[#D4AF37]">
                      PILLAR {area.number}
                    </span>
                  </div>

                  <h3 className="font-serif-heading font-bold text-base text-[#0A4D8C] dark:text-white mb-2 leading-snug">
                    {area.title}
                  </h3>

                  <p className="text-xs text-gray-600 dark:text-gray-300 font-medium mb-3">
                    {area.subtitle}
                  </p>

                  <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-[#051A33]/80 p-3 rounded-lg border border-gray-100 dark:border-gray-700/60">
                    {area.summary}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {area.leadAgencies.map((agency, aIdx) => (
                      <span
                        key={aIdx}
                        className="text-[10px] font-bold text-[#0A4D8C] dark:text-[#D4AF37] bg-blue-50 dark:bg-[#051A33] border border-blue-200 dark:border-blue-800 px-2 py-0.5 rounded"
                      >
                        {agency}
                      </span>
                    ))}
                  </div>

                  <span className={`text-xs font-bold ${isActive ? 'text-[#08783D] dark:text-emerald-400' : 'text-gray-400'}`}>
                    Select Pillar
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Expanded Details Section for Selected Area */}
        <div className="bg-white dark:bg-[#0A2B4C] rounded-2xl p-6 sm:p-8 shadow-2xl border-2 border-[#0A4D8C] dark:border-[#D4AF37] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-bl-full pointer-events-none"></div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-gray-200 dark:border-gray-700">
            <div>
              <span className="text-xs font-extrabold text-[#D4AF37] uppercase tracking-widest block mb-1">
                DETAILED OPERATIONAL SPECIFICATION — PILLAR {activeArea.number}
              </span>
              <h3 className="font-serif-heading text-xl sm:text-2xl font-bold text-[#0A4D8C] dark:text-white">
                {activeArea.title}
              </h3>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-gray-500 dark:text-gray-400">Lead Regulatory Partners:</span>
              <div className="flex space-x-1">
                {activeArea.leadAgencies.map((agency, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-extrabold bg-[#0A4D8C] text-[#D4AF37] px-2.5 py-1 rounded border border-[#D4AF37]/40"
                  >
                    {agency}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="py-6 space-y-4">
            <h4 className="text-xs font-bold text-[#0A4D8C] dark:text-[#D4AF37] uppercase tracking-wider">
              Specific Mandates & Joint Actions:
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeArea.details.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#F5F7FA] dark:bg-[#051A33] border border-[#D4AF37]/30 flex items-start space-x-3 text-xs sm:text-sm text-gray-800 dark:text-gray-200"
                >
                  <CheckCircle className="w-5 h-5 text-[#08783D] shrink-0 mt-0.5" />
                  <span className="leading-relaxed font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
