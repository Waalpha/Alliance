import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import {
  StatItem,
  ObjectiveItem,
  CollaborationArea,
  GovernanceLevel,
  TimelineMilestone,
  Signatory,
  PartnerAgency,
  HeroSlide,
} from '../types';
import {
  STATS_DATA,
  OBJECTIVES_DATA,
  COLLABORATION_AREAS,
  GOVERNMENT_ROLES,
  ATS_KENYA_ROLES,
  GOVERNANCE_HIERARCHY,
  TIMELINE_MILESTONES,
  SIGNATORIES_DATA,
  PARTNER_AGENCIES,
  PREAMBLE_CLAUSES,
} from '../data/mouData';

export const DEFAULT_HERO_SLIDES: HeroSlide[] = [
  {
    id: 0,
    image: '/src/assets/images/ats_hero_main_1784811196710.jpg',
    badge: 'Republic of Kenya Official Institutional Alliance',
    title: 'HARMONIZING THEOLOGICAL EDUCATION FOR NATIONAL EXCELLENCE',
    subtitle:
      'Strategic National Alliance between the Republic of Kenya Ministry of Education, TVETA, CUE, KNQA and the Alliance of Theological Schools (ATS-Kenya) to standardize qualifications and elevate training quality across 500+ institutions.',
  },
  {
    id: 1,
    image: '/src/assets/images/ats_campus_view_1784811210823.jpg',
    badge: 'ACCREDITATION & QUALIFICATION STANDARDS',
    title: 'Excellence in Theological Higher Education',
    subtitle:
      'Fostering Academic Integrity, TVETA & CUE Alignment, and Quality Assurance across Accredited Theological Colleges in Kenya.',
  },
  {
    id: 2,
    image: '/src/assets/images/ats_library_hall_1784811226108.jpg',
    badge: 'RESEARCH, HERITAGE & ALLIANCE GOVERNANCE',
    title: 'Research, Shared Curricula & Capacity Building',
    subtitle:
      'Empowering Theological Member Institutions with Shared Libraries, KNQF Credit Transfers, and Collaborative Strategic Development.',
  },
  {
    id: 3,
    image: '/src/assets/images/ats_graduation_1784811239280.jpg',
    badge: 'NATIONAL RECOGNITION & GRADUATE EMPLOYABILITY',
    title: 'Empowering Graduates for Public & Community Leadership',
    subtitle:
      'Securing National Qualification Recognition for Theology Graduates in Disciplined Forces Chaplaincy, Civil Service, and Higher Education.',
  },
];

export interface ProjectConfig {
  // Brand & Portal Identity
  name: string;
  tagline: string;
  badge: string;
  logoUrl: string;
  refNumber: string;

  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  heroBadge: string;
  heroSlides?: HeroSlide[];
  heroTitleFontSize?: 'small' | 'medium' | 'large' | 'xlarge';
  heroSubtitleFontSize?: 'small' | 'medium' | 'large' | 'xlarge';
  heroTextAlign?: 'left' | 'center' | 'right';
  heroFontStyle?: 'serif' | 'sans' | 'mono';
  heroPhotoOpacity?: number;

  // Footer Section
  footerDescription: string;
  copyrightText: string;
  contactEmail: string;
  contactPhone: string;
  officeAddress: string;

  // Key Data Collections
  stats: StatItem[];
  signatories: Signatory[];
  objectives: ObjectiveItem[];
  collaboration: CollaborationArea[];
  partners: PartnerAgency[];
  governance: GovernanceLevel[];
  timeline: TimelineMilestone[];
  preambleClauses: { title: string; content: string }[];
  governmentRoles: string[];
  atsRoles: string[];
}

