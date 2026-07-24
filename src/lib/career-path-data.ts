import type { LucideIcon } from "lucide-react";
import {
  Code2,
  ServerCog,
  Layers,
  Palette,
  LineChart,
  BrainCircuit,
  CloudCog,
  ShieldCheck,
  Blocks,
  Gamepad2,
  Compass,
  Sparkles,
  Smartphone,
  Users,
  Scale,
  Microscope,
  Handshake,
  Wrench,
  BookOpenText,
  Bug,
  LifeBuoy,
  Radar,
  MessageSquareCode,
  Database,
  GitBranch,
  Megaphone,
} from "lucide-react";

/**
 * Career Path — WEBMUSE's technology career decision engine.
 *
 * Successor to the original "Career Quiz" built for motunmarteen.tech.
 * Rebuilt from that engine's 13-question / 20-path scoring model with a
 * wider question set, a wider set of current-day tech roles, and a
 * two-axis scoring layer (see CareerAxes) that explains *why* a path fits,
 * not just that it does.
 */

export type CareerAxisKey = "builder" | "analyst" | "people" | "craft";

export interface CareerAxes {
  /** Hands building/shipping systems vs. thinking about them */
  builder: number;
  /** Drawn to data, patterns, and evidence over intuition */
  analyst: number;
  /** Energized by people, communication, and coordination */
  people: number;
  /** Pulled toward depth, precision, and mastery of a craft */
  craft: number;
}

export interface QuizOption {
  id: string;
  text: string;
  /** Career path id -> points awarded for choosing this option */
  scores: Record<string, number>;
  /** Which axes this option leans toward, and by how much */
  axes: Partial<CareerAxes>;
}

export interface QuizQuestion {
  id: number;
  category: string;
  question: string;
  helper?: string;
  options: QuizOption[];
}

export interface Resource {
  name: string;
  url: string;
  type: "free" | "paid";
  price?: string;
}

export interface CareerPath {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  personalityMatch: string;
  keySkills: string[];
  roadmap: string[];
  adviceFromMotun: string;
  resources: Resource[];
  salaryRange: string;
  growthOutlook: string;
  dominantAxes: CareerAxisKey[];
}

export const AXIS_LABELS: Record<CareerAxisKey, { label: string; description: string }> = {
  builder: { label: "Builder", description: "Energized by making and shipping things directly" },
  analyst: { label: "Analyst", description: "Drawn to evidence, data, and finding the pattern" },
  people: { label: "Connector", description: "Motivated by people, communication, coordination" },
  craft: { label: "Craftsperson", description: "Pulled toward depth, precision, mastery" },
};

// ---------------------------------------------------------------------------
// Questions
// ---------------------------------------------------------------------------

