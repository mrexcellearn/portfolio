export const site = {
  name: 'Reynaldi Karundeng',
  shortName: 'Rey',
  initials: 'RK',
  title: 'Rey Karundeng | Finance operations and automation',
  description: 'I run AP & Treasury, and I build the systems that make it run itself.',
  email: 'hello@example.com', // [PLACEHOLDER]
  links: {
    linkedin: '[PLACEHOLDER]',
    tiktok: '[PLACEHOLDER]',
  },
  location: 'Jakarta, Indonesia',
  timeZone: 'Asia/Jakarta',
  showEmployerName: false,
  employerName: '', // only shown when showEmployerName is true
  employerFallback: 'Mining & minerals industry, Indonesia',
  availability: { open: true, text: 'Available for freelance work' },
  analytics: { enabled: false },
} as const;

export const employerLabel = (): string =>
  site.showEmployerName && site.employerName ? site.employerName : site.employerFallback;
