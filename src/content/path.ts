export type Entry = { when: string; org: string; context: string; title: string; desc: string; now?: boolean };

export const experience: Entry[] = [
  {
    when: 'Jun — Aug 2026',
    org: 'BCG X',
    context: 'Boston Consulting Group · Madrid',
    title: 'Visiting Forward Deployed AI Scientist',
    desc: 'AI and data science on client engagements.',
  },
  {
    when: 'Jun 2025 — Apr 2026',
    org: 'Enérgya-VM',
    context: 'Energy retail · Madrid',
    title: 'Data Analyst Intern',
    desc: 'Customer analytics and predictive modelling.',
  },
];

export const education: Entry[] = [
  {
    when: '2025 — Now',
    org: 'Comillas ICAI',
    context: 'Universidad Pontificia Comillas · Madrid',
    title: 'MSc Telecommunications Engineering',
    desc: 'Machine learning, cybersecurity and communication systems.',
    now: true,
  },
  {
    when: '2020 — 2025',
    org: 'Comillas ICAI-ICADE',
    context: 'Universidad Pontificia Comillas · Madrid',
    title: 'Double Bachelor’s — Telecom Engineering & Business Analytics',
    desc: 'Signal processing and engineering, with finance and data science.',
  },
];

export const tools = ['Python', 'SQL', 'Machine learning', 'Power BI', 'Next.js', 'GCP', 'Kubernetes'];
