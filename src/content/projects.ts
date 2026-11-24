// Projects shown as /work/[slug] case studies. The homepage index lives in src/home/index.html.
// Newest or most relevant first. Media files live in /public/media.

export type Section = { label: string; body: string[] };

export type Project = {
  slug: string;
  title: string;
  year: string; // shown as-is, e.g. "Since Sep 2026"
  status: 'Work in progress' | 'Shipped · Hackathon' | string;
  description: string;
  detail: string;
  tags: string[];
  video?: string;
  image?: string;
  caption?: string;
  link?: { href: string; label: string };
  sections: Section[];
};

export const projects: Project[] = [
  {
    slug: 'pandion',
    title: 'Pandion',
    year: 'Since Sep 2026',
    status: 'Work in progress',
    description:
      'Research simulator for wildfire response. A reinforcement-learning policy decides where and when a water-dropping aircraft acts, and is evaluated against transparent baselines on real terrain from past fires, with the same delayed information they would have had.',
    detail:
      'Built so far: fire-spread and aircraft models, scenarios from Copernicus EMS fires, a PPO training pipeline and an interactive 3D replay workspace over Sentinel-2 imagery.',
    tags: ['Python', 'PyTorch', 'Reinforcement learning', 'Geospatial data', 'Three.js'],
    video: '/media/pandion.mp4',
    image: '/media/pandion.jpg',
    caption: 'Demo — the same fire under three controllers, then replayed in the 3D workspace on Sentinel-2 imagery and real terrain.',
    sections: [
      {
        label: 'The question',
        body: [
          'Air support in a wildfire is a sequence of decisions made with information that arrives late and incomplete: where to drop, when to refill, which front to hold.',
          'Pandion asks whether a learned policy can make those decisions better than transparent rules when every controller sees exactly the same delayed observations.',
        ],
      },
      {
        label: 'What I built',
        body: [
          'A simulator that keeps the true state of the fire separate from what a controller could actually observe, with surface-fire spread from standard fuel models and a CL-415 reference aircraft that travels, drops, returns and refills instead of teleporting.',
          'Scenarios built from Copernicus EMS activations in Spain, France and Italy, with sourced elevation, recorded weather where available and pre-fire Sentinel-2 imagery, all with provenance and hashes.',
          'A PPO training pipeline compared against direct-attack, containment and hold-aware heuristics, and an offline 3D workspace to replay and compare episodes.',
        ],
      },
      {
        label: 'Where it stands',
        body: [
          'An early research prototype, not an operational tool. Physical validation is still open, and results are reported against baselines, failures and worst cases included.',
        ],
      },
    ],
  },
  {
    slug: 'pulse',
    title: 'Pulse',
    year: 'Nov 2026',
    status: 'Shipped',
    description:
      'A native macOS menu bar app that shows how much quota is left in Codex, Claude Code and Gemini in Antigravity, with a daily token chart built from each tool’s local history.',
    detail:
      'Shipped as a universal macOS app for Apple silicon and Intel, built only with Apple tools and system frameworks: SwiftUI, Swift Charts and AppKit, with no third-party packages.',
    tags: ['Swift', 'SwiftUI', 'Swift Charts', 'AppKit', 'macOS'],
    video: '/media/pulse.mp4',
    image: '/media/pulse.jpg',
    caption: 'Demo — remaining quota in the menu bar and tokens per day by provider. Usage figures are demo data.',
    link: { href: 'https://github.com/MrJuandi/pulse', label: 'GitHub' },
    sections: [
      {
        label: 'The problem',
        body: [
          'Codex, Claude Code and Gemini each enforce their own usage windows, from five hours to a week, and each reports them in its own place.',
          'Working across all three, the first sign of a limit is usually hitting it in the middle of a task.',
        ],
      },
      {
        label: 'What I built',
        body: [
          'A menu bar item that shows the percentage left in each provider’s tightest active window, and a popover with a combined daily token chart, per-provider history, quota meters and a breakdown by model.',
          'Separate Swift readers for each source: Codex’s rate-limit response through its app-server protocol, Claude Code’s usage panel probed from an isolated directory with hooks, tools and MCP servers disabled, and Antigravity’s loopback service and local conversation databases.',
        ],
      },
      {
        label: 'Where it stands',
        body: [
          'Released on GitHub as a universal ZIP for macOS 15 or later. Builds are ad hoc signed and not notarized, and the local protocols it reads can change between provider versions.',
          'Pulse uses the sessions the tools already have. It does not copy login credentials or publish local usage.',
        ],
      },
    ],
  },
  {
    slug: 'lossia',
    title: 'LOSSIA',
    year: 'Nov 2026',
    status: 'Shipped · Hackathon',
    description:
      'ICAI × HORSE hackathon. On an engine assembly line, every manager picked the bottleneck machine by hand in Excel, each with a different answer. LOSSIA reads the raw stop data and ranks the whole line by estimated engines lost per day: a machine is a priority when it stops and its neighbours pay for it.',
    detail:
      'Shipped as a team: a Python analysis package covering 91 stations and their parallel branches, and a React operator console that opens straight on what to fix first. Pending validation on the plant floor.',
    tags: ['Python', 'pandas', 'React', 'TypeScript', 'Industrial analytics'],
    video: '/media/lossia.mp4',
    image: '/media/lossia.jpg',
    caption: 'Demo — from 91 machines to one ranked intervention list.',
    sections: [
      {
        label: 'The problem',
        body: [
          'Line 5 of the Valladolid engine plant has 91 operations. Finding the machine that limits throughput was a manual Excel exercise, repeated daily with a different criterion in every line and plant.',
          'The machine that stops the most is not necessarily the one costing the most output. What matters is whether its stops starve or block its neighbours.',
        ],
      },
      {
        label: 'What we built',
        body: [
          'A shared Python package that loads and cleans the daily stop data, models serial stations and parallel blocks without double counting, and estimates engines lost per day under explicit capacity assumptions.',
          'A React and TypeScript console for the shop floor: a logical plan of the line, a machine inspector and a single ranked list of where to send maintenance first.',
        ],
      },
      {
        label: 'Where it stands',
        body: [
          'A beta built on 16 production days. Candidates are presented as hypotheses, not maintenance orders, until they are validated on the plant floor.',
        ],
      },
    ],
  },
  {
    slug: 'halfline',
    title: 'Halfline',
    year: 'Since Sep 2026',
    status: 'Work in progress',
    description:
      'Pre-match 1X2 probabilities for Europe’s top five leagues. Halfline strips the bookmaker margin from the odds and compares what’s left with its own models — xG-adjusted Elo, Dixon-Coles and meta-models — all evaluated out of sample.',
    detail:
      'Built so far: a data pipeline over six sources, a read-only API and a React app with match sheets, xG, playing-style maps and model evaluation. On 2,049 unseen matches the closing market still leads (log-loss 0.975 vs 0.993).',
    tags: ['Python', 'scikit-learn', 'Flask', 'React', 'TypeScript', 'd3'],
    video: '/media/halfline.mp4',
    image: '/media/halfline.jpg',
    caption: 'Demo — removing the bookmaker margin, a match sheet, and every model scored against the market.',
    sections: [
      {
        label: 'The question',
        body: [
          'Bookmakers keep around 4.9% of every match through their margin. Remove it and the odds become the market’s probability for each outcome.',
          'Halfline asks how close an independent model can get to that market, and where the market is systematically wrong.',
        ],
      },
      {
        label: 'What I built',
        body: [
          'Ingestion from six sources — results and closing odds, match statistics, xG, shot locations, squad values and Polymarket prices — into pre-match features built without information leakage.',
          'xG-adjusted Elo, Dixon-Coles goal models and meta-models, evaluated on log-loss, Brier and RPS, with calibration and simulated returns with confidence intervals.',
          'A Flask API and a React app with matchday probabilities, match sheets, shot maps, momentum, team and player pages and a playing-style map.',
        ],
      },
      {
        label: 'Results so far',
        body: [
          'Out of sample, on 2,049 matches across two seasons: closing market 0.975 log-loss, xG-adjusted Elo 0.993, historical frequencies 1.071. The market still leads, and that is reported as it is.',
        ],
      },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const isLive = (s: string) => /progress/i.test(s);
