import React from 'react';
import {
  Coins,
  Scale,
  FileX,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Users2,
  Globe2,
} from 'lucide-react';

export const Funding: React.FC = () => {
  return (
    <section id="funding" className="py-20 bg-[#F5F7FA] dark:bg-[#051428] relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="inline-flex items-center space-x-1.5 text-xs font-extrabold uppercase tracking-widest text-[#0A4D8C] dark:text-[#D4AF37] bg-[#D4AF37]/20 px-3.5 py-1 rounded-full border border-[#D4AF37]/40">
            <Coins className="w-3.5 h-3.5 text-[#0A4D8C] dark:text-[#D4AF37]" />
            <span>Administrative & Operational Provisions</span>
          </span>
          <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#0A4D8C] dark:text-[#D4AF37]">
            Funding, Disputes & Legal Provisions
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Resource mobilization strategies, dispute escalation mechanisms, and legal termination parameters.
          </p>
          <div className="w-24 h-1 bg-[#08783D] mx-auto rounded-full"></div>
        </div>

        {/* 3 Main Provision Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Funding */}
          <div className="bg-white dark:bg-[#0A2B4C] rounded-2xl p-6 sm:p-8 border-2 border-[#D4AF37] shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-[#051A33] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
                  <Coins className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D4AF37] block">
                    ARTICLE 4 • RESOURCES
                  </span>
                  <h3 className="font-serif-heading text-lg font-bold text-[#0A4D8C] dark:text-white">
                    FUNDING & MOBILIZATION
                  </h3>
                </div>
              </div>

              <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                The parties shall jointly mobilize financial, technical, and human resources required for the full implementation of this Partnership Framework.
              </p>

              <div className="space-y-2.5">
                <span className="text-[11px] font-extrabold text-[#0A4D8C] dark:text-[#D4AF37] uppercase tracking-wider block">
                  Identified Funding Sources:
                </span>

                <div className="p-3 rounded-lg bg-[#F5F7FA] dark:bg-[#051A33] border border-gray-200 dark:border-gray-700 text-xs text-gray-800 dark:text-gray-200 flex items-center space-x-2">
                  <Building2 className="w-4 h-4 text-[#0A4D8C] dark:text-[#D4AF37]" />
                  <span>Government Annual Budgetary Allocation</span>
                </div>

                <div className="p-3 rounded-lg bg-[#F5F7FA] dark:bg-[#051A33] border border-gray-200 dark:border-gray-700 text-xs text-gray-800 dark:text-gray-200 flex items-center space-x-2">
                  <Users2 className="w-4 h-4 text-[#08783D]" />
                  <span>ATS-Kenya Member Institution Contributions</span>
                </div>

                <div className="p-3 rounded-lg bg-[#F5F7FA] dark:bg-[#051A33] border border-gray-200 dark:border-gray-700 text-xs text-gray-800 dark:text-gray-200 flex items-center space-x-2">
                  <Globe2 className="w-4 h-4 text-[#0A4D8C] dark:text-sky-400" />
                  <span>Development Partners & Philanthropic Support</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-gray-100 dark:border-gray-700 text-[11px] text-gray-500 dark:text-gray-400 font-medium">
              Joint financial audits submitted annually to JSC.
            </div>
          </div>

          {/* Card 2: Dispute Resolution */}
          <div className="bg-white dark:bg-[#0A2B4C] rounded-2xl p-6 sm:p-8 border-2 border-emerald-600 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-[#051A33] border border-emerald-400 flex items-center justify-center text-[#08783D]">
                  <Scale className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#08783D] dark:text-emerald-400 block">
                    ARTICLE 5 • ADJUDICATION
                  </span>
                  <h3 className="font-serif-heading text-lg font-bold text-[#0A4D8C] dark:text-white">
                    DISPUTE RESOLUTION
                  </h3>
                </div>
              </div>

              <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Any disagreement, conflict, or dispute arising out of the interpretation or implementation of this Framework shall be resolved amicably through direct consultations within the Joint Steering Committee.
              </p>

              <div className="space-y-3 bg-[#F5F7FA] dark:bg-[#051A33] p-4 rounded-xl border border-gray-200 dark:border-gray-700 text-xs text-gray-800 dark:text-gray-200">
                <div className="flex items-start space-x-2">
                  <span className="font-bold text-[#08783D] dark:text-emerald-400">Step 1:</span>
                  <span>Amicable consultation within the Joint Steering Committee.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="font-bold text-[#08783D] dark:text-emerald-400">Step 2:</span>
                  <span>If unresolved, independent mediation shall be sought by mutual consent.</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-gray-100 dark:border-gray-700 text-[11px] text-gray-500 dark:text-gray-400 font-medium">
              Court litigation is discouraged in favor of administrative conciliation.
            </div>
          </div>

          {/* Card 3: Termination */}
          <div className="bg-white dark:bg-[#0A2B4C] rounded-2xl p-6 sm:p-8 border-2 border-red-600 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-[#051A33] border border-red-300 flex items-center justify-center text-[#B51D28]">
                  <FileX className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#B51D28] dark:text-red-400 block">
                    ARTICLE 6 • DURATION
                  </span>
                  <h3 className="font-serif-heading text-lg font-bold text-[#0A4D8C] dark:text-white">
                    TERMINATION CLAUSE
                  </h3>
                </div>
              </div>

              <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Either Party may terminate this Partnership Framework by giving six (6) months prior written notice to the other Party.
              </p>

              <div className="p-4 bg-red-50/70 dark:bg-[#051A33] rounded-xl border border-red-200 dark:border-red-900/60 text-xs text-gray-800 dark:text-gray-200 space-y-2">
                <div className="flex items-center space-x-2 font-bold text-[#B51D28] dark:text-red-400">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>Continuity Protection Clause:</span>
                </div>
                <p className="text-xs leading-relaxed">
                  Termination of this Framework shall not affect ongoing programs, student enrollments, or joint research projects already initiated prior to the notice.
                </p>
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-gray-100 dark:border-gray-700 text-[11px] text-gray-500 dark:text-gray-400 font-medium">
              Requires official Cabinet Secretary & Chairman notification.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
