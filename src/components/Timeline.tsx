import React from 'react';
import { Clock, CheckCircle2, Flag, ArrowRight, Star } from 'lucide-react';
import { TIMELINE_MILESTONES } from '../data/mouData';

export const Timeline: React.FC = () => {
  return (
    <section id="timeline" className="py-20 bg-[#051A33] text-white relative border-t-4 border-[#D4AF37]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="inline-flex items-center space-x-1.5 text-xs font-extrabold uppercase tracking-widest text-[#D4AF37] bg-[#0A4D8C] px-3.5 py-1 rounded-full border border-[#D4AF37]/40 shadow">
            <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Implementation Roadmap</span>
          </span>
          <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Five-Year Implementation Timeline
          </h2>
          <p className="text-sm text-gray-300">
            Strategic milestones guiding the transformation of theological education from 2026 to 2031.
          </p>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto rounded-full"></div>
        </div>

        {/* Horizontal & Vertical Timeline Cards */}
        <div className="relative">
          {/* Central Connecting Line on Desktop */}
          <div className="hidden lg:block absolute left-1/2 top-8 bottom-8 w-1 bg-gradient-to-b from-[#08783D] via-[#D4AF37] to-[#B51D28] transform -translate-x-1/2"></div>

          <div className="space-y-12 relative">
            {TIMELINE_MILESTONES.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={index}
                  className={`flex flex-col lg:flex-row items-center justify-between gap-8 ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Card */}
                  <div className="w-full lg:w-[45%]">
                    <div className="bg-[#0A4D8C] border-2 border-[#D4AF37] rounded-2xl p-6 sm:p-8 shadow-2xl relative group hover:border-emerald-400 transition-all duration-300">
                      
                      <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/15">
                        <span className="font-serif-heading text-3xl font-black text-[#D4AF37]">
                          {item.year}
                        </span>
                        <span className="text-xs font-bold bg-[#08783D] text-white px-3 py-1 rounded-full border border-emerald-400/30">
                          {item.status}
                        </span>
                      </div>

                      <h3 className="font-serif-heading text-xl font-bold text-white mb-1">
                        {item.title}
                      </h3>

                      <p className="text-xs font-extrabold text-[#D4AF37] uppercase tracking-wider mb-3">
                        {item.tagline}
                      </p>

                      <p className="text-xs sm:text-sm text-gray-200 leading-relaxed mb-4">
                        {item.description}
                      </p>

                      <div className="pt-3 border-t border-white/10">
                        <span className="text-[11px] font-bold text-gray-300 uppercase tracking-wider block mb-2">
                          Key Deliverables:
                        </span>
                        <ul className="space-y-1.5">
                          {item.deliverables.map((del, dIdx) => (
                            <li
                              key={dIdx}
                              className="text-xs text-gray-200 flex items-center space-x-2"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#08783D] shrink-0" />
                              <span>{del}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                    </div>
                  </div>

                  {/* Central Node Badge */}
                  <div className="hidden lg:flex z-10 w-14 h-14 rounded-full bg-[#051A33] border-4 border-[#D4AF37] items-center justify-center font-bold text-[#D4AF37] text-sm shadow-xl shrink-0">
                    {item.year.slice(2)}
                  </div>

                  {/* Spacer for 2-Column Balance */}
                  <div className="hidden lg:block w-full lg:w-[45%]"></div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
