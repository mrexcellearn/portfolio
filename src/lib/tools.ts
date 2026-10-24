// Brand colours and a simple generic glyph per tool, for tool pills. Glyphs are not vendor logos.
export interface ToolStyle { color: string; glyph: string; }

const G = {
  diamond: 'M12 4l7 8-7 8-7-8z',
  chevrons: 'M5 6l6 6-6 6M12 6l6 6-6 6',
  share: 'M9 9a3 3 0 1 0 0-.01M16 16a3 3 0 1 0 0-.01M10.5 11l4 3',
  people: 'M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 19c0-3 3-5 6-5s6 2 6 5M16 7a2.5 2.5 0 1 1 0 5M17 14c2 .5 4 2 4 5',
  mail: 'M4 6h16v12H4zM4 6l8 7 8-7',
  grid: 'M4 4h16v16H4zM4 10h16M4 15h16M10 4v16',
  bars: 'M6 20V10M12 20V4M18 20v-7',
  code: 'M8 7l-5 5 5 5M16 7l5 5-5 5',
  doc: 'M14 3H6v18h12V7zM14 3v4h4M9 12h6M9 16h6',
  cube: 'M12 3l8 4.5v9L12 21l-8-4.5v-9zM12 12l8-4.5M12 12v9M12 12L4 7.5',
  spark: 'M12 3v6M12 15v6M3 12h6M15 12h6',
};

const map: Record<string, ToolStyle> = {
  'power apps': { color: '#742774', glyph: G.diamond },
  'power automate': { color: '#0066FF', glyph: G.chevrons },
  sharepoint: { color: '#036C70', glyph: G.share },
  'sharepoint lists': { color: '#036C70', glyph: G.share },
  teams: { color: '#5059C9', glyph: G.people },
  'teams approvals': { color: '#5059C9', glyph: G.people },
  outlook: { color: '#0078D4', glyph: G.mail },
  excel: { color: '#107C41', glyph: G.grid },
  vba: { color: '#107C41', glyph: G.code },
  'power bi': { color: '#C69200', glyph: G.bars },
  sap: { color: '#0070F2', glyph: G.cube },
  'sap exports': { color: '#0070F2', glyph: G.cube },
  'apps script': { color: '#1E8E3E', glyph: G.code },
  'google apps script': { color: '#1E8E3E', glyph: G.code },
  'html/js': { color: '#C2410C', glyph: G.code },
  'ai builder': { color: '#0B6A0B', glyph: G.spark },
  dataverse: { color: '#088142', glyph: G.cube },
};

export const toolStyle = (name: string): ToolStyle | undefined => map[name.trim().toLowerCase()];