export const careerQuestions: QuizQuestion[] = [
  {
    id: 1,
    category: "Curiosity",
    question:
      "You're looking at something complex — a popular app, a city's traffic flow, an airline's booking system. What pulls your attention first?",
    options: [
      {
        id: "a",
        text: "How it's built underneath — the code, the infrastructure, the plumbing.",
        scores: { backend: 2, platformEngineer: 1 },
        axes: { builder: 2 },
      },
      {
        id: "b",
        text: "How people actually use it, and where it frustrates them.",
        scores: { uiux: 2, frontend: 1 },
        axes: { people: 1, craft: 1 },
      },
      {
        id: "c",
        text: "The data it's generating and what it could tell you.",
        scores: { dataScience: 2, dataEngineer: 1 },
        axes: { analyst: 2 },
      },
      {
        id: "d",
        text: "Whether it would survive ten times the load.",
        scores: { devops: 1, sre: 2 },
        axes: { builder: 1, craft: 1 },
      },
      {
        id: "e",
        text: "Why it exists — who it's for, and what problem it's really solving.",
        scores: { productManager: 2 },
        axes: { people: 1, analyst: 1 },
      },
    ],
  },
  {
    id: 2,
    category: "Instinct",
    question: "Someone hands you a new tool you've never used. What's your first move?",
    options: [
      {
        id: "a",
        text: "Try to break it — find the edge case that makes it fall over.",
        scores: { cybersecurity: 2, qaAutomation: 1 },
        axes: { craft: 2 },
      },
      {
        id: "b",
        text: "Open the docs and see how it connects to everything else.",
        scores: { backend: 2, fullstack: 1 },
        axes: { builder: 1, analyst: 1 },
      },
      {
        id: "c",
        text: "Click every button before reading anything.",
        scores: { uiux: 2, frontend: 1 },
        axes: { craft: 1, people: 1 },
      },
      {
        id: "d",
        text: "Figure out how to automate the boring part of using it.",
        scores: { devops: 2, platformEngineer: 1 },
        axes: { builder: 2 },
      },
      {
        id: "e",
        text: "Picture a product you could build with it.",
        scores: { productManager: 1, founder: 2 },
        axes: { people: 1, builder: 1 },
      },
    ],
  },
  {
    id: 3,
    category: "Problem-solving",
    question: "Which kind of problem gives you the most satisfaction when it finally clicks?",
    options: [
      {
        id: "a",
        text: "An algorithm or system design puzzle with an elegant solution.",
        scores: { backend: 2, aiml: 1 },
        axes: { builder: 1, craft: 2 },
      },
      {
        id: "b",
        text: "A confusing user flow you can make effortless.",
        scores: { uiux: 2 },
        axes: { craft: 2, people: 1 },
      },
      {
        id: "c",
        text: "Wiring separate pieces together into one working system.",
        scores: { fullstack: 2, devops: 1 },
        axes: { builder: 2 },
      },
      {
        id: "d",
        text: "A dataset that's hiding a pattern nobody's noticed yet.",
        scores: { dataScience: 2, aiml: 1 },
        axes: { analyst: 2 },
      },
      {
        id: "e",
        text: "Something that's never been built quite this way before.",
        scores: { founder: 2, blockchain: 1 },
        axes: { builder: 1, people: 1 },
      },
    ],
  },
  {
    id: 4,
    category: "Focus",
    question: "You're on the team building a widely-used mobile app. Where do you want to spend your time?",
    options: [
      {
        id: "a",
        text: "Making it visually effortless and genuinely enjoyable to use.",
        scores: { uiux: 2, mobileAppDev: 1 },
        axes: { craft: 2, people: 1 },
      },
      {
        id: "b",
        text: "Making the interface fast and bug-free under real use.",
        scores: { frontend: 2, mobileAppDev: 1 },
        axes: { builder: 2, craft: 1 },
      },
      {
        id: "c",
        text: "Building the backend that survives millions of users hitting it at once.",
        scores: { backend: 2, sre: 1 },
        axes: { builder: 2, analyst: 1 },
      },
      {
        id: "d",
        text: "Adding an AI feature that genuinely changes what the app can do.",
        scores: { aiml: 2, mobileAppDev: 1 },
        axes: { analyst: 1, craft: 1 },
      },
      {
        id: "e",
        text: "Making sure user data can't leak, ever.",
        scores: { cybersecurity: 2 },
        axes: { craft: 2, analyst: 1 },
      },
    ],
  },
  {
    id: 5,
    category: "Learning style",
    question: "How do you actually learn a new technical skill — not how you think you should, how you really do?",
    options: [
      {
        id: "a",
        text: "Read the official docs and technical writing until it makes sense.",
        scores: { backend: 1, devops: 1, technicalWriter: 2 },
        axes: { analyst: 1, craft: 1 },
      },
      {
        id: "b",
        text: "Watch someone build it, then copy and adapt.",
        scores: { frontend: 1, uiux: 1, gamedev: 1 },
        axes: { craft: 1 },
      },
      {
        id: "c",
        text: "Start a project with no plan and figure it out by breaking things.",
        scores: { fullstack: 1, founder: 1, platformEngineer: 1 },
        axes: { builder: 2 },
      },
      {
        id: "d",
        text: "Take a structured course, in order, start to finish.",
        scores: { dataScience: 1, aiml: 1, qaAutomation: 1 },
        axes: { analyst: 1, craft: 1 },
      },
      {
        id: "e",
        text: "Take something apart to see exactly how it works.",
        scores: { cybersecurity: 1, blockchain: 1, itSupport: 1 },
        axes: { craft: 2 },
      },
    ],
  },
  {
    id: 6,
    category: "Momentum",
    question: "Which current in tech genuinely pulls your attention, not just the one you feel you're supposed to care about?",
    options: [
      {
        id: "a",
        text: "What large language models are starting to make possible.",
        scores: { aiml: 2, promptEngineer: 2 },
        axes: { analyst: 2 },
      },
      {
        id: "b",
        text: "Decentralization, ownership, and what it means for the internet's next layer.",
        scores: { blockchain: 2 },
        axes: { builder: 1, analyst: 1 },
      },
      {
        id: "c",
        text: "Immersive, real-time, interactive experiences — games, XR, simulations.",
        scores: { gamedev: 2, uiux: 1 },
        axes: { craft: 2 },
      },
      {
        id: "d",
        text: "How exposed everything connected to the internet actually is.",
        scores: { cybersecurity: 2 },
        axes: { craft: 2, analyst: 1 },
      },
      {
        id: "e",
        text: "How much infrastructure now runs itself without a human touching it.",
        scores: { devops: 2, platformEngineer: 1 },
        axes: { builder: 2 },
      },
    ],
  },
  {
    id: 7,
    category: "Team dynamics",
    question: "On a team project, which role do you drift toward without being assigned it?",
    options: [
      {
        id: "a",
        text: "The architect — deciding how the pieces connect.",
        scores: { backend: 2, fullstack: 1, platformEngineer: 1 },
        axes: { builder: 2, craft: 1 },
      },
      {
        id: "b",
        text: "The builder — heads-down, writing the feature.",
        scores: { frontend: 1, backend: 1, mobileAppDev: 1 },
        axes: { builder: 2 },
      },
      {
        id: "c",
        text: "The skeptic — poking holes before it ships.",
        scores: { qaAutomation: 2, cybersecurity: 1 },
        axes: { craft: 2 },
      },
      {
        id: "d",
        text: "The coordinator — keeping everyone aligned on what matters.",
        scores: { productManager: 2, technicalProgramManager: 1 },
        axes: { people: 2 },
      },
      {
        id: "e",
        text: "The one pitching the idea nobody else thought to try.",
        scores: { founder: 2, uiux: 1 },
        axes: { people: 1, builder: 1 },
      },
    ],
  },
  {
    id: 8,
    category: "Purpose",
    question: "What kind of impact would make the work feel worth it?",
    options: [
      {
        id: "a",
        text: "Tools that make other engineers dramatically more effective.",
        scores: { devops: 2, platformEngineer: 2, openSourceMaintainer: 1 },
        axes: { builder: 2, people: 1 },
      },
      {
        id: "b",
        text: "A product people genuinely enjoy and tell their friends about.",
        scores: { uiux: 2, frontend: 1, mobileAppDev: 1 },
        axes: { craft: 1, people: 1 },
      },
      {
        id: "c",
        text: "Using data or AI to solve a problem at real scale.",
        scores: { dataScience: 1, aiml: 2, dataEngineer: 1 },
        axes: { analyst: 2 },
      },
      {
        id: "d",
        text: "Building something that creates an entirely new kind of market.",
        scores: { founder: 2, blockchain: 1 },
        axes: { builder: 1, people: 1 },
      },
      {
        id: "e",
        text: "Making sure technology doesn't quietly harm the people using it.",
        scores: { cybersecurity: 1, techEthicist: 2 },
        axes: { analyst: 1, people: 1 },
      },
    ],
  },
  {
    id: 9,
    category: "Depth vs. breadth",
    question: "How do you feel about the fact that tools and frameworks keep changing under you?",
    options: [
      {
        id: "a",
        text: "I like it — exploring the new thing is half the fun.",
        scores: { fullstack: 1, frontend: 1, founder: 1 },
        axes: { builder: 1 },
      },
      {
        id: "b",
        text: "I'll learn what the job needs, but I'd rather master a few tools deeply.",
        scores: { backend: 1, devops: 1, sre: 1 },
        axes: { craft: 1 },
      },
      {
        id: "c",
        text: "It's a lot, but it's the price of admission and I've made peace with it.",
        scores: { dataScience: 1, aiml: 1 },
        axes: { analyst: 1 },
      },
      {
        id: "d",
        text: "Honestly, I'd rather go narrow and deep than broad and shallow.",
        scores: { cybersecurity: 1, specializedExpert: 2 },
        axes: { craft: 2 },
      },
      {
        id: "e",
        text: "I care more about the 'why' than which specific tool gets us there.",
        scores: { productManager: 2 },
        axes: { people: 1, analyst: 1 },
      },
    ],
  },
  {
    id: 10,
    category: "Environment",
    question: "Picture your ideal workday. What matters most in it?",
    options: [
      {
        id: "a",
        text: "A room full of people sketching ideas on a whiteboard.",
        scores: { uiux: 1, productManager: 1, productMarketing: 1 },
        axes: { people: 2 },
      },
      {
        id: "b",
        text: "Long, uninterrupted focus time — headphones on, deep in the problem.",
        scores: { backend: 1, dataScience: 1, cybersecurity: 1 },
        axes: { craft: 2 },
      },
      {
        id: "c",
        text: "Fast, scrappy, trying three new tools before lunch.",
        scores: { frontend: 1, fullstack: 1, founder: 1 },
        axes: { builder: 1 },
      },
      {
        id: "d",
        text: "Calm and structured — clear process, predictable reliability.",
        scores: { devops: 1, sre: 1, itSupport: 1 },
        axes: { craft: 1, analyst: 1 },
      },
      {
        id: "e",
        text: "Variety — a different kind of problem every week.",
        scores: { consultant: 2, technicalProgramManager: 1 },
        axes: { people: 1, analyst: 1 },
      },
    ],
  },
  {
    id: 11,
    category: "Reality check",
    question: "Which of these sentences sounds most like something you'd actually say about your work?",
    options: [
      {
        id: "a",
        text: "\"I want to turn what the engineers built into a story customers actually understand.\"",
        scores: { productMarketing: 2 },
        axes: { people: 2 },
      },
      {
        id: "b",
        text: "\"I want to be the person who can make any cloud infrastructure scale and not fall over.\"",
        scores: { cloudEngineer: 2, sre: 1 },
        axes: { builder: 2, craft: 1 },
      },
      {
        id: "c",
        text: "\"I want to build the app people actually pull out their phone for.\"",
        scores: { mobileAppDev: 2, frontend: 1 },
        axes: { builder: 1, craft: 1 },
      },
      {
        id: "d",
        text: "\"I want to write the explanation that finally makes a confusing API make sense.\"",
        scores: { technicalWriter: 2, developerAdvocate: 1 },
        axes: { people: 1, craft: 1 },
      },
      {
        id: "e",
        text: "\"I want to be the reason a bug never reaches a real user.\"",
        scores: { qaAutomation: 2, sre: 1 },
        axes: { craft: 2 },
      },
    ],
  },
  {
    id: 12,
    category: "Reality check",
    question: "Pick the task that sounds most like a good afternoon, not a chore.",
    options: [
      {
        id: "a",
        text: "Planning a launch across sales, marketing, and engineering.",
        scores: { productMarketing: 2, productManager: 1 },
        axes: { people: 2 },
      },
      {
        id: "b",
        text: "Migrating a company's infrastructure to the cloud with zero downtime.",
        scores: { cloudEngineer: 2, devops: 1 },
        axes: { builder: 2, craft: 1 },
      },
      {
        id: "c",
        text: "Shipping a cross-platform mobile app from a blank folder.",
        scores: { mobileAppDev: 2, fullstack: 1 },
        axes: { builder: 2 },
      },
      {
        id: "d",
        text: "Writing the guide that turns a confusing new API into something obvious.",
        scores: { technicalWriter: 2, backend: 1 },
        axes: { craft: 1, people: 1 },
      },
      {
        id: "e",
        text: "Building a test suite so thorough nothing broken ships again.",
        scores: { qaAutomation: 2, devops: 1 },
        axes: { craft: 2 },
      },
    ],
  },
  {
    id: 13,
    category: "Reality check",
    question: "If a company handed you a blank job description and said \"grow into whatever you want,\" what would you ask for first?",
    options: [
      {
        id: "a",
        text: "Access to users — I want to talk to the people who'll use this.",
        scores: { productManager: 2, uiux: 1 },
        axes: { people: 2 },
      },
      {
        id: "b",
        text: "Access to the infrastructure — I want to see how it all really runs.",
        scores: { platformEngineer: 2, sre: 1 },
        axes: { builder: 2 },
      },
      {
        id: "c",
        text: "Access to the data — I want to know what's actually true.",
        scores: { dataEngineer: 2, dataScience: 1 },
        axes: { analyst: 2 },
      },
      {
        id: "d",
        text: "Access to the community — I want to help people get unblocked.",
        scores: { developerAdvocate: 2, itSupport: 1 },
        axes: { people: 2 },
      },
      {
        id: "e",
        text: "A single hard, narrow problem nobody's solved yet.",
        scores: { specializedExpert: 2, blockchain: 1 },
        axes: { craft: 2 },
      },
    ],
  },
  {
    id: 14,
    category: "AI-era check",
    question: "Generative AI now writes a lot of code and copy on its own. What's your honest reaction?",
    options: [
      {
        id: "a",
        text: "I want to be the one steering it — designing the prompts and systems around it.",
        scores: { promptEngineer: 2, aiml: 1 },
        axes: { analyst: 2, craft: 1 },
      },
      {
        id: "b",
        text: "It changes what I build, not whether I still need to understand systems deeply.",
        scores: { backend: 1, platformEngineer: 1, sre: 1 },
        axes: { craft: 1, builder: 1 },
      },
      {
        id: "c",
        text: "It raises the stakes on security and correctness — someone has to catch what it gets wrong.",
        scores: { cybersecurity: 1, qaAutomation: 2 },
        axes: { craft: 2 },
      },
      {
        id: "d",
        text: "It makes the ethics and governance questions more urgent, not less.",
        scores: { techEthicist: 2 },
        axes: { analyst: 1, people: 1 },
      },
      {
        id: "e",
        text: "It's a tool. I want to use it to build faster, not think about it philosophically.",
        scores: { fullstack: 1, founder: 2 },
        axes: { builder: 2 },
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Career paths
// ---------------------------------------------------------------------------

export const careerPaths: Record<string, CareerPath> = {
  frontend: {
    id: "frontend",
    title: "Frontend Developer",
    subtitle: "The Interface Architect",
    icon: Code2,
    description:
      "You build the part of the product people actually touch — the layout, the interaction, the feel of every click. You live at the intersection of design and engineering, and you care when something is a pixel off.",
    personalityMatch: "Creative, detail-oriented, and genuinely bothered by clunky UX — you notice friction other people scroll past.",
    keySkills: ["HTML/CSS/JavaScript", "React or Vue", "TypeScript", "Responsive design", "Web performance", "Accessibility"],
    roadmap: [
      "Get HTML, CSS, and JavaScript fundamentals rock solid before reaching for a framework.",
      "Learn React (or Vue) deeply — components, state, and why re-renders happen.",
      "Learn Git and ship real projects, not just tutorials, to a real URL.",
      "Study performance, accessibility, and testing once the basics are automatic.",
      "Build a portfolio of 3-4 projects you can talk through in an interview.",
    ],
    adviceFromMotun:
      "Ship things. A portfolio of finished, deployed projects beats a folder of half-built tutorials every time. Care about accessibility from day one — it's much harder to retrofit than to build in.",
    resources: [
      { name: "The Odin Project", url: "https://www.theodinproject.com/", type: "free" },
      { name: "JavaScript.info", url: "https://javascript.info/", type: "free" },
      { name: "Frontend Masters", url: "https://frontendmasters.com/", type: "paid" },
    ],
    salaryRange: "$70,000 – $135,000",
    growthOutlook: "Strong — every product needs an interface",
    dominantAxes: ["builder", "craft"],
  },
  backend: {
    id: "backend",
    title: "Backend Developer",
    subtitle: "The Systems Engineer",
    icon: ServerCog,
    description:
      "You build the logic, data, and APIs running behind the interface — the part users never see but always feel when it's slow or wrong. You think in systems: what happens when this scales 100x.",
    personalityMatch: "Analytical, systems-minded, and comfortable holding a lot of moving parts in your head at once.",
    keySkills: ["Node.js/Python/Go/Java", "SQL & NoSQL databases", "API design (REST/GraphQL)", "System design", "Caching & queues", "Security fundamentals"],
    roadmap: [
      "Pick one backend language and go deep before spreading wide.",
      "Learn relational databases properly — schema design, indexing, transactions.",
      "Build and ship a real API, not a toy CRUD app — add auth, rate limits, error handling.",
      "Study system design: caching, queues, horizontal scaling, failure modes.",
      "Read production incident postmortems from real companies — that's where the real lessons live.",
    ],
    adviceFromMotun:
      "Understand what happens when things fail, not just when they work. Every backend engineer eventually gets paged at 2am — the ones who thrive already thought about that failure mode at design time.",
    resources: [
      { name: "Node.js Docs", url: "https://nodejs.org/en/docs/", type: "free" },
      { name: "Designing Data-Intensive Applications", url: "https://dataintensive.net/", type: "paid" },
      { name: "REST API Design Best Practices", url: "https://restfulapi.net/", type: "free" },
    ],
    salaryRange: "$80,000 – $150,000",
    growthOutlook: "Strong — the layer every product depends on",
    dominantAxes: ["builder", "analyst"],
  },
  fullstack: {
    id: "fullstack",
    title: "Fullstack Developer",
    subtitle: "The Versatile Builder",
    icon: Layers,
    description:
      "You're comfortable on both sides of the wire — building an interface and the API that feeds it. You'd rather own a feature end-to-end than hand it off at the halfway point.",
    personalityMatch: "Adaptable and pragmatic — you'd rather ship the whole thing than perfect one layer of it.",
    keySkills: ["Frontend framework", "Backend framework", "Databases", "API design", "Deployment basics", "Debugging across the stack"],
    roadmap: [
      "Build solid fundamentals on both frontend and backend before calling yourself fullstack.",
      "Learn how the two actually talk — HTTP, APIs, auth, sessions.",
      "Ship 2-3 complete projects end-to-end, including deployment.",
      "Pick a primary stack and go deep rather than skimming five frameworks.",
      "Get comfortable being the one who unblocks a stuck feature anywhere in the stack.",
    ],
    adviceFromMotun:
      "Pick a stack and go deep before you go broad — a fullstack developer who's shallow everywhere is less useful than one who's genuinely strong in two adjacent layers.",
    resources: [
      { name: "Full Stack Open", url: "https://fullstackopen.com/en/", type: "free" },
      { name: "MDN Web Docs", url: "https://developer.mozilla.org/", type: "free" },
    ],
    salaryRange: "$80,000 – $155,000",
    growthOutlook: "Strong — especially at startups and small teams",
    dominantAxes: ["builder"],
  },
  uiux: {
    id: "uiux",
    title: "UI/UX Designer",
    subtitle: "The Experience Architect",
    icon: Palette,
    description:
      "You design how a product feels to use — the flow, the clarity, the small delight when something just works. You think in user journeys before you think in pixels.",
    personalityMatch: "Empathetic and visually sharp — you notice when a flow confuses someone before they say a word about it.",
    keySkills: ["User research", "Wireframing & prototyping", "Figma", "Usability testing", "Information architecture", "Interaction design"],
    roadmap: [
      "Learn design thinking and user-centered design principles.",
      "Master Figma — it's the industry default.",
      "Practice user research: interviews, personas, journey mapping.",
      "Build a case-study portfolio that shows your process, not just final screens.",
      "Learn just enough frontend to know what's realistic to build.",
    ],
    adviceFromMotun:
      "Document your process, not just your polish. Hiring managers want to see how you got to a decision, not just the final mockup — the thinking is the actual skill.",
    resources: [
      { name: "Nielsen Norman Group", url: "https://www.nngroup.com/", type: "free" },
      { name: "Figma Learn", url: "https://www.figma.com/resources/learn-design/", type: "free" },
      { name: "Google UX Design Certificate", url: "https://www.coursera.org/professional-certificates/google-ux-design", type: "paid" },
    ],
    salaryRange: "$65,000 – $130,000",
    growthOutlook: "Strong — good design is a competitive edge now",
    dominantAxes: ["craft", "people"],
  },
  dataScience: {
    id: "dataScience",
    title: "Data Scientist",
    subtitle: "The Pattern Finder",
    icon: LineChart,
    description:
      "You pull signal out of noisy data and turn it into a decision someone can act on. You're as interested in the story the numbers tell as the model that produced them.",
    personalityMatch: "Curious and rigorous — you don't trust a conclusion until you've checked it three ways.",
    keySkills: ["Python or R", "Statistics & probability", "SQL", "Machine learning fundamentals", "Data visualization", "Communicating findings"],
    roadmap: [
      "Build a real foundation in statistics — not just library calls, the actual concepts.",
      "Learn Python's data stack: pandas, numpy, matplotlib, scikit-learn.",
      "Work through real, messy datasets — Kaggle is a fine start, your own data is better.",
      "Practice explaining a finding to someone non-technical in two sentences.",
      "Learn just enough ML to know when a simple model beats a fancy one.",
    ],
    adviceFromMotun:
      "The analysis is half the job — the other half is making someone who isn't technical actually believe and act on what you found. Practice that half deliberately.",
    resources: [
      { name: "Kaggle", url: "https://www.kaggle.com/", type: "free" },
      { name: "Towards Data Science", url: "https://towardsdatascience.com/", type: "free" },
      { name: "Google's ML Crash Course", url: "https://developers.google.com/machine-learning/crash-course", type: "free" },
    ],
    salaryRange: "$85,000 – $155,000",
    growthOutlook: "Strong, and increasingly overlapping with AI/ML roles",
    dominantAxes: ["analyst"],
  },
  dataEngineer: {
    id: "dataEngineer",
    title: "Data Engineer",
    subtitle: "The Pipeline Builder",
    icon: Database,
    description:
      "You build the infrastructure that moves and shapes data before anyone can analyze it — pipelines, warehouses, and the unglamorous plumbing that makes every dashboard and model actually trustworthy.",
    personalityMatch: "Systems-minded like a backend engineer, but obsessed with data correctness rather than user-facing features.",
    keySkills: ["SQL", "Python", "ETL/ELT pipelines", "Data warehousing", "Airflow or similar orchestration", "Cloud data platforms"],
    roadmap: [
      "Get genuinely fluent in SQL — it's the one skill you'll never stop using.",
      "Learn a pipeline orchestration tool (Airflow, Dagster) and build a real pipeline.",
      "Understand data warehouse design: star schemas, partitioning, cost control.",
      "Learn a cloud data stack — BigQuery, Snowflake, or Redshift.",
      "Practice debugging a pipeline that silently produced wrong numbers — it will happen.",
    ],
    adviceFromMotun:
      "Nobody notices data engineering when it works and everybody notices when it breaks. Build for observability from day one — know when your pipeline is lying before your stakeholders do.",
    resources: [
      { name: "Data Engineering Zoomcamp", url: "https://github.com/DataTalksClub/data-engineering-zoomcamp", type: "free" },
      { name: "Airflow Documentation", url: "https://airflow.apache.org/docs/", type: "free" },
    ],
    salaryRange: "$90,000 – $160,000",
    growthOutlook: "Very strong — every AI system needs clean pipelines feeding it",
    dominantAxes: ["builder", "analyst"],
  },
  aiml: {
    id: "aiml",
    title: "AI / ML Engineer",
    subtitle: "The Intelligent Systems Builder",
    icon: BrainCircuit,
    description:
      "You design and ship systems that learn from data — from a recommendation model to a fine-tuned LLM pipeline. You're comfortable with both the math and the messy engineering of getting a model into production.",
    personalityMatch: "Analytically deep and genuinely excited by the frontier — you read papers for fun, not just for work.",
    keySkills: ["Python", "PyTorch or TensorFlow", "Math (linear algebra, calculus, probability)", "MLOps", "Model evaluation", "LLM tooling"],
    roadmap: [
      "Shore up the math — linear algebra, calculus, probability aren't optional here.",
      "Learn PyTorch and build models from scratch before relying on pretrained ones.",
      "Fine-tune an open model and deploy it — the deployment step is where most tutorials stop and most learning starts.",
      "Learn MLOps: versioning, monitoring, and what happens when a model degrades in production.",
      "Follow the actual research, not just the hype cycle around it.",
    ],
    adviceFromMotun:
      "Don't just call an API and call it AI engineering. Understand what's happening underneath — the day you need to debug why a model is wrong, that understanding is the entire job.",
    resources: [
      { name: "Fast.ai", url: "https://www.fast.ai/", type: "free" },
      { name: "Hugging Face", url: "https://huggingface.co/", type: "free" },
      { name: "DeepLearning.AI Specializations", url: "https://www.deeplearning.ai/", type: "paid" },
    ],
    salaryRange: "$105,000 – $190,000",
    growthOutlook: "Very strong — the fastest-growing corner of tech right now",
    dominantAxes: ["analyst", "craft"],
  },
  promptEngineer: {
    id: "promptEngineer",
    title: "AI / Prompt Systems Engineer",
    subtitle: "The Model Whisperer",
    icon: MessageSquareCode,
    description:
      "You design how humans and products actually interact with large language models — prompt architecture, evaluation harnesses, agent workflows, and the guardrails that keep an AI feature reliable in production.",
    personalityMatch: "Part linguist, part engineer — you notice exactly which word in a prompt changed the output, and why.",
    keySkills: ["LLM APIs", "Prompt architecture & evals", "RAG systems", "Agent frameworks", "Python", "Structured output design"],
    roadmap: [
      "Get hands-on with multiple LLM APIs and learn where their behavior actually differs.",
      "Build a retrieval-augmented generation (RAG) system from scratch, not a wrapper library.",
      "Learn to write and run evaluations — 'it seems to work' isn't engineering.",
      "Study agent frameworks and where they reliably break.",
      "Ship a real AI feature into a real product and watch how users actually break it.",
    ],
    adviceFromMotun:
      "This role barely existed a few years ago and it's already maturing fast — the people winning in it treat prompts like code: versioned, tested, and reviewed, not vibes typed into a chat box.",
    resources: [
      { name: "Anthropic's Prompt Engineering Guide", url: "https://docs.anthropic.com/", type: "free" },
      { name: "OpenAI Cookbook", url: "https://cookbook.openai.com/", type: "free" },
      { name: "DeepLearning.AI Short Courses", url: "https://www.deeplearning.ai/short-courses/", type: "free" },
    ],
    salaryRange: "$95,000 – $175,000",
    growthOutlook: "Explosive — brand new but already core to product teams",
    dominantAxes: ["analyst", "craft"],
  },
  devops: {
    id: "devops",
    title: "DevOps Engineer",
    subtitle: "The Delivery Orchestrator",
    icon: CloudCog,
    description:
      "You build the pipelines and automation that let a team ship safely, often, and without drama. You bridge development and operations, and you'd rather automate a problem than solve it manually twice.",
    personalityMatch: "Systematic and automation-obsessed — a repeated manual task genuinely bothers you.",
    keySkills: ["CI/CD", "Docker & Kubernetes", "Infrastructure as Code (Terraform)", "Cloud platforms", "Bash/Python scripting", "Monitoring & alerting"],
    roadmap: [
      "Get comfortable with Linux fundamentals and networking basics.",
      "Learn Git deeply and set up a CI/CD pipeline for a real project.",
      "Learn Docker, then Kubernetes once containers make sense.",
      "Pick up Terraform and manage real infrastructure as code.",
      "Bake security into the pipeline rather than bolting it on afterward.",
    ],
    adviceFromMotun:
      "Automate relentlessly, but never stop understanding what you've automated — the outage that teaches you the most is always the one where the automation itself was the thing that failed.",
    resources: [
      { name: "DevOps Roadmap", url: "https://roadmap.sh/devops", type: "free" },
      { name: "Docker Docs", url: "https://docs.docker.com/", type: "free" },
      { name: "Kubernetes Tutorials", url: "https://kubernetes.io/docs/tutorials/", type: "free" },
    ],
    salaryRange: "$95,000 – $165,000",
    growthOutlook: "Strong — every team shipping software needs this",
    dominantAxes: ["builder", "craft"],
  },
  platformEngineer: {
    id: "platformEngineer",
    title: "Platform Engineer",
    subtitle: "The Internal Tools Builder",
    icon: Wrench,
    description:
      "You build the internal platform other engineers build on top of — golden paths, self-service infrastructure, and the tooling that turns 'ask the ops team' into 'click deploy.' It's DevOps, but as a product for engineers.",
    personalityMatch: "You get quiet satisfaction from making a hundred other engineers 10% faster, even if none of them know your name.",
    keySkills: ["Kubernetes", "Internal developer platforms", "Terraform / IaC", "API design (for internal users)", "Cloud architecture", "Developer experience"],
    roadmap: [
      "Learn DevOps fundamentals first — platform engineering builds on top of them.",
      "Study internal developer platform patterns (Backstage, self-service infra).",
      "Practice designing tools for an internal audience — engineers are also users.",
      "Learn to measure developer experience, not just uptime.",
      "Read about how larger companies structure their platform teams.",
    ],
    adviceFromMotun:
      "Treat your fellow engineers as real users of a real product. The best platform teams run user interviews with their own colleagues — it sounds obvious and almost nobody does it.",
    resources: [
      { name: "Platform Engineering community", url: "https://platformengineering.org/", type: "free" },
      { name: "Backstage.io", url: "https://backstage.io/", type: "free" },
    ],
    salaryRange: "$100,000 – $175,000",
    growthOutlook: "Rapidly growing as companies formalize this as its own discipline",
    dominantAxes: ["builder", "craft"],
  },
  sre: {
    id: "sre",
    title: "Site Reliability Engineer",
    subtitle: "The Uptime Guardian",
    icon: Radar,
    description:
      "You keep large systems up, fast, and observable — defining error budgets, building alerting that actually means something, and being the calm voice during an incident. Part engineer, part first responder.",
    personalityMatch: "Calm under pressure, deeply analytical, and comfortable being the person paged at 3am when something breaks.",
    keySkills: ["Linux & networking", "Monitoring & observability (Prometheus, Grafana)", "Incident response", "Automation & scripting", "Distributed systems", "Capacity planning"],
    roadmap: [
      "Build strong Linux, networking, and systems fundamentals.",
      "Learn observability tooling — metrics, logs, traces, and how they connect.",
      "Study distributed systems failure modes: cascading failures, retries gone wrong.",
      "Practice writing postmortems that find root cause, not just blame.",
      "Get comfortable being the person who says 'let's roll it back' under pressure.",
    ],
    adviceFromMotun:
      "The job isn't preventing every failure — it's building systems that fail small and recover fast. Blameless postmortems aren't a nice HR idea, they're how the whole team actually gets better.",
    resources: [
      { name: "Google's SRE Book", url: "https://sre.google/books/", type: "free" },
      { name: "Prometheus Docs", url: "https://prometheus.io/docs/", type: "free" },
    ],
    salaryRange: "$100,000 – $180,000",
    growthOutlook: "Strong — critical the moment a company has real scale",
    dominantAxes: ["analyst", "craft"],
  },
  cybersecurity: {
    id: "cybersecurity",
    title: "Cybersecurity Engineer",
    subtitle: "The Digital Defender",
    icon: ShieldCheck,
    description:
      "You think like an attacker so you can defend like a professional. You find the vulnerability before someone with worse intentions does, and you're comfortable being paranoid on purpose.",
    personalityMatch: "Detail-obsessed and naturally suspicious of anything that looks 'good enough.'",
    keySkills: ["Networking fundamentals", "Ethical hacking", "Vulnerability assessment", "Incident response", "Cryptography basics", "Security tooling (Nmap, Burp Suite)"],
    roadmap: [
      "Build strong networking and systems administration fundamentals.",
      "Learn common attack vectors and how real breaches actually happened.",
      "Practice on legal, structured platforms (TryHackMe, HackTheBox).",
      "Consider a foundational cert like CompTIA Security+ to structure your learning.",
      "Participate in CTF competitions to test what you actually know under pressure.",
    ],
    adviceFromMotun:
      "Stay paranoid, but stay ethical — the two aren't in tension, they're the whole job. The field moves fast enough that stopping to learn is not optional, it's the baseline.",
    resources: [
      { name: "TryHackMe", url: "https://tryhackme.com/", type: "paid" },
      { name: "OWASP", url: "https://owasp.org/", type: "free" },
      { name: "HackTheBox", url: "https://www.hackthebox.com/", type: "free" },
    ],
    salaryRange: "$90,000 – $160,000",
    growthOutlook: "Very strong — the attack surface only grows",
    dominantAxes: ["craft", "analyst"],
  },
  blockchain: {
    id: "blockchain",
    title: "Blockchain Developer",
    subtitle: "The Decentralized Systems Pioneer",
    icon: Blocks,
    description:
      "You build smart contracts and decentralized applications on transparent, trustless infrastructure. You're comfortable knowing a shipped bug can mean an irreversible financial loss — and you build like it.",
    personalityMatch: "Security-minded, systematic, and drawn to genuinely new infrastructure rather than incremental improvement.",
    keySkills: ["Solidity or Rust", "Smart contract security", "Web3.js/Ethers.js", "EVM or non-EVM chains", "Cryptographic fundamentals", "Testing & auditing"],
    roadmap: [
      "Understand blockchain fundamentals before touching a smart contract language.",
      "Learn Solidity (Ethereum/EVM chains) or Rust (Solana and others).",
      "Build and deploy contracts on a testnet using Hardhat or Foundry.",
      "Study real smart contract exploits — they're the best security education available.",
      "Get a contract properly audited before it ever touches real funds.",
    ],
    adviceFromMotun:
      "Security is not optional here — it's the entire discipline. A bug in a web app is a bad day; a bug in a smart contract can be an unrecoverable loss the moment it's deployed.",
    resources: [
      { name: "Ethereum.org Developer Docs", url: "https://ethereum.org/en/developers/", type: "free" },
      { name: "CryptoZombies", url: "https://cryptozombies.io/", type: "free" },
      { name: "Solidity Docs", url: "https://docs.soliditylang.org/", type: "free" },
    ],
    salaryRange: "$95,000 – $170,000",
    growthOutlook: "Volatile but resilient — cycles with the broader crypto market",
    dominantAxes: ["builder", "craft"],
  },
  gamedev: {
    id: "gamedev",
    title: "Game Developer",
    subtitle: "The Interactive World Builder",
    icon: Gamepad2,
    description:
      "You bring interactive worlds to life — gameplay mechanics, physics, level design, or the engine underneath it all. Games are one of the few products where 'is it fun' is the actual spec.",
    personalityMatch: "Creative and playful, but with the discipline to actually finish a project instead of endlessly prototyping.",
    keySkills: ["Unity or Unreal Engine", "C# or C++", "Game physics", "Level & systems design", "3D/2D graphics fundamentals", "Player-experience thinking"],
    roadmap: [
      "Pick one engine — Unity (C#) or Unreal (C++) — and commit to it.",
      "Build small, finishable games before attempting anything ambitious.",
      "Study game design fundamentals: pacing, feedback loops, difficulty curves.",
      "Join a game jam — the deadline forces you to actually ship.",
      "Build a portfolio of complete, playable projects, not endless prototypes.",
    ],
    adviceFromMotun:
      "Finish the small game. It's genuinely harder than starting the big one, and finishing is the actual skill the industry is short on.",
    resources: [
      { name: "Unity Learn", url: "https://learn.unity.com/", type: "free" },
      { name: "Brackeys (YouTube archive)", url: "https://www.youtube.com/c/Brackeys", type: "free" },
      { name: "GDC Vault", url: "https://gdcvault.com/free", type: "free" },
    ],
    salaryRange: "$70,000 – $140,000",
    growthOutlook: "Steady but highly competitive",
    dominantAxes: ["builder", "craft"],
  },
  productManager: {
    id: "productManager",
    title: "Product Manager",
    subtitle: "The Vision & Strategy Driver",
    icon: Compass,
    description:
      "You decide what gets built and why, translating between users, engineering, and the business. You're not the loudest voice in the room — you're the one who can explain, with evidence, why this feature and not that one.",
    personalityMatch: "Strategic, people-savvy, and comfortable saying no to good ideas in service of the right one.",
    keySkills: ["User research", "Roadmapping & prioritization", "Agile/Scrum", "Data-informed decision making", "Stakeholder communication", "Writing clear specs"],
    roadmap: [
      "Get close to real users — interviews, support tickets, actual usage data.",
      "Learn prioritization frameworks, then learn when to override them with judgment.",
      "Practice writing product specs that an engineer could actually build from.",
      "Work directly with an engineering team, even informally, before applying for the title.",
      "Get comfortable with basic data analysis — SQL is a genuine unlock here.",
    ],
    adviceFromMotun:
      "Be relentlessly user-focused and learn to say 'no' well — a good no, explained clearly, builds more trust with your team than an enthusiastic yes to everything.",
    resources: [
      { name: "Mind the Product", url: "https://www.mindtheproduct.com/", type: "free" },
      { name: "Reforge", url: "https://www.reforge.com/", type: "paid" },
      { name: "Inspired by Marty Cagan", url: "https://www.svpg.com/books/inspired-2nd-edition/", type: "paid" },
    ],
    salaryRange: "$85,000 – $165,000",
    growthOutlook: "Strong — every product needs someone deciding what's next",
    dominantAxes: ["people", "analyst"],
  },
  technicalProgramManager: {
    id: "technicalProgramManager",
    title: "Technical Program Manager",
    subtitle: "The Cross-Team Orchestrator",
    icon: GitBranch,
    description:
      "You keep large, technically complex initiatives moving across multiple teams — surfacing risk early, unblocking dependencies, and making sure the plan survives contact with reality.",
    personalityMatch: "Organized and technically fluent, energized by making a complicated plan actually happen on time.",
    keySkills: ["Technical fluency across a stack", "Cross-team coordination", "Risk & dependency management", "Roadmapping", "Communication at scale", "Process design"],
    roadmap: [
      "Build enough technical depth to understand what engineers are actually saying in a design review.",
      "Practice running a project with real dependencies across more than one team.",
      "Learn to surface risk early — the job is mostly about catching problems before they're expensive.",
      "Get comfortable writing status updates that executives actually read.",
      "Study how large tech companies structure TPM roles for cross-org launches.",
    ],
    adviceFromMotun:
      "Your value is catching the dependency nobody else saw coming, three weeks before it would have blown up the timeline. Be early, not just organized.",
    resources: [
      { name: "TPM career guides (Exponent)", url: "https://www.tryexponent.com/", type: "paid" },
    ],
    salaryRange: "$95,000 – $170,000",
    growthOutlook: "Steady demand at larger, multi-team organizations",
    dominantAxes: ["people", "builder"],
  },
  productMarketing: {
    id: "productMarketing",
    title: "Product Marketing Manager",
    subtitle: "The Bridge to the Market",
    icon: Megaphone,
    description:
      "You translate what engineering built into language a customer actually cares about — positioning, messaging, and the go-to-market plan that makes a launch land instead of landing quietly.",
    personalityMatch: "A natural translator between technical depth and human motivation — you can explain a feature as a benefit without dumbing it down.",
    keySkills: ["Positioning & messaging", "Market & competitive research", "Go-to-market planning", "Cross-functional collaboration", "Storytelling", "Customer interviews"],
    roadmap: [
      "Learn the fundamentals of product management and marketing together — this role sits between both.",
      "Practice turning a technical feature list into a customer-facing benefit statement.",
      "Shadow or support an actual product launch, even in a junior capacity.",
      "Get comfortable presenting to both engineers and executives in the same week.",
      "Build a habit of talking to actual customers, not just reading about them.",
    ],
    adviceFromMotun:
      "Be the voice of the customer in every room that doesn't have one. Translate features into outcomes — 'faster sync' means nothing; 'never lose your work again' means everything.",
    resources: [
      { name: "Product Marketing Alliance", url: "https://www.productmarketingalliance.com/", type: "free" },
      { name: "HubSpot PMM Guide", url: "https://blog.hubspot.com/marketing/product-marketing", type: "free" },
    ],
    salaryRange: "$85,000 – $160,000",
    growthOutlook: "Strong — every serious product launch needs this function",
    dominantAxes: ["people"],
  },
  mobileAppDev: {
    id: "mobileAppDev",
    title: "Mobile App Developer",
    subtitle: "The Pocket-Sized Experience Builder",
    icon: Smartphone,
    description:
      "You build the apps people carry everywhere — native or cross-platform, iOS or Android. You understand the specific constraints of a small screen, a battery, and a distracted user in motion.",
    personalityMatch: "Detail-driven with a love for the platforms specifically — you notice when an app doesn't feel native.",
    keySkills: ["Swift or Kotlin", "React Native or Flutter", "Mobile UI patterns", "APIs & offline sync", "App store deployment", "Performance & battery optimization"],
    roadmap: [
      "Choose a lane — native iOS/Android or cross-platform — and commit for at least a year.",
      "Learn mobile-specific UX patterns; mobile is not a small desktop screen.",
      "Ship a real app to the App Store or Play Store, including the submission process.",
      "Study performance and battery optimization — mobile users notice both fast.",
      "Explore the cross-platform side even if you specialize native, to understand the trade-offs.",
    ],
    adviceFromMotun:
      "Build and actually ship real apps, not just tutorial clones. Getting through app store review once teaches you more than five more tutorials will.",
    resources: [
      { name: "Android Developers", url: "https://developer.android.com/", type: "free" },
      { name: "Apple Developer", url: "https://developer.apple.com/", type: "free" },
      { name: "Kodeco (Ray Wenderlich)", url: "https://www.kodeco.com/", type: "free" },
    ],
    salaryRange: "$80,000 – $155,000",
    growthOutlook: "Strong — mobile-first is still the default",
    dominantAxes: ["builder", "craft"],
  },
  cloudEngineer: {
    id: "cloudEngineer",
    title: "Cloud Engineer / Architect",
    subtitle: "The Infrastructure Specialist",
    icon: CloudCog,
    description:
      "You design and run the cloud infrastructure businesses depend on — architecture that scales, survives failure, and doesn't quietly bankrupt the company in unexpected bills.",
    personalityMatch: "Systems-oriented and cost-conscious — you think in trade-offs between reliability, speed, and price.",
    keySkills: ["AWS/Azure/GCP", "Infrastructure as Code (Terraform)", "Networking & security", "Cost optimization", "System design", "Automation & scripting"],
    roadmap: [
      "Pick one major cloud provider and get genuinely fluent before spreading to others.",
      "Learn infrastructure as code — Terraform is the most transferable skill here.",
      "Understand cloud networking and security fundamentals deeply.",
      "Practice a real migration or deployment, not just a lab exercise.",
      "Pursue a cloud certification once the hands-on skills are already there.",
    ],
    adviceFromMotun:
      "Cloud is always evolving faster than any course can keep up with — build hands-on habits, not just certificates. And take cost optimization as seriously as uptime; a system that's reliable but unaffordable still fails the business.",
    resources: [
      { name: "AWS Skill Builder", url: "https://aws.amazon.com/training/", type: "free" },
      { name: "Google Cloud Skills Boost", url: "https://cloudskillsboost.google/", type: "free" },
    ],
    salaryRange: "$100,000 – $180,000",
    growthOutlook: "Very strong — cloud spend keeps growing across every industry",
    dominantAxes: ["builder", "craft"],
  },
  technicalWriter: {
    id: "technicalWriter",
    title: "Technical Writer",
    subtitle: "The Clarity Engineer",
    icon: BookOpenText,
    description:
      "You turn complex, half-documented systems into guides a stranger can actually follow. Good docs are invisible infrastructure — nobody thanks you when they work, everyone suffers when they don't exist.",
    personalityMatch: "A precise communicator who genuinely enjoys making something confusing become obvious.",
    keySkills: ["Technical writing", "Docs-as-code tooling", "API documentation", "Information architecture", "Working with engineers", "Editing for clarity"],
    roadmap: [
      "Practice turning a genuinely confusing system into a guide someone else can follow, unaided.",
      "Learn docs-as-code tooling — Markdown, static site generators, versioned docs.",
      "Contribute to open-source documentation to build a public portfolio.",
      "Get close to engineers — the best docs come from asking the right dumb questions early.",
      "Build a portfolio of before/after writing samples, not just finished polish.",
    ],
    adviceFromMotun:
      "Great documentation is a form of respect for the reader's time. Optimize ruthlessly for clarity over cleverness — nobody has ever complained that documentation was too easy to understand.",
    resources: [
      { name: "Google's Technical Writing Courses", url: "https://developers.google.com/tech-writing", type: "free" },
      { name: "Write the Docs", url: "https://www.writethedocs.org/", type: "free" },
    ],
    salaryRange: "$70,000 – $125,000",
    growthOutlook: "Steady — essential wherever APIs and dev tools ship",
    dominantAxes: ["craft", "people"],
  },
  developerAdvocate: {
    id: "developerAdvocate",
    title: "Developer Advocate / DevRel",
    subtitle: "The Community Bridge",
    icon: Users,
    description:
      "You represent developers to your company and your company to developers — writing, speaking, building demos, and making sure the people using a product actually feel heard by the team building it.",
    personalityMatch: "Genuinely enjoys teaching and public speaking, and gets real energy from helping a stranger get unstuck.",
    keySkills: ["Public speaking", "Technical writing", "Sample code & demos", "Community building", "Feedback synthesis", "Cross-functional communication"],
    roadmap: [
      "Get hands-on enough with a product to build real demos and sample apps.",
      "Practice explaining technical concepts out loud, not just in writing.",
      "Start writing or speaking publicly, even in small local or online communities.",
      "Learn to synthesize scattered developer feedback into something a product team can act on.",
      "Build relationships in a developer community before you ever need something from it.",
    ],
    adviceFromMotun:
      "You're not a marketer in disguise — the developers you talk to will know instantly if you're not being straight with them. Be the person who tells the product team the hard truth about what developers actually think.",
    resources: [
      { name: "DevRel Collective", url: "https://devrelcollective.fun/", type: "free" },
      { name: "Developer Relations by Mary Thengvall", url: "https://developerrelationsbook.com/", type: "paid" },
    ],
    salaryRange: "$85,000 – $155,000",
    growthOutlook: "Growing steadily alongside developer-first products",
    dominantAxes: ["people", "craft"],
  },
  qaAutomation: {
    id: "qaAutomation",
    title: "QA / Test Automation Engineer",
    subtitle: "The Quality Guardian",
    icon: Bug,
    description:
      "You make sure software actually works before a user finds out otherwise — designing test strategy, automating regression suites, and being the last check before something ships.",
    personalityMatch: "Detail-obsessed and constructively skeptical — you enjoy finding the thing that breaks, not just the thing that works.",
    keySkills: ["Test automation (Playwright, Cypress, Selenium)", "Manual & exploratory testing", "CI/CD integration", "Bug reporting", "Test strategy", "Working closely with developers"],
    roadmap: [
      "Learn manual testing fundamentals before automating anything.",
      "Pick a test automation framework and build a real regression suite.",
      "Integrate your tests into a CI/CD pipeline so they actually run on every change.",
      "Practice writing bug reports precise enough that a developer never has to ask 'what did you actually do?'",
      "Study exploratory testing techniques — automation alone misses what a curious human catches.",
    ],
    adviceFromMotun:
      "Automate what's repetitive, but never lose the instinct for exploratory testing — the best bugs are found by a human who got curious, not by a script running the same path for the hundredth time.",
    resources: [
      { name: "Test Automation University", url: "https://testautomationu.applitools.com/", type: "free" },
      { name: "Ministry of Testing", url: "https://www.ministryoftesting.com/", type: "free" },
    ],
    salaryRange: "$70,000 – $135,000",
    growthOutlook: "Steady and essential across every serious engineering team",
    dominantAxes: ["craft"],
  },
  itSupport: {
    id: "itSupport",
    title: "IT Support / Systems Administrator",
    subtitle: "The Operations Backbone",
    icon: LifeBuoy,
    description:
      "You're the first line of defense when technology breaks for real people — troubleshooting, maintaining systems, and turning frustrated users back into productive ones, often within minutes.",
    personalityMatch: "Patient, practical, and genuinely satisfied by solving someone's immediate, concrete problem.",
    keySkills: ["Hardware & OS troubleshooting", "Networking basics", "System administration", "Customer service", "Basic scripting", "Documentation"],
    roadmap: [
      "Learn hardware, operating systems, and networking fundamentals.",
      "Practice troubleshooting methodically — a repeatable process beats guessing.",
      "Pick up basic scripting to automate repetitive support tasks.",
      "Pursue an entry-level cert (CompTIA A+ or Network+) to structure your knowledge.",
      "Treat every ticket as a small case study — document what you learned.",
    ],
    adviceFromMotun:
      "Patience and clear communication are the real skills here, not just technical knowledge. Every ticket is practice, and IT is the most reliable entry point into a long tech career — nearly every company needs it.",
    resources: [
      { name: "Google IT Support Certificate", url: "https://www.coursera.org/professional-certificates/google-it-support", type: "paid" },
      { name: "CompTIA A+", url: "https://www.comptia.org/certifications/a", type: "paid" },
    ],
    salaryRange: "$45,000 – $85,000",
    growthOutlook: "Always in demand — the most accessible entry point in tech",
    dominantAxes: ["people", "craft"],
  },
  techEthicist: {
    id: "techEthicist",
    title: "Tech Ethics & Responsible AI Specialist",
    subtitle: "The Conscience of the System",
    icon: Scale,
    description:
      "You examine the societal impact of the technology being built — bias, privacy, and the second-order effects of decisions engineers make under deadline pressure. You ask the question nobody else in the room wants to ask.",
    personalityMatch: "A strong moral compass paired with genuine technical literacy — you can hold your own in a room of engineers.",
    keySkills: ["Ethical frameworks", "AI/data literacy", "Policy analysis", "Risk assessment", "Cross-disciplinary communication", "Research & writing"],
    roadmap: [
      "Build real technical literacy in AI and data systems — you need to understand what you're evaluating.",
      "Study applied ethics, policy, and the current debates in AI governance.",
      "Learn to identify bias and harm in real datasets and models, not just in theory.",
      "Practice writing clearly for both technical and non-technical audiences.",
      "Engage with the field's actual research and ongoing regulatory conversations.",
    ],
    adviceFromMotun:
      "Ethics has to be part of the build, not a review stage bolted on at the end. Ask the uncomfortable question early, when it's cheap to change course, not after launch when it's expensive.",
    resources: [
      { name: "Data & Society", url: "https://datasociety.net/", type: "free" },
      { name: "AI Ethics: Global Perspectives (edX)", url: "https://www.edx.org/course/ai-ethics-global-perspectives", type: "free" },
    ],
    salaryRange: "$80,000 – $150,000",
    growthOutlook: "Rapidly growing alongside AI regulation and public scrutiny",
    dominantAxes: ["analyst", "people"],
  },
  specializedExpert: {
    id: "specializedExpert",
    title: "Deep Domain Specialist",
    subtitle: "The Narrow-and-Deep Master",
    icon: Microscope,
    description:
      "You go all-in on one hard, narrow, technical niche — a subfield of AI, a cryptographic protocol, quantum computing, compiler design — and become the person others call when the standard answer isn't good enough.",
    personalityMatch: "Intensely curious with unusual patience for depth — you'd rather fully understand one hard thing than half-understand ten.",
    keySkills: ["Deep expertise in a narrow field", "Research methodology", "Advanced problem solving", "Technical writing/publishing", "Mentorship", "Long-horizon focus"],
    roadmap: [
      "Choose a niche you're genuinely obsessed with, not just one that's trendy.",
      "Commit to serious depth — advanced coursework, a graduate program, or years of focused self-study.",
      "Work on problems at the edge of what's currently known in your niche.",
      "Publish or share your work — a niche expert with no visible output is invisible to opportunity.",
      "Find and engage with the (usually small) community of other specialists in your area.",
    ],
    adviceFromMotun:
      "Depth takes real time and a genuine, specific obsession — don't fake this one, the market can tell. But rare, deep expertise is disproportionately valuable precisely because so few people have the patience for it.",
    resources: [
      { name: "arXiv", url: "https://arxiv.org/", type: "free" },
      { name: "MIT OpenCourseWare", url: "https://ocw.mit.edu/", type: "free" },
    ],
    salaryRange: "$110,000 – $220,000+",
    growthOutlook: "Strong if the niche stays relevant — inherently higher variance",
    dominantAxes: ["craft", "analyst"],
  },
  consultant: {
    id: "consultant",
    title: "Technology Consultant",
    subtitle: "The Strategic Problem-Solver",
    icon: Handshake,
    description:
      "You bring technical expertise to a rotating set of clients, diagnosing problems, proposing solutions, and helping organizations through change they couldn't navigate alone. Variety is the job, not a side effect of it.",
    personalityMatch: "Adaptable and articulate — you can walk into an unfamiliar problem and get useful fast.",
    keySkills: ["Deep expertise in at least one domain", "Diagnostic & strategic thinking", "Client communication", "Project management", "Business acumen", "Change management"],
    roadmap: [
      "Build genuine, demonstrable expertise in at least one technical domain first.",
      "Develop strong diagnostic skills — the ability to find the real problem, not just the stated one.",
      "Practice presenting findings clearly to people who don't share your technical background.",
      "Learn enough business fundamentals to connect technical choices to business outcomes.",
      "Build a track record of case studies with measurable outcomes.",
    ],
    adviceFromMotun:
      "Technical skill gets you in the room; understanding the client's actual business problem is what gets you invited back. Results and trust compound faster than technical cleverness alone.",
    resources: [
      { name: "Harvard Business Review", url: "https://hbr.org/", type: "paid" },
      { name: "McKinsey Insights", url: "https://www.mckinsey.com/insights", type: "free" },
    ],
    salaryRange: "$95,000 – $200,000+",
    growthOutlook: "Strong for those with deep expertise and a real network",
    dominantAxes: ["people", "analyst"],
  },
  openSourceMaintainer: {
    id: "openSourceMaintainer",
    title: "Open Source Maintainer / Contributor",
    subtitle: "The Community Builder",
    icon: GitBranch,
    description:
      "You build and sustain software that anyone can use and improve — reviewing contributions, writing docs, and holding together a community around a shared, public codebase.",
    personalityMatch: "Collaborative and generous with your knowledge — you like seeing other people's contributions succeed as much as your own.",
    keySkills: ["Git & GitHub workflows", "Deep familiarity with a specific project", "Code review", "Community moderation", "Technical writing", "Conflict resolution"],
    roadmap: [
      "Find a project you actually use and start with small, real contributions.",
      "Learn the project's contribution guidelines and unwritten community norms.",
      "Take on progressively larger issues as trust and familiarity build.",
      "Practice reviewing other people's code constructively, not just writing your own.",
      "Consider starting or co-maintaining a project once you understand what maintaining one takes.",
    ],
    adviceFromMotun:
      "Every contribution counts, even a typo fix in the docs. It's one of the fastest ways to build a real, verifiable portfolio and a genuine professional network at the same time.",
    resources: [
      { name: "Open Source Guide", url: "https://opensource.guide/how-to-contribute/", type: "free" },
      { name: "First Timers Only", url: "https://www.firsttimersonly.com/", type: "free" },
    ],
    salaryRange: "Often unpaid directly; frequently leads to paid roles and consulting",
    growthOutlook: "Excellent for skill-building, reputation, and networking",
    dominantAxes: ["people", "craft"],
  },
  founder: {
    id: "founder",
    title: "Technical Founder / Builder",
    subtitle: "The Idea-to-Reality Engine",
    icon: Sparkles,
    description:
      "You're drawn to building your own thing — a startup, an internal product, a side project that could become real. You'd rather bet on your own judgment about what should exist than execute someone else's roadmap indefinitely.",
    personalityMatch: "High risk tolerance, resilient under uncertainty, and driven by ownership more than stability.",
    keySkills: ["Rapid prototyping", "Business fundamentals", "Market validation", "Fundraising & pitching (if applicable)", "Full-stack building ability", "Resilience & adaptability"],
    roadmap: [
      "Cultivate the habit of shipping fast, validated prototypes instead of polishing in isolation.",
      "Learn business fundamentals: market sizing, unit economics, positioning.",
      "Talk to real potential users before building anything substantial.",
      "Study founders and products you admire, especially their early, unglamorous years.",
      "Treat every setback as data, not a verdict — iteration speed matters more than initial genius.",
    ],
    adviceFromMotun:
      "Validate the idea with real users early and often, before you fall in love with your own solution. Resilience is the actual differentiator — nearly every founder's first idea gets rewritten by reality.",
    resources: [
      { name: "Y Combinator Startup School", url: "https://www.startupschool.org/", type: "free" },
      { name: "Paul Graham's Essays", url: "http://www.paulgraham.com/articles.html", type: "free" },
    ],
    salaryRange: "Highly variable — equity-driven, from $0 to significant upside",
    growthOutlook: "High risk, high reward — entirely execution-dependent",
    dominantAxes: ["builder", "people"],
  },
};

// ---------------------------------------------------------------------------
// Scoring
// ---------------------------------------------------------------------------

export interface CareerMatch {
  career: CareerPath;
  score: number;
  matchPercent: number;
}

export interface QuizResult {
  matches: CareerMatch[];
  axes: CareerAxes;
  dominantAxis: CareerAxisKey;
}

export function calculateResults(answers: Record<number, string>): QuizResult {
  const scores: Record<string, number> = {};
  const axes: CareerAxes = { builder: 0, analyst: 0, people: 0, craft: 0 };

  careerQuestions.forEach((question) => {
    const selectedId = answers[question.id];
    if (!selectedId) return;
    const option = question.options.find((o) => o.id === selectedId);
    if (!option) return;

    for (const pathId in option.scores) {
      scores[pathId] = (scores[pathId] ?? 0) + option.scores[pathId];
    }
    (Object.keys(option.axes) as CareerAxisKey[]).forEach((axis) => {
      axes[axis] += option.axes[axis] ?? 0;
    });
  });

  const maxPossible = careerQuestions.length * 2;
  const sorted = Object.entries(scores)
    .filter(([id]) => careerPaths[id])
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  const matches: CareerMatch[] = sorted.map(([id, score]) => ({
    career: careerPaths[id],
    score,
    matchPercent: Math.min(97, Math.max(35, Math.round((score / maxPossible) * 100))),
  }));

  const dominantAxis = (Object.entries(axes) as [CareerAxisKey, number][]).sort((a, b) => b[1] - a[1])[0][0];

  return { matches, axes, dominantAxis };
}
