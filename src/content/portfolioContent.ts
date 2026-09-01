export interface SkillItem {
  name: string;
  level: number;
  category: string;
}

export interface ExperienceItem {
  title: string;
  company: string;
  year: string;
  description: string;
}

export interface ProjectItem {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  stack: string[];
  image: string;
  category: string;
  color: string;
  accent: string;
  border: string;
}

export interface InsightItem {
  topic: string;
  insight: string;
}

export interface SocialLinkItem {
  name: string;
  url: string;
  iconName: string;
}

export const skills: SkillItem[] = [
  { name: 'Python', level: 85, category: 'Programming' },
  { name: 'Data Analysis', level: 93, category: 'Analytics' },
  { name: 'SQL', level: 92, category: 'Databases' },
  { name: 'Data Visualization', level: 90, category: 'Analytics' },
  { name: 'Full-Stack Dev', level: 60, category: 'Development' },
  { name: 'Spreadsheets', level: 95, category: 'Productivity' },
];

export const experience: ExperienceItem[] = [
  {
    title: 'Project Technical Assistant',
    company: 'Department of Science and Technology II',
    year: '2024 - Present',
    description: 'Building data systems and dashboards for the DOST Small Enterprise Technology Upgrading Program (SETUP).',
  },
  {
    title: 'Technical Support',
    company: 'Foundever Asia Inc.',
    year: '2024',
    description: 'Provided advanced technical troubleshooting for client devices, accounts, and network infrastructure.',
  },
  {
    title: 'Database Management Officer',
    company: 'Department of Environment and Natural Resources II',
    year: '2023 - 2024',
    description: 'Handled data processing and records management for the National Greening Program (NGP), including database updates and data validation.',
  },
];

export const projects: ProjectItem[] = [
  {
    title: 'SETUP Guru',
    subtitle: 'Knowledge Management App',
    description: 'A searchable knowledge base built for SETUP program staff and coordinators, designed to replace the need to manually browse a 102-page government guideline PDF. Cards are sourced directly from the SETUP ver 3.0 Guidelines with exact citations (section and page number), and the search engine returns the most relevant card first, followed by related references.',
    features: [
      'Live search with instant suggestions',
      'Exact guideline citations (section & page)',
      'Cross-referenced knowledge cards',
      'Personal bookmarking system',
      '55 structured knowledge cards',
    ],
    stack: ['React', 'TypeScript', 'TailwindCSS', 'tRPC', 'MySQL'],
    image: '/setup-guru.png',
    category: 'Knowledge Management',
    color: 'from-blue-500/20 to-indigo-500/20',
    accent: 'text-blue-500',
    border: 'border-blue-500/20',
  },
  {
    title: 'SETUP Monitoring Dashboard',
    subtitle: 'Project Tracking & Impact Assessment Platform',
    description: 'Real-time monitoring platform for DOST SETUP program tracking 1000+ funded MSME projects across Region 2. Consolidates project lifecycle data, beneficiary profiles, equipment procurement compliance, and multi-year impact metrics.',
    features: [
      'Executive dashboards with analytics by municipality',
      'Timeline tracking for overdue equipment procurement',
      'Multi-year impact assessment (employment & sales growth)',
      'Beneficiary profile management',
      'Proposal management with approval analytics',
    ],
    stack: ['React', 'TypeScript', 'TailwindCSS', 'Node.js', 'PostgreSQL', 'Recharts'],
    image: '/setup-monitoring.png',
    category: 'Data Analytics Platform',
    color: 'from-teal-500/20 to-emerald-500/20',
    accent: 'text-teal-500',
    border: 'border-teal-500/20',
  },
  {
    title: 'SETUP Collections Monitoring Dashboard',
    subtitle: 'Refund Tracking & Financial Performance System',
    description: 'A Google Sheets–based collections monitoring system developed for PSTO Financial Analysts to track refund payments, overdue accounts, penalty payments, and province-level collection performance in real time. Consolidates multiple yearly collection sheets into a centralized dashboard with automated summaries, dynamic filters, and status detection logic.',
    features: [
      'Dynamic Month & Year filtering',
      'Automated Grand Total & Ongoing Collection summaries',
      'Province-level breakdown (Regular vs Past Due)',
      'Fully Paid vs With Penalties logic',
      'Auto-calculated refund end dates (with deferment adjustments)',
      'Real-time Past Due detection',
      'Penalty payment monitoring section',
    ],
    stack: ['Google Sheets', 'XLOOKUP', 'FILTER', 'ARRAYFORMULA', 'LAMBDA', 'IMPORTRANGE', 'EDATE', 'Advanced Nested IF Logic'],
    image: '/setup-collections.png',
    category: 'Data Analytics Platform',
    color: 'from-orange-500/20 to-amber-500/20',
    accent: 'text-orange-500',
    border: 'border-orange-500/20',
  },
  {
    title: 'SETUP Annual Collections Performance Report',
    subtitle: 'Multi-Year Financial Summary & PSTO Comparison Dashboard',
    description: 'A structured Google Sheets reporting system that consolidates multi-year collection data into automated semester summaries, monthly performance tracking, and PSTO-level comparisons. Transforms raw transactional data (2018–present) into visual analytics dashboards used for performance evaluation and financial monitoring.',
    features: [
      'Automated First & Second Semester summaries',
      'Monthly Collection Rate computation (Amount Due vs Payments)',
      'Per-PSTO performance comparison dashboard',
      'Multi-year trend consolidation (2018–2024)',
      'Dynamic charts with real-time recalculation',
      'Province-level contribution analysis',
      'Grand Total auto-aggregation',
    ],
    stack: ['Google Sheets', 'ARRAYFORMULA', 'SUMIFS', 'FILTER', 'Dynamic Date Logic', 'Pivot-style Aggregation', 'Chart Automation'],
    image: '/setup-annual-report.png',
    category: 'Data Reporting & Performance Analytics',
    color: 'from-purple-500/20 to-violet-500/20',
    accent: 'text-purple-500',
    border: 'border-purple-500/20',
  },
];

