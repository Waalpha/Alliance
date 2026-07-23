import {
  NavItem,
  StatItem,
  ObjectiveItem,
  CollaborationArea,
  GovernanceLevel,
  TimelineMilestone,
  Signatory,
  PartnerAgency,
  DocumentPage,
} from '../types';

export const NAVIGATION_ITEMS: NavItem[] = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About Framework' },
  { id: 'preamble', label: 'Preamble' },
  { id: 'objectives', label: 'Objectives' },
  { id: 'collaboration', label: 'Collaboration' },
  { id: 'roles', label: 'Roles' },
  { id: 'governance', label: 'Governance' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'signatories', label: 'Members & Signatories' },
  { id: 'partners', label: 'Partners' },
];

export const STATS_DATA: StatItem[] = [
  {
    number: 500,
    suffix: '+',
    label: 'Theological Institutions',
    sublabel: 'Across all 47 counties in Kenya',
  },
  {
    number: 60000,
    suffix: '+',
    label: 'Students Trained Annually',
    sublabel: 'Enrolled in certificate, diploma & degree programs',
  },
  {
    number: 5,
    suffix: ' YEARS',
    label: 'Collaboration Framework',
    sublabel: '2026 – 2031 National Operational Agreement',
  },
  {
    number: 10,
    prefix: 'KNQF ',
    suffix: ' Level Align',
    label: 'Target Qualification Alignment',
    sublabel: 'Standardized from Level 4 to Level 10 (Doctorate)',
  },
];

export const PREAMBLE_CLAUSES = [
  {
    title: 'Role of Theological Education',
    content:
      'WHEREAS theological education plays a critical role in moral formation, spiritual leadership, and national development in the Republic of Kenya;',
  },
  {
    title: 'Institutional Scale & Scope',
    content:
      'WHEREAS there are over 500 theological institutions in Kenya training in excess of 60,000 students annually;',
  },
  {
    title: 'Harmonization & Qualification Need',
    content:
      'WHEREAS there is a need to harmonize standards, ensure quality assurance, and align theological programs to the Kenya National Qualifications Framework (KNQF);',
  },
  {
    title: 'Government Regulatory Mandate',
    content:
      'WHEREAS the Government of Kenya through the Ministry of Education, TVETA, CUE, and KNQA is mandated to regulate, register, and assure quality in education and training;',
  },
  {
    title: 'Representation of ATS-Kenya',
    content:
      'WHEREAS ATS-Kenya is the Alliance of Theological Schools in Kenya representing theological institutions in Kenya.',
  },
];

export const OBJECTIVES_DATA: ObjectiveItem[] = [
  {
    id: 'obj-1',
    number: '01',
    title: 'Registration & Legal Compliance',
    description:
      'Ensure full registration and legal compliance of theological institutions by 31 December 2027.',
    targetDate: '31 December 2027',
    keyOutputs: [
      'Comprehensive institutional census and mapping',
      'Legal compliance clinics across 8 regional hubs',
      'Fast-track registration portal with TVETA & CUE',
    ],
  },
  {
    id: 'obj-2',
    number: '02',
    title: 'KNQF Program Alignment',
    description:
      'Align all theological programs to KNQF Levels 4–10 by December 2028.',
    targetDate: 'December 2028',
    keyOutputs: [
      'Harmonized curriculum benchmarks for Certificate to PhD',
      'National Credit Accumulation and Transfer (CAT) guidelines',
      'Standardized learning outcomes taxonomy',
    ],
  },
  {
    id: 'obj-3',
    number: '03',
    title: 'Joint Quality Assurance Framework',
    description:
      'Establish and operationalize a joint Quality Assurance framework across all member institutions.',
    targetDate: 'Continuous (Bi-annual audits)',
    keyOutputs: [
      'Joint QA Peer Review teams',
      'Operationalization of ATS-Kenya Internal QA Directorate',
      'Institutional accreditation standard operating procedures',
    ],
  },
  {
    id: 'obj-4',
    number: '04',
    title: 'Capacity Building & Digitalization',
    description:
      'Enhance institutional and human capacity in theological education through training and digital tools.',
    targetDate: 'Annual Milestones (2026–2031)',
    keyOutputs: [
      'Annual Leadership & Administration Masterclasses',
      'Faculty Academic Qualification Upgrades',
      'E-learning & Digital Resource Sharing Platform',
    ],
  },
  {
    id: 'obj-5',
    number: '05',
    title: 'Graduate Recognition & Employability',
    description:
      'Secure national recognition and improved employability of theology graduates across public and private sectors.',
    targetDate: 'December 2029',
    keyOutputs: [
      'National registry for accredited theology graduates',
      'Formal recognition for Disciplined Forces & Hospital Chaplaincy',
      'Civil service qualification equivalency guidelines',
    ],
  },
];