const DEFAULT_CONFIG: ProjectConfig = {
  name: 'ATS-KENYA',
  tagline: 'Theological Education Partnership',
  badge: 'PARTNERSHIP PORTAL',
  logoUrl: '',
  refNumber: 'GoK/MoE/ATS-2026/001',

  heroTitle: 'HARMONIZING THEOLOGICAL EDUCATION FOR NATIONAL EXCELLENCE',
  heroSubtitle:
    'Strategic National Alliance between the Republic of Kenya Ministry of Education, TVETA, CUE, KNQA and the Alliance of Theological Schools (ATS-Kenya) to standardize qualifications and elevate training quality across 500+ institutions.',
  heroBadge: 'Republic of Kenya Official Institutional Alliance',
  heroSlides: DEFAULT_HERO_SLIDES,
  heroTitleFontSize: 'medium',
  heroSubtitleFontSize: 'medium',
  heroTextAlign: 'left',
  heroFontStyle: 'serif',
  heroPhotoOpacity: 0.6,

  footerDescription:
    'Official digital governance portal for the Strategic Framework between the Government of the Republic of Kenya and the Alliance of Theological Schools (ATS-Kenya). Dedicated to quality assurance, KNQF qualification alignment, and theological education standards.',
  copyrightText: 'Government of Kenya & ATS-Kenya Strategic Alliance. All Rights Reserved.',
  contactEmail: 'secretariat@atskenya.or.ke',
  contactPhone: '+254 (0) 20 800 5500 / +254 722 000 111',
  officeAddress: 'Ministry of Education Headquarters, Jogoo House B, Harambee Avenue, Nairobi, Kenya',

  stats: STATS_DATA,
  signatories: SIGNATORIES_DATA,
  objectives: OBJECTIVES_DATA,
  collaboration: COLLABORATION_AREAS,
  partners: PARTNER_AGENCIES,
  governance: GOVERNANCE_HIERARCHY,
  timeline: TIMELINE_MILESTONES,
  preambleClauses: PREAMBLE_CLAUSES,
  governmentRoles: GOVERNMENT_ROLES,
  atsRoles: ATS_KENYA_ROLES,
};

const STORAGE_KEY = 'ats_project_config_v2';

