// Types
export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  domain: string;
  type: string;
  matchScore: number;
  daysUntilDeadline: number;
  description: string;
  location: string;
  format: string;
  skills: string[];
  eligibility: string;
}

export interface ApplicationStep {
  id: number;
  label: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
}

export interface ApplicationTracker {
  opportunityId: string;
  appliedDate: string | null;
  steps: ApplicationStep[];
  checklist: { item: string; checked: boolean }[];
}

export interface PassportEntry {
  id: string;
  project: string;
  organization: string;
  role: string;
  description: string;
  skills: string[];
  status: 'verified' | 'pending' | 'in-progress';
  verifiedBy: string;
  date: string;
  evidence: string;
  impactMetric: string;
}

export interface UserProfile {
  name: string;
  university: string;
  avatar: string;
  impactScore: number;
  interests: string[];
  completedProjects: number;
  activeChallenges: number;
  hoursContributed: number;
}

// Mock Data
const opportunities: Opportunity[] = [
  {
    id: '1',
    title: 'Climate AI Fellowship',
    organization: 'Global Climate Initiative',
    domain: 'Climate & AI',
    type: 'Fellowship',
    matchScore: 92,
    daysUntilDeadline: 8,
    description: 'A 12-week research fellowship focused on applying machine learning to climate modeling and sustainability challenges. Work with leading researchers on real-world environmental datasets.',
    location: 'Remote',
    format: 'Remote',
    skills: ['Python', 'Machine Learning', 'Data Analysis', 'Climate Science'],
    eligibility: 'Undergraduate or graduate students with ML experience',
  },
  {
    id: '2',
    title: 'Open Source Summer Code',
    organization: 'Open Source Foundation',
    domain: 'Technology',
    type: 'Internship',
    matchScore: 85,
    daysUntilDeadline: 15,
    description: 'Contribute to impactful open source projects over the summer. Gain mentorship from senior engineers at top tech companies while building software used by millions.',
    location: 'Global',
    format: 'Remote',
    skills: ['Open Source', 'Git', 'JavaScript', 'Documentation'],
    eligibility: 'University students with programming experience',
  },
  {
    id: '3',
    title: 'Local Tech Volunteer Program',
    organization: 'Community Tech Alliance',
    domain: 'Community',
    type: 'Volunteering',
    matchScore: 99,
    daysUntilDeadline: 3,
    description: 'Teach digital literacy and basic coding to underserved communities in your city. Lead workshops, mentor students, and help bridge the digital divide locally.',
    location: 'In-Person',
    format: 'Hybrid',
    skills: ['Teaching', 'Web Development', 'Communication', 'Mentoring'],
    eligibility: 'Open to all students with basic tech skills',
  },
  {
    id: '4',
    title: 'Youth Policy Research Lab',
    organization: 'UNESCO Youth Division',
    domain: 'Policy & Research',
    type: 'Research',
    matchScore: 78,
    daysUntilDeadline: 22,
    description: 'Join a cohort of young researchers analyzing youth policy frameworks across 15 countries. Contribute to a published UNESCO report on youth digital participation.',
    location: 'Geneva, Switzerland',
    format: 'Hybrid',
    skills: ['Research', 'Policy Analysis', 'Academic Writing', 'Data Visualization'],
    eligibility: 'Graduate students in social sciences or public policy',
  },
  {
    id: '5',
    title: 'Sustainable Design Hackathon',
    organization: 'Green Futures Collective',
    domain: 'Design & Sustainability',
    type: 'Hackathon',
    matchScore: 88,
    daysUntilDeadline: 11,
    description: 'A 48-hour design sprint focused on creating sustainable product solutions. Teams will prototype circular economy products using recycled materials and digital fabrication.',
    location: 'Berlin, Germany',
    format: 'In-Person',
    skills: ['Product Design', 'Sustainability', 'Prototyping', 'CAD'],
    eligibility: 'Design and engineering students',
  },
];