export const COLLABORATION_AREAS: CollaborationArea[] = [
  {
    id: 'collab-1',
    number: '01',
    title: 'REGISTRATION & LEGAL COMPLIANCE',
    subtitle: 'Streamlining Statutory Registration & Governance Standards',
    summary:
      'Joint mapping, legal clinics and fast-tracking of registration with TVETA and CUE.',
    details: [
      'Conducting a national baseline survey and database creation of all theological colleges.',
      'Hosting decentralized legal advisory clinics for non-compliant institutions.',
      'Creation of expedited approval pathways for established theological seminaries.',
      'Regular advisory bulletins on statutory tax, land, and governance compliance.',
    ],
    leadAgencies: ['TVETA', 'CUE', 'ATS-Kenya'],
  },
  {
    id: 'collab-2',
    number: '02',
    title: 'CURRICULUM DEVELOPMENT & KNQF ALIGNMENT',
    subtitle: 'Standardizing Theological Curricula to National Qualification Levels',
    summary:
      'Development of National Guidelines and alignment of all programs to KNQF.',
    details: [
      'Formulation of standardized National Competency Standards for theology courses.',
      'Mapping Certificate (KNQF Level 4/5), Diploma (Level 6), Degree (Level 7), Master (Level 8/9), and Doctorate (Level 10).',
      'Integration of national core subjects: peacebuilding, civic ethics, digital skills, and community welfare.',
      'Recognition of Prior Learning (RPL) pathways for experienced clergy.',
    ],
    leadAgencies: ['KNQA', 'Ministry of Education', 'ATS-Kenya'],
  },
  {
    id: 'collab-3',
    number: '03',
    title: 'QUALITY ASSURANCE',
    subtitle: 'Peer Review, Continuous Monitoring & Institutional Verification',
    summary:
      'Joint QA audits, training of QA officers, and establishment of an ATS-Kenya Internal QA Directorate.',
    details: [
      'Setup of an autonomous ATS-Kenya Quality Assurance Directorate.',
      'Deploying joint institutional evaluation panels comprising regulatory officers and academic experts.',
      'Publishing annual national theological education compliance reports.',
      'Formulating code of ethics and academic integrity standards.',
    ],
    leadAgencies: ['TVETA', 'CUE', 'KNQA', 'ATS-Kenya'],
  },
  {
    id: 'collab-4',
    number: '04',
    title: 'CAPACITY BUILDING',
    subtitle: 'Empowering Faculty, Leadership & Institutional Infrastructure',
    summary:
      'Annual training for principals, lecturer qualification upgrades, and digital transformation.',
    details: [
      'Executive leadership development programs for Seminary Principals and Deans.',
      'Facilitating faculty postgraduate fellowship programs.',
      'Digitalization of academic management systems and library repositories.',
      'Research grants and scholarly publishing collaboration.',
    ],
    leadAgencies: ['Ministry of Education', 'ATS-Kenya'],
  },
  {
    id: 'collab-5',
    number: '05',
    title: 'RECOGNITION & DATA SHARING',
    subtitle: 'Integration into National Manpower Statistics & Sector Planning',
    summary:
      'Framework for recognition of graduates in public service, chaplaincy and NGOs. Joint data reporting to KNBS and the Ministry of Education.',
    details: [
      'Formal recognition of harmonized degrees for KDF, National Police, Kenya Prisons, and Hospital Chaplaincy roles.',
      'Direct data integration with the Kenya National Bureau of Statistics (KNBS).',
      'Placement of verified graduates on the National Qualifications Database.',
      'Bi-annual inter-ministerial policy consultative conferences.',
    ],
    leadAgencies: ['KNQA', 'Ministry of Education', 'KNBS', 'ATS-Kenya'],
  },
];

