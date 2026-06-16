"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
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
  { id: 1, src: "/images/art1.jpg", alt: "Street Scene Sketch", title: "Paper Sculpture: Cones and Cubes" },
  { id: 2, src: "/images/art2.jpg", alt: "Bottle Study", title: "Scenery: Alamo Dorm Scene" },
  { id: 3, src: "/images/art3.jpg", alt: "Still Life Composition", title: "Collage: Orbits of the unseen" },
  { id: 4, src: "/images/art4.jpg", alt: "Abstract Paper Sculpture", title: "Pencil sketch: water bottle" },
  { id: 5, src: "/images/art5.jpg", alt: "Engineering Marble Run", title: "Pencil sketch: books" },
];

const SECTIONS = [
  { 
    id: "engineering", 
    title: "Engineering", 
    icon: <Lightbulb className="w-6 h-6" />, 
    description: "Solving complex problems through design and implementation. My focus lies at the intersection of mechanical integrity and innovative systems.",
    sections: [
      {
        title: "Academic Accomplishment",
        description: "Use this area to highlight coursework, awards, competitions, and milestones that reflect your engineering foundation.",
        honors: [
          {
            title: "Conrad Alternate Finalist",
            summary: "A recognition that highlights idea development, communication, and the ability to turn technical thinking into a compelling innovation story.",
            documents: [
              "/Conrad/Congratulations%20Conrad%20Alternate%20Finalist!.pdf",
              "/Conrad/ovBZdEXb.pdf",
            ],
          },
          {
            title: "Blue Ocean Top 500",
            summary: "An achievement that reflects entrepreneurial thinking and the ability to shape a technical idea into a broader real-world opportunity.",
            documents: [
              "/Blue%20ocean.pdf",
            ],
          },
        ]
      },
      {
        title: "Robotics",
        description: "Use this section to showcase robot builds, team contributions, design iterations, and technical problem-solving.",
        items: [
          {
            title: "2025-2026 Season",
            summary: "A visual record of building, testing, collaborating, and refining the robot through the season.",
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
        title: "Engineering Research",
        description: "Use this space for research questions, methods, findings, and the broader impact of your engineering investigations.",
        researchProjects: [
          {
            title: "Amphibious Beaver Robotics",
            summary: "A research direction exploring a bio-inspired robotic system and how mobility across different environments can inform engineering design.",
            document: "/Amphibious.pdf",
          },
          {
            title: "EEG and Machine Learning",
            summary: "A project focused on interpreting brain-signal data with machine learning in a way that is accessible and meaningful to a general audience.",
            link: "https://docs.google.com/document/d/1-pD5bhVVymJrBKz6nYygzYWdBbIQj1vyBOT-AdYG3x0/edit?usp=sharing",
          },
        ]
      },
    ]
  },
  { 
    id: "mathematics", 
    title: "Mathematics", 
    icon: <Sigma className="w-6 h-6" />, 
    description: "Exploring the elegance of numbers and structural patterns. From abstract proofs to applied models, mathematics forms the foundation of my logical reasoning.",
    notes: [
      { src: "/Notes/HPC.pdf", title: "HPC", summary: "A note set that reflects advanced problem-solving and structured mathematical reasoning." },
      { src: "/Notes/calc%201.pdf", title: "Calc 1", summary: "A note set focused on the fundamentals of calculus and the way change can be modeled precisely." },
      { src: "/Notes/Calc%202.pdf", title: "Calc 2", summary: "A continuation into deeper calculus ideas, emphasizing technique, interpretation, and mathematical persistence." },
    ]
  },
  { 
    id: "articles", 
    title: "Articles", 
    icon: <BookOpen className="w-6 h-6" />, 
    description: "Writing on topics ranging from technical analysis to personal reflections on philosophy and design.",
    files: [
      { src: "/articles/article1.pdf", title: "Article 1: The Future of AI", description: "A plain-language overview of how AI is evolving and why that matters beyond the technical world." },
      { src: "/articles/article2.pdf", title: "Article 2: Quantum Computing Explained", description: "A simplified explanation of quantum computing designed for readers who are curious but not specialists." },
      { src: "/articles/article3.pdf", title: "Article 3: Renewable Energy Solutions", description: "A reader-friendly look at how sustainable energy choices connect to real-world environmental challenges." },
      { src: "/articles/article4.pdf", title: "Article 4: The Psychology of Design", description: "A reflection on how design shapes human attention, emotion, and everyday decision-making." },
    ]
  },
  { 
    id: "filmmaking", 
    title: "Filmmaking", 
    icon: <Film className="w-6 h-6" />, 
    description: "Telling stories through motion and light. I explore visual narratives that challenge perspectives and evoke emotional responses.",
    videos: [
      {
        src: "https://www.youtube.com/embed/UCMLRu2iUjw",
        title: "Video 1 Title",
        description: "A short project summary written for viewers who may know nothing about the background of the piece.",
        background: "Use this space to explain why this film was made and what context inspired it.",
        role: "Use this space to describe your role in planning, filming, editing, or directing.",
        detail: "Use this space to share one memorable challenge, experiment, or fun behind-the-scenes detail.",
      },
      {
        src: "https://www.youtube.com/embed/fzGAYgGAnxg",
        title: "Video 2 Title",
        description: "A short project summary written for viewers who may know nothing about the background of the piece.",
        background: "Use this space to explain why this film was made and what context inspired it.",
        role: "Use this space to describe your role in planning, filming, editing, or directing.",
        detail: "Use this space to share one memorable challenge, experiment, or fun behind-the-scenes detail.",
      },
      {
        src: "https://www.youtube.com/embed/X6QUnVPvIe0",
        title: "Video 3 Title",
        description: "A short project summary written for viewers who may know nothing about the background of the piece.",
        background: "Use this space to explain why this film was made and what context inspired it.",
        role: "Use this space to describe your role in planning, filming, editing, or directing.",
        detail: "Use this space to share one memorable challenge, experiment, or fun behind-the-scenes detail.",
      },
      {
        src: "https://www.youtube.com/embed/tcTpSjCfeXI",
        title: "Video 4 Title",
        description: "A short project summary written for viewers who may know nothing about the background of the piece.",
        background: "Use this space to explain why this film was made and what context inspired it.",
        role: "Use this space to describe your role in planning, filming, editing, or directing.",
        detail: "Use this space to share one memorable challenge, experiment, or fun behind-the-scenes detail.",
      },
    ]
  },

];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeEngineeringTab, setActiveEngineeringTab] = useState(0);
  const [activeRoboticsTab, setActiveRoboticsTab] = useState(0);
  const [activeMathTab, setActiveMathTab] = useState(0);
  const [activeArticleTab, setActiveArticleTab] = useState(0);
  const [activeVideoTab, setActiveVideoTab] = useState(0);
  useEffect(() => {
    setMounted(true);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: mounted ? containerRef : undefined,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);
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

  const handleSearchSelect = (href: string, label: string) => {
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
      handleSearchSelect(filteredSearchItems[0].href, filteredSearchItems[0].label);
    }
  };

  if (!mounted) {
    return (
      <main
        id="top"
        className="min-h-screen bg-white text-black selection:bg-black selection:text-white dark:bg-black dark:text-white dark:selection:bg-white dark:selection:text-black"
      />
    );
  }

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
                    onClick={() => handleSearchSelect(item.href, item.label)}
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
                Michael Huang's Portfolio
              </span>
            </h2>
            <p className="mt-4 text-base md:text-lg opacity-90">
              personal growth through high school
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
        className="min-h-screen flex flex-col justify-center px-8 md:px-16 py-32 border-b border-black/10 dark:border-white/10"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h3 className="text-4xl font-bold tracking-tighter mb-8">About Me</h3>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {SECTIONS.find(s => s.id === "introduction")?.description}
          </p>
          <p className="mt-4 text-lg text-zinc-500 dark:text-zinc-300 leading-relaxed">
            Here, I will share more about my journey, passions, and what drives my creative and technical pursuits. Stay tuned for more personal insights!
          </p>
        </motion.div>
      </section>

      {/* Categories Sections */}
      <section className="py-32 px-8 md:px-16 space-y-32 scroll-smooth scroll-snap-type-y-mandatory">
        {SECTIONS.map((section, index) => (
          <motion.div
            key={section.id}
            id={section.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className={section.id === "filmmaking" || section.id === "articles" || section.id === "mathematics" || section.id === "engineering" ? "min-h-screen flex flex-col justify-center border-t border-black/10 dark:border-white/10 pt-16 scroll-snap-align-start" : "grid grid-cols-1 md:grid-cols-2 gap-16 items-start border-t border-black/10 dark:border-white/10 pt-16"}
          >
            {section.id === "filmmaking" ? (
              <>
                <div className="flex items-start gap-4 mb-8">
                  <div className="p-3 bg-black text-white dark:bg-white dark:text-black rounded-full">
                    {section.icon}
                  </div>
                  <div>
                    <h3 className="text-4xl font-bold tracking-tighter uppercase mb-4">{section.title}</h3>
                    <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-md leading-relaxed">
                      {section.description}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {section.videos && section.videos.map((video, videoIndex) => (
                    <button
                      key={video.title}
                      type="button"
                      onClick={() => setActiveVideoTab(videoIndex)}
                      className={`rounded-full border px-4 py-2 text-sm transition ${
                        activeVideoTab === videoIndex
                          ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                          : "border-black/10 bg-white text-black hover:bg-black/5 dark:border-white/10 dark:bg-black dark:text-white dark:hover:bg-white/5"
                      }`}
                    >
                      {video.title}
                    </button>
                  ))}
                </div>
                {section.videos && (() => {
                  const activeVideo = section.videos[activeVideoTab] ?? section.videos[0];
                  return (
                    <div className="mt-8 rounded-2xl border border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/40 p-6 md:p-8">
                      <h4 className="text-2xl font-bold tracking-tighter">{activeVideo.title}</h4>
                      <p className="mt-4 max-w-3xl text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {activeVideo.description}
                      </p>
                      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="rounded-xl bg-black/[0.03] dark:bg-white/[0.04] p-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-40">Background</p>
                          <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{activeVideo.background}</p>
                        </div>
                        <div className="rounded-xl bg-black/[0.03] dark:bg-white/[0.04] p-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-40">My Role</p>
                          <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{activeVideo.role}</p>
                        </div>
                        <div className="rounded-xl bg-black/[0.03] dark:bg-white/[0.04] p-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-40">Memorable Detail</p>
                          <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{activeVideo.detail}</p>
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
                  <div className="p-3 bg-black text-white dark:bg-white dark:text-black rounded-full">
                    {section.icon}
                  </div>
                  <div>
                    <h3 className="text-4xl font-bold tracking-tighter uppercase mb-4">{section.title}</h3>
                    <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-md leading-relaxed">
                      {section.description}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {section.files && section.files.map((file, fileIndex) => (
                    <button
                      key={file.title}
                      type="button"
                      onClick={() => setActiveArticleTab(fileIndex)}
                      className={`rounded-full border px-4 py-2 text-sm transition ${
                        activeArticleTab === fileIndex
                          ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                          : "border-black/10 bg-white text-black hover:bg-black/5 dark:border-white/10 dark:bg-black dark:text-white dark:hover:bg-white/5"
                      }`}
                    >
                      {file.title}
                    </button>
                  ))}
                </div>
                {section.files && (() => {
                  const activeArticle = section.files[activeArticleTab] ?? section.files[0];
                  return (
                    <div
                      id={`articles-file-${activeArticleTab}`}
                      className="mt-8 rounded-2xl border border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/40 p-6 md:p-8"
                    >
                      <h4 className="text-2xl font-bold tracking-tighter">{activeArticle.title}</h4>
                      <p className="mt-4 max-w-3xl text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {activeArticle.description}
                      </p>
                      <div className="mt-6 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-40">Reader-Friendly Summary</p>
                        <div className="mt-3 min-h-[5rem]" />
                      </div>
                      <a
                        href={activeArticle.src}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-6 inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm transition hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
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
                  <div className="p-3 bg-black text-white dark:bg-white dark:text-black rounded-full">
                    {section.icon}
                  </div>
                  <div>
                    <h3 className="text-4xl font-bold tracking-tighter uppercase mb-4">{section.title}</h3>
                    <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-md leading-relaxed">
                      {section.description}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {section.notes && section.notes.map((note, noteIndex) => (
                    <button
                      key={note.title}
                      type="button"
                      onClick={() => setActiveMathTab(noteIndex)}
                      className={`rounded-full border px-4 py-2 text-sm transition ${
                        activeMathTab === noteIndex
                          ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                          : "border-black/10 bg-white text-black hover:bg-black/5 dark:border-white/10 dark:bg-black dark:text-white dark:hover:bg-white/5"
                      }`}
                    >
                      {note.title}
                    </button>
                  ))}
                </div>
                {section.notes && (() => {
                  const activeNote = section.notes[activeMathTab] ?? section.notes[0];
                  return (
                    <div
                      id={`mathematics-note-${activeMathTab}`}
                      className="mt-8 rounded-2xl border border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/40 p-6 md:p-8"
                    >
                      <h4 className="text-2xl font-bold tracking-tighter">{activeNote.title}</h4>
                      <p className="mt-4 max-w-3xl text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {activeNote.summary}
                      </p>
                      <div className="mt-6 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-40">Explain This for a General Reader</p>
                        <div className="mt-3 min-h-[5rem]" />
                      </div>
                      <a
                        href={activeNote.src}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-6 inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm transition hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
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
                  <div className="p-3 bg-black text-white dark:bg-white dark:text-black rounded-full">
                    {section.icon}
                  </div>
                  <div>
                    <h3 className="text-4xl font-bold tracking-tighter uppercase mb-4">{section.title}</h3>
                    <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
                      {section.description}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {section.sections && section.sections.map((engineeringSection, engineeringIndex) => (
                    <button
                      key={engineeringSection.title}
                      type="button"
                      onClick={() => setActiveEngineeringTab(engineeringIndex)}
                      className={`rounded-full border px-4 py-2 text-sm transition ${
                        activeEngineeringTab === engineeringIndex
                          ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                          : "border-black/10 bg-white text-black hover:bg-black/5 dark:border-white/10 dark:bg-black dark:text-white dark:hover:bg-white/5"
                      }`}
                    >
                      {engineeringSection.title}
                    </button>
                  ))}
                </div>
                {section.sections && (() => {
                  const activeEngineeringSection = section.sections[activeEngineeringTab] ?? section.sections[0];
                  return (
                    <div className="mt-8 min-h-[20rem] rounded-2xl border border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/40 p-8">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-40 mb-4">
                        {String(activeEngineeringTab + 1).padStart(2, "0")}
                      </p>
                      <h4 className="text-2xl font-bold tracking-tighter mb-4">
                        {activeEngineeringSection.title}
                      </h4>
                      <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
                        {activeEngineeringSection.description}
                      </p>
                      {"honors" in activeEngineeringSection && activeEngineeringSection.honors && (
                        <div className="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-6">
                          {activeEngineeringSection.honors.map((honor) => (
                            <div
                              key={honor.title}
                              className="rounded-xl border border-black/10 dark:border-white/10 p-5"
                            >
                              <h5 className="text-lg font-semibold tracking-tight">{honor.title}</h5>
                              <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                                {honor.summary}
                              </p>
                              <div className="mt-5 flex flex-wrap gap-3">
                                {honor.documents.map((documentSrc, documentIndex) => (
                                  <a
                                    key={documentSrc}
                                    href={documentSrc}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm transition hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
                                  >
                                    Supporting Document {documentIndex + 1}
                                    <ArrowRight className="h-4 w-4" />
                                  </a>
                                ))}
                              </div>
                              <div className="mt-5 rounded-lg bg-black/[0.03] dark:bg-white/[0.04] px-4 py-3">
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-40">
                                  Brief Description for a General Reader
                                </p>
                                <div className="mt-2 min-h-[3.5rem]" />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      {"items" in activeEngineeringSection && activeEngineeringSection.items && (
                        <div className="mt-6">
                          <div className="flex flex-wrap gap-3">
                            {activeEngineeringSection.items.map((item, itemIndex) => (
                              <button
                                key={item.title}
                                type="button"
                                onClick={() => setActiveRoboticsTab(itemIndex)}
                                className={`rounded-full border px-4 py-2 text-sm transition ${
                                  activeRoboticsTab === itemIndex
                                    ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                                    : "border-black/10 bg-white text-black hover:bg-black/5 dark:border-white/10 dark:bg-black dark:text-white dark:hover:bg-white/5"
                                }`}
                              >
                                {item.title}
                              </button>
                            ))}
                          </div>
                          {(() => {
                            const activeRobotProject = activeEngineeringSection.items[activeRoboticsTab] ?? activeEngineeringSection.items[0];
                            return (
                              <div className="mt-6 rounded-xl border border-black/10 dark:border-white/10 px-5 py-5">
                                <h5 className="text-lg font-semibold tracking-tight">{activeRobotProject.title}</h5>
                                <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
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
                                <div className="mt-5 rounded-lg bg-black/[0.03] dark:bg-white/[0.04] px-4 py-3">
                                  <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-40">
                                    Describe the Project in Plain Language
                                  </p>
                                  <div className="mt-2 min-h-[5rem]" />
                                </div>
                              </div>
                            );
                          })()}
                        </div>
                      )}
                      {"researchProjects" in activeEngineeringSection && activeEngineeringSection.researchProjects && (
                        <div className="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-6">
                          {activeEngineeringSection.researchProjects.map((project, projectIndex) => (
                            <div
                              key={project.title}
                              className="rounded-xl border border-black/10 dark:border-white/10 p-5"
                            >
                              <p className="text-sm font-medium tracking-tight">
                                {projectIndex + 1}. {project.title}
                              </p>
                              <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                                {project.summary}
                              </p>
                              <div className="mt-5 flex flex-wrap gap-3">
                                {"document" in project && project.document && (
                                  <a
                                    href={project.document}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm transition hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
                                  >
                                    Open PDF
                                    <ArrowRight className="h-4 w-4" />
                                  </a>
                                )}
                                {"link" in project && project.link && (
                                  <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm transition hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
                                  >
                                    Open Research Document
                                    <ArrowRight className="h-4 w-4" />
                                  </a>
                                )}
                              </div>
                              <div className="mt-5 rounded-lg bg-black/[0.03] dark:bg-white/[0.04] px-4 py-3">
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-40">
                                  Brief Description for a General Reader
                                </p>
                                <div className="mt-2 min-h-[4rem]" />
                              </div>
                            </div>
                          ))}
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
                    <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-md leading-relaxed">
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
        ))}
      </section>

      {/* Horizontal Scroll Gallery */}
      <section
        id="art-gallery"
        className="relative h-[300vh] bg-black text-white dark:bg-white dark:text-black"
        ref={containerRef}
      >
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-12 px-16">
            <div className="flex flex-col justify-center min-w-[52vw] pr-10">
              <h3 className="text-4xl font-bold tracking-tighter">Art Gallery</h3>
              <p className="mt-8 max-w-3xl text-base md:text-lg leading-9 opacity-60">
                A collection of sketches and sculptures exploring form, light, and motion.
              </p>
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
                  sizes="(max-w-768px) 100vw, 50vw"
                  priority={project.id <= 2}
                />
                <div className="absolute inset-x-0 bottom-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-8">
                  <div className="text-white bg-black/70 p-4 rounded">
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-1 opacity-80">Art {project.id}</p>
                    <h4 className="text-2xl font-bold tracking-tighter">{project.title}</h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-32 px-8 md:px-16 border-t border-black/10 dark:border-white/10 text-center">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-16">MICHAEL HUANG</h2>
        <div className="flex flex-wrap justify-center gap-12 text-sm font-bold uppercase tracking-widest opacity-60">
          <a href="#" className="hover:opacity-100 transition-opacity">Email</a>
          <a href="#" className="hover:opacity-100 transition-opacity">LinkedIn</a>
          <a href="#" className="hover:opacity-100 transition-opacity">Twitter</a>
          <a href="#" className="hover:opacity-100 transition-opacity">Instagram</a>
        </div>
        <p className="mt-32 text-xs opacity-30 uppercase tracking-widest">
          © {new Date().getFullYear()} Michael Huang. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
