export interface NavItem {
  id: string;
  label: string;
}

export interface StatItem {
  number: number;
  suffix: string;
  prefix?: string;
  label: string;
  sublabel: string;
}

export interface ObjectiveItem {
  id: string;
  number: string;
  title: string;
  description: string;
  targetDate: string;
  keyOutputs: string[];
}

export interface CollaborationArea {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  summary: string;
  details: string[];
  leadAgencies: string[];
}

export interface GovernanceLevel {
  id: string;
  level: string;
  title: string;
  chair: string;
  frequency: string;
  description: string;
  responsibilities: string[];
  members: string[];
}

export interface TimelineMilestone {
  year: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  status: 'Initiated' | 'In Progress' | 'Target' | 'Finalization';
}

export interface Signatory {
  id: string;
  name: string;
  titles: string;
  organization: string;
  group: 'GOVERNMENT OF KENYA' | 'ALLIANCE OF THEOLOGICAL SCHOOLS';
  roleTitle: string;
  signedDate?: string;
}

export interface PartnerAgency {
  id: string;
  code: string;
  name: string;
  category: string;
  roleDescription: string;
  mandate: string;
  badgeColor: string;
  website?: string;
}

export interface DocumentPage {
  pageNumber: number;
  title: string;
  contentSummary: string;
  textExtract: string;
}

export interface HeroSlide {
  id: number;
  image: string;
  badge: string;
  title: string;
  subtitle: string;
  animationStyle?: 'staggered' | 'cascade' | 'diagonal' | 'spring' | 'auto';
}
