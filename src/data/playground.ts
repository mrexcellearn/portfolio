export interface Tool { name: string; line: string; tech: string[]; status: 'Live' | 'In progress'; href: string; }

export const tools: Tool[] = [
  { name: 'PDF toolkit', line: 'Merge and split with six modes. Runs fully in the browser.', tech: ['JavaScript', 'PDF'], status: 'Live', href: '[PLACEHOLDER]' },
  { name: 'WhatsApp chat viewer', line: 'A PWA with fast search for very large chat exports.', tech: ['PWA', 'JavaScript'], status: 'Live', href: '[PLACEHOLDER]' },
  { name: 'Bulk email sender', line: 'Mail merge in Google Apps Script with a rich-text editor.', tech: ['Apps Script', 'Gmail'], status: 'Live', href: '[PLACEHOLDER]' },
  { name: 'Finance Task Manager', line: 'An Apps Script web app for recurring finance tasks.', tech: ['Apps Script', 'Sheets'], status: 'In progress', href: '[PLACEHOLDER]' },
];
