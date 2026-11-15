export type ExperienceItem = {
  id: string;
  organization: string;
  role: string;
  period: string;
  current?: boolean;
  /** Optional. Add a location here and it will appear in the expanded entry. */
  location?: string;
  points: string[];
};

export const experience: ExperienceItem[] = [
  {
    id: "dptsi",
    organization: "DPTSI ITS",
    role: "Fullstack Engineer Intern",
    period: "July 2026 – Present",
    current: true,
    points: [
      "Maintain myITS Thesis using Laravel",
      "Resolve production bugs",
      "Implement academic workflows",
      "Optimize backend queries",
    ],
  },
  {
    id: "se-lab",
    organization: "Software Engineering Lab",
    role: "Admin",
    period: "May 2026 – Present",
    current: true,
    points: [
      "Manage lab operations with an 8-member team",
      "Support research, practicums, and software development",
    ],
  },
  {
    id: "mun-its",
    organization: "MUN ITS",
    role: "Director of Marketing",
    period: "March 2026 – Present",
    current: true,
    points: ["Lead social media strategy", "Lead a team of 12+ members"],
  },
  {
    id: "gdgoc-its",
    organization: "Google Developer Group on Campus ITS",
    role: "Web Development Curriculum, Core Team",
    period: "January – August 2026",
    points: ["Develop and maintain industry-aligned learning materials"],
  },
  {
    id: "flexoo",
    organization: "Flexoo Community",
    role: "UI/UX Designer",
    period: "March – August 2026",
    points: [
      "Designed HIMASAKTA projects with a 7-member team",
      "Collaborated with stakeholders",
    ],
  },
  {
    id: "nawasena",
    organization: "Nawasena LBE",
    role: "Speaker & Researcher",
    period: "September 2026",
    points: ["Created collaborative Git learning materials for 40+ students"],
  },
  {
    id: "ifexplore",
    organization: "IFExplore",
    role: "Speaker",
    period: "September 2026",
    points: [
      "Led a Git and GitHub bootcamp for 10 international exchange students from the Philippines",
    ],
  },
  {
    id: "al-uswah",
    organization: "Community Service Al-Uswah",
    role: "Researcher & Speaker",
    period: "August – October 2026",
    points: [
      "Conducted AI prompting workshops",
      "Ran research involving 50+ participants",
    ],
  },
  {
    id: "cssmora",
    organization: "CSSMoRA ITS",
    role: "Tutor",
    period: "March – August 2026",
    points: [
      "Taught data structures, OOP, numerical computation, and second-semester subjects",
    ],
  },
  {
    id: "basic-media",
    organization: "Basic Media Schooling",
    role: "Speaker",
    period: "October 2026",
    points: ["Conducted graphic design and Figma training for 30+ students"],
  },
  {
    id: "okkbk",
    organization: "OKKBK TC 2026",
    role: "Project Officer",
    period: "October 2026",
    points: [
      "Coordinated 150+ committee members and an orientation program for 700 freshmen",
    ],
  },
  {
    id: "imajas",
    organization: "IMAJAS x ILITS Jakarta 2025",
    role: "Vice Division Head",
    period: "August 2025 – February 2026",
    points: [
      "Coordinated 5 design staff",
      "Directed promotional visuals for 20+ high schools",
    ],
  },
  {
    id: "student-ceos",
    organization: "Student x CEOs Global Summit",
    role: "Graphic Design Manager",
    period: "May – November 2025",
    points: ["Led 4 designers", "Coordinated with 25 internal team members"],
  },
];
