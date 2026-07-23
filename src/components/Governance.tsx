import React, { useState } from 'react';
import {
  GitBranch,
  Crown,
  Cog,
  Building,
  ArrowDown,
  Calendar,
  Users,
  CheckCircle2,
} from 'lucide-react';
import { GOVERNANCE_HIERARCHY } from '../data/mouData';

export const Governance: React.FC = () => {
  const [selectedGovId, setSelectedGovId] = useState<string>(GOVERNANCE_HIERARCHY[0].id);

  const activeGov = GOVERNANCE_HIERARCHY.find((g) => g.id === selectedGovId) || GOVERNANCE_HIERARCHY[0];

  return (
    <section id="governance" className="py-20 bg-[#F5F7FA] dark:bg-[#051428] relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="inline-flex items-center space-x-1.5 text-xs font-extrabold uppercase tracking-widest text-[#0A4D8C] dark:text-[#D4AF37] bg-[#D4AF37]/20 px-3.5 py-1 rounded-full border border-[#D4AF37]/40">
            <GitBranch className="w-3.5 h-3.5 text-[#0A4D8C] dark:text-[#D4AF37]" />
            <span>Operational Architecture</span>
          </span>
          <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#0A4D8C] dark:text-[#D4AF37]">
            Governance Structure
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            A three-tiered administrative hierarchy ensuring policy oversight, technical execution, and daily secretarial operations.
          </p>
          <div className="w-24 h-1 bg-[#08783D] mx-auto rounded-full"></div>
        </div>

        {/* Visual Hierarchy Flow */}
        <div className="max-w-4xl mx-auto mb-12 space-y-4">
          
          {/* JSC Box */}
          <div
            onClick={() => setSelectedGovId('jsc')}
            className={`p-6 rounded-2xl border-2 transition-all cursor-pointer shadow-lg relative ${
              selectedGovId === 'jsc'
                ? 'bg-[#0A4D8C] text-white border-[#D4AF37] ring-4 ring-[#D4AF37]/30 scale-102'
                : 'bg-white dark:bg-[#0A2B4C] text-[#0A4D8C] dark:text-white border-gray-200 dark:border-gray-700 hover:border-[#D4AF37]'
            }`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-[#051A33] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shrink-0">
                  <Crown className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D4AF37] block">
                    TIER 1 • POLICY DIRECTION
                  </span>
                  <h3 className="font-serif-heading text-lg font-bold">
                    JOINT STEERING COMMITTEE (JSC)
                  </h3>
                  <p className="text-xs text-gray-300">
                    Chaired by the Principal Secretary, State Department for Higher Education • Meets Bi-Annually
                  </p>
                </div>
              </div>

              <span className="text-xs font-bold bg-[#08783D] text-white px-3 py-1 rounded-full shrink-0">
                Bi-Annual Meetings
              </span>
            </div>
          </div>

          {/* Down Arrow Connector */}
          <div className="flex justify-center my-1">
            <div className="w-8 h-8 rounded-full bg-[#08783D] text-white flex items-center justify-center shadow">
              <ArrowDown className="w-5 h-5 animate-bounce" />
            </div>
          </div>

          {/* TWG Box */}
          <div
            onClick={() => setSelectedGovId('twg')}
            className={`p-6 rounded-2xl border-2 transition-all cursor-pointer shadow-lg relative ${
              selectedGovId === 'twg'
                ? 'bg-[#0A4D8C] text-white border-[#D4AF37] ring-4 ring-[#D4AF37]/30 scale-102'
                : 'bg-white dark:bg-[#0A2B4C] text-[#0A4D8C] dark:text-white border-gray-200 dark:border-gray-700 hover:border-[#D4AF37]'
            }`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-[#08783D] border border-emerald-300 flex items-center justify-center text-white shrink-0">
                  <Cog className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-300 block">
                    TIER 2 • TECHNICAL EXECUTION
                  </span>
                  <h3 className="font-serif-heading text-lg font-bold">
                    TECHNICAL WORKING GROUP (TWG)
                  </h3>
                  <p className="text-xs text-gray-300">
                    Chaired by the Executive Director, ATS-Kenya • Meets Quarterly
                  </p>
                </div>
              </div>

              <span className="text-xs font-bold bg-[#051A33] text-[#D4AF37] px-3 py-1 rounded-full shrink-0 border border-[#D4AF37]/40">
                Quarterly Meetings
              </span>
            </div>
          </div>

          {/* Down Arrow Connector */}
          <div className="flex justify-center my-1">
            <div className="w-8 h-8 rounded-full bg-[#08783D] text-white flex items-center justify-center shadow">
              <ArrowDown className="w-5 h-5 animate-bounce" />
            </div>
          </div>

          {/* Secretariat Box */}
          <div
            onClick={() => setSelectedGovId('secretariat')}
            className={`p-6 rounded-2xl border-2 transition-all cursor-pointer shadow-lg relative ${
              selectedGovId === 'secretariat'
                ? 'bg-[#0A4D8C] text-white border-[#D4AF37] ring-4 ring-[#D4AF37]/30 scale-102'
                : 'bg-white dark:bg-[#0A2B4C] text-[#0A4D8C] dark:text-white border-gray-200 dark:border-gray-700 hover:border-[#D4AF37]'
            }`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-[#B51D28] border border-red-300 flex items-center justify-center text-white shrink-0">
                  <Building className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-red-200 block">
                    TIER 3 • ADMINISTRATIVE ANCHOR
                  </span>
                  <h3 className="font-serif-heading text-lg font-bold">
                    ATS-KENYA SECRETARIAT
                  </h3>
                  <p className="text-xs text-gray-300">
                    Serves as the Secretariat for this Collaboration • Daily Operations & Member Liaison
                  </p>
                </div>
              </div>

              <span className="text-xs font-bold bg-[#B51D28] text-white px-3 py-1 rounded-full shrink-0">
                Daily Operations
              </span>
            </div>
          </div>

        </div>

        {/* Governance Level Deep-Dive Card */}
        <div className="bg-white dark:bg-[#0A2B4C] rounded-2xl p-6 sm:p-8 shadow-2xl border-2 border-[#0A4D8C] dark:border-[#D4AF37]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-gray-200 dark:border-gray-700 gap-4">
            <div>
              <span className="text-xs font-extrabold text-[#D4AF37] uppercase tracking-widest block mb-1">
                {activeGov.level}
              </span>
              <h3 className="font-serif-heading text-xl font-bold text-[#0A4D8C] dark:text-white">
                {activeGov.title}
              </h3>
            </div>

            <div className="flex items-center space-x-2 bg-[#F5F7FA] dark:bg-[#051A33] border border-[#D4AF37] px-3.5 py-1.5 rounded-lg text-xs font-bold text-[#0A4D8C] dark:text-[#D4AF37]">
              <Calendar className="w-4 h-4 text-[#08783D]" />
              <span>Meeting Cadence: {activeGov.frequency}</span>
            </div>
          </div>

          <div className="py-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Responsibilities */}
            <div>
              <h4 className="text-xs font-bold text-[#0A4D8C] dark:text-[#D4AF37] uppercase tracking-wider mb-4 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#08783D]" />
                <span>Primary Responsibilities:</span>
              </h4>
              <div className="space-y-2.5">
                {activeGov.responsibilities.map((resp, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-[#F5F7FA] dark:bg-[#051A33] border border-gray-200 dark:border-gray-700 text-xs text-gray-800 dark:text-gray-200 font-medium flex items-start space-x-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#08783D] mt-1.5 shrink-0"></span>
                    <span>{resp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Membership Composition */}
            <div>
              <h4 className="text-xs font-bold text-[#0A4D8C] dark:text-[#D4AF37] uppercase tracking-wider mb-4 flex items-center space-x-2">
                <Users className="w-4 h-4 text-[#0A4D8C] dark:text-[#D4AF37]" />
                <span>Designated Membership:</span>
              </h4>
              <div className="space-y-2.5">
                {activeGov.members.map((mem, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-blue-50/80 dark:bg-[#051A33] border border-blue-200 dark:border-blue-900/60 text-xs text-[#0A4D8C] dark:text-gray-200 font-semibold flex items-center space-x-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#0A4D8C] dark:bg-[#D4AF37] shrink-0"></span>
                    <span>{mem}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
