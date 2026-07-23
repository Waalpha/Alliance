import React, { useState } from 'react';
import { Building2, ExternalLink, ChevronRight } from 'lucide-react';
import { useProject } from '../context/ProjectContext';

export const Partners: React.FC = () => {
  const { config } = useProject();
  const partners = config.partners;

  const [selectedPartnerId, setSelectedPartnerId] = useState<string>(
    partners[0]?.id || 'p-moe'
  );

  const selectedPartner = partners.find((p) => p.id === selectedPartnerId) || partners[0];

  if (!selectedPartner) return null;

  return (
    <section id="partners" className="py-20 bg-[#F5F7FA] dark:bg-[#051428] relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="inline-flex items-center space-x-1.5 text-xs font-extrabold uppercase tracking-widest text-[#0A4D8C] dark:text-[#D4AF37] bg-[#D4AF37]/20 px-3.5 py-1 rounded-full border border-[#D4AF37]/40">
            <Building2 className="w-3.5 h-3.5 text-[#0A4D8C] dark:text-[#D4AF37]" />
            <span>Key Stakeholders & Regulatory Bodies</span>
          </span>
          <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#0A4D8C] dark:text-[#D4AF37]">
            Collaborating Agencies & Organizations ({partners.length})
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            The national government ministries, state regulatory bodies, and apex alliance driving this partnership.
          </p>
          <div className="w-24 h-1 bg-[#08783D] mx-auto rounded-full"></div>
        </div>

        {/* Partner Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {partners.map((partner) => {
            const isSelected = selectedPartnerId === partner.id;
            return (
              <div
                key={partner.id}
                onClick={() => setSelectedPartnerId(partner.id)}
                className={`bg-white dark:bg-[#0A2B4C] rounded-2xl p-5 border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-md hover:shadow-xl ${
                  isSelected
                    ? 'border-[#D4AF37] bg-amber-50/30 dark:bg-[#051A33] ring-2 ring-[#D4AF37]/30 scale-102'
                    : 'border-gray-200 dark:border-gray-700 hover:border-[#D4AF37]/60'
                }`}
              >
                <div>
                  <div
                    className="w-full h-20 rounded-xl flex items-center justify-center font-bold text-lg mb-4 text-white shadow-md border border-white/20"
                    style={{ backgroundColor: partner.badgeColor || '#0A4D8C' }}
                  >
                    <span className="font-serif-heading tracking-widest text-center px-2">
                      {partner.code}
                    </span>
                  </div>

                  <span className="text-[10px] font-extrabold text-gray-500 dark:text-gray-400 uppercase tracking-widest block mb-1">
                    {partner.category}
                  </span>

                  <h3 className="font-serif-heading text-sm font-bold text-[#0A4D8C] dark:text-white mb-2 leading-snug">
                    {partner.name}
                  </h3>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between text-xs font-semibold text-[#0A4D8C] dark:text-[#D4AF37]">
                  <span>Mandate Spec</span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'translate-x-1 text-[#D4AF37]' : 'text-gray-400'}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Deep Dive Details Box for Selected Partner */}
        <div className="bg-white dark:bg-[#0A2B4C] rounded-2xl p-6 sm:p-8 shadow-2xl border-2 border-[#0A4D8C] dark:border-[#D4AF37]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-gray-200 dark:border-gray-700 gap-4">
            <div className="flex items-center space-x-4">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center font-serif-heading font-black text-xl text-white shadow-md shrink-0"
                style={{ backgroundColor: selectedPartner.badgeColor || '#0A4D8C' }}
              >
                {selectedPartner.code}
              </div>
              <div>
                <span className="text-xs font-extrabold text-[#D4AF37] uppercase tracking-widest block mb-1">
                  {selectedPartner.category}
                </span>
                <h3 className="font-serif-heading text-xl font-bold text-[#0A4D8C] dark:text-white">
                  {selectedPartner.name}
                </h3>
              </div>
            </div>

            {selectedPartner.website && (
              <a
                href={selectedPartner.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1.5 bg-[#0A4D8C] hover:bg-[#051A33] text-white text-xs font-semibold px-4 py-2 rounded-lg shadow transition-colors"
              >
                <span>Visit Official Site</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
              </a>
            )}
          </div>

          <div className="py-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-[#F5F7FA] dark:bg-[#051A33] border border-gray-200 dark:border-gray-700 space-y-2">
              <span className="text-xs font-extrabold text-[#0A4D8C] dark:text-[#D4AF37] uppercase tracking-wider block">
                Statutory Mandate:
              </span>
              <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                {selectedPartner.mandate}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-blue-50/80 dark:bg-[#051A33] border border-blue-200 dark:border-blue-900/60 space-y-2">
              <span className="text-xs font-extrabold text-[#0A4D8C] dark:text-sky-300 uppercase tracking-wider block">
                Role in {config.name} Collaboration:
              </span>
              <p className="text-xs text-[#0A4D8C] dark:text-gray-200 font-medium leading-relaxed">
                {selectedPartner.roleDescription}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
