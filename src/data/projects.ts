export type ProjectImage = {
  src: string;
  /** Real pixel size of the file. Used so every picture keeps its own proportions. */
  width: number;
  height: number;
  alt: string;
};

export type Project = {
  id: string;
  title: string;
  tagline: string;
  overview?: string;
  features: { label: string; text: string }[];
  stack: { label: string; value: string }[];
  repo: string;
  images: ProjectImage[];
};

const imgs = (
  folder: string,
  title: string,
  files: [string, number, number][],
): ProjectImage[] =>
  files.map(([name, width, height], i) => ({
    src: `/projects/${folder}/${name}`,
    width,
    height,
    alt: `${title}, image ${i + 1} of ${files.length}`,
  }));

/**
 * To add a project: drop its pictures in /public/projects/<folder>/, then add an
 * entry below with each picture's real width and height in pixels.
 */
export const projects: Project[] = [
  {
    id: "cat-and-bunnies",
    title: "The Cat & The Bunnies' Riddle",
    tagline:
      "A cozy, top-down 2D pixel-art puzzle RPG platformer developed for an Object-Oriented Programming course.",
    features: [
      {
        label: "Premise",
        text: "Players control a hungry cat who sneaks out of its owner's house and gets lost in an unfamiliar neighborhood. To learn the way back home from a local guide rabbit, the cat must find and trade three carrots.",
      },
      {
        label: "Gameplay loop",
        text: "Set in a relaxed, residential world of vegetable stalls, gardens, and houses, players explore, interact with NPCs, and solve three types of puzzles to collect carrots.",
      },
      {
        label: "Stealth puzzles",
        text: "Sneaking carrots from a vegetable stall undetected.",
      },
      {
        label: "Dialogue puzzles",
        text: "Choosing the right conversational branches to persuade neighbor rabbits.",
      },
      {
        label: "Logic puzzles",
        text: "Navigating spatial challenges, directional mazes, and pushable objects in the garden.",
      },
      {
        label: "Core systems",
        text: "Built around OOP principles (Character, Object, and Puzzle base classes) with a simple inventory system, interactive dialogue trees, and an expandable roadmap toward dual-character switching (cat and rabbit), save/load functionality, and dynamic multi-area maps.",
      },
    ],
    stack: [
      {
        label: "Language",
        value: "C# (gameplay scripting, character controls, NPC interactions, and puzzle logic)",
      },
      {
        label: "Art & animation",
        value: "Aseprite (2D pixel art and sprites), Adobe Photoshop & Illustrator (UI and graphic assets)",
      },
      { label: "Collaboration", value: "Git" },
      {
        label: "Platform",
        value: "PC (Windows/Linux), with optional future expansion to Android or Web",
      },
    ],
    repo: "https://github.com/xoaaa/the-cat-and-the-bunnies-riddle-three",
    images: imgs("cat-and-bunnies", "The Cat & The Bunnies' Riddle", [
      ["catbunnies1.jpeg", 1280, 720],
      ["catbunnies2.jpeg", 1280, 720],
      ["catbunnies3.jpeg", 1280, 720],
      ["catbunnies4.jpeg", 1280, 720],
      ["catbunnies5.jpeg", 1280, 720],
    ]),
  },
  {
    id: "guide-into-the-informatics",
    title: "Guide Into The Informatics",
    tagline:
      "A visual novel built with Ren'Py about guiding new students through the informatics department.",
    overview:
      "An interactive, story-driven 2D visual novel developed to welcome incoming freshmen and introduce them to the Department of Informatics Engineering.",
    features: [
      {
        label: "Premise",
        text: "Players step into the shoes of a newly admitted Informatics Engineering student navigating their first days on campus. Guided by upperclassmen and faculty characters, they explore the department building and uncover everything they need to know to kickstart their academic journey.",
      },
      {
        label: "Campus & facility tour",
        text: "Navigating through lecture halls, research laboratories, student lounges, and administrative offices through conversational chapters and interactive choices.",
      },
      {
        label: "Core systems",
        text: "Branching dialogue trees, character sprite state transitions, scene backgrounds representing real department locations, and an intuitive click-to-advance interface with save/load support.",
      },
    ],
    stack: [
      { label: "Engine", value: "Ren'Py" },
      {
        label: "Scripting",
        value: "Python & Ren'Py Script (dialogue flow, branching choices, scene transitions, and UI customization)",
      },
      {
        label: "Art & UI",
        value: "Drawn 2D character sprites, department background visuals, and dialogue box interfaces",
      },
      { label: "Version control", value: "Git" },
      { label: "Platform", value: "PC (Windows/Linux/macOS)" },
    ],
    repo: "https://github.com/xoaaa/Guide-Into-The-Informatics",
    images: imgs("guide", "Guide Into The Informatics", [
      ["guide1.jpeg", 1280, 718],
      ["guide2.jpeg", 1267, 1280],
    ]),
  },
  {
    id: "event-management-system",
    title: "Event Management System",
    tagline:
      "An event ticketing and booking system built as a REST API for managing events, reservations, tickets, and refunds.",
    overview:
      "A Python backend that lets organizers create and manage events while attendees book tickets and follow their booking status. It uses a layered Clean Architecture and Domain-Driven Design structure to separate the API, application logic, domain rules, and database access.",
    features: [
      {
        label: "Event management",
        text: "Create events, publish or cancel them, and add or disable ticket categories with prices, quotas, and sale dates.",
      },
      {
        label: "Booking flow",
        text: "Create bookings, retrieve their details, and manage payment and expiration states.",
      },
      {
        label: "Ticket handling",
        text: "Check in tickets associated with a booking.",
      },
      {
        label: "Refund flow",
        text: "Request refunds and manage their approval, rejection, and payout statuses.",
      },
      {
        label: "API",
        text: "FastAPI endpoints accept and return structured data, with interactive API documentation available through Swagger UI.",
      },
    ],
    stack: [
      { label: "Language", value: "Python" },
      { label: "API framework", value: "FastAPI" },
      { label: "Database", value: "PostgreSQL" },
      { label: "ORM & access", value: "SQLAlchemy, psycopg2" },
      { label: "Architecture", value: "Clean Architecture and Domain-Driven Design" },
      { label: "Validation", value: "Pydantic" },
      { label: "Testing", value: "pytest and pytest-asyncio" },
      {
        label: "Platform",
        value: "Backend service accessible to HTTP API clients on Windows, Linux, and macOS",
      },
    ],
    repo: "https://github.com/xoaaa/Event-Management-System",
    images: imgs("ems", "Event Management System", [
      ["ems1.jpeg", 1600, 834],
      ["ems2.jpeg", 1600, 859],
    ]),
  },
  {
    id: "myfilm",
    title: "Myfilm: Film Catalog & Management",
    tagline:
      "A full-stack web application for discovering and managing films, with a personal watchlist and admin tools.",
    overview:
      "Users can browse a film catalog, read details and reviews, and maintain a personal watchlist. Administrators can manage films and genres.",
    features: [
      {
        label: "Film discovery",
        text: "Browse and search the catalog, explore genres, and view film details such as synopsis, director, release year, and poster.",
      },
      {
        label: "Reviews & watchlist",
        text: "Signed-in users can write reviews, react to reviews, and add films to their watchlist.",
      },
      {
        label: "Administration",
        text: "Admin accounts can manage films and genres, including uploading film posters.",
      },
      {
        label: "Core systems",
        text: "Role-based access, JWT authentication, a REST API, and local JSON-file storage for development.",
      },
    ],
    stack: [
      { label: "Frontend", value: "Next.js 14, React 18, TypeScript" },
      { label: "Styling", value: "Tailwind CSS" },
      { label: "Backend", value: "Node.js HTTP server" },
      { label: "API & data", value: "REST endpoints, JSON-file persistence, local poster uploads" },
      { label: "State & forms", value: "TanStack Query, Zustand, React Hook Form, Zod" },
      { label: "HTTP client", value: "Axios" },
      { label: "Version control", value: "Git & GitHub" },
      { label: "Platform", value: "Web" },
    ],
    repo: "https://github.com/fuhuavl/myfilm-alhaura-rh-vercel",
    images: imgs("myfilm", "Myfilm", [
      ["myfilm1.jpeg", 1487, 1227],
      ["myfilm2.jpeg", 1600, 1079],
      ["myfilm3.jpeg", 1462, 796],
    ]),
  },
  {
    id: "wishing-you",
    title: "Wishing You",
    tagline:
      "A web application for celebrating birthdays with heartfelt messages, reminders, and a shared space for warm wishes.",
    overview:
      "Users can create personal birthday entries, receive notifications, and view messages sent for their special day. The platform combines social interaction with digital birthday management, making it a practical and engaging place to share appreciation and celebration online.",
    features: [
      {
        label: "Premise",
        text: "Users step into a digital birthday celebration space where they can send warm wishes to friends, family, or anyone they care about, with a focus on meaningful messages and reminder features.",
      },
      {
        label: "User flow",
        text: "Register or log in, add a birthday reminder, write a personal message, and let others send greetings on the selected date. Users can view all birthday wishes for a date and interact through comments.",
      },
      {
        label: "Core systems",
        text: "User authentication, birthday data management, message posting, comment interaction, and calendar-based reminders, with sections for home, send message, view messages, login/register, and a birthday calendar.",
      },
    ],
    stack: [
      { label: "Frontend", value: "HTML, CSS, JavaScript" },
      { label: "Backend", value: "Node.js and Express.js" },
      { label: "Database", value: "MongoDB with Mongoose" },
      { label: "Authentication", value: "JWT and bcryptjs" },
      { label: "Email & reminders", value: "Nodemailer and node-cron" },
      { label: "Version control", value: "Git" },
      { label: "Platform", value: "Web application for desktop and browser-based use" },
    ],
    repo: "https://github.com/xoaaa/Wishing-You",
    images: imgs("wishing-you", "Wishing You", [
      ["wy1.jpeg", 1547, 1211],
      ["wy2.jpeg", 1600, 1059],
    ]),
  },
  {
    id: "task-manager",
    title: "Task Manager",
    tagline:
      "A web application for organizing personal tasks and collaborating on shared work.",
    overview:
      "Users can create an account, manage tasks with optional deadlines, and keep track of their progress. Two features stand out: sharing tasks with other users and viewing deadline-based tasks in a monthly calendar.",
    features: [
      {
        label: "Purpose",
        text: "Help users keep track of tasks, deadlines, and completion status in one place.",
      },
      {
        label: "Workflow",
        text: "Register or log in, create a task, add a description or deadline, and optionally share it with other users. Tasks can be filtered by pending or completed status.",
      },
      {
        label: "Task management",
        text: "Create, edit, and delete your own tasks, mark tasks complete, and see overdue indicators where applicable.",
      },
      {
        label: "Shared tasks",
        text: "Task owners can share tasks with other registered users by entering their usernames. Shared tasks appear in the recipients' lists with the owner identified. Recipients can mark shared tasks complete, while editing and deleting are reserved for the owner.",
      },
      {
        label: "Calendar view",
        text: "Shows tasks with deadlines for the selected month, both owned and shared, with status indicators for pending, overdue, and completed tasks. Users can move between months, and a monthly task list adds detail beside the calendar.",
      },
    ],
    stack: [
      { label: "Frontend", value: "HTML, CSS, Django templates, and JavaScript" },
      { label: "Backend", value: "Django and Django REST Framework" },
      { label: "Language", value: "Python" },
      { label: "Database", value: "SQLite" },
      { label: "Authentication", value: "Django's built-in user authentication and sessions" },
      {
        label: "API",
        value: "Authenticated endpoints for listing, creating, updating, and deleting tasks",
      },
      { label: "Version control", value: "Git" },
      { label: "Platform", value: "Browser-based web application" },
    ],
    repo: "https://github.com/fuhuavl/task-manager-pbkk",
    images: imgs("task-manager", "Task Manager", [
      ["tm1.jpeg", 721, 825],
      ["tm2.jpeg", 640, 941],
      ["tm3.jpeg", 960, 916],
    ]),
  },
];

/**
 * Where the "View Projects" button should go. Leave empty to scroll to the
 * project list on this page.
 */
export const projectsUrl = "";
