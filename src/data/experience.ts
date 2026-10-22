import { employerLabel } from '../config/site.config';

export interface ExperienceRow {
  title: string;
  org: string;
  dates: string;
  /** Process-improvement outcomes, most important first. Keep each to one line. */
  highlights: string[];
  href?: string;
}

// Employer names stay out of this file (see PRD section 5). Past roles use an industry label too.
export const experience: ExperienceRow[] = [
  {
    title: 'Accounts Payable & Treasury Supervisor',
    org: employerLabel(),
    dates: 'Jan 2023 - Present',
    highlights: [
      'Initiated and solely built an internal Power Apps suite (petty cash, travel and payment requests, stock take, delivery documents) that replaced paper-based processes across departments.',
      'Led the expense-management rollout (Concur) end to end: requirements, local regulatory setup, UAT, go-live and train-the-trainer sessions.',
      'Co-led the purchase-to-pay platform rollout (Coupa) as one of three project leads, owning the P2P workflow, invoicing and vendor setup.',
      'Built VBA automation for SAP journal and invoice entry, cutting processing time by up to 70%.',
      'Designed a SharePoint document library with approvals, and is building an AI agent that answers staff questions on expense policy.',
    ],
  },
  {
    title: 'Finance & Accounting Property Coordinator',
    org: 'Property development group, Jakarta',
    dates: 'Jan 2022 - Jan 2023',
    highlights: [
      'Built VBA-driven Excel tools for invoice recap and reporting, cutting posting time by 50%.',
      'Led a team of three in the project invoice section, running AP and 3-way matching for two subsidiaries.',
    ],
  },
  {
    title: 'Power Platform Developer & Project Manager (freelance)',
    org: 'Clients in several countries',
    dates: '2023 - 2025',
    highlights: [
      'Delivered Power Platform projects end to end, from requirements and solution design to deployment and support.',
    ],
  },
  {
    title: 'Human Capital & Business Partner Intern',
    org: 'Airport operator, Manado',
    dates: 'May - Aug 2021',
    highlights: ['Designed Excel payroll and allowance templates that made allowance processing three times faster.'],
  },
];
