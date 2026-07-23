import React, { useState } from 'react';
import { Search, X, ChevronRight } from 'lucide-react';
import {
  PREAMBLE_CLAUSES,
  COLLABORATION_AREAS,
} from '../data/mouData';
import { useProject } from '../context/ProjectContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigateSection,
}) => {
  const [query, setQuery] = useState<string>('');
  const { config } = useProject();

  if (!isOpen) return null;

  const searchTerm = query.toLowerCase().trim();

  // Search results calculation
  const preambleHits = searchTerm
    ? PREAMBLE_CLAUSES.filter(
        (c) =>
          c.title.toLowerCase().includes(searchTerm) ||
          c.content.toLowerCase().includes(searchTerm)
      )
    : [];

  const objectiveHits = searchTerm
    ? config.objectives.filter(
        (o) =>
          o.title.toLowerCase().includes(searchTerm) ||
          o.description.toLowerCase().includes(searchTerm) ||
          (o.keyOutputs && o.keyOutputs.some((k) => k.toLowerCase().includes(searchTerm)))
      )
    : [];

  const collabHits = searchTerm
    ? COLLABORATION_AREAS.filter(
        (a) =>
          a.title.toLowerCase().includes(searchTerm) ||
          a.summary.toLowerCase().includes(searchTerm) ||
          a.details.some((d) => d.toLowerCase().includes(searchTerm))
      )
    : [];

  const signatoryHits = searchTerm
    ? config.signatories.filter(
        (s) =>
          s.name.toLowerCase().includes(searchTerm) ||
          s.titles.toLowerCase().includes(searchTerm) ||
          s.organization.toLowerCase().includes(searchTerm)
      )
    : [];

  const handleSelectResult = (sectionId: string) => {
    onClose();
    onNavigateSection(sectionId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#0A4D8C] border-2 border-[#D4AF37] rounded-2xl w-full max-w-2xl shadow-2xl text-white overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Modal Header & Search Bar */}
        <div className="p-4 bg-[#051A33] border-b border-white/15 flex items-center space-x-3">
          <Search className="w-5 h-5 text-[#D4AF37]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search clauses, members, signatories, objectives..."
            className="w-full bg-transparent border-none text-sm text-white placeholder-gray-400 focus:outline-none"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Tag Suggestions */}
        <div className="px-4 py-2 bg-[#051A33]/80 border-b border-white/10 flex flex-wrap items-center gap-1.5 text-[11px]">
          <span className="text-gray-400">Quick Searches:</span>
          {['KNQF', 'TVETA', 'Registration', 'Quality Assurance', 'Members'].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="bg-[#0A4D8C] hover:bg-[#08783D] text-[#D4AF37] hover:text-white px-2 py-0.5 rounded border border-[#D4AF37]/30 cursor-pointer transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1 text-xs">
          {!searchTerm && (
            <div className="text-center py-10 text-gray-300 space-y-2">
              <Search className="w-10 h-10 mx-auto text-[#D4AF37] opacity-80" />
              <p className="font-semibold">Type a search term above to locate specific portal records.</p>
              <p className="text-gray-400 text-[11px]">
                Search across objectives, preamble recitals, statutory collaboration areas, and project members.
              </p>
            </div>
          )}

          {searchTerm &&
            preambleHits.length === 0 &&
            objectiveHits.length === 0 &&
            collabHits.length === 0 &&
            signatoryHits.length === 0 && (
              <div className="text-center py-10 text-gray-300">
                <p className="font-bold text-base">No matching records found for "{query}".</p>
              </div>
            )}

          {/* Preamble Hits */}
          {preambleHits.length > 0 && (
            <div className="space-y-2">
              <span className="font-bold text-[#D4AF37] uppercase tracking-wider block">
                Preamble Recitals ({preambleHits.length})
              </span>
              {preambleHits.map((p, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelectResult('preamble')}
                  className="p-3 rounded-lg bg-[#051A33] border border-white/10 hover:border-[#D4AF37] cursor-pointer flex items-start justify-between"
                >
                  <div>
                    <span className="font-bold text-white">{p.title}</span>
                    <p className="text-gray-300 text-[11px] mt-0.5 italic">"{p.content}"</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#D4AF37] shrink-0 mt-1" />
                </div>
              ))}
            </div>
          )}

          {/* Objective Hits */}
          {objectiveHits.length > 0 && (
            <div className="space-y-2">
              <span className="font-bold text-[#D4AF37] uppercase tracking-wider block">
                Strategic Objectives ({objectiveHits.length})
              </span>
              {objectiveHits.map((o) => (
                <div
                  key={o.id}
                  onClick={() => handleSelectResult('objectives')}
                  className="p-3 rounded-lg bg-[#051A33] border border-white/10 hover:border-[#D4AF37] cursor-pointer flex items-start justify-between"
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-extrabold text-[#D4AF37]">OBJ {o.number}:</span>
                      <span className="font-bold text-white">{o.title}</span>
                    </div>
                    <p className="text-gray-300 text-[11px] mt-0.5">{o.description}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#D4AF37] shrink-0 mt-1" />
                </div>
              ))}
            </div>
          )}

          {/* Collaboration Hits */}
          {collabHits.length > 0 && (
            <div className="space-y-2">
              <span className="font-bold text-[#D4AF37] uppercase tracking-wider block">
                Areas of Collaboration ({collabHits.length})
              </span>
              {collabHits.map((c) => (
                <div
                  key={c.id}
                  onClick={() => handleSelectResult('collaboration')}
                  className="p-3 rounded-lg bg-[#051A33] border border-white/10 hover:border-[#D4AF37] cursor-pointer flex items-start justify-between"
                >
                  <div>
                    <span className="font-bold text-white">PILLAR {c.number}: {c.title}</span>
                    <p className="text-gray-300 text-[11px] mt-0.5">{c.summary}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#D4AF37] shrink-0 mt-1" />
                </div>
              ))}
            </div>
          )}

          {/* Signatory Hits */}
          {signatoryHits.length > 0 && (
            <div className="space-y-2">
              <span className="font-bold text-[#D4AF37] uppercase tracking-wider block">
                Members & Signatories ({signatoryHits.length})
              </span>
              {signatoryHits.map((s) => (
                <div
                  key={s.id}
                  onClick={() => handleSelectResult('signatories')}
                  className="p-3 rounded-lg bg-[#051A33] border border-white/10 hover:border-[#D4AF37] cursor-pointer flex items-start justify-between"
                >
                  <div>
                    <span className="font-bold text-white">{s.name}</span>
                    <p className="text-gray-300 text-[11px] mt-0.5">{s.titles} • {s.organization}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#D4AF37] shrink-0 mt-1" />
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