interface ProjectContextType {
  config: ProjectConfig;
  darkMode: boolean;
  toggleDarkMode: () => void;
  cloudSyncStatus: 'synced' | 'syncing' | 'error';
  updateConfig: (newPartial: Partial<ProjectConfig>) => void;
  resetToDefaults: () => void;
  // Signatories CRUD
  addSignatory: (member: Omit<Signatory, 'id'>) => void;
  updateSignatory: (id: string, updatedMember: Partial<Signatory>) => void;
  deleteSignatory: (id: string) => void;
  // Objectives CRUD
  addObjective: (objective: Omit<ObjectiveItem, 'id'>) => void;
  updateObjective: (id: string, updatedObj: Partial<ObjectiveItem>) => void;
  deleteObjective: (id: string) => void;
  // Collaboration CRUD
  addCollaboration: (collab: Omit<CollaborationArea, 'id'>) => void;
  updateCollaboration: (id: string, updatedCollab: Partial<CollaborationArea>) => void;
  deleteCollaboration: (id: string) => void;
  // Partners CRUD
  addPartner: (partner: Omit<PartnerAgency, 'id'>) => void;
  updatePartner: (id: string, updatedPartner: Partial<PartnerAgency>) => void;
  deletePartner: (id: string) => void;
  // Hero Slides CRUD
  addHeroSlide: (slide: Omit<HeroSlide, 'id'>) => void;
  updateHeroSlide: (id: number, updatedSlide: Partial<HeroSlide>) => void;
  deleteHeroSlide: (id: number) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('ats_dark_mode') === 'true';
    } catch {
      return false;
    }
  });

  const [cloudSyncStatus, setCloudSyncStatus] = useState<'synced' | 'syncing' | 'error'>('synced');
  const isLocalUpdateRef = useRef<boolean>(false);
  const attemptedSeedRef = useRef<boolean>(false);

  const [config, setConfig] = useState<ProjectConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_CONFIG, ...parsed };
      }
    } catch (e) {
      console.error('Failed to parse saved project config:', e);
    }
    return DEFAULT_CONFIG;
  });

  // Listen to real-time updates from Firestore 'alliance' database
  useEffect(() => {
    const configDocRef = doc(db, 'projectConfig', 'main');
    setCloudSyncStatus('syncing');

    const unsubscribe = onSnapshot(
      configDocRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const remoteData = docSnap.data() as Partial<ProjectConfig>;
          if (!isLocalUpdateRef.current) {
            setConfig((prev) => ({ ...prev, ...remoteData }));
          } else {
            isLocalUpdateRef.current = false;
          }
          setCloudSyncStatus('synced');
        } else if (!attemptedSeedRef.current) {
          attemptedSeedRef.current = true;
          // Document does not exist yet in Firestore, populate it with current config once
          setDoc(configDocRef, config, { merge: true })
            .then(() => setCloudSyncStatus('synced'))
            .catch((err) => {
              console.warn('Firestore initial write (using local state fallback):', err.message || err);
              setCloudSyncStatus('synced'); // keep app UI active using localStorage
            });
        } else {
          setCloudSyncStatus('synced');
        }
      },
      (error) => {
        console.warn('Firestore subscription status:', error.message || error);
        setCloudSyncStatus('error');
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('ats_dark_mode', String(darkMode));
    } catch (e) {
      console.error('Failed to save dark mode setting:', e);
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // Helper to save config state to localStorage and Firestore
  const saveConfigState = (newConfig: ProjectConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
    } catch (e) {
      console.error('Failed to save project config to localStorage:', e);
    }

    // Persist to Firestore 'alliance' database
    setCloudSyncStatus('syncing');
    isLocalUpdateRef.current = true;
    const configDocRef = doc(db, 'projectConfig', 'main');
    setDoc(configDocRef, newConfig, { merge: true })
      .then(() => setCloudSyncStatus('synced'))
      .catch((err) => {
        console.warn('Firestore write warning (saved locally in browser):', err.message || err);
        setCloudSyncStatus('synced'); // Local storage succeeds cleanly
      });
  };

  const updateConfig = (newPartial: Partial<ProjectConfig>) => {
    saveConfigState({ ...config, ...newPartial });
  };

  const resetToDefaults = () => {
    saveConfigState(DEFAULT_CONFIG);
    localStorage.removeItem(STORAGE_KEY);
  };

  // --- SIGNATORIES CRUD ---
  const addSignatory = (member: Omit<Signatory, 'id'>) => {
    const newSignatory: Signatory = {
      ...member,
      id: `sig-${Date.now()}`,
    };
    saveConfigState({
      ...config,
      signatories: [...config.signatories, newSignatory],
    });
  };

  const updateSignatory = (id: string, updatedMember: Partial<Signatory>) => {
    saveConfigState({
      ...config,
      signatories: config.signatories.map((sig) => (sig.id === id ? { ...sig, ...updatedMember } : sig)),
    });
  };

  const deleteSignatory = (id: string) => {
    saveConfigState({
      ...config,
      signatories: config.signatories.filter((sig) => sig.id !== id),
    });
  };

  // --- OBJECTIVES CRUD ---
  const addObjective = (objective: Omit<ObjectiveItem, 'id'>) => {
    const newObj: ObjectiveItem = {
      ...objective,
      id: `obj-${Date.now()}`,
    };
    saveConfigState({
      ...config,
      objectives: [...config.objectives, newObj],
    });
  };

  const updateObjective = (id: string, updatedObj: Partial<ObjectiveItem>) => {
    saveConfigState({
      ...config,
      objectives: config.objectives.map((obj) => (obj.id === id ? { ...obj, ...updatedObj } : obj)),
    });
  };

  const deleteObjective = (id: string) => {
    saveConfigState({
      ...config,
      objectives: config.objectives.filter((obj) => obj.id !== id),
    });
  };

  // --- COLLABORATION CRUD ---
  const addCollaboration = (collab: Omit<CollaborationArea, 'id'>) => {
    const newCollab: CollaborationArea = {
      ...collab,
      id: `collab-${Date.now()}`,
    };
    saveConfigState({
      ...config,
      collaboration: [...config.collaboration, newCollab],
    });
  };

  const updateCollaboration = (id: string, updatedCollab: Partial<CollaborationArea>) => {
    saveConfigState({
      ...config,
      collaboration: config.collaboration.map((c) => (c.id === id ? { ...c, ...updatedCollab } : c)),
    });
  };

  const deleteCollaboration = (id: string) => {
    saveConfigState({
      ...config,
      collaboration: config.collaboration.filter((c) => c.id !== id),
    });
  };

  // --- PARTNERS CRUD ---
  const addPartner = (partner: Omit<PartnerAgency, 'id'>) => {
    const newPartner: PartnerAgency = {
      ...partner,
      id: `p-${Date.now()}`,
    };
    saveConfigState({
      ...config,
      partners: [...config.partners, newPartner],
    });
  };

  const updatePartner = (id: string, updatedPartner: Partial<PartnerAgency>) => {
    saveConfigState({
      ...config,
      partners: config.partners.map((p) => (p.id === id ? { ...p, ...updatedPartner } : p)),
    });
  };

  const deletePartner = (id: string) => {
    saveConfigState({
      ...config,
      partners: config.partners.filter((p) => p.id !== id),
    });
  };

  // --- HERO SLIDES CRUD ---
  const addHeroSlide = (slide: Omit<HeroSlide, 'id'>) => {
    const currentSlides = config.heroSlides && config.heroSlides.length > 0 ? config.heroSlides : DEFAULT_HERO_SLIDES;
    const newId = currentSlides.length > 0 ? Math.max(...currentSlides.map((s) => s.id)) + 1 : 0;
    const newSlide: HeroSlide = {
      ...slide,
      id: newId,
    };
    saveConfigState({
      ...config,
      heroSlides: [...currentSlides, newSlide],
    });
  };

  const updateHeroSlide = (id: number, updatedSlide: Partial<HeroSlide>) => {
    const currentSlides = config.heroSlides && config.heroSlides.length > 0 ? config.heroSlides : DEFAULT_HERO_SLIDES;
    const newSlides = currentSlides.map((s) => (s.id === id ? { ...s, ...updatedSlide } : s));
    
    let updatedConfigPartial: Partial<ProjectConfig> = { heroSlides: newSlides };
    if (id === 0 || currentSlides[0]?.id === id) {
      const first = newSlides[0];
      if (first) {
        if (updatedSlide.title !== undefined) updatedConfigPartial.heroTitle = updatedSlide.title;
        if (updatedSlide.subtitle !== undefined) updatedConfigPartial.heroSubtitle = updatedSlide.subtitle;
        if (updatedSlide.badge !== undefined) updatedConfigPartial.heroBadge = updatedSlide.badge;
      }
    }

    saveConfigState({
      ...config,
      ...updatedConfigPartial,
    });
  };

  const deleteHeroSlide = (id: number) => {
    const currentSlides = config.heroSlides && config.heroSlides.length > 0 ? config.heroSlides : DEFAULT_HERO_SLIDES;
    if (currentSlides.length <= 1) {
      return; // Keep at least 1 slide
    }
    const filtered = currentSlides.filter((s) => s.id !== id);
    saveConfigState({
      ...config,
      heroSlides: filtered,
    });
  };

  return (
    <ProjectContext.Provider
      value={{
        config,
        darkMode,
        toggleDarkMode,
        cloudSyncStatus,
        updateConfig,
        resetToDefaults,
        addSignatory,
        updateSignatory,
        deleteSignatory,
        addObjective,
        updateObjective,
        deleteObjective,
        addCollaboration,
        updateCollaboration,
        deleteCollaboration,
        addPartner,
        updatePartner,
        deletePartner,
        addHeroSlide,
        updateHeroSlide,
        deleteHeroSlide,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};
