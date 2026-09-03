import React, { useState, useEffect, useRef } from 'react';
import * as Icons from 'lucide-react';
import {
  Menu, X, Github, Linkedin, Facebook, Instagram, Mail,
  BarChart3, User, Zap, Briefcase, Lightbulb, PartyPopper,
  Send, Database, Code2, LineChart, ChevronRight, ExternalLink,
  FolderOpen, Sheet, GraduationCap, MapPin,
  FileText, Download, Eye, ChevronLeft
} from 'lucide-react';
import { experience, funFacts, insights, projects, socialLinks, storySteps } from '@/content/portfolioContent';

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Intersection Observer for scroll-based navigation highlighting
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px', // Trigger when section is in the top-ish part of the viewport
      threshold: 0
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Observe all sections that have an ID matching our navItems
    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => {
      navItems.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects', icon: <FolderOpen className="w-4 h-4" /> },
    { id: 'about', label: 'What I Do', icon: <User className="w-4 h-4" /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase className="w-4 h-4" /> },

    { id: 'insights', label: 'Insights', icon: <Lightbulb className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact', icon: <Send className="w-4 h-4" /> },
    { id: 'cv', label: 'CV', icon: <FileText className="w-4 h-4" />, isSpecial: true },
  ];


  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [randomFact, setRandomFact] = useState(funFacts[0]);
  const [showCatFact, setShowCatFact] = useState(false);
  const [isCatDancing, setIsCatDancing] = useState(false);
  const [isWalking, setIsWalking] = useState(false);
  const [storyIndex, setStoryIndex] = useState(-1);

  const nextFact = () => {
    setCurrentFactIndex((prev) => (prev + 1) % funFacts.length);
  };

  const prevFact = () => {
    setCurrentFactIndex((prev) => (prev - 1 + funFacts.length) % funFacts.length);
  };


  const startStory = () => {
    if (isWalking) return;
    setIsWalking(true);
    setStoryIndex(0);
    setShowCatFact(true);

    // Step through the story beats in place
    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      setStoryIndex(step);

      if (step >= storySteps.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIsWalking(false);
          setShowCatFact(false);
          setStoryIndex(-1);
        }, 3000);
      }
    }, 4000);
  };

  const triggerCatFact = () => {
    if (isWalking) return;
    setRandomFact(funFacts[Math.floor(Math.random() * funFacts.length)]);
    setShowCatFact(true);
    setTimeout(() => setShowCatFact(false), 4000);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Hero reveal, cursor-follow avatar parallax, and the cat's proximity
  // reaction. Kept deliberately restrained: one-shot, IntersectionObserver
  // driven, direct DOM writes for the continuous pointer values (no
  // re-render per mousemove), nothing that loops on its own.
  const heroRef = useRef<HTMLDivElement>(null);
  const heroVisualRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const catRef = useRef<HTMLButtonElement>(null);
  const [heroInView, setHeroInView] = useState(false);
  const [isCatNear, setIsCatNear] = useState(false);
  const [prefersReducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeroInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const container = heroVisualRef.current;
    if (!container) return;

    let raf = 0;
    let catIsNear = false;

    const handlePointerMove = (e: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = container.getBoundingClientRect();
        const relX = (e.clientX - rect.left) / rect.width - 0.5;
        const relY = (e.clientY - rect.top) / rect.height - 0.5;

        if (avatarRef.current) {
          const maxShift = 10;
          avatarRef.current.style.transform = `translate3d(${-relX * maxShift}px, ${-relY * maxShift}px, 0)`;
        }

        if (catRef.current) {
          const catRect = catRef.current.getBoundingClientRect();
          const dx = e.clientX - (catRect.left + catRect.width / 2);
          const dy = e.clientY - (catRect.top + catRect.height / 2);
          const near = Math.hypot(dx, dy) < 90;
          if (near !== catIsNear) {
            catIsNear = near;
            setIsCatNear(near);
          }
        }
      });
    };

    const handlePointerLeave = () => {
      if (avatarRef.current) avatarRef.current.style.transform = 'translate3d(0, 0, 0)';
      if (catIsNear) {
        catIsNear = false;
        setIsCatNear(false);
      }
    };

    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerleave', handlePointerLeave);
    return () => {
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [prefersReducedMotion]);

  const EASE = 'ease-[cubic-bezier(0.16,1,0.3,1)]';
  const revealCls = `transition-all duration-300 ${EASE} ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`;
  const revealDelay = (delayMs: number) => ({ transitionDelay: `${delayMs}ms` });

  return (
    <div ref={containerRef} className="min-h-screen transition-colors duration-700 selection:bg-primary/20 bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-700 bg-background/80 border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="text-xl font-bold tracking-tight text-primary flex items-center gap-2">
            <Code2 className="w-6 h-6" />
            <span>jek.sys</span>
          </div>
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => item.isSpecial ? setIsCvOpen(true) : scrollToSection(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeSection === item.id && !item.isSpecial
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 md:hidden">
            <button className="p-2 text-muted-foreground hover:text-foreground" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t p-4 space-y-2 transition-colors duration-700 bg-background border-border">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.isSpecial) {
                    setIsCvOpen(true);
                    setIsMenuOpen(false);
                  } else {
                    scrollToSection(item.id);
                  }
                }}
                className="flex items-center gap-3 w-full px-4 py-3 text-left rounded-md transition-colors hover:bg-secondary"
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      <main className="pt-16">
        {/* Hero Section */}
        <section id="home" ref={heroRef} className="relative overflow-hidden border-b border-border/60">
          {/* Background: faint data grid + a restrained glow, not a decorative blob */}
          <div className="absolute inset-0 z-0 bg-data-grid opacity-[0.45] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black_40%,transparent_100%)]" />
          <div className="absolute -top-24 -left-24 z-0 w-[32rem] h-[32rem] rounded-full bg-primary/10 blur-[100px]" />

          <div className="container relative z-10 pt-28 pb-20 lg:pt-36 lg:pb-28">
            <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-16 xl:gap-24 items-center">
              {/* Left: claim, identity, CTAs, evidence */}
              <div className="text-center lg:text-left">
                <h1
                  className={`font-display text-4xl sm:text-5xl lg:text-[3.4rem] xl:text-6xl font-semibold tracking-tight leading-[1.1] max-w-2xl mx-auto lg:mx-0 ${revealCls}`}
                  style={revealDelay(0)}
                >
                  I turn scattered records into <span className="text-primary">systems</span> your team can actually use.
                </h1>

                <p
                  className={`font-label mt-5 text-xs sm:text-sm tracking-wide text-muted-foreground/80 ${revealCls}`}
                  style={revealDelay(60)}
                >
                  Jeremiah Orpilla — Data Analyst &amp; Developer <span className="text-border">·</span> Cagayan Valley, PH
                </p>

                <div
                  className={`mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4 ${revealCls}`}
                  style={revealDelay(120)}
                >
                  <button
                    onClick={() => scrollToSection('contact')}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20 active:translate-y-0 transition-all duration-200 ${EASE}`}
                  >
                    Get in touch <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => scrollToSection('projects')}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border font-semibold text-sm hover:border-primary/50 hover:text-primary hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 ${EASE}`}
                  >
                    See the work
                  </button>
                  <div className="hidden sm:block w-px h-6 bg-border" />
                  <div className="flex items-center gap-1">
                    {socialLinks.slice(0, 2).map((link) => (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2.5 rounded-md text-muted-foreground hover:text-primary hover:bg-secondary transition-colors duration-200 ${EASE}`}
                        title={link.name}
                      >
                        {link.name === 'GitHub' ? <Github className="w-5 h-5" /> : link.name === 'LinkedIn' ? <Linkedin className="w-5 h-5" /> : link.name === 'Facebook' ? <Facebook className="w-5 h-5" /> : link.name === 'Instagram' ? <Instagram className="w-5 h-5" /> : <Mail className="w-5 h-5" />}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Proof log — framed explicitly as evidence for the headline claim */}
                <div className={`mt-14 ${revealCls}`} style={revealDelay(200)}>
                  <p className="font-label text-[11px] uppercase tracking-[0.16em] text-muted-foreground/70">
                    What that looks like
                  </p>
                  <ul className="mt-3 border-t border-border/70 max-w-xl mx-auto lg:mx-0">
                    {[
                      { before: '102-page PDF', after: 'searchable knowledge base' },
                      { before: 'Scattered yearly sheets', after: 'one processing system' },
                      { before: '32,000 rows since 2002', after: 'one queryable model' },
                    ].map((item, i) => (
                      <li
                        key={i}
                        className={`group flex flex-wrap items-baseline gap-x-3 gap-y-1 py-3 px-2 -mx-2 rounded-md border-b border-border/70 text-sm justify-center lg:justify-start transition-colors duration-200 ${EASE} hover:bg-secondary/50`}
                      >
                        <span className="font-label text-[11px] text-primary/60 tabular-nums">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-muted-foreground">{item.before}</span>
                        <ChevronRight className={`w-3.5 h-3.5 text-primary/50 shrink-0 transition-transform duration-200 ${EASE} group-hover:translate-x-0.5`} />
                        <span className="font-medium text-foreground">{item.after}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right: avatar, with Jek Cat tucked in the corner - in the margins, literally */}
              <div
                ref={heroVisualRef}
                className={`flex justify-center lg:justify-end ${revealCls}`}
                style={revealDelay(90)}
              >
                <div className="relative w-full max-w-xs">
                  <div
                    ref={avatarRef}
                    className={`aspect-[4/5] rounded-2xl overflow-hidden border border-border/70 bg-secondary/30 shadow-[0_24px_48px_-28px_rgba(15,23,42,0.35)] transition-transform duration-300 ${EASE} will-change-transform`}
                  >
                    <img src="/avatar.png" alt="Jeremiah Orpilla" className="w-full h-full object-cover" />
                  </div>

                  {/* Jek Cat - tucked in the corner, discoverable on hover/proximity */}
                  <div className="absolute -bottom-4 -right-4">
                    {/* Speech Bubble */}
                    <div
                      className={`absolute bottom-full right-0 mb-3 w-56 p-3 rounded-xl shadow-xl transition-all duration-200 ${EASE} ${showCatFact ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'} bg-card border border-border`}
                    >
                      <p className="text-xs leading-relaxed font-medium text-center">
                        {isWalking ? storySteps[storyIndex] : `"${randomFact}"`}
                      </p>
                      <div className="absolute top-full right-4 w-3 h-3 border-r border-b rotate-45 -mt-1.5 bg-card border-border" />
                    </div>

                    <button
                      ref={catRef}
                      onClick={isWalking ? undefined : startStory}
                      onContextMenu={(e) => { e.preventDefault(); triggerCatFact(); }}
                      onMouseEnter={() => !isWalking && setIsCatDancing(true)}
                      onMouseLeave={() => !isWalking && setIsCatDancing(false)}
                      className={`w-11 h-11 flex items-center justify-center rounded-full bg-background border border-border/70 shadow-sm transition-all duration-200 ${EASE} hover:opacity-100 hover:scale-100 ${
                        isCatNear || isWalking || prefersReducedMotion ? 'opacity-100 scale-100' : 'opacity-40 scale-90'
                      }`}
                      title="Click for a story, right-click for a fact"
                    >
                      <span className="text-xl inline-block -scale-x-100">
                        {isWalking ? '🐈' : (isCatDancing ? '😸' : '🐱')}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 transition-colors duration-700">
          <div className="container space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">Projects</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Real-world applications built for the DOST SETUP program — solving operational challenges with data-driven software.
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              {projects.map((project, i) => (
                <div key={i} className="group rounded-3xl border transition-all duration-500 overflow-hidden bg-card border-border hover:border-primary/50 hover:shadow-2xl">
                  <div className={`aspect-video w-full overflow-hidden bg-gradient-to-br ${project.color} p-4`}>
                    <div className="w-full h-full rounded-xl overflow-hidden border border-border shadow-2xl">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>
                  <div className="p-8 space-y-6">
                    <div className="space-y-2">
                      <span className={`text-xs font-bold uppercase tracking-widest ${project.accent}`}>{project.category}</span>
                      <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{project.title}</h3>
                      <p className="text-sm font-medium text-muted-foreground">{project.subtitle}</p>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>
                    <div className="space-y-3">
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Key Features</p>
                      <ul className="grid grid-cols-1 gap-2">
                        {project.features.map((feature, idx) => (
                          <li key={idx} className="text-xs flex items-center gap-2 text-muted-foreground">
                            <ChevronRight className={`w-3 h-3 ${project.accent}`} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-4 flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span key={tech} className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-secondary text-muted-foreground">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 transition-colors duration-700 bg-secondary/30">
          <div className="container space-y-16">
            <div className="grid lg:grid-cols-[3fr_2fr] gap-12 items-start">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
                  <div className="h-1.5 w-20 rounded-full transition-colors duration-700 bg-primary" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">What I Do</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { icon: <LineChart className="w-5 h-5 text-teal-500" />, title: "Data Analysis & Visualization", desc: "Turning raw datasets into interactive visual stories." },
                      { icon: <Sheet className="w-5 h-5 text-green-600" />, title: "Spreadsheet Systems", desc: "Building advanced automated tools using Google Sheets." },
                      { icon: <Code2 className="w-5 h-5 text-blue-500" />, title: "Full-Stack Development", desc: "Creating high-performance web applications." },
                      { icon: <Database className="w-5 h-5 text-indigo-500" />, title: "Database Design & SQL", desc: "Architecting efficient and scalable data structures." },
                    ].map((item, i) => (
                      <div key={i} className="p-4 rounded-xl border flex gap-4 items-start transition-colors duration-700 bg-background/50 border-border">
                        <div className="p-2 rounded-lg shrink-0 bg-secondary">{item.icon}</div>
                        <div>
                          <p className="font-bold text-sm">{item.title}</p>
                          <p className="text-xs mt-1 text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>


              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl opacity-10 absolute -inset-4 rotate-3 transition-all duration-700 bg-gradient-to-br from-primary to-accent" />
                <div className="relative rounded-2xl p-8 flex flex-col items-center text-center space-y-5 transition-all duration-700 glass-card">

                  {/* Avatar */}
                  <div className="w-28 h-28 rounded-full border-4 border-primary/20 overflow-hidden bg-background shadow-lg">
                    <img
                      src="/avatar.png"
                      alt="Jeremiah Orpilla"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Name & Location */}
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold">Jeremiah Orpilla</h3>
                    <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>Cagayan Valley, Philippines</span>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex gap-2">
                    {socialLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-md bg-secondary text-muted-foreground hover:text-primary transition-colors"
                        title={link.name}
                      >
                        {link.name === 'GitHub' ? <Github className="w-5 h-5" /> : link.name === 'LinkedIn' ? <Linkedin className="w-5 h-5" /> : link.name === 'Facebook' ? <Facebook className="w-5 h-5" /> : link.name === 'Instagram' ? <Instagram className="w-5 h-5" /> : <Mail className="w-5 h-5" />}
                      </a>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="w-full border-t border-border" />

                  {/* Professional Summary */}
                  <div className="w-full text-left space-y-2">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Data Analyst and Full-Stack Developer focused on building practical dashboards and internal systems that improve reporting quality and decision-making.
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Currently supporting DOST initiatives by transforming operational data into clear, reliable, and actionable insights.
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="w-full border-t border-border" />

                  {/* Academic Background */}
                  <div className="w-full text-left space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      <GraduationCap className="w-3.5 h-3.5" />
                      Education
                    </div>

                    <div className="space-y-1">
                      <p className="font-bold text-sm leading-snug">
                        BS Information Technology
                      </p>
                      <p className="text-xs font-semibold text-primary">
                        Major in Programming
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Cagayan State University
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-24 bg-secondary/50">
          <div className="container space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">Experience</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                My career path has been defined by a commitment to data accuracy and impactful digital transformation.
              </p>
            </div>
            <div className="max-w-3xl mx-auto space-y-8">
              {experience.map((exp, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="flex flex-col items-center">
                    <div className="p-3 rounded-full transition-all group-hover:scale-110 bg-primary text-primary-foreground">
                      {exp.title === 'Project Technical Assistant' ? <BarChart3 className="w-6 h-6" /> : exp.title === 'Technical Support' ? <Zap className="w-6 h-6" /> : <Database className="w-6 h-6" /> }
                    </div>
                    {i !== experience.length - 1 && <div className="w-px h-full mt-2 bg-border" />}
                  </div>
                  <div className="pb-8 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">{exp.year}</span>
                    <h3 className="text-xl font-bold">{exp.title}</h3>
                    <p className="font-medium text-muted-foreground">{exp.company}</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>



        {/* Insights Section */}
        <section id="insights" className="py-24 bg-secondary/50">
          <div className="container space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">Data & Dev Insights</h2>
              <p className="max-w-2xl mx-auto text-muted-foreground">
                My core philosophy when it comes to building systems and analyzing data.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {insights.map((insight, i) => (
                <div key={i} className="p-8 rounded-2xl border transition-all group bg-background border-border hover:border-primary/50">
                  <div className="mb-6 transform group-hover:scale-110 transition-transform">
                    {insight.topic === 'Data Integrity' ? <Database className="w-8 h-8 text-blue-500" /> : insight.topic === 'Clean Code' ? <Code2 className="w-8 h-8 text-teal-500" /> : insight.topic === 'Strategic Analysis' ? <LineChart className="w-8 h-8 text-indigo-500" /> : <Zap className="w-8 h-8 text-yellow-500" />}
                  </div>
                  <h3 className="text-lg font-bold mb-3">{insight.topic}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{insight.insight}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Fun Section */}
        <section id="fun" className="py-24 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[120px] -z-10" />
          <div className="container max-w-4xl text-center space-y-8">
            <h2 className="text-3xl font-bold">Beyond the Code</h2>
            <div className="relative group">
              {/* Navigation Arrows */}
              <button
                onClick={prevFact}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 p-3 rounded-full bg-background border border-border shadow-lg hover:border-primary hover:text-primary transition-all z-10 opacity-0 group-hover:opacity-100 focus:opacity-100"
                aria-label="Previous fact"
              >
                <ChevronRight className="w-6 h-6 rotate-180" />
              </button>

              <button
                onClick={nextFact}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 p-3 rounded-full bg-background border border-border shadow-lg hover:border-primary hover:text-primary transition-all z-10 opacity-0 group-hover:opacity-100 focus:opacity-100"
                aria-label="Next fact"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="p-8 md:p-12 rounded-3xl bg-card border border-border shadow-xl space-y-6 min-h-[300px] flex flex-col justify-center transition-all duration-500">
                <div className="text-4xl animate-bounce">💡</div>
                <p className="text-xl md:text-2xl font-medium italic leading-relaxed transition-all duration-500 text-primary">
                  "{funFacts[currentFactIndex]}"
                </p>
                <div className="pt-4">
                  <p className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Developer Insight {currentFactIndex + 1} of {funFacts.length}</p>
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center gap-2 mt-4">
                  {funFacts.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentFactIndex(i)}
                      className={`w-2 h-2 rounded-full transition-all ${i === currentFactIndex ? 'bg-primary w-4' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'}`}
                      aria-label={`Go to fact ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section - Professional Footer */}
        <section id="contact" className="py-12 transition-colors duration-700 border-t bg-secondary/50 border-border">
          <div className="container">
            <div className="space-y-6">
              {/* Main Footer Content */}
              <div className="grid md:grid-cols-3 gap-12">
                {/* Left - About */}
                <div className="space-y-2">
                  <h3 className="text-base font-bold">Jeremiah Orpilla</h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    I build data dashboards, web apps, and analytics tools that support better public-sector decisions.
                  </p>
                </div>

                {/* Middle - Explore */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Explore</h4>
                  <div className="space-y-1">
                    {['about', 'projects', 'experience'].map((link) => (
                      <button
                        key={link}
                        onClick={() => document.getElementById(link)?.scrollIntoView({ behavior: 'smooth' })}
                        className="block text-xs transition-colors text-muted-foreground hover:text-primary"
                      >
                        {link === 'about' ? 'What I Do' : link.charAt(0).toUpperCase() + link.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right - Contact Info */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Get In Touch</h4>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">
                      Have a project, opportunity, or idea?
                    </p>
                    <a
                      href="mailto:jeremiahorpilla00@gmail.com"
                      className="inline-block text-xs font-medium transition-colors text-primary hover:text-primary/80"
                    >
                      Let's connect: jeremiahorpilla00@gmail.com
                    </a>
                    <p className="text-xs text-muted-foreground">
                      Usually replies within 24 hours.
                    </p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-border" />

              {/* Bottom Bar - Single Row Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 text-xs pt-2">
                {/* Left - Branding */}
                <div className="flex items-center gap-2 font-bold justify-center md:justify-start">
                  <Code2 className="w-3 h-3 text-primary" />
                  <span>jek.sys</span>
                </div>

                {/* Center - Tech Stack, Playful Note & Copyright */}
                <div className="text-center flex flex-col justify-center text-muted-foreground">
                  <div className="font-medium">Built with React, Vite, and Tailwind CSS</div>
                  <div className="text-[10px] italic text-muted-foreground/70">
                    Built with code, curiosity, and a little cat energy.
                  </div>
                  <div className="text-[10px] mt-1 text-muted-foreground/60">
                    © {new Date().getFullYear()} Jeremiah Orpilla. All rights reserved.
                  </div>
                </div>

                {/* Right - Social Links */}
                <div className="flex gap-4 justify-center md:justify-end items-center">
                  {socialLinks.map((link) => {
                    const IconComponent = (Icons as any)[link.iconName];
                    return (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-all text-muted-foreground hover:text-primary"
                        title={link.name}
                      >
                        {IconComponent && <IconComponent size={16} />}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* CV Modal - Custom Recreated Version */}
      {isCvOpen && (
        <div className="fixed inset-0 z-[200] flex flex-col bg-black/95 backdrop-blur-xl animate-in fade-in duration-300 overflow-hidden">
          {/* Floating Controls */}
          <div className="absolute top-6 left-6 z-10">
            <button
              onClick={() => setIsCvOpen(false)}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 backdrop-blur-md transition-all shadow-xl"
              title="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="absolute top-6 right-6 z-10 flex gap-3">
            <a
              href="/JeremiahOrpillaCV.pdf"
              download
              className="p-3 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-all shadow-xl flex items-center justify-center"
              title="Download PDF"
            >
              <Download className="w-6 h-6" />
            </a>
          </div>

          {/* PDF Viewer */}
          <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
            <iframe
              src="/JeremiahOrpillaCV.pdf#toolbar=0"
              className="w-full h-full rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              title="CV PDF Viewer"
            />
          </div>
        </div>
      )}
    </div>
  );
}
