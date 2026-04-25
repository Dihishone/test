export const BEATS = {
  HOOK:      { start: 0,    end: 150  },
  PROBLEM:   { start: 150,  end: 390  },
  STAKES:    { start: 390,  end: 570  },
  BRIDGE:    { start: 570,  end: 750  },
  SOLUTION:  { start: 750,  end: 990  },
  MECHANISM: { start: 990,  end: 1260 },
  PROOF:     { start: 1260, end: 1470 },
  CTA:       { start: 1470, end: 1800 },
} as const;

export const COPY = {
  hook: {
    brand: 'GUSSHAUS',
    tagline: 'Volle Verantwortung.',
    subtitle: 'Von der ersten Skizze bis zur Schlüsselübergabe.',
  },
  problem: {
    headline: 'Viele Beteiligte.',
    lines: [
      'Architekt. Statiker. Haustechnik. Unternehmer.',
      'Jeder trägt nur seinen Teil.',
      'Verantwortung wird verteilt –\nnicht übernommen.',
    ],
  },
  stakes: {
    intro: 'Was das bedeutet:',
    risks: [
      { label: 'KOSTEN',    detail: 'Mehrkosten entstehen.' },
      { label: 'TERMINE',   detail: 'Verzögerungen häufen sich.' },
      { label: 'QUALITÄT',  detail: 'Mängel bleiben unentdeckt.' },
    ],
    close: 'Weil niemand das Ganze im Blick hat.',
  },
  bridge: {
    question: 'Was wäre, wenn einer\ndie volle Verantwortung trüge?',
  },
  solution: {
    brand: 'GUSSHAUS',
    headline: 'Ein Büro.\nVolle Verantwortung.',
    sub: 'Ihr einziger Ansprechpartner –\nvon der Idee bis zur Schlüsselübergabe.',
  },
  mechanism: {
    label: 'WAS WIR LEISTEN',
    services: [
      {
        number: '01',
        title: 'PLANUNG',
        items: ['Architektur & Entwurf', 'Baugenehmigung', 'Kostenplanung'],
      },
      {
        number: '02',
        title: 'BAUMANN­AGEMENT',
        items: ['Koordination', 'Terminsteuerung', 'Kostenkontrolle'],
      },
      {
        number: '03',
        title: 'QUALITÄTS­SICHERUNG',
        items: ['Abnahme & Prüfung', 'Mängelverfolgung', 'Dokumentation'],
      },
      {
        number: '04',
        title: 'SCHLÜSSEL­ÜBERGABE',
        items: ['Übergabe', 'Gewährleistung', 'Nachbetreuung'],
      },
    ],
  },
  proof: {
    names: ['Manfred Heigl', 'Matthäus Heigl'],
    role: 'Gründer und Geschäftsführer',
    brand: 'Gusshaus GmbH',
    statement: 'Wir übernehmen Verantwortung –\nfür Ihr Projekt, von Anfang an.',
  },
  cta: {
    headline: 'Ihr Projekt verdient\nmehr als eine Aufgabenverteilung.',
    invitation: 'Sprechen Sie mit uns.',
    website: 'GUSSHAUS.DE',
    note: 'Wir nehmen nur Projekte an, für die wir\nvoll verantwortlich sein können.',
  },
} as const;

export const STAKEHOLDERS = [
  { id: 'bauherr',    label: 'Bauherr',        x: 960,  y: 160,  delay: 0  },
  { id: 'architekt',  label: 'Architekt',       x: 380,  y: 360,  delay: 14 },
  { id: 'statiker',   label: 'Statiker',        x: 560,  y: 530,  delay: 24 },
  { id: 'haustechnik',label: 'Haustechnik',     x: 1380, y: 420,  delay: 32 },
  { id: 'gu',         label: 'GU',              x: 960,  y: 590,  delay: 42 },
  { id: 'sub1',       label: 'Sub A',           x: 660,  y: 760,  delay: 52 },
  { id: 'sub2',       label: 'Sub B',           x: 960,  y: 800,  delay: 58 },
  { id: 'sub3',       label: 'Sub C',           x: 1260, y: 760,  delay: 64 },
  { id: 'gutachter',  label: 'Gutachter',       x: 1560, y: 320,  delay: 72 },
  { id: 'bank',       label: 'Finanzierung',    x: 340,  y: 540,  delay: 80 },
  { id: 'behoerde',   label: 'Behörde',         x: 1560, y: 540,  delay: 86 },
] as const;

export const EDGES: [string, string][] = [
  ['bauherr', 'architekt'],
  ['bauherr', 'haustechnik'],
  ['bauherr', 'gu'],
  ['bauherr', 'gutachter'],
  ['bauherr', 'behoerde'],
  ['bank',    'bauherr'],
  ['architekt', 'statiker'],
  ['architekt', 'gu'],
  ['statiker', 'gu'],
  ['haustechnik', 'gu'],
  ['gu', 'sub1'],
  ['gu', 'sub2'],
  ['gu', 'sub3'],
  ['gutachter', 'architekt'],
];
