export const site = {
  name: 'Reynaldi Karundeng',
  shortName: 'Rey',
  initials: 'RK',
  title: 'Rey Karundeng | Finance operations and automation',
  description: 'I run AP & Treasury, and I build the systems that make it run itself.',
  email: 'reyaldi7@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/reynaldi-karundeng',
    tiktok: 'https://www.tiktok.com/@mr.excellearn',
    tiktokHandle: '@mr.excellearn',
  },
  location: 'Jakarta, Indonesia',
  timeZone: 'Asia/Jakarta',
  showEmployerName: false,
  employerName: '', // only shown when showEmployerName is true
  employerFallback: 'Mining & minerals industry, Indonesia',
  avatar: '/rey.jpg', // in public/; the RK initials show when the file is missing
  consult: { label: 'Book a free 30-minute call', short: 'Free consultation' },
  // Free access key from https://web3forms.com (it is safe to publish). Empty = the form opens an email draft instead.
  contactForm: { web3formsKey: '7416df13-7867-4e36-b17f-674182f27780' },
  availability: { open: true, text: 'Available for freelance work' },
  analytics: { enabled: false },
} as const;

export const employerLabel = (): string =>
  site.showEmployerName && site.employerName ? site.employerName : site.employerFallback;
