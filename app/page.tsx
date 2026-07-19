"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { 
  ArrowDown,
  ArrowRight, 
  BookOpen, 
  Film, 
  Lightbulb, 
  Search,
  Sigma 
} from "lucide-react";

const PROJECTS = [
  { id: 1, src: "/images/art1.jpg", alt: "Paper Sculpture: Cones and Cubes", title: "Paper Sculpture: Cones and Cubes" },
  { id: 2, src: "/images/art2.jpg", alt: "Scenery: Alamo Dorm Scene", title: "Scenery: Alamo Dorm Scene" },
  { id: 3, src: "/images/art3.jpg", alt: "Collage: Orbits of the unseen", title: "Collage: Orbits of the unseen" },
  { id: 4, src: "/images/art4.jpg", alt: "Pencil sketch: water bottle", title: "Pencil sketch: water bottle" },
  { id: 5, src: "/images/art5.jpg", alt: "Pencil sketch: books", title: "Pencil sketch: books" },
];

const DAILY_PHOTOS = [
  "/Daily/WechatIMG792.jpg",
  "/Daily/WechatIMG792.jpg",
  "/Daily/WechatIMG793.jpg",
  "/Daily/WechatIMG794.jpg",
  "/Daily/WechatIMG795.jpg",
  "/Daily/WechatIMG796.jpg",
  "/Daily/WechatIMG797.jpg",
  "/Daily/WechatIMG798.jpg",
  "/Daily/WechatIMG799.jpg",
  "/Daily/WechatIMG800.jpg",
  "/Daily/WechatIMG801.jpg",
  "/Daily/WechatIMG802.jpg",
  "/Daily/WechatIMG803.jpg",
  "/Daily/WechatIMG804.jpg",
  "/Daily/WechatIMG805.jpg",
  "/Daily/WechatIMG806.jpg",
  "/Daily/WechatIMG807.jpg",
  "/Daily/WechatIMG808.jpg",
  "/Daily/WechatIMG809.jpg",
  "/Daily/WechatIMG810.jpg",
  "/Daily/WechatIMG811.jpg",
  "/Daily/WechatIMG812.jpg",
  "/Daily/WechatIMG813.jpg",
  "/Daily/WechatIMG814.jpg",
  "/Daily/WechatIMG815.jpg",
];
const ABOUT_ME_DISPLAYS = [
  DAILY_PHOTOS.slice(0, 5),
  DAILY_PHOTOS.slice(5, 10),
  DAILY_PHOTOS.slice(10, 15),
  DAILY_PHOTOS.slice(15, 20),
  DAILY_PHOTOS.slice(20, 25),
];