export const GOVERNMENT_ROLES = [
  'Provide policy guidance and regulatory oversight across all educational tiers',
  'Conduct joint technical support and Quality Assurance audits across theological institutions',
  'Recognize qualifications placed within the Kenya National Qualifications Framework (KNQF)',
  'Facilitate inter-agency stakeholder engagement forums and legal support',
  'Streamline registration and accreditation applications submitted by ATS-Kenya member institutions',
];

export const ATS_KENYA_ROLES = [
  'Mobilize member institutions for statutory compliance, quality standards, and data reporting',
  'Coordinate capacity building, faculty development, and internal quality assurance mechanisms',
  'Develop and submit structured proposals for curriculum harmonization and KNQF credit alignment',
  'Implement resolutions and guidelines issued by the Joint Steering Committee',
  'Maintain an up-to-date national registry of affiliated theological institutions and faculties',
];

export const GOVERNANCE_HIERARCHY: GovernanceLevel[] = [
  {
    id: 'jsc',
    level: 'TOP GOVERNING BODY',
    title: 'JOINT STEERING COMMITTEE (JSC)',
    chair: 'Principal Secretary, State Department for Higher Education',
    frequency: 'Bi-annually (Twice per year)',
    description:
      'The supreme policy-making body responsible for overarching strategic guidance, policy approvals, and inter-agency resolution.',
    responsibilities: [
      'Provide national policy direction and strategic oversight',
      'Approve annual implementation roadmaps and joint budgets',
      'Receive quarterly progress reports from the Technical Working Group',
      'Adjudicate and resolve escalated operational challenges',
    ],
    members: [
      'Principal Secretary, Higher Education (Chair)',
      'Director General, TVETA',
      'CEO, Commission for University Education (CUE)',
      'Director General, KNQA',
      'National Chairman, ATS-Kenya',
      'Executive Director, ATS-Kenya',
    ],
  },
  {
    id: 'twg',
    level: 'OPERATIONAL IMPLEMENTATION BODY',
    title: 'TECHNICAL WORKING GROUP (TWG)',
    chair: 'Executive Director, ATS-Kenya',
    frequency: 'Quarterly (4 times per year)',
    description:
      'The operational engine tasked with carrying out curriculum alignment, joint audits, capacity workshops, and technical reporting.',
    responsibilities: [
      'Execute work plans approved by the Joint Steering Committee',
      'Draft national theological curriculum benchmarks and KNQF mapping docs',
      'Coordinate institutional site visits and quality inspection panels',
      'Prepare technical progress briefs for JSC review',
    ],
    members: [
      'Executive Director, ATS-Kenya (Chair)',
      'Technical Directors from TVETA, CUE, and KNQA',
      'Academic Deans Representative from ATS-Kenya',
      'Legal & Compliance Officers',
      'Secretariat Rapporteurs',
    ],
  },
  {
    id: 'secretariat',
    level: 'ADMINISTRATIVE ENGINE',
    title: 'ATS-KENYA SECRETARIAT',
    chair: 'Head of Secretariat, ATS-Kenya',
    frequency: 'Daily Continuous Operations',
    description:
      'Serves as the administrative anchor, managing daily communications, document archiving, logistics, and member liaison.',
    responsibilities: [
      'Coordinate logistics for JSC and TWG meetings and field visits',
      'Manage the central database of institutions and registered theology programs',
      'Publish public compliance advisories and stakeholder bulletins',
      'Handle public inquiries and institutional registration assistance',
    ],
    members: [
      'ATS-Kenya Executive Team',
      'Database & Data Analytics Specialists',
      'Administrative Support Staff',
      'Helpdesk & Institutional Officers',
    ],
  },
];

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    year: '2026',
    title: 'ACCORD COMMENCEMENT & LAUNCH',
    tagline: 'Signing, Governance Setup & National Mapping',
    description:
      'Official signing ceremony on 14 August 2026. Inauguration of the Joint Steering Committee and Technical Working Group, followed by a nationwide institutional census.',
    deliverables: [
      'Execution of 5-year Partnership Agreement',
      'Inaugural Joint Steering Committee Meeting',
      'Launch of National Theological Institutions Portal',
      'Mapping of 500+ theological schools',
    ],
    status: 'Initiated',
  },
  {
    year: '2027',
    title: 'REGISTRATION & LEGAL COMPLIANCE',
    tagline: 'Statutory Alignment Deadline',
    description:
      'Target for all unaccredited or provisionally registered theological colleges to achieve full legal registration with TVETA or CUE by 31 December 2027.',
    deliverables: [
      'Legal clinics in 8 regional administrative clusters',
      'Fast-track registration of 200+ colleges',
      'Compliance status publishing on Government Portal',
      'Establishment of ATS-Kenya Internal QA Directorate',
    ],
    status: 'Target',
  },
  {
    year: '2028',
    title: 'KNQF ALIGNMENT & MID-TERM REVIEW',
    tagline: 'Curriculum Standard & Progress Audit',
    description:
      'Complete mapping of all theological programs to KNQF Levels 4–10. Comprehensive mid-term performance evaluation by the Joint Steering Committee.',
    deliverables: [
      'Publication of Harmonized Theological Curriculum Guidelines',
      'KNQF Level 4–10 Certification Index',
      'Mid-Term Performance Audit Report',
      'National Theological Education Symposium',
    ],
    status: 'In Progress',
  },
  {
    year: '2031',
    title: 'FRAMEWORK CONCLUSION & EXTENSION',
    tagline: 'Comprehensive Evaluation & Future Roadmap',
    description:
      'Final five-year evaluation report submitted to the Cabinet Secretary for Education. Assessment of sector transformation and execution of renewal options.',
    deliverables: [
      'National Impact & Sector Transformation Report',
      'Complete KNQF National Register for Theological Faculty',
      'Evaluation of Graduate Employability Rates',
      'Partnership Renewal & Extension Framework 2031–2036',
    ],
    status: 'Finalization',
  },
];

