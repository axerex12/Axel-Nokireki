// Single source of truth for site copy. Every fact here was checked against
// the GitHub API or the ClipForge source on 2026-11-16. Components render
// this; they do not add facts of their own.

export const profile = {
  name: "Axel Nokireki",
  role: "Software engineering student",
  location: "Finland",
  school: "Metropolia University of Applied Sciences",
  statement:
    "Software engineering student at Metropolia in Finland. I build video pipelines, REST APIs and the web interfaces in front of them.",
  now: [
    { label: "Building", value: "ClipForge, a local video pipeline" },
    { label: "Studying", value: "Software engineering, Metropolia" },
    { label: "Learning", value: "Rust and WebAssembly" },
  ],
  links: {
    github: "https://github.com/axerex12",
    // Empty values are not rendered. Fill these in to show them.
    email: "",
    linkedin: "",
  },
};

export const clipforge = {
  name: "ClipForge",
  tagline:
    "A local pipeline that turns hours of livestream into reviewed, scheduled vertical shorts.",
  summary:
    "ClipForge scans long livestream VODs for the moments worth keeping. Local language models pick clean start and end lines and write the copy. Face-aware reframing turns 16:9 into 9:16, a review gate checks every clip, and a paced queue publishes it and learns from the results.",
  facts: [
    { label: "Year", value: "2026" },
    { label: "Type", value: "Personal project" },
    { label: "Size", value: "~8,400 lines of Python, 35 modules" },
    { label: "Models", value: "4, all running locally" },
    { label: "Runs on", value: "One Windows PC" },
    { label: "Publishing", value: "Permission-gated per source" },
    { label: "Source", value: "Private" },
  ],
  // Order matters: this is drawn as the pipeline.
  stages: [
    { id: "ingest", label: "VOD ingest", text: "Polls for new VODs and pulls a 480p analysis copy with yt-dlp. Chosen clips are re-fetched in 1080p." },
    { id: "chat", label: "Chat replay", text: "Fetches the chat log for the VOD and turns messages into weighted timestamps." },
    { id: "detect", label: "Moment detection", text: "Streams per-second loudness from ffmpeg, scores each second against its own 5-minute median, then blends in speech density and chat spikes." },
    { id: "transcribe", label: "Targeted transcription", text: "Transcribes only the windows around candidate moments with faster-whisper, not the whole VOD." },
    { id: "select", label: "LLM selection", text: "A local Qwen2.5 14B picks start and end lines, a hype score, a hook and titles. Output is validated and retried with the rejection reason." },
    { id: "rank", label: "Rank and dedupe", text: "Blends the model ranking with audio and text energy, caps clips per VOD and drops repeats of the same topic." },
    { id: "write", label: "Copy and fact-check", text: "A larger writer model drafts the hook, titles and summary. A second pass checks each claim against the transcript." },
    { id: "reframe", label: "Cut and reframe", text: "Snaps cuts to silence, removes dead air and reframes to 9:16 using face detection and a speaker-aware follow camera." },
    { id: "captions", label: "Captions and polish", text: "Burns in captions, levels loudness and adds punch-in zooms on audio spikes. Builds the cover frame." },
    { id: "review", label: "Review gate", text: "A reviewer reads transcript, frames and flags, then approves, fixes, holds or rejects. Flagged clips are never auto-approved." },
    { id: "publish", label: "Paced publish", text: "A queue schedules uploads through the official YouTube and Instagram APIs, spaced hours apart with a daily cap." },
    { id: "learn", label: "Measure and learn", text: "Pulls views and retention, then adjusts thresholds and tests variants against the channel's own baseline." },
  ],
  // The three 9:16 layouts the reframer chooses between.
  layouts: [
    { id: "cam", label: "cam", text: "Speaker fills the frame" },
    { id: "split", label: "split", text: "Webcam on top, game below" },
    { id: "game", label: "game", text: "Gameplay only" },
  ],
  highlights: [
    {
      title: "Audio first, transcription second",
      text: "Loudness is streamed from ffmpeg in one-second chunks, so a 10-hour VOD never sits in memory. Only about ±150 s around each peak is transcribed, which saves hours of CPU Whisper.",
      figure: "±150 s",
    },
    {
      title: "Cuts that land in silence",
      text: "Cut points snap into silences with a 0.6 s lead-in and a 0.35 s tail. Dead air is removed only where there are no words and audio sits 18 dB below the clip's loud parts.",
      figure: "0.6 s / 0.35 s",
    },
    {
      title: "Scene-aware reframing",
      text: "YuNet face detection and static-edge analysis find the webcam. The reframer then picks one of three vertical layouts and follows whoever is speaking with a smoothed camera path.",
      figure: "3 layouts",
    },
    {
      title: "Guardrails around the models",
      text: "Model output is validated for line IDs and a 20 to 90 second duration, then retried with the error fed back. Hooks must be 3 to 7 words. Copy is fact-checked against the transcript.",
      figure: "20–90 s",
    },
    {
      title: "Ranking that blends signals",
      text: "Final ranking weights the model at 0.5, audio energy at 0.3 and text energy at 0.2. At most three clips per VOD, with a fourth only if it scores 8 or higher.",
      figure: "0.5 / 0.3 / 0.2",
    },
    {
      title: "Self-tuning from view counts",
      text: "Epsilon-greedy tests across title style, hook, tag count, call to action and end question. Reward is log views at about 48 hours. It reports “not enough data” before it declares a winner.",
      figure: "48 h",
    },
  ],
  stack: [
    "Python",
    "ffmpeg",
    "faster-whisper",
    "Ollama",
    "LM Studio",
    "OpenCV",
    "SQLite",
    "yt-dlp",
    "YouTube Data API",
    "Instagram Graph API",
    "PowerShell",
  ],
};

