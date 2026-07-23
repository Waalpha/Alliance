import React from 'react';
import {
  FileCheck2,
  Building,
  ShieldCheck,
  Scale,
  Award,
  ArrowRight,
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';

interface AboutFrameworkProps {
  onNavigate: (sectionId: string) => void;
  onOpenSuperAdmin: () => void;
}

export const AboutFramework: React.FC<AboutFrameworkProps> = ({
  onNavigate,
  onOpenSuperAdmin,
}) => {
  const { config } = useProject();

  const focusAreas = [
    {
      title: 'Registration & Legal Compliance',
      desc: 'Fast-tracking statutory licensing and compliance for over 500 theological schools with TVETA and CUE.',
      icon: <Building className="w-5 h-5 text-[#0A4D8C]" />,
      bgColor: 'bg-blue-50 dark:bg-blue-950/30',
      borderColor: 'border-blue-200 dark:border-blue-800/40',
    },
    {
      title: 'Quality Assurance & Standards',
      desc: 'Operationalizing joint quality assurance audits, faculty benchmarks, and institutional reviews.',
      icon: <ShieldCheck className="w-5 h-5 text-[#08783D]" />,
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/30',
      borderColor: 'border-emerald-200 dark:border-emerald-800/40',
    },
    {
      title: 'Curriculum Harmonization',
      desc: 'Aligning non-formal and formal theology courses to the Kenya National Qualifications Framework (KNQF).',
      icon: <Scale className="w-5 h-5 text-[#B51D28]" />,
      bgColor: 'bg-red-50 dark:bg-red-950/30',
      borderColor: 'border-red-200 dark:border-red-800/40',
    },
    {
      title: 'National Recognition of Qualifications',
      desc: 'Establishing formal graduate recognition for public service roles, military chaplaincy, and academic advancement.',
      icon: <Award className="w-5 h-5 text-[#D4AF37]" />,
      bgColor: 'bg-amber-50 dark:bg-amber-950/30',
      borderColor: 'border-amber-200 dark:border-amber-800/40',
    },
  ];

  return (
    <section id="about" className="py-20 bg-[#F5F7FA] dark:bg-[#051428] relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="inline-flex items-center space-x-1.5 text-xs font-extrabold uppercase tracking-widest text-[#08783D] bg-emerald-100/90 dark:bg-emerald-950/60 dark:text-emerald-300 px-3 py-1 rounded-full border border-emerald-300 dark:border-emerald-700">
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>National Educational Framework</span>
          </span>
          <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#0A4D8C] dark:text-[#D4AF37]">
            A shared commitment to a stronger theological education sector.
          </h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto rounded-full"></div>
        </div>

        {/* Grid Layout: Content & Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Narrative & Focus Areas */}
          <div className="lg:col-span-8 space-y-6">
            <p className="text-base sm:text-lg text-gray-800 dark:text-gray-200 leading-relaxed font-normal">
              The strategic agreement establishes a historic national framework for collaboration between the Government of the Republic of Kenya—acting through the Ministry of Education, Technical and Vocational Education and Training Authority (TVETA), Commission for University Education (CUE), and Kenya National Qualifications Authority (KNQA)—and {config.name}.
            </p>

            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              This landmark five-year accord bridges the gap between state regulatory requirements and theological academic institutions, ensuring that every theology student receives recognized, high-quality, and legally compliant education that directly contributes to Kenya’s national socio-economic and moral development.
            </p>

            {/* Focus Area Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {focusAreas.map((area, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border ${area.borderColor} ${area.bgColor} shadow-sm hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-2 rounded-lg bg-white dark:bg-[#051A33] shadow-sm border border-gray-100 dark:border-gray-700">
                      {area.icon}
                    </div>
                    <h3 className="font-bold text-xs sm:text-sm text-[#0A4D8C] dark:text-white">
                      {area.title}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-snug">
                    {area.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => onNavigate('preamble')}
                className="inline-flex items-center space-x-2 bg-[#0A4D8C] hover:bg-[#051A33] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <span>Read Preamble Recitals</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </button>

              <button
                onClick={onOpenSuperAdmin}
                className="inline-flex items-center space-x-2 bg-white dark:bg-[#0A2B4C] hover:bg-gray-100 dark:hover:bg-[#051A33] text-[#0A4D8C] dark:text-[#D4AF37] font-bold text-xs sm:text-sm px-6 py-3 rounded-lg border border-[#D4AF37] shadow-sm transition-all cursor-pointer"
              >
                <span>Edit Project Settings</span>
              </button>
            </div>
          </div>

          {/* Right Column: Institutional Summary Badge */}
          <div className="lg:col-span-4">
            <div className="bg-white dark:bg-[#0A2B4C] rounded-2xl p-6 shadow-2xl border-2 border-[#D4AF37] relative space-y-4">
              <div className="bg-[#08783D] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow inline-block">
                OFFICIAL FRAMEWORK
              </div>

              <div>
                <span className="text-xs font-extrabold text-[#D4AF37] tracking-wider uppercase block mb-1">
                  PROJECT SUMMARY
                </span>
                <h3 className="font-serif-heading text-lg font-bold text-[#0A4D8C] dark:text-white">
                  {config.name} Partnership
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Republic of Kenya & {config.name} Collaboration Accord
                </p>
              </div>

              {/* Quick Spec list */}
              <div className="space-y-3 pt-2 text-xs text-gray-700 dark:text-gray-300">
                <div className="p-3 bg-[#F5F7FA] dark:bg-[#051A33] rounded-xl border border-gray-200 dark:border-gray-700">
                  <span className="font-bold text-[#0A4D8C] dark:text-[#D4AF37] block mb-0.5">Agreement Reference:</span>
                  <span className="font-mono text-xs text-[#08783D] dark:text-emerald-400">{config.refNumber}</span>
                </div>

                <div className="p-3 bg-[#F5F7FA] dark:bg-[#051A33] rounded-xl border border-gray-200 dark:border-gray-700">
                  <span className="font-bold text-[#0A4D8C] dark:text-[#D4AF37] block mb-0.5">Key Stakeholders:</span>
                  <span className="text-xs">Ministry of Education, TVETA, CUE, KNQA, & {config.name}</span>
                </div>

                <div className="p-3 bg-[#F5F7FA] dark:bg-[#051A33] rounded-xl border border-gray-200 dark:border-gray-700">
                  <span className="font-bold text-[#0A4D8C] dark:text-[#D4AF37] block mb-0.5">Members & Signatories:</span>
                  <span className="text-xs font-bold text-[#B51D28] dark:text-red-400">{config.signatories.length} High Official Signatories</span>
                </div>
              </div>

              <button
                onClick={onOpenSuperAdmin}
                className="w-full py-2.5 bg-[#0A4D8C] hover:bg-[#051A33] text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow"
              >
                <span>Manage Project Details</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