const applicationTrackers: Record<string, ApplicationTracker> = {
  '1': {
    opportunityId: '1',
    appliedDate: null,
    steps: [
      { id: 1, label: 'Discover', description: 'Found via IMPACT OS match engine', status: 'completed' },
      { id: 2, label: 'Review Requirements', description: 'Check eligibility and gather documents', status: 'current' },
      { id: 3, label: 'Prepare Application', description: 'Complete application form and essays', status: 'upcoming' },
      { id: 4, label: 'Submit', description: 'Submit before deadline', status: 'upcoming' },
      { id: 5, label: 'Participate', description: 'Complete fellowship activities', status: 'upcoming' },
      { id: 6, label: 'Upload Evidence', description: 'Upload project work and outcomes', status: 'upcoming' },
      { id: 7, label: 'Get Verified', description: 'Receive verification for Impact Passport', status: 'upcoming' },
    ],
    checklist: [
      { item: 'Read program description and requirements', checked: true },
      { item: 'Verify eligibility (education level, experience)', checked: true },
      { item: 'Prepare resume / CV', checked: false },
      { item: 'Write statement of interest', checked: false },
      { item: 'Gather academic transcripts', checked: false },
      { item: 'Submit application before deadline', checked: false },
    ],
  },
  '2': {
    opportunityId: '2',
    appliedDate: null,
    steps: [
      { id: 1, label: 'Discover', description: 'Found via IMPACT OS match engine', status: 'completed' },
      { id: 2, label: 'Review Requirements', description: 'Check eligibility and gather documents', status: 'current' },
      { id: 3, label: 'Prepare Application', description: 'Select project and write proposal', status: 'upcoming' },
      { id: 4, label: 'Submit', description: 'Submit before deadline', status: 'upcoming' },
      { id: 5, label: 'Participate', description: 'Contribute code during the program', status: 'upcoming' },
      { id: 6, label: 'Upload Evidence', description: 'Upload PRs, commits, and project work', status: 'upcoming' },
      { id: 7, label: 'Get Verified', description: 'Receive verification for Impact Passport', status: 'upcoming' },
    ],
    checklist: [
      { item: 'Read program description and requirements', checked: true },
      { item: 'Verify eligibility (education level, experience)', checked: false },
      { item: 'Browse available open source projects', checked: false },
      { item: 'Write project proposal', checked: false },
      { item: 'Set up development environment', checked: false },
      { item: 'Submit application before deadline', checked: false },
    ],
  },
  '3': {
    opportunityId: '3',
    appliedDate: '2025-12-01',
    steps: [
      { id: 1, label: 'Discover', description: 'Found via IMPACT OS match engine', status: 'completed' },
      { id: 2, label: 'Review Requirements', description: 'Check eligibility and gather documents', status: 'completed' },
      { id: 3, label: 'Prepare Application', description: 'Complete volunteer registration', status: 'completed' },
      { id: 4, label: 'Submit', description: 'Registration submitted', status: 'completed' },
      { id: 5, label: 'Participate', description: 'Lead workshops and mentor students', status: 'current' },
      { id: 6, label: 'Upload Evidence', description: 'Upload workshop materials and feedback', status: 'upcoming' },
      { id: 7, label: 'Get Verified', description: 'Receive verification for Impact Passport', status: 'upcoming' },
    ],
    checklist: [
      { item: 'Read program description and requirements', checked: true },
      { item: 'Verify eligibility', checked: true },
      { item: 'Complete volunteer registration form', checked: true },
      { item: 'Attend orientation session', checked: true },
      { item: 'Prepare workshop materials', checked: true },
      { item: 'Submit final report', checked: false },
    ],
  },
  '4': {
    opportunityId: '4',
    appliedDate: null,
    steps: [
      { id: 1, label: 'Discover', description: 'Found via IMPACT OS match engine', status: 'completed' },
      { id: 2, label: 'Review Requirements', description: 'Check eligibility and gather documents', status: 'upcoming' },
      { id: 3, label: 'Prepare Application', description: 'Write research proposal', status: 'upcoming' },
      { id: 4, label: 'Submit', description: 'Submit before deadline', status: 'upcoming' },
      { id: 5, label: 'Participate', description: 'Conduct research and analysis', status: 'upcoming' },
      { id: 6, label: 'Upload Evidence', description: 'Upload research outputs', status: 'upcoming' },
      { id: 7, label: 'Get Verified', description: 'Receive verification for Impact Passport', status: 'upcoming' },
    ],
    checklist: [
      { item: 'Read program description and requirements', checked: false },
      { item: 'Verify eligibility (graduate level required)', checked: false },
      { item: 'Prepare research proposal', checked: false },
      { item: 'Gather writing samples', checked: false },
      { item: 'Request recommendation letter', checked: false },
      { item: 'Submit application before deadline', checked: false },
    ],
  },
  '5': {
    opportunityId: '5',
    appliedDate: null,
    steps: [
      { id: 1, label: 'Discover', description: 'Found via IMPACT OS match engine', status: 'completed' },
      { id: 2, label: 'Review Requirements', description: 'Check eligibility and gather documents', status: 'current' },
      { id: 3, label: 'Prepare Application', description: 'Form a team and register', status: 'upcoming' },
      { id: 4, label: 'Submit', description: 'Complete registration', status: 'upcoming' },
      { id: 5, label: 'Participate', description: 'Attend 48-hour hackathon', status: 'upcoming' },
      { id: 6, label: 'Upload Evidence', description: 'Upload prototype and presentation', status: 'upcoming' },
      { id: 7, label: 'Get Verified', description: 'Receive verification for Impact Passport', status: 'upcoming' },
    ],
    checklist: [
      { item: 'Read program description and requirements', checked: true },
      { item: 'Verify eligibility', checked: true },
      { item: 'Form a team (2-4 members)', checked: false },
      { item: 'Register team on event platform', checked: false },
      { item: 'Book travel to Berlin', checked: false },
      { item: 'Prepare design toolkit', checked: false },
    ],
  },
};

