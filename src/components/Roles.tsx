import React from 'react';
import { ShieldCheck, GraduationCap, CheckCircle2, ArrowRightLeft } from 'lucide-react';
import { GOVERNMENT_ROLES, ATS_KENYA_ROLES } from '../data/mouData';

export const Roles: React.FC = () => {
  return (
    <section id="roles" className="py-20 bg-[#051A33] text-white relative border-y-4 border-[#D4AF37]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="inline-flex items-center space-x-1.5 text-xs font-extrabold uppercase tracking-widest text-[#D4AF37] bg-[#0A4D8C] px-3.5 py-1 rounded-full border border-[#D4AF37]/40 shadow">
            <ArrowRightLeft className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Institutional Obligations</span>
          </span>
          <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Roles and Responsibilities
          </h2>
          <p className="text-sm text-gray-300">
            A clear division of mandates between State Regulatory Authorities and the Alliance of Theological Schools.
          </p>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto rounded-full"></div>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Column 1: Government of Kenya */}
          <div className="bg-[#0A4D8C] border-2 border-emerald-500/50 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
            <div className="flex items-center space-x-3 pb-6 border-b border-white/15">
              <div className="w-12 h-12 rounded-xl bg-[#051A33] border-2 border-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-7 h-7 text-[#08783D]" />
              </div>
              <div>
                <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-widest block">
                  STATE REGULATORY SIDE
                </span>
                <h3 className="font-serif-heading text-xl font-bold text-white">
                  GOVERNMENT OF KENYA
                </h3>
                <p className="text-xs text-gray-300">Ministry of Education • TVETA • CUE • KNQA</p>
              </div>
            </div>

            <div className="pt-6 space-y-4">
              {GOVERNMENT_ROLES.map((role, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#051A33]/80 border border-emerald-500/30 flex items-start space-x-3 text-xs sm:text-sm text-gray-100 hover:border-emerald-400/80 transition-colors"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{role}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: ATS-Kenya */}
          <div className="bg-[#0A4D8C] border-2 border-amber-400/50 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
            <div className="flex items-center space-x-3 pb-6 border-b border-white/15">
              <div className="w-12 h-12 rounded-xl bg-[#051A33] border-2 border-[#D4AF37] flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-[#D4AF37]" />
              </div>
              <div>
                <span className="text-xs font-extrabold text-[#D4AF37] uppercase tracking-widest block">
                  INSTITUTIONAL ALLIANCE SIDE
                </span>
                <h3 className="font-serif-heading text-xl font-bold text-white">
                  ALLIANCE OF THEOLOGICAL SCHOOLS - KENYA
                </h3>
                <p className="text-xs text-gray-300">Representing 500+ Member Seminaries & Colleges</p>
              </div>
            </div>

            <div className="pt-6 space-y-4">
              {ATS_KENYA_ROLES.map((role, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#051A33]/80 border border-amber-500/30 flex items-start space-x-3 text-xs sm:text-sm text-gray-100 hover:border-[#D4AF37] transition-colors"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{role}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
