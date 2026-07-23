import React from 'react';
import { Scroll, Award, CheckCircle2, Bookmark } from 'lucide-react';
import { PREAMBLE_CLAUSES } from '../data/mouData';

export const Preamble: React.FC = () => {
  return (
    <section id="preamble" className="py-20 bg-[#051A33] text-white relative border-y-4 border-[#D4AF37]">
      {/* Background Graphic Watermark */}
      <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center overflow-hidden">
        <Scroll className="w-[600px] h-[600px] text-white" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center space-x-2 bg-[#0A4D8C] border border-[#D4AF37]/50 px-4 py-1.5 rounded-full text-xs font-bold text-[#D4AF37] uppercase tracking-widest shadow">
            <Bookmark className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Official Recitals & Legal Preamble</span>
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Preamble & Foundational Clauses
          </h2>
          <p className="text-sm text-gray-300 max-w-2xl mx-auto">
            The legal and institutional basis establishing the necessity for national theological education harmonization.
          </p>
        </div>

        {/* Preamble Document Frame */}
        <div className="relative bg-[#0A4D8C]/90 border-2 border-[#D4AF37] rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-md space-y-8">
          
          {/* Top Stamp Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-[#051A33] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] font-bold">
                GoK
              </div>
              <div>
                <h3 className="font-serif-heading text-base font-bold text-white uppercase tracking-wider">
                  The Republic of Kenya
                </h3>
                <p className="text-xs text-[#D4AF37]">Ministry of Education & ATS-Kenya Joint Accord</p>
              </div>
            </div>

            <span className="hidden sm:inline-block text-[11px] font-mono text-emerald-400 bg-[#051A33] px-3 py-1 rounded border border-emerald-500/30">
              LEGAL INSTRUMENT • 2026
            </span>
          </div>

          {/* Preamble Clauses List with Gold Vertical Bar */}
          <div className="relative pl-6 sm:pl-8 border-l-4 border-[#D4AF37] space-y-8">
            {PREAMBLE_CLAUSES.map((clause, index) => (
              <div key={index} className="space-y-2 relative group">
                {/* Gold Marker Dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#D4AF37] border-2 border-[#051A33] shadow-md group-hover:scale-125 transition-transform"></div>

                <div className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider flex items-center space-x-2">
                  <span>Clause {index + 1}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span className="text-gray-300 font-medium">{clause.title}</span>
                </div>

                <p className="font-serif-heading text-base sm:text-lg text-gray-100 font-medium leading-relaxed tracking-wide italic">
                  "{clause.content}"
                </p>
              </div>
            ))}
          </div>

          {/* Declaration Footer */}
          <div className="pt-6 border-t border-white/20 bg-[#051A33]/60 -mx-6 sm:-mx-10 -mb-6 sm:-mb-10 p-6 sm:p-8 rounded-b-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3 text-xs text-gray-200">
              <CheckCircle2 className="w-5 h-5 text-[#08783D] shrink-0" />
              <span>
                NOW THEREFORE, in consideration of the mutual covenants herein contained, the Parties hereby agree to execute this Strategic Framework.
              </span>
            </div>

            <span className="shrink-0 bg-[#D4AF37] text-[#051A33] font-bold text-xs px-4 py-2 rounded-md uppercase tracking-wider shadow">
              Enforceable 2026–2031
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