export const insights: InsightItem[] = [
  { topic: 'Data Integrity', insight: 'Garbage in, garbage out. The most sophisticated model is useless without high-quality, validated data.' },
  { topic: 'Clean Code', insight: 'Writing code is for humans first, machines second. Clarity and documentation are the foundations of scalability.' },
  { topic: 'Strategic Analysis', insight: 'The value of data is not in the numbers, but in the decisions they empower. Always ask "So what?".' },
  { topic: 'Agile Learning', insight: 'In the intersection of data and dev, the only constant is change. Adaptability is the most important skill.' },
];

export const funFacts: string[] = [
  'Part developer, part analyst, part tech support—basically a cat with 9 lives, except each life is a different job role in the same day.',
  'I have written SQL queries that are more complex than some of my college essays.',
  'Pandas is my most-used library, and we have a love-hate relationship.',
  'I believe a well-designed dashboard is a work of art.',
  'I consider coffee to be a vital dependency for my build process.',
];

export const socialLinks: SocialLinkItem[] = [
  { name: 'GitHub', url: 'https://github.com/JeremiahOrpilla', iconName: 'Github' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/jeremiah-orpilla-b612322b7', iconName: 'Linkedin' },
  { name: 'Facebook', url: 'https://facebook.com/jeremiahorpilla00', iconName: 'Facebook' },
  { name: 'Instagram', url: 'https://instagram.com/jekcatsu', iconName: 'Instagram' },
  { name: 'Email', url: 'mailto:jeremiahorpilla00@gmail.com', iconName: 'Mail' },
];

export const storySteps: string[] = [
  "Meow! I'm Jek's assistant. Let me tell you a story...",
  'Jek graduated from CSU in 2023 with a Meritorious Award in Programming! 🎓',
  "He's now at DOST building powerful data systems for MSMEs... 📊",
  'A wizard with Google Sheets, SQL, and Full-Stack Dev! ✨',
  'Check out his projects below! See you around! 🐾',
];
