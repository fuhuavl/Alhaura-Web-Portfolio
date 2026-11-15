export type Award = {
  year: string;
  title: string;
  result: string;
  detail?: string;
};

export const awards: Award[] = [
  {
    year: "2025",
    title: "Samsung Innovation Campus Batch 7",
    result: "Passed Qualifier",
  },
  {
    year: "2025",
    title: "Netropreneur 2025",
    result: "Semifinalist",
    detail: "DemlyAI business SaaS concept, outperforming 100+ participants",
  },
  {
    year: "2025",
    title: "PKM 2025",
    result: "Passed Qualifier",
    detail: "Artikulab mobile speech disorder therapy with reinforcement learning",
  },
  {
    year: "2024",
    title: "MAGE X Competitive Programming",
    result: "Finalist",
  },
];

export type WorkshopYear = { year: string; items: string[] };

export const workshops: WorkshopYear[] = [
  {
    year: "2026",
    items: [
      "Australian Embassy Company Visit",
      "Oracle Company Visit",
      "Telkomsel Company Visit",
    ],
  },
  {
    year: "2024",
    items: [
      "BIGFAIR",
      "Global Competencies Workshop",
      "Software Engineering Talk 2: COCOMO",
    ],
  },
  { year: "2023", items: ["IT Festival Micro IT SV"] },
];
