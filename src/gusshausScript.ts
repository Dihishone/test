// Editable proof constants
export const PROJECT_COUNT = "50+";
export const RELIABILITY_PERCENT = "98%";
export const FOOTNOTE = "*interne Auswertung";

// All on-screen copy – edit here, video updates automatically
export const COPY = {
  scene1: {
    headlineLines: ["Wer baut,", "kennt diesen", "Moment."],
    subtextLines: ["Viele Beteiligte.", "Unklare Verantwortung."],
    vo: "Ein Bauprojekt hat viele Beteiligte. Aber nur einen, der am Ende den Kopf hinhalten muss: Sie.",
  },
  scene2: {
    headlineLines: ["Zu viele Schnittstellen.", "Zu viel Reibung.", "Zu viel Risiko."],
    vo: "Der Planer plant, die Bauleitung leitet, die Koordination — die übernimmt keiner. Termine verschieben sich. Kosten steigen. Und Sie stehen mittendrin.",
  },
  scene3: {
    headlineLines: ["Wohnbau", "&", "Hotellerie"],
    subtextLines: ["Zwei Welten.", "Ein Anspruch:", "Qualität."],
    vo: "Jeder Schritt in der Planung hat finanzielle und langfristige Auswirkungen auf Ihre Wohnqualität. Fehler in dieser Phase kosten nicht einmal — sie kosten dauerhaft.",
  },
  scene4: {
    headlineLines: ["Ein Büro.", "Volle Verantwortung."],
    subtextLines: ["Von der ersten Skizze", "bis zur Schlüsselübergabe."],
    vo: "Was wäre, wenn Sie von Anfang an jemanden hätten — der nicht übergibt, sondern bleibt?",
  },
  scene5: {
    headlineLines: ["Manfred &", "Matthäus Heigl"],
    subtextLines: ["Gründer. Geschäftsführer.", "Verantwortlich."],
    vo: "Manfred und Matthäus Heigl haben Gusshaus 2021 genau dafür gegründet. Ein Planungs- und Baumanagement-Büro, das von der ersten Skizze bis zur Schlüsselübergabe vollständig plant, steuert und umsetzt — und dabei bleibt.",
  },
  scene6: {
    items: ["Planung", "Baumanagement", "Qualitätssicherung", "Kosten- & Termintreue"],
    footerLines: ["Durchgehend.", "Transparent. Verlässlich."],
    vo: "Entwurfsplanung, Genehmigung, Baumanagement — alles unter einem Dach. Mit BIM-Modellen und 3D-Scanning eliminieren wir Fehler bevor sie entstehen. Nicht weil es modern klingt. Weil es funktioniert.",
  },
  scene7: {
    headlineLines: ["Vertrauen entsteht", "durch Ergebnisse."],
    stat1Number: PROJECT_COUNT,
    stat1Label: "Projekte",
    stat2Number: RELIABILITY_PERCENT,
    stat2LabelLines: ["Termintreue", "& Budgettreue"],
    footnote: FOOTNOTE,
    vo: "In über 50 Projekten zählt am Ende nicht das Versprechen — sondern ob Termin, Budget und Qualität gehalten wurden.",
  },
  scene8: {
    headlineLines: ["Wenn Ihr Projekt", "Qualität verdient —", "sprechen wir."],
    ctaLines: ["Erstgespräch", "vereinbaren."],
    footer: "gusshaus.com",
    vo: "Wenn Ihr Projekt Qualität verdient — sprechen wir. Erstgespräch kostenlos, auch virtuell. gusshaus.com",
  },
} as const;
