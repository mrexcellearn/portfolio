import { employerLabel } from '../config/site.config';

export interface ExperienceRow { title: string; org: string; dates: string; href?: string; }

export const experience: ExperienceRow[] = [
  {
    title: 'Finance Supervisor, AP & Treasury',
    org: employerLabel(),
    dates: '[START YEAR] - Present',
  },
  // Room for two more rows.
];