const SECTIONS = [
  { 
    id: "engineering", 
    title: "Engineering", 
    icon: <Lightbulb className="w-6 h-6" />, 
    description: "Engineering captivates me because it transforms ideas into tangible solutions that can improve people’s lives. Every project challenges me to think critically, learn continuously, and persevere through setbacks.",
    sections: [
      {
        title: "Academic Accomplishment",
        description: "Throughout high school, I have participated in several engineering and entrepreneurship competitions, earning recognition in both the Conrad Challenge and the Blue Ocean Entrepreneurship Competition. My team was named an Alternate Finalist in the 2025–2026 Conrad Challenge and placed among the Top 500 teams in the Blue Ocean Competition. While these achievements are meaningful milestones, I value them most as reflections of the learning, collaboration, and perseverance that shaped my engineering journey.",
        briefDescription: "For both competitions, my partner and I designed an intelligent optical fiber monitoring system capable of automatically detecting faults in fiber-optic communication networks. As modern data centers rely heavily on optical fiber infrastructure, identifying transmission failures often requires extensive manual inspection; even a single undetected fault can result in costly maintenance, service interruptions, or significant data loss.\n\nOur system continuously monitors the health of optical fiber connections, identifies abnormalities before failures occur, and alerts operators in advance—helping reduce maintenance costs while improving the reliability and security of data transmission. Within the team, I was primarily responsible for the mechanical design, circuit design, and hardware integration of the device.",
        honors: [
          {
            title: "Conrad Alternate Finalist",
            summary: "Alternate Finalist in the 2025–2026 Conrad Challenge.",
            documents: [
              "/Conrad/Congratulations%20Conrad%20Alternate%20Finalist!.pdf",
              "/Conrad/ovBZdEXb.pdf",
            ],
          },
          {
            title: "Blue Ocean Top 500",
            summary: "Top 500 team in the Blue Ocean Entrepreneurship Competition.",
            documents: [
              "/Blue%20ocean.pdf",
            ],
          },
        ]
      },
      {
        title: "Robotics",
        description: "Robotics is where my passion for engineering truly began. I joined my school’s FTC robotics team during my freshman year, initially contributing to programming, structural design, and robot assembly. During the 2025–2026 season, I was honored to serve as the captain of FTC Team 19888.",
        items: [
          {
            title: "2025-2026 Season",
            summary: "The following photographs document the design, construction, and competition highlights of our FTC robot for the 2025–2026 season. Designed for the FTC game, the robot was built to efficiently collect and launch game elements while remaining reliable throughout competition.",
            plainLanguage: "Because our team operated with a limited budget, much of the robot’s structure was constructed from reinforced cardboard—demonstrating that creativity and thoughtful engineering can often compensate for limited resources.",
            images: [
              "/2025-2026/WechatIMG732.jpg",
              "/2025-2026/WechatIMG737.jpg",
              "/2025-2026/WechatIMG738.jpg",
              "/2025-2026/WechatIMG739.jpg",
              "/2025-2026/WechatIMG740.jpg",
              "/2025-2026/WechatIMG742.jpg",
            ],
          },
          {
            title: "2026-2027 Season",
            summary: "Space reserved for future season updates, design progress, and competition reflections.",
          },
          {
            title: "Underwater ROV Project",
            summary: "Space reserved for the underwater robotics concept, system design, and testing insights.",
          },
        ]
      },
      {
        title: "Beaver Amphibious Robotics",
        description: "Inspired by my experiences in FTC robotics, I wanted to pursue an engineering challenge beyond the classroom. I discovered that amphibious robots remain relatively underdeveloped despite their potential applications in environmental monitoring, search-and-rescue missions, and transportation across complex terrain. Motivated by this opportunity, I began designing my own bio-inspired amphibious robot.",
        document: "/science.pdf",
        briefDescription: "This project is documented in a separate technical paper that details its design concept, hardware architecture, reinforcement learning framework, and development progress.\n\nThe robot draws inspiration from the beaver—an amphibious mammal adapted to both land and water. Its broad, webbed feet and flat tail informed the robot’s mechanical design. To enable versatile locomotion, I employed reinforcement learning to train the robot to swim, walk, and run across diverse environments.",
      },
      {
        title: "EEG Machine Learning and Meditation VR",
        description: "A project focused on interpreting brain-signal data with machine learning in a way that is accessible and meaningful to a general audience.",
        link: "https://docs.google.com/document/d/1-pD5bhVVymJrBKz6nYygzYWdBbIQj1vyBOT-AdYG3x0/edit?usp=sharing",
        briefDescription: "",
      },
    ]
  },
  { 
    id: "mathematics", 
    title: "Mathematics", 
    icon: <Sigma className="w-6 h-6" />, 
    description: "Mathematics was the first subject that truly fascinated me. It continually challenges my thinking while rewarding me with the satisfaction of discovering elegant solutions. I also enjoy documenting what I learn using my own explanations, diagrams, and examples.",
    notes: [
      { src: "/Notes/HPC.pdf", title: "Honors Precalculus", summary: "These notes summarize the fundamental topics of precalculus, including functions, algebra, trigonometry, vectors, conic sections, sequences, matrices, and combinatorics. They emphasize both conceptual understanding and analytical problem-solving while providing a strong mathematical foundation for calculus and advanced STEM coursework.", explanation: "These study guides were generated by AI based on my handwritten notes from the mathematics courses I have completed." },
      { src: "/Notes/calc%201.pdf", title: "Calculus I", summary: "These notes cover the core principles of differential and integral calculus, including limits, continuity, derivatives, techniques of integration, differential equations, parametric and polar functions, and infinite series. They emphasize mathematical reasoning and real-world applications while developing the analytical thinking required for advanced studies in quantitative disciplines.", explanation: "These study guides were generated by AI based on my handwritten notes from the mathematics courses I have completed." },
      { src: "/Notes/Calc%202.pdf", title: "Calculus II", summary: "These notes build upon the foundations of Calculus I by exploring advanced integration techniques, differential equations, parametric and polar curves, conic sections, sequences, and power series. Together, they strengthen problem-solving skills and prepare students for higher-level coursework in STEM fields.", explanation: "These study guides were generated by AI based on my handwritten notes from the mathematics courses I have completed." },
    ]
  },
  { 
    id: "articles", 
    title: "Articles", 
    icon: <BookOpen className="w-6 h-6" />, 
    description: "Writing is one of the ways I make sense of my experiences and express my authentic thoughts. Through writing, I preserve meaningful memories, explore ideas that spark my curiosity, and communicate the insights I gain from independent research.",
    files: [
      { src: "/articles/article1.pdf", title: "The Cherry Blossoms", description: "This descriptive narrative follows a young man trapped in the monotony of daily life who has gradually lost his sense of purpose. While wandering beneath blooming cherry blossoms, he observes the joy and beauty around him, prompting him to reflect on the meaningful moments he has overlooked.", summary: "A descriptive narrative about rediscovering meaning by noticing beauty, joy, and the small moments that are easy to miss." },
      { src: "/articles/article2.pdf", title: "Echoes of Heart Magazine", description: "Inspired by The Great Gatsby, this literary magazine investigates the multifaceted nature of love through a collection of interconnected writing forms, including free-verse poetry, reflective prose, a manifesto, a fictional newspaper article, and an epistolary letter.", summary: "A themed literary magazine that explores love through multiple genres and perspectives, from longing and illusion to self-love and obsession." },
      { src: "/articles/article3.pdf", title: "The Impact of Atomic Bomb on the Expansion of American Imperialism", description: "This research paper argues that the atomic bomb not only concluded World War II but also reshaped the global balance of power by accelerating the expansion of American imperialism. It examines how nuclear superiority strengthened U.S. technological leadership, diplomatic influence, and postwar institutions.", summary: "A historical research paper connecting nuclear power after WWII to U.S. influence, alliances, and the structure of postwar international order." },
      { src: "/articles/article4.pdf", title: "Space Exploration: The Obligation We can’t Defer", description: "This argumentative essay contends that the value of space exploration depends on the timescale from which it is evaluated: what appears to be an extravagant expense for one generation becomes a civilizational obligation across centuries. The essay weighs costs against long-term scientific, economic, and philosophical value.", summary: "An argument that space exploration is a long-term responsibility, with benefits that unfold across generations through knowledge, innovation, and perspective." },
    ]
  },
  { 
    id: "filmmaking", 
    title: "Filmmaking", 
    icon: <Film className="w-6 h-6" />, 
    description: "I started learning filmmaking in my high school freshman year. Through filmmaking, I learned how to film cinematic videos and edit clips into high-quality pieces. My projects span PSAs, music, narratives, and documentaries.",
    videos: [
      {
        src: "https://www.youtube.com/embed/UCMLRu2iUjw",
        title: "Procrastination",
        description: "Procrastination is a short PSA-style film that examines how delay can quietly grow from a small habit into a major source of stress. The piece follows the emotional pattern many of my peers know well: putting something off, feeling temporary relief, losing track of time, and then facing the pressure of an approaching deadline. Instead of treating procrastination as just laziness, the film presents it as a cycle of avoidance, distraction, guilt, and urgency.",
        background: "I wanted to make a film about a problem that feels ordinary but affects daily life in a serious way. Procrastination is something many people experience, especially in school, but it is often dismissed as a minor bad habit rather than a real struggle with focus, motivation, and self-discipline. This project was meant to make that experience visible in a way that was honest, recognizable, and easy for a broad audience to connect with.",
        role: "I helped develop the concept, think through how the message should be communicated visually, and shape the sequence of scenes so the film would feel clear and relatable. I was also responsible for filming and editing, paying close attention to pacing, transitions, and shot order. My goal was to make the viewer feel the growing pressure of procrastination, not just understand it intellectually.",
        detail: "One memorable part of the project was using editing rhythm to mirror the mental experience of putting work off. Early moments could feel slower or more casual, while later cuts and transitions created a stronger sense of urgency and tension. It was interesting to see how simple choices in timing and structure could make a very familiar situation feel more emotionally immediate.",
      },
      {
        src: "https://www.youtube.com/embed/fzGAYgGAnxg",
        title: "Starboy",
        description: "Starboy is a music-centered short film that focuses on atmosphere, rhythm, and visual energy. Rather than depending primarily on dialogue or direct explanation, the piece uses image, movement, and editing to respond to the tone of the music. The result is a film that aims to feel expressive and stylized, with each shot helping build a larger mood rather than simply documenting events.",
        background: "This project gave me the chance to explore how filmmaking can be driven by sound and feeling. I was interested in how music can shape the viewer’s emotional response and influence the pace of a scene even before any story details are fully understood. Instead of making something purely narrative, I wanted to experiment with a piece where tone, rhythm, and visual style played the central role.",
        role: "I contributed to the planning of the visual direction, the selection and filming of shots, and the editing process that brought the piece together. A large part of my role involved thinking about synchronization: how cuts, movement, and visual emphasis could align with the music so the final film felt cohesive. I also paid attention to how each shot contributed to the overall tone rather than standing alone.",
        detail: "A particularly interesting challenge was making sure the visuals felt dynamic without becoming chaotic. Because music-based editing can easily become repetitive or overly fast, I had to think carefully about variation in shot length, transitions, and visual intensity. That balance between energy and clarity became one of the most important creative decisions in the project.",
      },
      {
        src: "https://www.youtube.com/embed/X6QUnVPvIe0",
        title: "Before I Got My Eyes Put Out",
        description: "Before I Got My Eyes Put Out is a short film with a more reflective and emotionally interpretive tone. The title itself invites curiosity, and the piece relies on mood, visual composition, and pacing to create meaning rather than spelling everything out directly. It is designed to feel more introspective than explanatory, encouraging the audience to respond emotionally and think about the images for themselves.",
        background: "I approached this project as an opportunity to explore a more poetic side of filmmaking. Rather than building the film around a straightforward message, I wanted it to create an atmosphere that felt personal, thoughtful, and slightly unsettling in a meaningful way. The focus was less on giving the viewer one fixed interpretation and more on allowing the piece to suggest emotion, memory, and vulnerability through visual storytelling.",
        role: "I helped shape the concept and visual approach of the film, including how the imagery, framing, and pacing would support the overall tone. I also worked on filming and editing, where much of the emotional effect of the piece was actually created. My role involved making decisions about what to show, what to leave ambiguous, and how long each moment should last in order to preserve the reflective quality of the film.",
        detail: "One of the most memorable parts of the project was realizing how strongly mood depends on restraint. In a piece like this, small changes in timing, framing, or sequence can completely alter the emotional effect. It was rewarding to see how a quieter, less direct filmmaking style could still communicate something powerful when the visuals and pacing were handled carefully.",
      },
      {
        src: "https://www.youtube.com/embed/tcTpSjCfeXI",
        title: "From World to Webb",
        description: "From World to Webb is a documentary project created to introduce The Webb Schools through a clear and engaging visual narrative. The film aims to connect the school to a broader sense of identity, community, and place, presenting Webb not just as a campus but as an environment with its own character and values. The documentary format allowed the project to combine information, atmosphere, and visual storytelling in a way that felt both informative and personal.",
        background: "This piece was made as a filmmaking class documentary project. The purpose was to present The Webb Schools to viewers who may not already know the school, while also capturing something meaningful about its environment and spirit. I wanted the film to feel polished and accessible, but also sincere, so that it could function as more than just an informational video.",
        role: "I contributed to organizing the structure of the documentary, capturing footage, and shaping the final edit. That meant thinking not only about individual shots, but also about how the film would flow as a complete introduction. I worked to make sure the scenes connected smoothly, the pacing stayed engaging, and the overall presentation remained clear for an audience unfamiliar with Webb.",
        detail: "A memorable challenge in this project was deciding how to condense a larger subject into a short, coherent documentary. There was a balance between showing enough visual variety to represent the school well and keeping the film focused enough to hold attention. Editing became especially important because it determined how the audience would move through the school visually and emotionally.",
      },
    ]
  },

];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeEngineeringTab, setActiveEngineeringTab] = useState(0);
  const [activeRoboticsTab, setActiveRoboticsTab] = useState(0);
  const [activeMathTab, setActiveMathTab] = useState(0);
  const [activeArticleTab, setActiveArticleTab] = useState(0);
  const [activeVideoTab, setActiveVideoTab] = useState(0);

  const introductionGalleryRef = useRef<HTMLDivElement>(null);
  const artGalleryRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: introductionScrollProgress } = useScroll({
    target: introductionGalleryRef,
  });
  const { scrollYProgress: artGalleryScrollProgress } = useScroll({
    target: artGalleryRef,
  });

  const introductionX = useTransform(introductionScrollProgress, [0, 1], ["0%", "-72%"]);
  const artGalleryX = useTransform(artGalleryScrollProgress, [0, 1], ["0%", "-80%"]);
  const searchItems = [
    { label: "Home", href: "#top", category: "Page" },
    { label: "About Me", href: "#introduction", category: "Section" },
    { label: "Art Gallery", href: "#art-gallery", category: "Section" },
    ...SECTIONS.map((section) => ({
      label: section.title,
      href: `#${section.id}`,
      category: "Section",
    })),
    ...SECTIONS.flatMap((section) =>
      "notes" in section && section.notes
        ? section.notes.map((note, noteIndex) => ({
            label: note.title,
            href: `#mathematics-note-${noteIndex}`,
            category: "Math Note",
          }))
        : []
    ),
    ...SECTIONS.flatMap((section) =>
      "files" in section && section.files
        ? section.files.map((file, fileIndex) => ({
            label: file.title,
            href: `#articles-file-${fileIndex}`,
            category: "Article",
          }))
        : []
    ),
    ...SECTIONS.flatMap((section) =>
      "videos" in section && section.videos
        ? section.videos.map((video, videoIndex) => ({
            label: video.title,
            href: `#filmmaking-video-${videoIndex}`,
            category: "Video",
          }))
        : []
    ),
  ];
  const filteredSearchItems = searchQuery.trim()
    ? searchItems.filter((item) =>
        `${item.label} ${item.category}`.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6)
    : [];

  const handleSearchSelect = (href: string) => {
    setSearchQuery("");
    const target = document.querySelector(href);
    if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", href);
    }
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (filteredSearchItems.length > 0) {
      handleSearchSelect(filteredSearchItems[0].href);
    }
  };

  return (
    <main
      id="top"
      className="min-h-screen bg-white text-black selection:bg-black selection:text-white dark:bg-black dark:text-white dark:selection:bg-white dark:selection:text-black"
    >
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-black/10 bg-white/90 backdrop-blur dark:border-white/10 dark:bg-black/80">
        <div className="px-8 md:px-16 py-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm tracking-tight">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <a href="#top" className="hover:opacity-60 transition-opacity">
              Home
            </a>
            <a href="#introduction" className="hover:opacity-60 transition-opacity">
              Intro
            </a>
            {SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="hover:opacity-60 transition-opacity"
              >
                {section.title}
              </a>
            ))}
            <a href="#art-gallery" className="hover:opacity-60 transition-opacity">
              Art Gallery
            </a>
          </div>
          <div className="relative w-48 sm:w-56">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 opacity-50" />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search"
                className="w-full rounded-full border border-black/10 bg-white/90 py-1.5 pl-9 pr-3 text-xs outline-none transition focus:border-black/30 dark:border-white/10 dark:bg-black/80 dark:focus:border-white/30"
              />
            </form>
            {filteredSearchItems.length > 0 && (
              <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] overflow-hidden rounded-2xl border border-black/10 bg-white shadow-xl dark:border-white/10 dark:bg-zinc-950">
                {filteredSearchItems.map((item) => (
                  <button
                    key={`${item.category}-${item.href}`}
                    type="button"
                    onClick={() => handleSearchSelect(item.href)}
                    className="flex w-full items-center justify-between px-4 py-3 text-left text-sm transition hover:bg-black/5 dark:hover:bg-white/5"
                  >
                    <span>{item.label}</span>
                    <span className="text-xs uppercase tracking-wider opacity-50">{item.category}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="h-[90vh] flex flex-col justify-center px-8 md:px-16 pt-32 bg-black text-white">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <div className="max-w-4xl">
            <h2 className="text-5xl md:text-7xl font-semibold tracking-tight leading-tight">
              <span className="inline-block border-b border-white/60 pb-3">
                Persistence, Humility, Curiosity
              </span>
            </h2>
            <p className="mt-4 text-base md:text-lg opacity-90">
              Michael Huang&apos;s Portfolio
            </p>
            <a href="#art-gallery" className="mt-10 inline-flex items-center gap-3">
              <span className="text-sm tracking-tight opacity-90">Scroll</span>
              <ArrowDown className="w-6 h-6" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* Introduction Section */}
      <section
        id="introduction"
        className="relative h-[300vh] border-b border-black/10 bg-white dark:border-white/10 dark:bg-black"
        ref={introductionGalleryRef}
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden px-8 md:px-16">
          <div className="relative z-10 mx-auto grid w-full max-w-[92rem] items-center gap-8 md:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] md:gap-10 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="rounded-[2rem] border border-black/10 bg-white/92 p-8 text-left shadow-[0_24px_80px_rgba(0,0,0,0.10)] backdrop-blur-[6px] dark:border-white/12 dark:bg-black/82 dark:shadow-[0_24px_80px_rgba(0,0,0,0.34)] md:p-10"
            >
              <h3 className="mb-8 text-4xl font-bold tracking-tighter">About Me</h3>
              <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-200 md:text-lg">
                My name is Michael Huang, and I am a student at The Webb Schools, a private boarding school in Claremont, California. Throughout my life, I have been guided by three core values: persistence, curiosity, and humility. These are not only the principles I strive to uphold, but also the values my family has instilled in me from an early age.
              </p>
              <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-200 md:text-lg">
                As I have grown, these qualities have become intertwined with my passions and the person I aspire to become. My fascination with mathematics began in elementary school and has continued to grow ever since—what started as a love for solving challenging problems has evolved into a desire to understand the theories behind mathematics and explore its real-world applications.
              </p>
            </motion.div>

            <div className="relative h-[42vh] overflow-hidden rounded-[2.25rem] border border-black/12 bg-white/72 shadow-[0_26px_90px_rgba(0,0,0,0.12)] backdrop-blur-sm dark:border-white/12 dark:bg-zinc-950/60 dark:shadow-[0_26px_90px_rgba(0,0,0,0.32)] md:h-[58vh]">
              <motion.div
                style={{ x: introductionX }}
                className="pointer-events-none absolute inset-y-0 left-0 flex items-center gap-8 px-4 md:px-6"
              >
                {ABOUT_ME_DISPLAYS.map((display, displayIndex) => (
                  <div
                    key={`about-display-${displayIndex}`}
                    className="flex min-w-[76vw] max-w-[76vw] flex-col rounded-[1.85rem] border border-black/12 bg-white/88 p-4 shadow-[0_22px_80px_rgba(0,0,0,0.10)] dark:border-white/12 dark:bg-zinc-950/78 dark:shadow-[0_22px_80px_rgba(0,0,0,0.28)] md:min-w-[60vw] md:max-w-[60vw] lg:min-w-[48vw] lg:max-w-[48vw]"
                  >
                    <div className="grid flex-1 grid-cols-[1.15fr_0.85fr] gap-4">
                      <div className="relative min-h-[48vh] overflow-hidden rounded-[1.5rem] bg-black/[0.04] shadow-[0_16px_40px_rgba(0,0,0,0.10)] dark:bg-white/[0.08]">
                        <Image
                          src={display[0]}
                          alt=""
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 32vw"
                          className="object-contain p-3 saturate-110 contrast-110 transition-transform duration-700"
                          priority={displayIndex === 0}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {display.slice(1).map((src) => (
                          <div
                            key={src}
                            className="relative min-h-[22vh] overflow-hidden rounded-[1.25rem] bg-black/[0.04] shadow-[0_14px_34px_rgba(0,0,0,0.10)] dark:bg-white/[0.08]"
                          >
                            <Image
                              src={src}
                              alt=""
                              fill
                              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 24vw, 14vw"
                              className="object-contain p-2 saturate-110 contrast-110 transition-transform duration-700"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Sections */}
      <section className="scroll-smooth scroll-snap-type-y-mandatory">
        {SECTIONS.map((section, index) => {
          const isDarkSection = index % 2 === 0;
          const sectionBorderClass = isDarkSection ? "border-white/10" : "border-black/10";
          const sectionBodyClass = isDarkSection ? "text-zinc-200" : "text-zinc-700";
          const sectionMutedClass = sectionBodyClass;
          const iconWrapperClass = isDarkSection
            ? "p-3 bg-white text-black rounded-full"
            : "p-3 bg-black text-white rounded-full";
          const tabListClass = isDarkSection
            ? "inline-flex flex-wrap gap-3 rounded-[1.75rem] border border-white/15 bg-white/[0.04] p-2"
            : "inline-flex flex-wrap gap-3 rounded-[1.75rem] border border-black/10 bg-black/[0.03] p-2";
          const tabButtonBaseClass = isDarkSection
            ? "inline-flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-semibold tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            : "inline-flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-semibold tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2 focus-visible:ring-offset-white";
          const activeTabClass = isDarkSection
            ? "border-white bg-white text-black shadow-[0_14px_34px_rgba(255,255,255,0.18)]"
            : "border-black bg-black text-white shadow-[0_14px_34px_rgba(0,0,0,0.14)]";
          const inactiveTabClass = isDarkSection
            ? "border-white/20 bg-transparent text-white/78 hover:border-white/45 hover:bg-white/10 hover:text-white"
            : "border-black/15 bg-white text-black/75 hover:border-black/40 hover:bg-black/5 hover:text-black";
          const panelClass = isDarkSection
            ? "rounded-2xl border border-white/10 bg-zinc-900/40"
            : "rounded-2xl border border-black/10 bg-zinc-50";
          const innerCardClass = isDarkSection
            ? "rounded-xl border border-white/10"
            : "rounded-xl border border-black/10";
          const softBlockClass = isDarkSection
            ? "rounded-xl bg-white/[0.06]"
            : "rounded-xl bg-black/[0.03]";

          return (
          <motion.div
            key={section.id}
            id={section.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className={`${section.id === "filmmaking" || section.id === "articles" || section.id === "mathematics" || section.id === "engineering" ? "min-h-screen flex flex-col justify-center pt-16 scroll-snap-align-start" : "grid grid-cols-1 md:grid-cols-2 gap-16 items-start pt-16"} px-8 md:px-16 py-24 border-t ${sectionBorderClass} ${isDarkSection ? "bg-black text-white" : "bg-white text-black"}`}
          >
            {section.id === "filmmaking" ? (
              <>
                <div className="flex items-start gap-4 mb-8">
                  <div className={iconWrapperClass}>
                    {section.icon}
                  </div>
                  <div>
                    <h3 className="text-4xl font-bold tracking-tighter uppercase mb-4">{section.title}</h3>
                    <p className={`text-base md:text-lg max-w-md leading-relaxed ${sectionMutedClass}`}>
                      {section.description}
                    </p>
                  </div>
                </div>
                <div className={tabListClass} role="tablist" aria-label={`${section.title} videos`}>
                  {section.videos && section.videos.map((video, videoIndex) => (
                    <button
                      key={video.title}
                      type="button"
                      onClick={() => setActiveVideoTab(videoIndex)}
                      role="tab"
                      aria-selected={activeVideoTab === videoIndex}
                      className={`${tabButtonBaseClass} ${
                        activeVideoTab === videoIndex
                          ? activeTabClass
                          : inactiveTabClass
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`h-2.5 w-2.5 rounded-full transition ${
                          activeVideoTab === videoIndex
                            ? isDarkSection
                              ? "bg-black"
                              : "bg-white"
                            : isDarkSection
                              ? "bg-white/35"
                              : "bg-black/20"
                        }`}
                      />
                      {video.title}
                    </button>
                  ))}
                </div>
                {section.videos && (() => {
                  const activeVideo = section.videos[activeVideoTab] ?? section.videos[0];
                  return (
                    <div className={`mt-8 ${panelClass} p-6 md:p-8`}>
                      <h4 className="text-2xl font-bold tracking-tighter">{activeVideo.title}</h4>
                      <p className={`mt-4 max-w-3xl text-base leading-relaxed ${sectionMutedClass}`}>
                        {activeVideo.description}
                      </p>
                      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className={`${softBlockClass} p-4`}>
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-40">Background</p>
                          <p className={`mt-3 text-sm leading-relaxed ${sectionBodyClass}`}>{activeVideo.background}</p>
                        </div>
                        <div className={`${softBlockClass} p-4`}>
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-40">My Role</p>
                          <p className={`mt-3 text-sm leading-relaxed ${sectionBodyClass}`}>{activeVideo.role}</p>
                        </div>
                        <div className={`${softBlockClass} p-4`}>
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-40">Memorable Detail</p>
                          <p className={`mt-3 text-sm leading-relaxed ${sectionBodyClass}`}>{activeVideo.detail}</p>
                        </div>
                      </div>
                      <div
                        id={`filmmaking-video-${activeVideoTab}`}
                        className="mt-8"
                      >
                        <iframe
                          src={activeVideo.src}
                          title={activeVideo.title}
                          className="w-full max-w-5xl aspect-video rounded-lg shadow-lg"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  );
                })()}
              </>
            ) : section.id === "articles" ? (
              <>
                <div className="flex items-start gap-4 mb-8">
                  <div className={iconWrapperClass}>
                    {section.icon}
                  </div>
                  <div>
                    <h3 className="text-4xl font-bold tracking-tighter uppercase mb-4">{section.title}</h3>
                    <p className={`text-base md:text-lg max-w-md leading-relaxed ${sectionMutedClass}`}>
                      {section.description}
                    </p>
                  </div>
                </div>
                <div className={tabListClass} role="tablist" aria-label={`${section.title} files`}>
                  {section.files && section.files.map((file, fileIndex) => (
                    <button
                      key={file.title}
                      type="button"
                      onClick={() => setActiveArticleTab(fileIndex)}
                      role="tab"
                      aria-selected={activeArticleTab === fileIndex}
                      className={`${tabButtonBaseClass} ${
                        activeArticleTab === fileIndex
                          ? activeTabClass
                          : inactiveTabClass
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`h-2.5 w-2.5 rounded-full transition ${
                          activeArticleTab === fileIndex
                            ? isDarkSection
                              ? "bg-black"
                              : "bg-white"
                            : isDarkSection
                              ? "bg-white/35"
                              : "bg-black/20"
                        }`}
                      />
                      {file.title}
                    </button>
                  ))}
                </div>
                {section.files && (() => {
                  const activeArticle = section.files[activeArticleTab] ?? section.files[0];
                  return (
                    <div
                      id={`articles-file-${activeArticleTab}`}
                      className={`mt-8 ${panelClass} p-6 md:p-8`}
                    >
                      <h4 className="text-2xl font-bold tracking-tighter">{activeArticle.title}</h4>
                      <p className={`mt-4 max-w-3xl text-base leading-relaxed ${sectionMutedClass}`}>
                        {activeArticle.description}
                      </p>
                      {activeArticle.summary && (
                        <div className={`mt-6 ${softBlockClass} p-5`}>
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-40">Reader-Friendly Summary</p>
                          <p className={`mt-3 text-sm leading-relaxed ${sectionBodyClass}`}>{activeArticle.summary}</p>
                        </div>
                      )}
                      <a
                        href={activeArticle.src}
                        target="_blank"
                        rel="noreferrer"
                        className={`mt-6 inline-flex items-center gap-2 rounded-full border ${sectionBorderClass} px-4 py-2 text-sm transition ${isDarkSection ? "hover:bg-white/10" : "hover:bg-black/5"}`}
                      >
                        Read PDF
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  );
                })()}
              </>
            ) : section.id === "mathematics" ? (
              <>
                <div className="flex items-start gap-4 mb-8">
                  <div className={iconWrapperClass}>
                    {section.icon}
                  </div>
                  <div>
                    <h3 className="text-4xl font-bold tracking-tighter uppercase mb-4">{section.title}</h3>
                    <p className={`text-base md:text-lg max-w-md leading-relaxed ${sectionMutedClass}`}>
                      {section.description}
                    </p>
                    <p className={`mt-4 text-base leading-relaxed ${sectionBodyClass}`}>
                      The following study guides were generated by AI based on my handwritten notes from the mathematics courses I have completed.
                    </p>
                  </div>
                </div>
                <div className={tabListClass} role="tablist" aria-label={`${section.title} notes`}>
                  {section.notes && section.notes.map((note, noteIndex) => (
                    <button
                      key={note.title}
                      type="button"
                      onClick={() => setActiveMathTab(noteIndex)}
                      role="tab"
                      aria-selected={activeMathTab === noteIndex}
                      className={`${tabButtonBaseClass} ${
                        activeMathTab === noteIndex
                          ? activeTabClass
                          : inactiveTabClass
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`h-2.5 w-2.5 rounded-full transition ${
                          activeMathTab === noteIndex
                            ? isDarkSection
                              ? "bg-black"
                              : "bg-white"
                            : isDarkSection
                              ? "bg-white/35"
                              : "bg-black/20"
                        }`}
                      />
                      {note.title}
                    </button>
                  ))}
                </div>
                {section.notes && (() => {
                  const activeNote = section.notes[activeMathTab] ?? section.notes[0];
                  return (
                    <div
                      id={`mathematics-note-${activeMathTab}`}
                      className={`mt-8 ${panelClass} p-6 md:p-8`}
                    >
                      <h4 className="text-2xl font-bold tracking-tighter">{activeNote.title}</h4>
                      <p className={`mt-4 max-w-3xl text-base leading-relaxed ${sectionMutedClass}`}>
                        {activeNote.summary}
                      </p>
                      {activeNote.explanation && (
                        <div className={`mt-6 ${softBlockClass} p-5`}>
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-40">Explain This for a General Reader</p>
                          <p className={`mt-3 text-sm leading-relaxed ${sectionBodyClass}`}>{activeNote.explanation}</p>
                        </div>
                      )}
                      <a
                        href={activeNote.src}
                        target="_blank"
                        rel="noreferrer"
                        className={`mt-6 inline-flex items-center gap-2 rounded-full border ${sectionBorderClass} px-4 py-2 text-sm transition ${isDarkSection ? "hover:bg-white/10" : "hover:bg-black/5"}`}
                      >
                        Open Note
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  );
                })()}
              </>
            ) : section.id === "engineering" ? (
              <>
                <div className="flex items-start gap-4 mb-8">
                  <div className={iconWrapperClass}>
                    {section.icon}
                  </div>
                  <div>
                    <h3 className="text-4xl font-bold tracking-tighter uppercase mb-4">{section.title}</h3>
                    <p className={`text-base md:text-lg max-w-2xl leading-relaxed ${sectionMutedClass}`}>
                      {section.description}
                    </p>
                  </div>
                </div>
                <div className={tabListClass} role="tablist" aria-label={`${section.title} sections`}>
                  {section.sections && section.sections.map((engineeringSection, engineeringIndex) => (
                    <button
                      key={engineeringSection.title}
                      type="button"
                      onClick={() => setActiveEngineeringTab(engineeringIndex)}
                      role="tab"
                      aria-selected={activeEngineeringTab === engineeringIndex}
                      className={`${tabButtonBaseClass} ${
                        activeEngineeringTab === engineeringIndex
                          ? activeTabClass
                          : inactiveTabClass
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`h-2.5 w-2.5 rounded-full transition ${
                          activeEngineeringTab === engineeringIndex
                            ? isDarkSection
                              ? "bg-black"
                              : "bg-white"
                            : isDarkSection
                              ? "bg-white/35"
                              : "bg-black/20"
                        }`}
                      />
                      {engineeringSection.title}
                    </button>
                  ))}
                </div>
                {section.sections && (() => {
                  const activeEngineeringSection = section.sections[activeEngineeringTab] ?? section.sections[0];
                  return (
                    <div className={`mt-8 min-h-[20rem] ${panelClass} p-8`}>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-40 mb-4">
                        {String(activeEngineeringTab + 1).padStart(2, "0")}
                      </p>
                      <h4 className="text-2xl font-bold tracking-tighter mb-4">
                        {activeEngineeringSection.title}
                      </h4>
                      {activeEngineeringSection.description && (
                        <p className={`text-base leading-relaxed max-w-3xl ${sectionMutedClass}`}>
                          {activeEngineeringSection.description}
                        </p>
                      )}
                      {"honors" in activeEngineeringSection && activeEngineeringSection.honors && (
                        <div className="mt-6">
                          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                            {activeEngineeringSection.honors.map((honor) => (
                              <div
                                key={honor.title}
                                className={`${innerCardClass} p-5`}
                              >
                                <h5 className="text-lg font-semibold tracking-tight">{honor.title}</h5>
                                {honor.summary && (
                                  <p className={`mt-3 text-sm leading-relaxed ${sectionMutedClass}`}>
                                    {honor.summary}
                                  </p>
                                )}
                                <div className="mt-5 flex flex-wrap gap-3">
                                  {honor.documents.map((documentSrc, documentIndex) => (
                                    <a
                                      key={documentSrc}
                                      href={documentSrc}
                                      target="_blank"
                                      rel="noreferrer"
                                      className={`inline-flex items-center gap-2 rounded-full border ${sectionBorderClass} px-4 py-2 text-sm transition ${isDarkSection ? "hover:bg-white/10" : "hover:bg-black/5"}`}
                                    >
                                      Supporting Document {documentIndex + 1}
                                      <ArrowRight className="h-4 w-4" />
                                    </a>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                          {"briefDescription" in activeEngineeringSection && activeEngineeringSection.briefDescription && (
                            <div className={`mt-6 ${softBlockClass} px-4 py-3`}>
                              <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-40">
                                Brief Description for a General Reader
                              </p>
                              <p className={`mt-2 whitespace-pre-line text-sm leading-relaxed ${sectionBodyClass}`}>
                                {activeEngineeringSection.briefDescription}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                      {"items" in activeEngineeringSection && activeEngineeringSection.items && (
                        <div className="mt-6">
                          <div className={tabListClass} role="tablist" aria-label={`${activeEngineeringSection.title} projects`}>
                            {activeEngineeringSection.items.map((item, itemIndex) => (
                              <button
                                key={item.title}
                                type="button"
                                onClick={() => setActiveRoboticsTab(itemIndex)}
                                role="tab"
                                aria-selected={activeRoboticsTab === itemIndex}
                                className={`${tabButtonBaseClass} ${
                                  activeRoboticsTab === itemIndex
                                    ? activeTabClass
                                    : inactiveTabClass
                                }`}
                              >
                                <span
                                  aria-hidden="true"
                                  className={`h-2.5 w-2.5 rounded-full transition ${
                                    activeRoboticsTab === itemIndex
                                      ? isDarkSection
                                        ? "bg-black"
                                        : "bg-white"
                                      : isDarkSection
                                        ? "bg-white/35"
                                        : "bg-black/20"
                                  }`}
                                />
                                {item.title}
                              </button>
                            ))}
                          </div>
                          {(() => {
                            const activeRobotProject = activeEngineeringSection.items[activeRoboticsTab] ?? activeEngineeringSection.items[0];
                            return (
                              <div className={`mt-6 ${innerCardClass} px-5 py-5`}>
                                <h5 className="text-lg font-semibold tracking-tight">{activeRobotProject.title}</h5>
                                <p className={`mt-3 text-sm leading-relaxed ${sectionMutedClass}`}>
                                  {activeRobotProject.summary}
                                </p>
                                {activeRobotProject.images && (
                                  <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {activeRobotProject.images.map((imageSrc, imageIndex) => (
                                      <div
                                        key={imageSrc}
                                        className="group relative aspect-[4/5] overflow-hidden rounded-xl"
                                      >
                                        <Image
                                          src={imageSrc}
                                          alt={`${activeRobotProject.title} photo ${imageIndex + 1}`}
                                          fill
                                          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                          sizes="(max-width: 768px) 50vw, 25vw"
                                        />
                                      </div>
                                    ))}
                                  </div>
                                )}
                                {"plainLanguage" in activeRobotProject && activeRobotProject.plainLanguage && (
                                  <div className={`mt-5 ${softBlockClass} px-4 py-3`}>
                                    <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-40">
                                      Describe the Project in Plain Language
                                    </p>
                                    <p className={`mt-2 text-sm leading-relaxed ${sectionBodyClass}`}>{activeRobotProject.plainLanguage}</p>
                                  </div>
                                )}
                              </div>
                            );
                          })()}
                        </div>
                      )}
                      {"document" in activeEngineeringSection && activeEngineeringSection.document && (
                        <div className={`mt-6 ${innerCardClass} p-5`}>
                          <div className="mt-2 flex flex-wrap gap-3">
                            <a
                              href={activeEngineeringSection.document}
                              target="_blank"
                              rel="noreferrer"
                              className={`inline-flex items-center gap-2 rounded-full border ${sectionBorderClass} px-4 py-2 text-sm transition ${isDarkSection ? "hover:bg-white/10" : "hover:bg-black/5"}`}
                            >
                              Open PDF
                              <ArrowRight className="h-4 w-4" />
                            </a>
                          </div>
                          {"briefDescription" in activeEngineeringSection && activeEngineeringSection.briefDescription && (
                            <div className={`mt-5 ${softBlockClass} px-4 py-3`}>
                              <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-40">
                                Brief Description for a General Reader
                              </p>
                              <p className={`mt-2 whitespace-pre-line text-sm leading-relaxed ${sectionBodyClass}`}>
                                {activeEngineeringSection.briefDescription}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                      {"link" in activeEngineeringSection && activeEngineeringSection.link && (
                        <div className={`mt-6 ${innerCardClass} p-5`}>
                          <div className="mt-2 flex flex-wrap gap-3">
                            <a
                              href={activeEngineeringSection.link}
                              target="_blank"
                              rel="noreferrer"
                              className={`inline-flex items-center gap-2 rounded-full border ${sectionBorderClass} px-4 py-2 text-sm transition ${isDarkSection ? "hover:bg-white/10" : "hover:bg-black/5"}`}
                            >
                              Open Research Document
                              <ArrowRight className="h-4 w-4" />
                            </a>
                          </div>
                          {"briefDescription" in activeEngineeringSection && activeEngineeringSection.briefDescription && (
                            <div className={`mt-5 ${softBlockClass} px-4 py-3`}>
                              <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-40">
                                Brief Description for a General Reader
                              </p>
                              <p className={`mt-2 whitespace-pre-line text-sm leading-relaxed ${sectionBodyClass}`}>
                                {activeEngineeringSection.briefDescription}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })()}
              </>
            ) : (
              <>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-black text-white dark:bg-white dark:text-black rounded-full">
                    {section.icon}
                  </div>
                  <div>
                    <h3 className="text-4xl font-bold tracking-tighter uppercase mb-4">{section.title}</h3>
                    <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-md leading-relaxed">
                      {section.description}
                    </p>
                  </div>
                </div>
                <div className="aspect-[16/9] bg-zinc-100 dark:bg-zinc-900 relative overflow-hidden flex items-center justify-center">
                  <p className="text-sm font-mono opacity-30">[ Content Placeholder for {section.title} ]</p>
                </div>
              </>
            )}
          </motion.div>
        )})}
      </section>

      {/* Horizontal Scroll Gallery */}
      <section
        id="art-gallery"
        className="relative h-[300vh] bg-black text-white dark:bg-white dark:text-black"
        ref={artGalleryRef}
      >
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <motion.div style={{ x: artGalleryX }} className="flex gap-12 px-16">
            <div className="flex flex-col justify-center min-w-[52vw] pr-10">
              <h3 className="text-4xl font-bold tracking-tighter">Art Gallery</h3>
              <div className="mt-8 max-w-3xl space-y-6 text-base md:text-lg leading-8 text-zinc-300 dark:text-zinc-700">
                <p>
                  Art is my refuge—a place to slow down, reflect, and express myself beyond words. It helps me notice small details and translate thoughts and experiences into something tangible.
                </p>
                <p>
                  Each medium shapes how I think: paper sculpture turns simple materials into 3D forms, collage communicates an idea through arrangement, and pencil sketching builds patience and careful observation.
                </p>
                <p>
                  More than a creative outlet, art feels like meditation—it keeps me present and reminds me to appreciate the beauty in careful observation and thoughtful creation.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2">
                <span className="text-sm font-bold uppercase tracking-widest">Scroll to explore</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
            {PROJECTS.map((project) => (
              <motion.div
                key={project.id}
                className="relative min-w-[50vw] h-[70vh] group bg-zinc-50 dark:bg-zinc-900/30"
              >
                <Image
                  src={project.src}
                  alt={project.alt}
                  fill
                  className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={project.id <= 2}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-32 px-8 md:px-16 border-t border-black/10 dark:border-white/10 text-center">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-16">MICHAEL HUANG</h2>
        <div className="flex justify-center text-sm font-bold tracking-widest opacity-60">
          <a href="mailto:michuang62@gmail.com" className="hover:opacity-100 transition-opacity">
            michuang62@gmail.com
          </a>
        </div>
        <p className="mt-32 text-xs opacity-30 uppercase tracking-widest">
          © {new Date().getFullYear()} Michael Huang. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
