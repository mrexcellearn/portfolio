export type CellFormat = 'text' | 'idr' | 'num' | 'pct' | 'date';

export type Cell =
  | string
  | number
  | null
  | { v: string | number | null; f?: string; fmt?: CellFormat; bold?: boolean; note?: string };

export interface Sheet {
  name: string;
  caption?: string;
  /** Column widths in px, by index. Defaults to 96. */
  widths?: number[];
  /** First row is the header row. */
  rows: Cell[][];
  /** Ranges to highlight, A1 style, e.g. "D2:D6". */
  highlight?: string[];
}
