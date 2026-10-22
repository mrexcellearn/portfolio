export interface Service { title: string; body: string; tools: string[]; visual: 'flow' | 'sheet' | 'doc'; }

export const services: Service[] = [
  {
    title: 'Finance process automation',
    body: 'Requests, approvals and postings that used to live in email move into an app with a tracked status. Fewer handoffs, fewer returns.',
    tools: ['Power Apps', 'Power Automate', 'SharePoint', 'VBA', 'Apps Script'],
    visual: 'flow',
  },
  {
    title: 'Dashboards and management reporting',
    body: 'Working capital, cash and liquidity, KPI dashboards. Each metric gets an owner and a review rhythm, so the numbers lead to action.',
    tools: ['Excel', 'HTML/JS', 'SAP exports'],
    visual: 'sheet',
  },
  {
    title: 'SOPs and process documentation',
    body: 'Work instructions and process guidelines written so the next person can run the process, and an auditor can follow it.',
    tools: ['Process guidelines', 'Work instructions', 'Audit-ready docs'],
    visual: 'doc',
  },
];
