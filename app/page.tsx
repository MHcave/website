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
    description: "Solving complex problems through design and implementation. My focus lies at the intersection of mechanical integrity and innovative systems." 
  },
  { 
    id: "mathematics", 
    title: "Mathematics", 
    icon: <Sigma className="w-6 h-6" />, 
    description: "Exploring the elegance of numbers and structural patterns. From abstract proofs to applied models, mathematics forms the foundation of my logical reasoning.",
    notes: [
      { src: "/Notes/HPC.pdf", title: "HPC" },
      { src: "/Notes/calc%201.pdf", title: "Calc 1" },
      { src: "/Notes/Calc%202.pdf", title: "Calc 2" },
    ]
  },
  { 
    id: "articles", 
    title: "Articles", 
    icon: <BookOpen className="w-6 h-6" />, 
    description: "Writing on topics ranging from technical analysis to personal reflections on philosophy and design.",
    files: [
      { src: "/articles/article1.pdf", title: "Article 1: The Future of AI", description: "An introductory article on the advancements and future implications of Artificial Intelligence." },
      { src: "/articles/article2.pdf", title: "Article 2: Quantum Computing Explained", description: "A simplified explanation of quantum computing and its potential impact." },
      { src: "/articles/article3.pdf", title: "Article 3: Renewable Energy Solutions", description: "Exploring sustainable energy sources and their role in a greener future." },
      { src: "/articles/article4.pdf", title: "Article 4: The Psychology of Design", description: "Understanding how design principles influence human perception and behavior." },
    ]
  },
  { 
    id: "filmmaking", 
    title: "Filmmaking", 
    icon: <Film className="w-6 h-6" />, 
    description: "Telling stories through motion and light. I explore visual narratives that challenge perspectives and evoke emotional responses.",
    videos: [
      { src: "/images/GAP.PSA.mp4", title: "Video 3 Title", description: "Introduction for Video 3" },
      { src: "/images/C0329.mp4", title: "Video 2 Title", description: "Introduction for Video 2" },
      { src: "/images/Sequence 04_1.mp4", title: "Video 1 Title", description: "Introduction for Video 1" },
      { src: "/images/From World to Webb.mp4", title: "Video 4 Title", description: "Introduction for Video 4" },
    ]
  },

];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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
            className={section.id === "filmmaking" || section.id === "articles" || section.id === "mathematics" ? "min-h-screen flex flex-col justify-center border-t border-black/10 dark:border-white/10 pt-16 scroll-snap-align-start" : "grid grid-cols-1 md:grid-cols-2 gap-16 items-start border-t border-black/10 dark:border-white/10 pt-16"}
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
                <div className="flex flex-col gap-8 relative">
                  <nav className="hidden md:flex flex-col fixed top-1/2 -translate-y-1/2 left-4 z-50 p-2 bg-black/50 rounded-full shadow-lg">
                    {section.videos && section.videos.map((video, videoIndex) => (
                      <a
                        key={videoIndex}
                        href={`#filmmaking-video-${videoIndex}`}
                        className="p-2 text-white hover:bg-white/20 rounded-full transition-colors duration-200"
                        title={video.title}
                      >
                        {videoIndex + 1}
                      </a>
                    ))}
                  </nav>
                  {section.videos && section.videos.map((video, videoIndex) => (
                    <div
                      key={videoIndex}
                      id={`filmmaking-video-${videoIndex}`}
                      className="flex flex-col items-center justify-center min-h-screen p-8 scroll-snap-align-start"
                    >
                      <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl text-center mb-4">
                        {video.description}
                      </p>
                      <video controls className="w-full max-w-5xl h-auto rounded-lg shadow-lg">
                        <source src={video.src} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      <h4 className="text-xl font-bold tracking-tighter mt-4">{video.title}</h4>
                    </div>
                  ))}
                </div>
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
                <div className="flex flex-col gap-8 relative">
                  <nav className="hidden md:flex flex-col fixed top-1/2 -translate-y-1/2 left-4 z-50 p-2 bg-black/50 rounded-full shadow-lg">
                    {section.files && section.files.map((file, fileIndex) => (
                      <a
                        key={fileIndex}
                        href={`#articles-file-${fileIndex}`}
                        className="p-2 text-white hover:bg-white/20 rounded-full transition-colors duration-200"
                        title={file.title}
                      >
                        {fileIndex + 1}
                      </a>
                    ))}
                  </nav>
                  {section.files && section.files.map((file, fileIndex) => (
                    <div
                      key={fileIndex}
                      id={`articles-file-${fileIndex}`}
                      className="flex flex-col items-center justify-center min-h-screen p-8 scroll-snap-align-start"
                    >
                      <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl text-center mb-4">
                        {file.description}
                      </p>
                      <iframe src={file.src} className="w-full max-w-5xl h-[70vh] rounded-lg shadow-lg" title={file.title}></iframe>
                      <h4 className="text-xl font-bold tracking-tighter mt-4">{file.title}</h4>
                    </div>
                  ))}
                </div>
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
                <p className="text-lg text-zinc-500 dark:text-zinc-300 leading-relaxed min-h-[5rem]" />
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  {section.notes && section.notes.map((note, noteIndex) => (
                    <div
                      key={noteIndex}
                      id={`mathematics-note-${noteIndex}`}
                      className="flex flex-col items-center justify-center p-4 md:p-5 border border-black/10 dark:border-white/10 rounded-lg"
                    >
                      <iframe src={note.src} className="w-full h-[75vh] lg:h-[85vh] rounded-lg shadow-lg" title={note.title}></iframe>
                      <h4 className="text-xl font-bold tracking-tighter mt-4">{note.title}</h4>
                    </div>
                  ))}
                </div>
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
