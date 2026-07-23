import React, { useState } from 'react';
import { Target, Calendar, CheckCircle2, ChevronRight, ShieldCheck } from 'lucide-react';
import { useProject } from '../context/ProjectContext';

export const Objectives: React.FC = () => {
  const { config } = useProject();
  const objectives = config.objectives;

  const [selectedObjective, setSelectedObjective] = useState<string>(
    objectives[0]?.id || 'obj-1'
  );

  const activeObj = objectives.find((o) => o.id === selectedObjective) || objectives[0];

  if (!activeObj) return null;

  return (
    <section id="objectives" className="py-20 bg-[#051A33] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="inline-flex items-center space-x-1.5 text-xs font-extrabold uppercase tracking-widest text-[#D4AF37] bg-[#0A4D8C] px-3.5 py-1 rounded-full border border-[#D4AF37]/40 shadow">
            <Target className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Core Institutional Goals</span>
          </span>
          <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Strategic Objectives ({objectives.length})
          </h2>
          <p className="text-sm text-[#F5F7FA]/80">
            Clear, measurable milestones designed to transform theological training across Kenya by 2031.
          </p>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto rounded-full"></div>
        </div>

        {/* Objectives Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          {objectives.map((obj) => {
            const isSelected = selectedObjective === obj.id;
            return (
              <div
                key={obj.id}
                onClick={() => setSelectedObjective(obj.id)}
                className={`p-5 rounded-xl border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-[#0A4D8C] border-[#D4AF37] shadow-2xl scale-102 ring-2 ring-[#D4AF37]/30'
                    : 'bg-[#051A33]/90 border-white/10 hover:border-[#D4AF37]/50 hover:bg-[#0A4D8C]/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif-heading text-3xl font-black text-[#D4AF37]">
                      {obj.number}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                        isSelected
                          ? 'bg-[#08783D] text-white border-emerald-400/50'
                          : 'bg-white/10 text-gray-300 border-white/10'
                      }`}
                    >
                      {obj.targetDate}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-white mb-2 leading-snug group-hover:text-[#D4AF37] transition-colors">
                    {obj.title}
                  </h3>

                  <p className="text-xs text-gray-300 line-clamp-3 leading-relaxed">
                    {obj.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#D4AF37] font-semibold">
                  <span>View Details</span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'translate-x-1' : ''}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Objective Deep-Dive Feature Box */}
        <div className="bg-[#0A4D8C] border-2 border-[#D4AF37] rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-white/15">
            <div className="flex items-start space-x-4">
              <div className="w-14 h-14 rounded-xl bg-[#051A33] border-2 border-[#D4AF37] flex items-center justify-center font-serif-heading text-2xl font-black text-[#D4AF37] shrink-0">
                {activeObj.number}
              </div>
              <div>
                <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block mb-1">
                  STRATEGIC OBJECTIVE FOCUS
                </span>
                <h3 className="font-serif-heading text-xl sm:text-2xl font-bold text-white">
                  {activeObj.title}
                </h3>
              </div>
            </div>

            <div className="flex items-center space-x-2 bg-[#051A33] border border-[#D4AF37]/40 px-4 py-2 rounded-lg text-xs font-bold text-[#D4AF37]">
              <Calendar className="w-4 h-4 text-[#D4AF37]" />
              <span>Target Timeline: {activeObj.targetDate}</span>
            </div>
          </div>

          <div className="py-6 space-y-4">
            <p className="text-base text-gray-100 leading-relaxed">
              {activeObj.description}
            </p>

            {activeObj.keyOutputs && activeObj.keyOutputs.length > 0 && (
              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-3 flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-[#08783D]" />
                  <span>Key Deliverables & National Impact:</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {activeObj.keyOutputs.map((output, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-lg bg-[#051A33]/80 border border-white/10 flex items-start space-x-2.5 text-xs text-gray-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#08783D] shrink-0 mt-0.5" />
                      <span className="leading-snug">{output}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
