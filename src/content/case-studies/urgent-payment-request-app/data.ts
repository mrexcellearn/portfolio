// Illustrative data for Case 1. Fictional company (Acme Mining), vendors and amounts.
import type { Screen } from '../../../components/case/apps-types';
import type { Step } from '../../../components/case/flow-types';
import type { Sheet } from '../../../components/case/sheet-types';

export const screens: Screen[] = [
  {
    name: 'New request',
    blocks: [
      { type: 'header', title: 'New urgent payment', back: true },
      {
        type: 'form',
        columns: 2,
        pin: 1,
        fields: [
          { label: 'Beneficiary', value: 'PT Contoh Supplier', kind: 'dropdown', required: true },
          { label: 'Amount', value: '48.500.000', kind: 'number', required: true },
          { label: 'Currency', value: 'IDR', kind: 'dropdown', required: true },
          { label: 'Needed by', value: '24 Oct 2026', kind: 'date', required: true },
          { label: 'Remarks', value: 'Down payment for conveyor spare parts, PO 4500-0000', kind: 'textarea', required: true },
          { label: 'Invoice', value: 'INV-CS-0912.pdf', kind: 'attachment', required: true },
          { label: 'Approval', kind: 'attachment', required: true, invalid: 'Attach the signed approval to submit' },
        ],
      },
      { type: 'checklist', title: 'Before you submit', items: [{ label: 'Invoice attached', done: true }, { label: 'Approval attached', done: false }, { label: 'Amount and currency set', done: true }] },
      { type: 'buttons', pin: 3, items: [{ label: 'Save draft', variant: 'secondary' }, { label: 'Submit request' }] },
    ],
    pins: [
      {
        n: 1,
        title: 'Required fields are checked before submit',
        note: 'Each required field has a validation rule. The Submit button stays disabled until all of them pass, so incomplete requests never reach AP.',
        code: `// Submit button: DisplayMode
If(
    IsBlank(drpBeneficiary.Selected) ||
    IsBlank(txtAmount.Value) ||
    CountRows(attInvoice.Attachments) = 0 ||
    CountRows(attApproval.Attachments) = 0,
    DisplayMode.Disabled,
    DisplayMode.Edit
)`,
      },
      {
        n: 3,
        title: 'One Patch writes the request',
        note: 'Submit creates the SharePoint item with status "Submitted". The cloud flow picks it up from there.',
        code: `Patch(
    'Payment Requests',
    Defaults('Payment Requests'),
    {
        Beneficiary: drpBeneficiary.Selected,
        Amount: Value(txtAmount.Value),
        Currency: drpCurrency.Selected.Value,
        Remarks: txtRemarks.Value,
        Status: { Value: "Submitted" }
    }
);
Navigate(scrMyRequests, ScreenTransition.Fade)`,
      },
    ],
  },
  {
    name: 'My requests',
    blocks: [
      { type: 'header', title: 'My requests', action: '+ New' },
      { type: 'search', placeholder: 'Search beneficiary or amount', filters: ['All', 'Open', 'Returned', 'Closed'] },
      {
        type: 'gallery',
        pin: 2,
        items: [
          { title: 'PT Contoh Supplier', subtitle: 'Conveyor spare parts', meta: 'IDR 48.500.000', status: 'Submitted' },
          { title: 'CV Sample Logistik', subtitle: 'Freight, Oct shipment', meta: 'IDR 12.750.000', status: 'In review' },
          { title: 'PT Contoh Supplier', subtitle: 'Safety equipment', meta: 'IDR 7.200.000', status: 'Returned' },
          { title: 'CV Sample Logistik', subtitle: 'Port handling', meta: 'IDR 21.000.000', status: 'Approved' },
          { title: 'PT Contoh Supplier', subtitle: 'Filter cartridges', meta: 'IDR 3.900.000', status: 'Paid' },
          { title: 'CV Sample Logistik', subtitle: 'Demurrage', meta: 'IDR 15.300.000', status: 'Rejected' },
        ],
      },
    ],
    pins: [
      {
        n: 2,
        title: 'Status badge colour rule',
        note: 'Every request shows where it is. The badge colour comes from one Switch, so the six statuses always look the same across screens.',
        code: `// Badge: Color
Switch(
    ThisItem.Status.Value,
    "Returned",  ColorValue("#B7791F"),
    "Approved",  ColorValue("#2E9E5B"),
    "Paid",      ColorValue("#2E9E5B"),
    "Rejected",  ColorValue("#C0392B"),
    ColorValue("#6B6F6A")
)`,
      },
    ],
  },
  {
    name: 'AP verification',
    blocks: [
      { type: 'header', title: 'Verify request', back: true },
      {
        type: 'columns',
        left: [
          { type: 'summary', title: 'Request', rows: [['Beneficiary', 'PT Contoh Supplier'], ['Amount', 'IDR 48.500.000'], ['Needed by', '24 Oct 2026'], ['Requester', 'Site Procurement'], ['Remarks', 'Conveyor spare parts']] },
          { type: 'status', status: 'In review' },
        ],
        right: [
          { type: 'checklist', title: 'Attachments', pin: 4, items: [{ label: 'Invoice', done: true }, { label: 'Signed approval', done: true }, { label: 'Tax invoice', done: true }, { label: 'Bank details match vendor master', done: true }] },
        ],
      },
      { type: 'buttons', items: [{ label: 'Return', variant: 'danger' }, { label: 'Post & continue' }] },
    ],
    pins: [
      {
        n: 4,
        title: 'AP checks a list, not an inbox',
        note: 'The checklist mirrors what AP used to verify by hand. "Return" sends the request back with a reason; "Post & continue" moves it to posting and the voucher.',
      },
    ],
  },
  {
    name: 'Treasury review',
    blocks: [
      { type: 'header', title: 'Treasury review', back: true },
      {
        type: 'columns',
        left: [
          { type: 'summary', title: 'Summary', rows: [['Beneficiary', 'PT Contoh Supplier'], ['Amount', 'IDR 48.500.000'], ['Advance doc', '1500000123'], ['Verified by', 'AP']] },
          { type: 'form', fields: [{ label: 'Comment', kind: 'textarea' }] },
        ],
        right: [
          { type: 'voucher', title: 'PAYMENT VOUCHER PV-2026-0142', pin: 5, lines: [['Vendor', 'PT Contoh Supplier'], ['Advance', '48.500.000'], ['Open items', '0'], ['Bank', 'Operating account']], total: 'IDR 48.500.000' },
        ],
      },
      { type: 'buttons', items: [{ label: 'Reject', variant: 'danger' }, { label: 'Approve' }] },
    ],
    pins: [
      {
        n: 5,
        title: 'The voucher travels with the request',
        note: 'Treasury sees the same voucher AP prepared, attached to the request. Reject needs a comment, which goes back to AP.',
      },
    ],
  },
];