// image is a key into the asset map in the Work section; null means no image.
// link is null where the repository is private. Commit counts are GitHub's
// contributor numbers for the default branch, checked 2026-11-16.
export const projects = [
  {
    title: "Image Colorization with a GAN",
    year: "2026",
    kind: "Team of three",
    text: "Turns grayscale photos into colour with a U-Net, then a Pix2Pix conditional GAN, trained on COCO images. I built the U-Net notebook, ran the training and wrote the setup guide.",
    detail: "21 of 40 commits",
    tech: ["PyTorch", "U-Net", "Pix2Pix", "Jupyter"],
    link: "https://github.com/Kreetrix/Neural-Network-Project",
    linkLabel: "View source",
    image: null,
  },
  {
    title: "Rust and WebAssembly",
    year: "2026",
    kind: "Solo coursework",
    text: "Six builds in Rust: in-browser image filters, face and age detection from an ONNX model running in WebAssembly, a Yew tic-tac-toe with a minimax opponent, a WASI cloud function and a Tauri transit planner for Helsinki.",
    detail: "Six assignments",
    tech: ["Rust", "WebAssembly", "Yew", "Tauri"],
    link: null,
    linkLabel: "Private course repositories",
    image: null,
  },
  {
    title: "Store API",
    year: "2026",
    kind: "Solo",
    text: "REST API for categories, products, suppliers and orders, backed by MariaDB through JPA.",
    detail: "Java 21",
    tech: ["Spring Boot", "Spring Data JPA", "MariaDB"],
    link: "https://github.com/axerex12/Database_solutions",
    linkLabel: "View source",
    image: null,
  },
  {
    title: "Evangelion Title Card Generator",
    year: "2026",
    kind: "Solo",
    text: "Type a title, pick an aspect ratio and download a title card in the style of the anime. No framework, no build step.",
    detail: "Live on GitHub Pages",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://axerex12.github.io/evangelion-title-maker/",
    linkLabel: "Open the generator",
    image: "eva",
  },
  {
    title: "Wind Turbine Gearbox Failure Prediction",
    year: "2026",
    kind: "Team of four",
    text: "Predicts gearbox failures in a utility-scale wind turbine from five years of SCADA time-series data.",
    detail: "Coursework, Metropolia",
    tech: ["scikit-learn", "pandas", "NumPy", "Jupyter"],
    link: "https://github.com/GeorgiiAf/machine_learning-project",
    linkLabel: "View source",
    image: null,
  },
  {
    title: "Card Memo",
    year: "2025",
    kind: "Team of four",
    text: "Desktop flashcard app with decks, a study mode, progress tracking and several interface languages. I wrote the early backend with its tests, the deck and card screens and much of the localisation.",
    detail: "40 of 267 commits",
    tech: ["JavaFX", "MariaDB", "JUnit 5", "Docker"],
    link: "https://github.com/Kreetrix/Ohjelmistotuotanto-1",
    linkLabel: "View source",
    image: null,
  },
  {
    title: "Restaurant App",
    year: "2025",
    kind: "Team of three",
    text: "Ordering app for a restaurant. Customers browse and filter the menu, order, and leave reviews in Finnish or English. Admins manage the menu, images and orders.",
    detail: "56 of 148 commits",
    tech: ["React 19", "React Router 7", "Vite", "Tailwind CSS 4"],
    link: "https://github.com/Kreetrix/web-project-frontend",
    linkLabel: "View source",
    image: "restaurant",
  },
  {
    title: "Restaurant App API",
    year: "2025",
    kind: "Team of three",
    text: "The REST API behind the restaurant app. I built product management with allergens, order handling and status changes, reviews and the admin routes.",
    detail: "22 of 57 commits",
    tech: ["Node.js", "Express", "MySQL", "JWT"],
    link: "https://github.com/Kreetrix/web-project-backend",
    linkLabel: "View source",
    image: null,
  },
  {
    title: "Restaurant Finder",
    year: "2025",
    kind: "Solo",
    text: "Vanilla JavaScript front end with accounts, profiles and a map of restaurants.",
    detail: "No framework",
    tech: ["JavaScript", "HTML", "CSS"],
    link: "https://github.com/axerex12/Html-Solo",
    linkLabel: "View source",
    image: null,
  },
  {
    title: "Flight Game",
    year: "2024",
    kind: "Team of five",
    text: "Browser game about flying contracts between airports, with a Flask API behind it. I built front-end pages and styling and the moving plane on the map.",
    detail: "27 of 125 commits",
    tech: ["JavaScript", "Flask", "Python", "MySQL"],
    link: "https://github.com/leevilaune/Group3-Project-2",
    linkLabel: "View source",
    image: null,
  },
];