const passportEntries: PassportEntry[] = [
  {
    id: '1',
    project: 'Multi-Sensor Anomaly Detection Prototype',
    organization: 'Climate AI Fellowship — Global Climate Initiative',
    role: 'Lead ML Engineer',
    description: 'Built a real-time anomaly detection system using edge computing devices and multi-sensor fusion to monitor environmental changes in urban areas.',
    skills: ['Python', 'Edge AI', 'Data Analysis', 'TensorFlow', 'IoT'],
    status: 'verified',
    verifiedBy: 'Hackathon Judges Panel',
    date: '2025-11-15',
    evidence: 'GitHub repository, Demo video, Technical report',
    impactMetric: 'Deployed across 3 urban monitoring stations',
  },
  {
    id: '2',
    project: 'Open Source Accessibility Toolkit',
    organization: 'Open Source Foundation',
    role: 'Frontend Developer',
    description: 'Contributed to an open-source toolkit that helps developers build accessible web applications. Added ARIA patterns, keyboard navigation, and screen reader support.',
    skills: ['React', 'TypeScript', 'Accessibility', 'CSS', 'Testing'],
    status: 'verified',
    verifiedBy: 'OSS Maintainer Review',
    date: '2025-08-20',
    evidence: '14 merged pull requests, 2,400+ lines contributed',
    impactMetric: 'Toolkit adopted by 120+ projects',
  },
  {
    id: '3',
    project: 'Digital Literacy Workshop Series',
    organization: 'Community Tech Alliance',
    role: 'Workshop Lead & Mentor',
    description: 'Designed and led a 6-week digital literacy curriculum for 45 high school students from underserved neighborhoods, covering internet safety, basic coding, and digital tools.',
    skills: ['Teaching', 'Curriculum Design', 'Public Speaking', 'Mentoring'],
    status: 'verified',
    verifiedBy: 'Community Tech Alliance Director',
    date: '2025-06-10',
    evidence: 'Student feedback surveys, Curriculum documentation, Completion certificates',
    impactMetric: '45 students completed, 89% satisfaction rate',
  },
  {
    id: '4',
    project: 'Carbon Footprint Calculator API',
    organization: 'Green Futures Collective',
    role: 'Backend Developer',
    description: 'Building a REST API that calculates personal and organizational carbon footprints using activity data. Currently integrating emission factor databases.',
    skills: ['Node.js', 'API Design', 'PostgreSQL', 'Environmental Data'],
    status: 'in-progress',
    verifiedBy: '',
    date: '2025-09-01',
    evidence: 'Work in progress',
    impactMetric: 'Targeting 500+ API consumers at launch',
  },
];

const userProfile: UserProfile = {
  name: 'Tanvi Sharma',
  university: 'Indian Institute of Technology, Delhi',
  avatar: 'TS',
  impactScore: 847,
  interests: ['AI/ML', 'Climate Tech', 'Open Source', 'Education'],
  completedProjects: 3,
  activeChallenges: 1,
  hoursContributed: 240,
};

// Data fetching functions
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getOpportunities(): Promise<Opportunity[]> {
  await delay(100);
  return opportunities;
}

export async function getOpportunityById(id: string): Promise<Opportunity | undefined> {
  await delay(100);
  return opportunities.find(o => o.id === id);
}

export async function getApplicationTracker(opportunityId: string): Promise<ApplicationTracker | undefined> {
  await delay(100);
  return applicationTrackers[opportunityId];
}

export async function getPassportEntries(): Promise<PassportEntry[]> {
  await delay(100);
  return passportEntries;
}

export async function getUserProfile(): Promise<UserProfile> {
  await delay(100);
  return userProfile;
}