export const flow: Step[] = [
  {
    type: 'trigger',
    title: 'When an item is created',
    detail: 'SharePoint list "Payment Requests"',
    config: { Site: 'Finance Operations', 'List name': 'Payment Requests' },
  },
  {
    type: 'condition',
    title: 'Invoice and approval attached?',
    expression: "and(\n  greater(length(body('Get_attachments')?['Invoice']), 0),\n  greater(length(body('Get_attachments')?['Approval']), 0)\n)",
    no: [
      { type: 'action', title: 'Update item: status "Returned"', config: { Status: 'Returned', 'Return reason': 'Missing invoice or approval' } },
      { type: 'action', title: 'Email the requester with the reason', config: { To: 'Created By email', Subject: 'Payment request returned' } },
    ],
    yes: [
      { type: 'action', title: 'Update item: status "In review"', config: { Status: 'In review' } },
      {
        type: 'approval',
        title: 'Start approval: treasury',
        detail: 'Approve/Reject, first to respond',
        outcomes: ['Approve', 'Reject'],
      },
      {
        type: 'condition',
        title: 'Outcome is Approve?',
        expression: "equals(outputs('Start_approval')?['body/outcome'], 'Approve')",
        yes: [
          { type: 'action', title: 'Update item: status "Approved"', config: { Status: 'Approved' } },
          { type: 'action', title: 'Notify requester and AP' },
        ],
        no: [
          { type: 'action', title: 'Update item: status "Rejected"', config: { Status: 'Rejected', Comments: "outputs('Start_approval')?['body/responses'][0]['comments']" } },
          { type: 'action', title: 'Notify AP with comments' },
        ],
      },
    ],
  },
];

export const sheets: Sheet[] = [
  {
    name: 'Open items',
    caption: 'Vendor open items as pulled from the vendor line-item report. Dummy data.',
    widths: [120, 110, 96, 64, 130, 200],
    rows: [
      ['Vendor', 'Document no.', 'Doc date', 'Curr.', 'Amount', 'Text'],
      ['PT Contoh Supplier', '5100000411', '02.10.2026', 'IDR', -12500000, 'Invoice spare parts'],
      ['PT Contoh Supplier', '5100000437', '09.10.2026', 'IDR', -8750000, 'Invoice filters'],
      ['PT Contoh Supplier', '1500000123', '22.10.2026', 'IDR', 48500000, 'Advance, urgent request'],
      ['CV Sample Logistik', '5100000452', '12.10.2026', 'IDR', -12750000, 'Freight Oct'],
      ['CV Sample Logistik', '5100000460', '15.10.2026', 'IDR', -21000000, 'Port handling'],
    ],
    highlight: ['A2:E4'],
  },
  {
    name: 'Voucher',
    caption: 'Formula-driven voucher. Pick the vendor in B2 and the totals pull from the Open items tab.',
    widths: [170, 150, 140],
    rows: [
      ['Payment voucher', '', ''],
      ['Vendor', { v: 'PT Contoh Supplier', note: 'Dropdown (data validation)' }, ''],
      ['Voucher no.', { v: 'PV-2026-0142', f: '="PV-"&TEXT(TODAY(),"yyyy")&"-"&TEXT(COUNTA(Log!A:A)+1,"0000")' }, ''],
      ['Advance this request', { v: 48500000, f: "SUMIFS('Open items'!E:E,'Open items'!A:A,B2,'Open items'!E:E,\">0\")" }, ''],
      ['Open invoices', { v: -21250000, f: "SUMIFS('Open items'!E:E,'Open items'!A:A,B2,'Open items'!E:E,\"<0\")" }, ''],
      ['Invoices on file', { v: 2, fmt: 'num', f: "COUNTIFS('Open items'!A:A,B2,'Open items'!E:E,\"<0\")" }, ''],
      [{ v: 'Amount to pay', bold: true }, { v: 48500000, f: 'B4', bold: true }, ''],
      ['Prepared by', 'AP', ''],
    ],
    highlight: ['B4:B7'],
  },
];