export const education = [
  {
    period: "2024 – present",
    title: "Software Engineering",
    place: "Metropolia University of Applied Sciences",
    text: "Coursework across object-oriented design in Java, web development, databases, CI and testing, machine learning, neural networks, and Rust with WebAssembly.",
  },
];

// Each skill names the project it was used in. No percentages.
export const skills = [
  {
    group: "Languages",
    items: [
      { name: "Java", evidence: "Card Memo, Store API" },
      { name: "JavaScript", evidence: "Restaurant App, Flight Game" },
      { name: "Python", evidence: "ClipForge, Image Colorization" },
      { name: "Rust", evidence: "Rust and WebAssembly" },
      { name: "HTML and CSS", evidence: "Title Card Generator" },
    ],
  },
  {
    group: "Front end and desktop",
    items: [
      { name: "React, Vite", evidence: "Restaurant App, this site" },
      { name: "Tailwind CSS", evidence: "Restaurant App, this site" },
      { name: "GSAP", evidence: "This site" },
      { name: "JavaFX", evidence: "Card Memo" },
      { name: "Yew, Tauri", evidence: "Rust and WebAssembly" },
    ],
  },
  {
    group: "Back end and data",
    items: [
      { name: "Spring Boot, JPA", evidence: "Store API" },
      { name: "Node.js, Express", evidence: "Restaurant App API" },
      { name: "Flask", evidence: "Flight Game" },
      { name: "MariaDB, MySQL", evidence: "Card Memo, Store API" },
      { name: "SQLite", evidence: "ClipForge" },
    ],
  },
  {
    group: "AI and media",
    items: [
      { name: "Local LLMs (Ollama, LM Studio)", evidence: "ClipForge" },
      { name: "Speech-to-text (faster-whisper)", evidence: "ClipForge" },
      { name: "PyTorch", evidence: "Image Colorization" },
      { name: "OpenCV, ffmpeg", evidence: "ClipForge" },
      { name: "scikit-learn, pandas", evidence: "Gearbox prediction" },
    ],
  },
  {
    group: "Tooling",
    items: [
      { name: "Git", evidence: "Every project here" },
      { name: "Docker", evidence: "Card Memo" },
      { name: "Jenkins", evidence: "Card Memo" },
      { name: "JUnit 5, JaCoCo", evidence: "Card Memo" },
      { name: "Maven", evidence: "Card Memo, Store API" },
    ],
  },
];