export const SIGNATORIES_DATA: Signatory[] = [
  {
    id: 'sig-1',
    name: 'Dr. Salome Muhia, CBS, PhD',
    titles: 'Principal Secretary',
    organization: 'State Department for Higher Education',
    group: 'GOVERNMENT OF KENYA',
    roleTitle: 'Ministry of Education',
    signedDate: '14 August 2026',
  },
  {
    id: 'sig-2',
    name: 'Dr. Kipkirui Langat, PhD',
    titles: 'Director General',
    organization: 'Technical and Vocational Education and Training Authority',
    group: 'GOVERNMENT OF KENYA',
    roleTitle: 'TVETA Regulatory Authority',
    signedDate: '14 August 2026',
  },
  {
    id: 'sig-3',
    name: 'Prof. Mike Kuria, PhD',
    titles: 'Chief Executive Officer',
    organization: 'Commission for University Education',
    group: 'GOVERNMENT OF KENYA',
    roleTitle: 'CUE University Regulator',
    signedDate: '14 August 2026',
  },
  {
    id: 'sig-4',
    name: 'Dr. Alice Kande, PhD',
    titles: 'Director General',
    organization: 'Kenya National Qualifications Authority',
    group: 'GOVERNMENT OF KENYA',
    roleTitle: 'KNQA Framework Custodian',
    signedDate: '14 August 2026',
  },
  {
    id: 'sig-5',
    name: 'Prof. Patrick Njuguna Gacheru',
    titles: 'National Chairman',
    organization: 'Alliance of Theological Schools - Kenya',
    group: 'ALLIANCE OF THEOLOGICAL SCHOOLS',
    roleTitle: 'ATS-Kenya National Governing Council',
    signedDate: '14 August 2026',
  },
  {
    id: 'sig-6',
    name: 'Executive Director',
    titles: 'Rev. Executive Director',
    organization: 'Alliance of Theological Schools - Kenya',
    group: 'ALLIANCE OF THEOLOGICAL SCHOOLS',
    roleTitle: 'ATS-Kenya Executive Directorate',
    signedDate: '14 August 2026',
  },
];

