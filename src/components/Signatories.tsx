import React from 'react';
import {
  PenTool,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';

export const Signatories: React.FC = () => {
  const { config } = useProject();

  const governmentSigs = config.signatories.filter(
    (s) => s.group === 'GOVERNMENT OF KENYA'
  );
  const atsSigs = config.signatories.filter(
    (s) => s.group !== 'GOVERNMENT OF KENYA'
  );

  return (
    <section
      id="signatories"
      className="py-20 bg-[#051A33] text-white relative border-y-4 border-[#D4AF37]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="inline-flex items-center space-x-1.5 text-xs font-extrabold uppercase tracking-widest text-[#D4AF37] bg-[#0A4D8C] px-3.5 py-1 rounded-full border border-[#D4AF37]/40 shadow">
            <PenTool className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Official Endorsements & Members</span>
          </span>
          <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Members & High Official Signatories ({config.signatories.length})
          </h2>
          <p className="text-sm text-gray-300">
            Duly authorized representatives and alliance leadership who execute and govern this framework.
          </p>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto rounded-full"></div>
        </div>

        {/* Verification Banner */}
        <div className="bg-[#0A4D8C] border-2 border-[#D4AF37] rounded-2xl p-4 sm:p-6 mb-12 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center space-x-3 text-xs sm:text-sm text-gray-200">
            <div className="w-10 h-10 rounded-full bg-[#08783D] flex items-center justify-center text-white shrink-0 shadow">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="font-bold text-white text-sm block">
                Official Government & Alliance Verification Seal Active
              </span>
              <p className="text-xs text-gray-300">
                All members certified and recorded on the National Education Partnership Registry.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-[#D4AF37] bg-[#051A33] px-3 py-1.5 rounded-lg border border-[#D4AF37]/40">
              Ref: {config.refNumber}
            </span>
          </div>
        </div>

        {/* Two Section Columns */}
        <div className="space-y-12">
          
          {/* SECTION 1: GOVERNMENT OF KENYA */}
          {governmentSigs.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 border-b-2 border-[#08783D] pb-3">
                <div className="w-3 h-8 bg-[#08783D] rounded-sm"></div>
                <h3 className="font-serif-heading text-2xl font-bold text-white uppercase tracking-wider">
                  FOR THE GOVERNMENT OF THE REPUBLIC OF KENYA
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {governmentSigs.map((sig) => (
                  <div
                    key={sig.id}
                    className="bg-[#0A4D8C] border border-white/15 rounded-xl p-6 shadow-xl flex flex-col justify-between hover:border-[#D4AF37] transition-all group"
                  >
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 block mb-1">
                        {sig.roleTitle}
                      </span>
                      <h4 className="font-serif-heading text-base font-bold text-white mb-1 leading-snug">
                        {sig.name}
                      </h4>
                      <p className="text-xs font-semibold text-[#D4AF37] mb-2">
                        {sig.titles}
                      </p>
                      <p className="text-xs text-gray-300 leading-snug">
                        {sig.organization}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-white/10 space-y-2">
                      <div className="relative pt-4 pb-1 border-b-2 border-dashed border-[#D4AF37]/60 flex items-center justify-between">
                        <span className="font-serif-heading italic text-xs text-[#D4AF37] font-semibold tracking-widest opacity-90 select-none">
                          Signed: {sig.name.split(' ')[1] || sig.name}
                        </span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      </div>
                      <span className="text-[10px] text-gray-400 block text-right">
                        Date: {sig.signedDate || '14 August 2026'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 2: ALLIANCE / PROJECT MEMBERS */}
          {atsSigs.length > 0 && (
            <div className="space-y-6 pt-6">
              <div className="flex items-center space-x-3 border-b-2 border-[#D4AF37] pb-3">
                <div className="w-3 h-8 bg-[#D4AF37] rounded-sm"></div>
                <h3 className="font-serif-heading text-2xl font-bold text-white uppercase tracking-wider">
                  FOR {config.name} LEADERSHIP & ALLIANCE MEMBERS
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {atsSigs.map((sig) => (
                  <div
                    key={sig.id}
                    className="bg-[#0A4D8C] border border-white/15 rounded-xl p-6 shadow-xl flex flex-col justify-between hover:border-[#D4AF37] transition-all group"
                  >
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D4AF37] block mb-1">
                        {sig.roleTitle}
                      </span>
                      <h4 className="font-serif-heading text-base font-bold text-white mb-1 leading-snug">
                        {sig.name}
                      </h4>
                      <p className="text-xs font-semibold text-[#D4AF37] mb-2">
                        {sig.titles}
                      </p>
                      <p className="text-xs text-gray-300 leading-snug">
                        {sig.organization}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-white/10 space-y-2">
                      <div className="relative pt-4 pb-1 border-b-2 border-dashed border-[#D4AF37]/60 flex items-center justify-between">
                        <span className="font-serif-heading italic text-xs text-[#D4AF37] font-semibold tracking-widest opacity-90 select-none">
                          Signed: {sig.name.split(' ')[1] || sig.name}
                        </span>
                        <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                      </div>
                      <span className="text-[10px] text-gray-400 block text-right">
                        Date: {sig.signedDate || '14 August 2026'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
