export type Step =
  | { type: 'trigger'; title: string; detail?: string; config?: Record<string, string> }
  | { type: 'action'; title: string; detail?: string; config?: Record<string, string> }
  | { type: 'condition'; title: string; expression: string; yes: Step[]; no: Step[] }
  | { type: 'approval'; title: string; detail?: string; outcomes?: string[] }
  | { type: 'loop'; title: string; body: Step[] };