export const PARTNER_AGENCIES: PartnerAgency[] = [
  {
    id: 'p-moe',
    code: 'MoE',
    name: 'MINISTRY OF EDUCATION',
    category: 'Cabinet Ministry',
    mandate: 'Overall educational policy development, higher education oversight, and sector funding.',
    roleDescription: 'Chairs the Joint Steering Committee via the State Department for Higher Education.',
    badgeColor: '#0A4D8C',
    website: 'https://education.go.ke',
  },
  {
    id: 'p-tveta',
    code: 'TVETA',
    name: 'TECHNICAL AND VOCATIONAL EDUCATION AND TRAINING AUTHORITY',
    category: 'State Regulatory Authority',
    mandate: 'Regulating, inspecting, and registering technical and vocational institutions and certificate/diploma programs.',
    roleDescription: 'Fast-tracks TVET level theological college registration and curriculum verification.',
    badgeColor: '#08783D',
    website: 'https://www.tveta.go.ke',
  },
  {
    id: 'p-cue',
    code: 'CUE',
    name: 'COMMISSION FOR UNIVERSITY EDUCATION',
    category: 'State Regulatory Commission',
    mandate: 'Recognizing, accrediting, and monitoring degree-granting universities and theological university colleges.',
    roleDescription: 'Oversees degree, post-graduate, and seminary university college affiliations.',
    badgeColor: '#051A33',
    website: 'https://www.cue.or.ke',
  },
  {
    id: 'p-knqa',
    code: 'KNQA',
    name: 'KENYA NATIONAL QUALIFICATIONS AUTHORITY',
    category: 'National Qualifications Custodian',
    mandate: 'Establishing and maintaining the Kenya National Qualifications Framework (KNQF) for qualification alignment and credit transfer.',
    roleDescription: 'Aligns theological certificates, diplomas, and degrees from Level 4 to Level 10.',
    badgeColor: '#B51D28',
    website: 'https://www.knqa.go.ke',
  },
  {
    id: 'p-ats',
    code: 'ATS-KENYA',
    name: 'ALLIANCE OF THEOLOGICAL SCHOOLS – KENYA',
    category: 'National Apex Theological Alliance',
    mandate: 'Representing over 500 theological institutions, seminaries, and Bible colleges across Kenya.',
    roleDescription: 'Mobilizes member schools, leads capacity building, and operates the collaboration Secretariat.',
    badgeColor: '#D4AF37',
  },
];

export const DOCUMENT_PAGES: DocumentPage[] = [
  {
    pageNumber: 1,
    title: 'Title Page & Preamble Clauses',
    contentSummary: 'Header, Parties involved, Background context, Recitals 1 to 5',
    textExtract:
      'REPUBLIC OF KENYA • MINISTRY OF EDUCATION • STRATEGIC PARTNERSHIP FRAMEWORK BETWEEN THE GOVERNMENT OF KENYA AND ALLIANCE OF THEOLOGICAL SCHOOLS - KENYA. Subject: Collaboration in Harmonizing Theological Education for Quality, Compliance and National Development. Date: 14th August 2026.',
  },
  {
    pageNumber: 2,
    title: 'Strategic Objectives & Collaboration Areas',
    contentSummary: 'Objectives 01-05, Collaboration Pillars 1 & 2',
    textExtract:
      'ARTICLE 1: OBJECTIVES. The primary objectives are: 1. Full legal registration by 31 Dec 2027; 2. Alignment to KNQF Levels 4-10; 3. Joint Quality Assurance framework; 4. Capacity building; 5. National recognition of theology graduates.',
  },
  {
    pageNumber: 3,
    title: 'Roles, Governance & Steering Committee',
    contentSummary: 'Government obligations, ATS-Kenya obligations, JSC & TWG structure',
    textExtract:
      'ARTICLE 2: ROLES & RESPONSIBILITIES. Government shall provide policy oversight and QA support. ATS-Kenya shall mobilize member institutions. ARTICLE 3: GOVERNANCE. Joint Steering Committee chaired by PS Higher Education meeting bi-annually.',
  },
  {
    pageNumber: 4,
    title: 'Funding, Timeline, Disputes & Signatures',
    contentSummary: 'Resource mobilization, Dispute resolution, Termination, Official Seal & Signatures',
    textExtract:
      'ARTICLE 4: FUNDING & RESOURCES. Parties shall jointly mobilize resources. ARTICLE 5: SIGNATORIES. Signed on 14 August 2026 by Dr. Salome Muhia, Dr. Kipkirui Langat, Prof. Mike Kuria, Dr. Alice Kande, Prof. Patrick Njuguna Gacheru, and Executive Director ATS-Kenya.',
  },
];
