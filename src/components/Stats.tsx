import React, { useState, useEffect, useRef } from 'react';
import { Building2, Users, CalendarDays, Award, TrendingUp } from 'lucide-react';
import { useProject } from '../context/ProjectContext';

export const Stats: React.FC = () => {
  const { config } = useProject();
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const getIcon = (index: number) => {
    switch (index % 4) {
      case 0:
        return <Building2 className="w-8 h-8 text-[#D4AF37]" />;
      case 1:
        return <Users className="w-8 h-8 text-[#08783D]" />;
      case 2:
        return <CalendarDays className="w-8 h-8 text-[#B51D28]" />;
      case 3:
      default:
        return <Award className="w-8 h-8 text-[#0A4D8C] dark:text-[#D4AF37]" />;
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative -mt-10 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {config.stats.map((stat, idx) => {
          const displayVal = `${stat.prefix || ''}${stat.number.toLocaleString()}${stat.suffix || ''}`;

          return (
            <div
              key={idx}
              className="bg-white dark:bg-[#0A2B4C] rounded-xl p-6 shadow-xl border-t-4 border-[#D4AF37] border-x border-b border-gray-100 dark:border-gray-700/60 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-[#F5F7FA] dark:bg-[#051A33] border border-[#D4AF37]/30 group-hover:scale-110 transition-transform">
                  {getIcon(idx)}
                </div>
                <div className="flex items-center text-[10px] font-bold text-[#08783D] bg-emerald-50 dark:bg-emerald-950/40 px-2 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/50">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  National Scope
                </div>
              </div>

              <div className="font-serif-heading text-3xl sm:text-4xl font-extrabold text-[#0A4D8C] dark:text-[#D4AF37] tracking-tight mb-1">
                {displayVal}
              </div>

              <h3 className="text-sm font-bold text-[#0E1F38] dark:text-white mb-1">
                {stat.label}
              </h3>

              <p className="text-xs text-gray-600 dark:text-gray-300 leading-snug">
                {stat.sublabel}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
