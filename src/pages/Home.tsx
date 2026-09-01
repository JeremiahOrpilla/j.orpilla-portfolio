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
  const [isOverclocked, setIsOverclocked] = useState(false);
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
  const [walkProgress, setWalkProgress] = useState(0);
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
    
    // Sequence the walk and story
    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      // Adjusted walk progress to stay within safe bounds (10% to 70% of screen width)
      setWalkProgress(prev => prev + 15);
      setStoryIndex(step);
      
      if (step >= storySteps.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIsWalking(false);
          setShowCatFact(false);
          setWalkProgress(0);
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

  return (
    <div ref={containerRef} className={`min-h-screen transition-colors duration-700 selection:bg-primary/20 ${isOverclocked ? 'bg-[#050505] text-[#00ffcc] selection:bg-[#00ffcc]/30' : 'bg-background text-foreground'}`}>
      {/* Scanline Effect for Overclocked Mode */}
      {isOverclocked && (
        <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
        </div>
      )}

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-700 ${isOverclocked ? 'bg-black/80 border-[#00ffcc]/20' : 'bg-background/80 border-border'}`}>
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
                    ? isOverclocked ? 'bg-[#00ffcc] text-black shadow-[0_0_15px_rgba(0,255,204,0.5)]' : 'bg-primary text-primary-foreground shadow-sm' 
                    : isOverclocked ? 'text-[#00ffcc]/70 hover:text-[#00ffcc] hover:bg-[#00ffcc]/10' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
            
            {/* Overclock Toggle */}
            <button
              onClick={() => setIsOverclocked(!isOverclocked)}
              className={`ml-4 p-2.5 rounded-full border transition-all duration-500 flex items-center justify-center ${
                isOverclocked 
                  ? 'bg-[#00ffcc]/20 border-[#00ffcc] text-[#00ffcc] shadow-[0_0_15px_rgba(0,255,204,0.4)]' 
                  : 'bg-secondary border-border hover:border-primary/50 text-muted-foreground hover:text-primary'
              }`}
              title={isOverclocked ? "System: Overclocked" : "System: Normal Mode"}
            >
              <Zap className={`w-5 h-5 ${isOverclocked ? 'fill-[#00ffcc] animate-pulse' : ''}`} />
            </button>
          </div>
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setIsOverclocked(!isOverclocked)}
              className={`p-2 rounded-full border transition-all duration-500 ${
                isOverclocked 
                  ? 'bg-[#00ffcc]/20 border-[#00ffcc] text-[#00ffcc]' 
                  : 'bg-secondary border-border text-muted-foreground'
              }`}
            >
              <Zap className={`w-5 h-5 ${isOverclocked ? 'fill-[#00ffcc]' : ''}`} />
            </button>
            <button className="p-2 text-muted-foreground hover:text-foreground" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden border-t p-4 space-y-2 transition-colors duration-700 ${isOverclocked ? 'bg-black border-[#00ffcc]/20' : 'bg-background border-border'}`}>
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
                className={`flex items-center gap-3 w-full px-4 py-3 text-left rounded-md transition-colors ${
                  isOverclocked ? 'text-[#00ffcc]/70 hover:bg-[#00ffcc]/10' : 'hover:bg-secondary'
                }`}
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
        <section id="home" className="min-h-[90vh] flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--primary)_0%,_transparent_70%)] blur-[120px]" />
          </div>
          <div className="container relative z-10 text-center space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <Zap className="w-3 h-3" />
              Let's Make Sense of the Numbers
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Hi, I'm <span className="text-primary">Jeremiah</span>. <br />
              I build data-driven solutions.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Data Analyst & Programmer specializing in turning complex datasets into 
              intuitive, high-performance applications and actionable insights.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className={`px-8 py-3 font-bold rounded-md transition-all flex items-center gap-2 ${
                  isOverclocked 
                    ? 'bg-[#00ffcc] text-black shadow-[0_0_20px_rgba(0,255,204,0.4)] hover:shadow-[0_0_30px_rgba(0,255,204,0.6)]' 
                    : 'bg-primary text-primary-foreground hover:opacity-90'
                }`}
              >
                View Projects <ChevronRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setIsCvOpen(true)} 
                className={`px-8 py-3 font-bold rounded-md border transition-all flex items-center gap-2 ${
                  isOverclocked 
                    ? 'border-[#00ffcc] text-[#00ffcc] hover:bg-[#00ffcc]/10' 
                    : 'border-primary text-primary hover:bg-primary/5'
                }`}
              >
                View CV <FileText className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-4">
                {socialLinks.slice(0, 2).map((link) => (
                  <a 
                    key={link.name} 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-3 rounded-full bg-secondary text-muted-foreground hover:text-primary transition-colors"
                    title={link.name}
                  >
                    {link.name === 'GitHub' ? <Github className="w-5 h-5" /> : link.name === 'LinkedIn' ? <Linkedin className="w-5 h-5" /> : link.name === 'Facebook' ? <Facebook className="w-5 h-5" /> : link.name === 'Instagram' ? <Instagram className="w-5 h-5" /> : <Mail className="w-5 h-5" />}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className={`py-24 transition-colors duration-700 ${isOverclocked ? 'bg-[#050505]' : ''}`}>
          <div className="container space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">Projects</h2>
              <p className={`text-muted-foreground max-w-2xl mx-auto ${isOverclocked ? 'text-[#00ffcc]/70' : ''}`}>
                Real-world applications built for the DOST SETUP program — solving operational challenges with data-driven software.
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              {projects.map((project, i) => (
                <div key={i} className={`group rounded-3xl border transition-all duration-500 overflow-hidden ${isOverclocked ? 'bg-black/60 border-[#00ffcc]/20 hover:border-[#00ffcc] hover:shadow-[0_0_30px_rgba(0,255,204,0.1)]' : 'bg-card border-border hover:border-primary/50 hover:shadow-2xl'}`}>
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
                      <span className={`text-xs font-bold uppercase tracking-widest ${isOverclocked ? 'text-[#00ffcc]' : project.accent}`}>{project.category}</span>
                      <h3 className={`text-2xl font-bold group-hover:text-primary transition-colors ${isOverclocked ? 'text-white' : ''}`}>{project.title}</h3>
                      <p className={`text-sm font-medium ${isOverclocked ? 'text-[#00ffcc]/80' : 'text-muted-foreground'}`}>{project.subtitle}</p>
                    </div>
                    <p className={`text-sm leading-relaxed ${isOverclocked ? 'text-white/90' : 'text-muted-foreground'}`}>
                      {project.description}
                    </p>
                    <div className="space-y-3">
                      <p className={`text-xs font-bold uppercase tracking-widest ${isOverclocked ? 'text-[#00ffcc]/70' : 'text-muted-foreground'}`}>Key Features</p>
                      <ul className="grid grid-cols-1 gap-2">
                        {project.features.map((feature, idx) => (
                          <li key={idx} className={`text-xs flex items-center gap-2 ${isOverclocked ? 'text-white/80' : 'text-muted-foreground'}`}>
                            <ChevronRight className={`w-3 h-3 ${isOverclocked ? 'text-[#00ffcc]' : project.accent}`} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-4 flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span key={tech} className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${isOverclocked ? 'bg-[#00ffcc]/10 text-[#00ffcc] border border-[#00ffcc]/30' : 'bg-secondary text-muted-foreground'}`}>
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
        <section id="about" className={`py-24 transition-colors duration-700 ${isOverclocked ? 'bg-black/40' : 'bg-secondary/30'}`}>
          <div className="container space-y-16">
            <div className="grid lg:grid-cols-[3fr_2fr] gap-12 items-start">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
                  <div className={`h-1.5 w-20 rounded-full transition-colors duration-700 ${isOverclocked ? 'bg-[#00ffcc]' : 'bg-primary'}`} />
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">What I Do</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { icon: <LineChart className={`w-5 h-5 ${isOverclocked ? 'text-[#00ffcc]' : 'text-teal-500'}`} />, title: "Data Analysis & Visualization", desc: "Turning raw datasets into interactive visual stories." },
                      { icon: <Sheet className={`w-5 h-5 ${isOverclocked ? 'text-[#00ffcc]' : 'text-green-600'}`} />, title: "Spreadsheet Systems", desc: "Building advanced automated tools using Google Sheets." },
                      { icon: <Code2 className={`w-5 h-5 ${isOverclocked ? 'text-[#00ffcc]' : 'text-blue-500'}`} />, title: "Full-Stack Development", desc: "Creating high-performance web applications." },
                      { icon: <Database className={`w-5 h-5 ${isOverclocked ? 'text-[#00ffcc]' : 'text-indigo-500'}`} />, title: "Database Design & SQL", desc: "Architecting efficient and scalable data structures." },
                    ].map((item, i) => (
                      <div key={i} className={`p-4 rounded-xl border flex gap-4 items-start transition-colors duration-700 ${isOverclocked ? 'bg-black/60 border-[#00ffcc]/20' : 'bg-background/50 border-border'}`}>
                        <div className={`p-2 rounded-lg shrink-0 ${isOverclocked ? 'bg-[#00ffcc]/10' : 'bg-secondary'}`}>{item.icon}</div>
                        <div>
                          <p className={`font-bold text-sm ${isOverclocked ? 'text-white' : ''}`}>{item.title}</p>
                          <p className={`text-xs mt-1 ${isOverclocked ? 'text-white/60' : 'text-muted-foreground'}`}>{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>


              </div>
              <div className="relative">
                <div className={`aspect-square rounded-2xl opacity-10 absolute -inset-4 rotate-3 transition-all duration-700 ${isOverclocked ? 'bg-[#00ffcc]' : 'bg-gradient-to-br from-primary to-accent'}`} />
                <div className={`relative rounded-2xl p-8 flex flex-col items-center text-center space-y-5 transition-all duration-700 ${isOverclocked ? 'bg-black/80 border border-[#00ffcc]/30 shadow-[0_0_30px_rgba(0,255,204,0.1)]' : 'glass-card'}`}>

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
                    <p className={`text-sm leading-relaxed ${isOverclocked ? 'text-white/80' : 'text-muted-foreground'}`}>
                      Data Analyst and Full-Stack Developer focused on building practical dashboards and internal systems that improve reporting quality and decision-making.
                    </p>
                    <p className={`text-sm leading-relaxed ${isOverclocked ? 'text-white/80' : 'text-muted-foreground'}`}>
                      Currently supporting DOST initiatives by transforming operational data into clear, reliable, and actionable insights.
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="w-full border-t border-border" />

                  {/* Academic Background */}
                  <div className="w-full text-left space-y-3">
                    <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${isOverclocked ? 'text-[#00ffcc]/80' : 'text-muted-foreground'}`}>
                      <GraduationCap className="w-3.5 h-3.5" />
                      Education
                    </div>

                    <div className="space-y-1">
                      <p className={`font-bold text-sm leading-snug ${isOverclocked ? 'text-white' : ''}`}>
                        BS Information Technology
                      </p>
                      <p className={`text-xs font-semibold ${isOverclocked ? 'text-[#00ffcc]' : 'text-primary'}`}>
                        Major in Programming
                      </p>
                      <p className={`text-xs ${isOverclocked ? 'text-white/70' : 'text-muted-foreground'}`}>
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
                    <div className={`p-3 rounded-full transition-all group-hover:scale-110 ${isOverclocked ? 'bg-[#00ffcc] text-black shadow-[0_0_15px_#00ffcc]' : 'bg-primary text-primary-foreground'}`}>
                      {exp.title === 'Project Technical Assistant' ? <BarChart3 className="w-6 h-6" /> : exp.title === 'Technical Support' ? <Zap className="w-6 h-6" /> : <Database className="w-6 h-6" /> }
                    </div>
                    {i !== experience.length - 1 && <div className={`w-px h-full mt-2 ${isOverclocked ? 'bg-[#00ffcc]/20' : 'bg-border'}`} />}
                  </div>
                  <div className="pb-8 space-y-2">
                    <span className={`text-xs font-bold uppercase tracking-widest ${isOverclocked ? 'text-[#00ffcc]' : 'text-primary'}`}>{exp.year}</span>
                    <h3 className={`text-xl font-bold ${isOverclocked ? 'text-white' : ''}`}>{exp.title}</h3>
                    <p className={`font-medium ${isOverclocked ? 'text-[#00ffcc]/80' : 'text-muted-foreground'}`}>{exp.company}</p>
                    <p className={`text-sm leading-relaxed ${isOverclocked ? 'text-white/70' : 'text-muted-foreground'}`}>{exp.description}</p>
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
              <p className={`max-w-2xl mx-auto ${isOverclocked ? 'text-[#00ffcc]/70' : 'text-muted-foreground'}`}>
                My core philosophy when it comes to building systems and analyzing data.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {insights.map((insight, i) => (
                <div key={i} className={`p-8 rounded-2xl border transition-all group ${isOverclocked ? 'bg-black/40 border-[#00ffcc]/20 hover:border-[#00ffcc]/50' : 'bg-background border-border hover:border-primary/50'}`}>
                  <div className="mb-6 transform group-hover:scale-110 transition-transform">
                    {insight.topic === 'Data Integrity' ? <Database className="w-8 h-8 text-blue-500" /> : insight.topic === 'Clean Code' ? <Code2 className="w-8 h-8 text-teal-500" /> : insight.topic === 'Strategic Analysis' ? <LineChart className="w-8 h-8 text-indigo-500" /> : <Zap className="w-8 h-8 text-yellow-500" />}
                  </div>
                  <h3 className={`text-lg font-bold mb-3 ${isOverclocked ? 'text-white' : ''}`}>{insight.topic}</h3>
                  <p className={`text-sm leading-relaxed ${isOverclocked ? 'text-white/80' : 'text-muted-foreground'}`}>{insight.insight}</p>
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
                <p className={`text-xl md:text-2xl font-medium italic leading-relaxed transition-all duration-500 ${isOverclocked ? 'text-[#00ffcc]' : 'text-primary'}`}>
                  "{funFacts[currentFactIndex]}"
                </p>
                <div className="pt-4">
                  <p className={`text-xs uppercase tracking-widest font-bold ${isOverclocked ? 'text-[#00ffcc]/60' : 'text-muted-foreground'}`}>Developer Insight {currentFactIndex + 1} of {funFacts.length}</p>
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
        <section id="contact" className={`py-12 transition-colors duration-700 border-t ${isOverclocked ? 'bg-black/80 border-[#00ffcc]/20' : 'bg-secondary/50 border-border'}`}>
          <div className="container">
            <div className="space-y-6">
              {/* Main Footer Content */}
              <div className="grid md:grid-cols-3 gap-12">
                {/* Left - About */}
                <div className="space-y-2">
                  <h3 className={`text-base font-bold ${isOverclocked ? 'text-white' : ''}`}>Jeremiah Orpilla</h3>
                  <p className={`text-xs leading-relaxed ${isOverclocked ? 'text-white/70' : 'text-muted-foreground'}`}>
                    I build data dashboards, web apps, and analytics tools that support better public-sector decisions.
                  </p>
                </div>

                {/* Middle - Explore */}
                <div className="space-y-2">
                  <h4 className={`text-xs font-bold uppercase tracking-widest ${isOverclocked ? 'text-[#00ffcc]' : 'text-muted-foreground'}`}>Explore</h4>
                  <div className="space-y-1">
                    {['about', 'projects', 'experience'].map((link) => (
                      <button
                        key={link}
                        onClick={() => document.getElementById(link)?.scrollIntoView({ behavior: 'smooth' })}
                        className={`block text-xs transition-colors ${isOverclocked ? 'text-white/70 hover:text-[#00ffcc]' : 'text-muted-foreground hover:text-primary'}`}
                      >
                        {link === 'about' ? 'What I Do' : link.charAt(0).toUpperCase() + link.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right - Contact Info */}
                <div className="space-y-2">
                  <h4 className={`text-xs font-bold uppercase tracking-widest ${isOverclocked ? 'text-[#00ffcc]' : 'text-muted-foreground'}`}>Get In Touch</h4>
                  <div className="space-y-1">
                    <p className={`text-xs ${isOverclocked ? 'text-white/70' : 'text-muted-foreground'}`}>
                      Have a project, opportunity, or idea?
                    </p>
                    <a 
                      href="mailto:jeremiahorpilla00@gmail.com" 
                      className={`inline-block text-xs font-medium transition-colors ${isOverclocked ? 'text-[#00ffcc] hover:text-white' : 'text-primary hover:text-primary/80'}`}
                    >
                      Let's connect: jeremiahorpilla00@gmail.com
                    </a>
                    <p className={`text-xs ${isOverclocked ? 'text-white/50' : 'text-muted-foreground'}`}>
                      Usually replies within 24 hours.
                    </p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className={`h-px ${isOverclocked ? 'bg-[#00ffcc]/10' : 'bg-border'}`} />

              {/* Bottom Bar - Single Row Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 text-xs pt-2">
                {/* Left - Branding */}
                <div className="flex items-center gap-2 font-bold justify-center md:justify-start">
                  <Code2 className={`w-3 h-3 ${isOverclocked ? 'text-[#00ffcc]' : 'text-primary'}`} />
                  <span className={isOverclocked ? 'text-white' : ''}>jek.sys</span>
                </div>

                {/* Center - Tech Stack, Playful Note & Copyright */}
                <div className={`text-center flex flex-col justify-center ${isOverclocked ? 'text-white/50' : 'text-muted-foreground'}`}>
                  <div className="font-medium">Built with React, Vite, and Tailwind CSS</div>
                  <div className={`text-[10px] italic ${isOverclocked ? 'text-white/40' : 'text-muted-foreground/70'}`}>
                    Built with code, curiosity, and a little cat energy.
                  </div>
                  <div className={`text-[10px] mt-1 ${isOverclocked ? 'text-white/20' : 'text-muted-foreground/60'}`}>
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
                        className={`transition-all ${isOverclocked ? 'text-white/60 hover:text-[#00ffcc]' : 'text-muted-foreground hover:text-primary'}`}
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

      {/* Jek Cat Mascot */}
      <div 
        className="fixed bottom-12 z-[100] transition-all duration-1000 ease-linear"
        style={{ 
          // Moved significantly further left to be more "center-right" (20% from the right edge)
          right: isWalking ? `calc(20% + ${walkProgress}%)` : '20%',
          transform: isWalking ? 'translateX(50%)' : 'none'
        }}
        onMouseEnter={() => !isWalking && setIsCatDancing(true)}
        onMouseLeave={() => !isWalking && setIsCatDancing(false)}
      >
        {/* Speech Bubble */}
        <div className={`absolute bottom-full mb-4 w-64 p-4 rounded-2xl shadow-2xl transition-all duration-500 ${showCatFact ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} left-1/2 -translate-x-1/2 ${isOverclocked ? 'bg-black/90 border border-[#00ffcc]/30 shadow-[0_0_20px_rgba(0,255,204,0.2)]' : 'bg-card border border-border'}`}>
          <p className={`text-sm leading-relaxed font-medium text-center ${isOverclocked ? 'text-white' : ''}`}>
            {isWalking ? storySteps[storyIndex] : `"${randomFact}"`}
          </p>
          {/* Arrow pointing to the cat - centered under the bubble */}
          <div className={`absolute top-full left-1/2 -translate-x-1/2 w-4 h-4 border-r border-b rotate-45 -mt-2 ${isOverclocked ? 'bg-black border-[#00ffcc]/30' : 'bg-card border-border'}`} />
        </div>

        {/* The Cat */}
        <div className="relative group">
          <button 
            onClick={isWalking ? undefined : startStory}
            onContextMenu={(e) => { e.preventDefault(); triggerCatFact(); }}
            className={`relative w-20 h-20 flex items-center justify-center transition-all duration-500 ${isCatDancing || isWalking ? 'scale-110' : 'scale-100 hover:scale-110'}`}
            title={isWalking ? "I'm telling a story!" : "Click to hear my story, Right-click for a fact!"}
          >
            {/* The Cat - Note: isWalking uses normal scale, idle/dancing uses -scale-x-100 to face left (default) */}
            <div className={`text-5xl transition-all duration-300 ${isCatDancing || isWalking ? 'animate-bounce' : ''} ${isWalking ? '' : '-scale-x-100'}`}>
              {isWalking ? '🐈' : (isCatDancing ? '😸' : '🐱')}
            </div>
            
            {/* Interactive Glow */}
            <div className={`absolute inset-0 bg-primary/20 blur-xl rounded-full transition-opacity duration-500 ${isWalking ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />

            {/* Sparkles */}
            {(isCatDancing || isWalking) && (
              <>
                <div className="absolute -top-4 -left-4 animate-ping text-sm">✨</div>
                <div className="absolute -top-2 -right-2 animate-pulse text-sm delay-75">✨</div>
                <div className="absolute -bottom-2 -left-2 animate-pulse text-sm delay-150">✨</div>
              </>
            )}
          </button>
          
          {/* Instructions Hint */}
          {!isWalking && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-background/80 backdrop-blur-sm border border-border rounded text-[10px] font-bold uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Click to Start Story
            </div>
          )}
        </div>
      </div>



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
