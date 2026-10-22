export type Status = 'Submitted' | 'Returned' | 'In review' | 'Approved' | 'Paid' | 'Rejected' | 'Draft';

export interface Field {
  label: string;
  value?: string;
  kind?: 'text' | 'number' | 'dropdown' | 'date' | 'textarea' | 'attachment';
  required?: boolean;
  invalid?: string; // validation message shown under the field
}

export type Block =
  | { type: 'header'; title: string; back?: boolean; action?: string; pin?: number }
  | { type: 'search'; placeholder?: string; filters?: string[]; pin?: number }
  | { type: 'tabs'; items: string[]; active?: number; pin?: number }
  | { type: 'gallery'; items: { title: string; subtitle?: string; meta?: string; status: Status }[]; pin?: number }
  | { type: 'form'; fields: Field[]; columns?: 1 | 2; pin?: number }
  | { type: 'checklist'; title?: string; items: { label: string; done: boolean }[]; pin?: number }
  | { type: 'summary'; title?: string; rows: [string, string][]; pin?: number }
  | { type: 'status'; status: Status; label?: string; pin?: number }
  | { type: 'buttons'; items: { label: string; variant?: 'primary' | 'secondary' | 'danger' }[]; pin?: number }
  | { type: 'voucher'; title: string; lines: [string, string][]; total: string; pin?: number }
  | { type: 'note'; text: string; pin?: number }
  | { type: 'columns'; left: Block[]; right: Block[] };

export interface Pin { n: number; title: string; note: string; code?: string; lang?: 'powerfx' }

export interface Screen { name: string; blocks: Block[]; pins?: Pin[] }
