import { useState, useEffect, useRef } from 'react';
import { 
  Globe, Cpu, Sparkles, Shield, Send, ExternalLink, Award, CheckCircle2, Star, 
  Menu, X, Briefcase, ArrowRight, ChevronRight, 
  Download, Mail, Heart, MessageSquare, 
  ThumbsUp, Calendar, ChevronDown, Check, Zap 
} from 'lucide-react';

import { projectsData, skillsData, servicesData, testimonialsData, blogPostsData, Project, BlogPost } from './data/portfolioData';
import TerminalPlayground from './components/TerminalPlayground';
import ProjectModal from './components/ProjectModal';
import CVModal from './components/CVModal';
import CostCalculator from './components/CostCalculator';

// Custom Animated Counter Hook
function useCounter(target: number, duration: number = 1000, trigger: boolean = true) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const end = target;
    if (start === end) return;

    const totalMiliseconds = duration;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 20);
    
    const timer = setInterval(() => {
      start += Math.ceil(end / (totalMiliseconds / incrementTime));
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target, duration, trigger]);

  return count;
}

export default function App() {
  // Navigation states
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Modal states
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [isCVOpen, setIsCVOpen] = useState(false);
  
  // Wallet simulator states
  const [isConnectingWallet, setIsConnectingWallet] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState<string>('0.00');

  // Skill category filter
  const [activeSkillCategory, setActiveSkillCategory] = useState<'all' | 'frontend' | 'backend' | 'web3' | 'ai' | 'tools'>('all');
  
  // Portfolio category filter
  const [activePortfolioCategory, setActivePortfolioCategory] = useState<'all' | 'web3' | 'ai' | 'webapp' | 'website'>('all');

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    serviceType: 'Custom Project',
    budget: '$5,000 - $10,000',
    message: ''
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formStatusText, setFormStatusText] = useState('');

  // Blog Likes State
  const [blogLikes, setBlogLikes] = useState<Record<string, number>>({
    'post-1': 42,
    'post-2': 58,
    'post-3': 67
  });
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  // Developer Dashboard status widgets (Real-time Simulation)
  const [cpuUsage, setCpuUsage] = useState(12);
  const [activeNodes] = useState(4);
  const [gasPrice, setGasPrice] = useState(18);
  const [blockchainBlock, setBlockchainBlock] = useState(18245901);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  // Ref for sections to track scroll
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const blogRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Trigger stats count when scrolled to
  const [statsTriggered, setStatsTriggered] = useState(false);

  // Stats Counters
  const countYears = useCounter(4, 800, statsTriggered);
  const countProjects = useCounter(52, 1000, statsTriggered);
  const countSecured = useCounter(84, 1200, statsTriggered); // Representing 8.4M
  const countSatisfaction = useCounter(100, 1000, statsTriggered);

  // Real-time systems loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 15) + 8);
      setGasPrice(Math.floor(Math.random() * 8) + 14);
      setTime(new Date().toLocaleTimeString());
      
      // occasional block mining simulation
      if (Math.random() > 0.8) {
        setBlockchainBlock(prev => prev + 1);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Scroll spy to update active section in navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      
      if (homeRef.current && scrollPos >= homeRef.current.offsetTop && scrollPos < (aboutRef.current?.offsetTop || 0)) {
        setActiveSection('home');
      } else if (aboutRef.current && scrollPos >= aboutRef.current.offsetTop && scrollPos < (portfolioRef.current?.offsetTop || 0)) {
        setActiveSection('about');
        setStatsTriggered(true); // Trigger counter animation when about section comes in
      } else if (portfolioRef.current && scrollPos >= portfolioRef.current.offsetTop && scrollPos < (servicesRef.current?.offsetTop || 0)) {
        setActiveSection('portfolio');
      } else if (servicesRef.current && scrollPos >= servicesRef.current.offsetTop && scrollPos < (testimonialsRef.current?.offsetTop || 0)) {
        setActiveSection('services');
      } else if (testimonialsRef.current && scrollPos >= testimonialsRef.current.offsetTop && scrollPos < (blogRef.current?.offsetTop || 0)) {
        setActiveSection('testimonials');
      } else if (blogRef.current && scrollPos >= blogRef.current.offsetTop && scrollPos < (contactRef.current?.offsetTop || 0)) {
        setActiveSection('blog');
      } else if (contactRef.current && scrollPos >= contactRef.current.offsetTop) {
        setActiveSection('contact');
      }
    };

    window.addEventListener('scroll', handleScroll);
    // trigger once on mount
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll helper
  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>, id: string) => {
    setMobileMenuOpen(false);
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 80, // offset for fixed header
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  // Metamask mock wallet connector
  const handleConnectWallet = () => {
    if (walletAddress) {
      // Disconnect
      setWalletAddress(null);
      setWalletBalance('0.00');
      return;
    }
    
    setIsConnectingWallet(true);
    
    // Simulate smart contract handshake
    setTimeout(() => {
      setWalletAddress('0x71C7656EC7ab88b098defB751B7401B5f6d8976F');
      setWalletBalance('1.25');
      setIsConnectingWallet(false);
    }, 1200);
  };

  // Pre-fill contact form from services calculator
  const handleSelectEstimate = (estimate: { serviceType: string; features: string[]; budget: string; message: string }) => {
    setContactForm({
      name: contactForm.name,
      email: contactForm.email,
      serviceType: estimate.serviceType,
      budget: estimate.budget,
      message: estimate.message
    });
    
    // Scroll down to contact form
    scrollToSection(contactRef, 'contact');
  };

  // Submit contact form with mock secure transmission
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      alert('Please fill out all required fields.');
      return;
    }

    setFormSubmitting(true);
    setFormStatusText('Establishing secure Web3-RPC connection...');

    setTimeout(() => {
      setFormStatusText('Encrypting payload using AES-256...');
      setTimeout(() => {
        setFormStatusText('Uploading payload details to secure server node...');
        setTimeout(() => {
          setFormStatusText('Broadcasting webhook events to Adejax Dashboard...');
          setTimeout(() => {
            setFormSubmitting(false);
            setFormSuccess(true);
            setContactForm({
              name: '',
              email: '',
              serviceType: 'Custom Project',
              budget: '$5,000 - $10,000',
              message: ''
            });
            // Reset success message after 6 seconds
            setTimeout(() => setFormSuccess(false), 8000);
          }, 800);
        }, 800);
      }, 700);
    }, 800);
  };

  // Like blog post handler
  const handleLikeBlogPost = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // prevent opening reading modal
    if (likedPosts[postId]) {
      // Unlike
      setBlogLikes(prev => ({ ...prev, [postId]: prev[postId] - 1 }));
      setLikedPosts(prev => ({ ...prev, [postId]: false }));
    } else {
      // Like
      setBlogLikes(prev => ({ ...prev, [postId]: prev[postId] + 1 }));
      setLikedPosts(prev => ({ ...prev, [postId]: true }));
    }
  };

  // Filters for lists
  const filteredSkills = skillsData.filter(skill => activeSkillCategory === 'all' || skill.category === activeSkillCategory);
  const filteredProjects = projectsData.filter(project => activePortfolioCategory === 'all' || project.category === activePortfolioCategory);

  // Mini blog rendering formatter (renders markdown headers, lists and code blocks beautifully!)
  const formatBlogContent = (text: string) => {
    return text.split('\n\n').map((paragraph, index) => {
      if (paragraph.startsWith('###')) {
        return (
          <h4 key={index} className="text-lg md:text-xl font-extrabold text-white mt-6 mb-2 tracking-tight">
            {paragraph.replace('###', '').trim()}
          </h4>
        );
      }
      if (paragraph.startsWith('-') || paragraph.startsWith('1.')) {
        const items = paragraph.split('\n');
        return (
          <ul key={index} className="list-disc pl-5 my-4 space-y-2 text-sm text-gray-300">
            {items.map((item, idx) => (
              <li key={idx}>
                {item.replace(/^-\s*|^\d+\.\s*/, '').trim()}
              </li>
            ))}
          </ul>
        );
      }
      if (paragraph.includes('```')) {
        const cleanCode = paragraph.replace(/```[a-zA-Z]*/g, '').trim();
        return (
          <pre key={index} className="bg-black/60 border border-white/10 p-4 rounded-xl font-mono text-xs text-blue-300 overflow-x-auto my-4">
            <code>{cleanCode}</code>
          </pre>
        );
      }
      return (
        <p key={index} className="text-gray-300 text-sm md:text-base leading-relaxed my-3" dangerouslySetInnerHTML={{
          __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\`(.*?)\`/g, '<code class="bg-white/5 px-1 py-0.5 rounded text-pink-400 font-mono text-xs">$1</code>')
        }} />
      );
    });
  };

  return (
    <div className="min-h-screen bg-[#06080F] text-gray-100 selection:bg-blue-500/20 selection:text-white relative overflow-hidden">
      
      {/* Background Decorative Mesh Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_55%)] pointer-events-none z-0"></div>
      <div className="absolute top-[1200px] left-0 w-[400px] h-[400px] bg-purple-600/5 blur-[120px] pointer-events-none rounded-full"></div>
      <div className="absolute top-[2600px] right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[150px] pointer-events-none rounded-full"></div>
      
      {/* Dynamic Scanline Grid Effect overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(18,24,38,0.1)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0 opacity-40"></div>

      {/* STICKY GLASSMORPHISM HEADER */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#06080F]/70 backdrop-blur-md border-b border-white/5 h-20 flex items-center transition-all">
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <div 
            onClick={() => scrollToSection(homeRef, 'home')} 
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center font-extrabold text-black tracking-tighter text-sm group-hover:scale-105 transition-all shadow-lg shadow-blue-500/25">
              AJ
            </div>
            <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-blue-400 transition-colors">
              Adejax<span className="text-blue-500">.</span>
            </span>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Available for Freelance Projects"></div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-widest text-gray-400">
            {[
              { id: 'home', label: 'Home', ref: homeRef },
              { id: 'about', label: 'About', ref: aboutRef },
              { id: 'portfolio', label: 'Portfolio', ref: portfolioRef },
              { id: 'services', label: 'Services', ref: servicesRef },
              { id: 'testimonials', label: 'Testimonials', ref: testimonialsRef },
              { id: 'blog', label: 'Blog', ref: blogRef },
              { id: 'contact', label: 'Contact', ref: contactRef },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.ref, link.id)}
                className={`transition-colors hover:text-white relative py-2 cursor-pointer ${
                  activeSection === link.id ? 'text-white' : ''
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full"></span>
                )}
              </button>
            ))}
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Wallet Simulator button */}
            <button
              onClick={handleConnectWallet}
              disabled={isConnectingWallet}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all cursor-pointer ${
                walletAddress 
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                  : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/25'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${walletAddress ? 'bg-emerald-400' : 'bg-gray-500'} ${isConnectingWallet ? 'animate-ping' : ''}`}></span>
              {isConnectingWallet ? 'Connecting...' : walletAddress ? `${walletAddress.substring(0, 6)}...${walletAddress.substring(38)} (${walletBalance} ETH)` : 'Connect Wallet'}
            </button>

            <button
              onClick={() => setIsCVOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>

            <button
              onClick={() => scrollToSection(contactRef, 'contact')}
              className="px-4 py-2 rounded-xl bg-blue-500 text-black font-extrabold text-xs tracking-wider uppercase hover:bg-blue-400 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-blue-500/10"
            >
              Hire Me
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </header>

      {/* Mobile Nav Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-20 z-30 bg-[#06080F]/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col justify-between lg:hidden animate-in fade-in slide-in-from-top duration-300">
          <nav className="flex flex-col gap-5 text-sm font-semibold uppercase tracking-widest text-gray-400 pt-4">
            {[
              { id: 'home', label: 'Home', ref: homeRef },
              { id: 'about', label: 'About', ref: aboutRef },
              { id: 'portfolio', label: 'Portfolio', ref: portfolioRef },
              { id: 'services', label: 'Services', ref: servicesRef },
              { id: 'testimonials', label: 'Testimonials', ref: testimonialsRef },
              { id: 'blog', label: 'Blog', ref: blogRef },
              { id: 'contact', label: 'Contact', ref: contactRef },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.ref, link.id)}
                className={`text-left transition-colors py-2 hover:text-white ${
                  activeSection === link.id ? 'text-white pl-3 border-l-2 border-blue-500' : ''
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Mobile Buttons */}
          <div className="space-y-3 pb-8 border-t border-white/5 pt-6">
            <div className="flex gap-2">
              <button
                onClick={() => {
                  handleConnectWallet();
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono font-semibold text-center text-gray-300 hover:text-white flex items-center justify-center gap-1.5"
              >
                <div className={`w-1.5 h-1.5 rounded-full ${walletAddress ? 'bg-emerald-400 animate-pulse' : 'bg-gray-500'}`}></div>
                {walletAddress ? `${walletAddress.substring(0, 6)}...` : 'Connect Web3 Wallet'}
              </button>
              
              <button
                onClick={() => {
                  setIsCVOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-gray-300 hover:text-white flex items-center justify-center"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
            
            <button
              onClick={() => scrollToSection(contactRef, 'contact')}
              className="w-full py-3.5 rounded-xl bg-blue-500 text-black font-extrabold text-xs tracking-wider uppercase text-center flex items-center justify-center shadow-lg shadow-blue-500/15"
            >
              Hire Me Now
            </button>
          </div>
        </div>
      )}

      {/* MAIN LAYOUT WRAPPER */}
      <main className="container mx-auto px-4 md:px-8 pt-28 pb-16 relative z-10 space-y-24 md:space-y-36">

        {/* 1. HERO SECTION */}
        <section ref={homeRef} id="home" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-4 md:pt-10">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/5 border border-blue-500/15 text-[11px] font-semibold text-blue-400 tracking-wide uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping"></span>
              <span>Available for Contracts • Q1 2026</span>
            </div>

            <div className="space-y-3">
              <span className="text-gray-400 font-mono text-xs md:text-sm block tracking-widest uppercase">Hi, I'm Adejax.</span>
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Full-Stack Developer <br className="hidden md:block"/>
                &amp; <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">Web3 Builder.</span>
              </h2>
            </div>

            <p className="text-gray-400 text-base md:text-lg max-w-2xl leading-relaxed">
              I design and build high-performance websites, scalable SaaS web applications, custom AI tools, and secure blockchain solutions that help businesses scale fast.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={() => scrollToSection(portfolioRef, 'portfolio')}
                className="px-6 py-4.5 rounded-xl bg-blue-500 text-black font-extrabold text-sm tracking-widest uppercase hover:bg-blue-400 active:scale-95 transition-all cursor-pointer shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </button>
              <button
                onClick={() => scrollToSection(contactRef, 'contact')}
                className="px-6 py-4.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 active:scale-95 text-white font-extrabold text-sm tracking-widest uppercase transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Hire Me</span>
                <MessageSquare className="w-4.5 h-4.5 text-blue-400" />
              </button>
            </div>

            {/* Micro proof tags */}
            <div className="pt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-500 font-mono">
              <span className="flex items-center gap-1"><Check className="w-4 h-4 text-blue-500" /> SEO & speed optimized</span>
              <span className="flex items-center gap-1"><Check className="w-4 h-4 text-blue-500" /> Gas optimized Solidity</span>
              <span className="flex items-center gap-1"><Check className="w-4 h-4 text-blue-500" /> Enterprise RAG AI</span>
            </div>
          </div>

          {/* Right Side: Interactive Real-Time System Monitor */}
          <div className="lg:col-span-5">
            <div className="w-full bg-gradient-to-b from-[#121824]/85 to-[#0E131F]/90 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-2xl space-y-5 text-left">
              
              {/* Board Header */}
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
                  <span className="text-xs font-mono text-gray-300 font-bold">SYSTEMS MONITOR</span>
                </div>
                <div className="text-[10px] font-mono text-gray-500">{time}</div>
              </div>

              {/* Status parameters */}
              <div className="grid grid-cols-2 gap-4">
                
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">CPU ENGINE LOAD</p>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-xl font-bold text-white font-mono">{cpuUsage}%</span>
                    <span className="text-[9px] text-blue-400 font-semibold">4 Cores Active</span>
                  </div>
                  {/* Small progress bar */}
                  <div className="w-full h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full transition-all duration-300" style={{ width: `${cpuUsage * 3}%` }}></div>
                  </div>
                </div>

                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">SEPOLIA BLOCK</p>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-lg font-bold text-emerald-400 font-mono">#{blockchainBlock.toLocaleString()}</span>
                  </div>
                  <span className="text-[9px] text-gray-400 block mt-1.5">Mined 14s ago</span>
                </div>

                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">RPC NODE GAS</p>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-xl font-bold text-white font-mono">{gasPrice}</span>
                    <span className="text-[9px] text-gray-400 font-mono">Gwei</span>
                  </div>
                  <span className="text-[9px] text-emerald-500 font-semibold block mt-1.5">✓ Ultra Gas-Optimized</span>
                </div>

                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">DEFI WALLET STATE</p>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${walletAddress ? 'bg-emerald-400 animate-pulse' : 'bg-yellow-500'}`}></span>
                    <span className="text-xs font-mono text-gray-300">{walletAddress ? 'CONNECTED' : 'STANDBY'}</span>
                  </div>
                  {walletAddress ? (
                    <button 
                      onClick={handleConnectWallet}
                      className="text-[9px] text-red-400 underline mt-1 block hover:text-red-300"
                    >
                      Disconnect Mock Wallet
                    </button>
                  ) : (
                    <button 
                      onClick={handleConnectWallet}
                      className="text-[9px] text-blue-400 underline mt-1 block hover:text-blue-300"
                    >
                      Initialize Web3 Auth
                    </button>
                  )}
                </div>

              </div>

              {/* Server Terminal Line */}
              <div className="bg-black/40 border border-white/5 p-3 rounded-xl font-mono text-[10px] text-gray-400 space-y-1">
                <p className="text-gray-300 font-bold">&gt;_ core-telemetry --status</p>
                <div className="flex items-center justify-between text-blue-400">
                  <span>✔ API Server nodes: {activeNodes}/4 online</span>
                  <span>Ping: 14ms</span>
                </div>
                <p className="text-[9px]">✔ RAG Embeddings Cache hit rate: 94.2%</p>
                <p className="text-[9px]">✔ Solidity compiler status: 0.8.20 OK</p>
              </div>

              {/* Developer status badge */}
              <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 p-3 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-xs font-bold text-white">Adejax Copilot Agent</p>
                    <p className="text-[9px] text-gray-400">Autopilot checking security keys</p>
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono font-semibold uppercase">Secured</span>
              </div>

            </div>
          </div>

        </section>

        {/* INTERACTIVE CODE SHELL PLAYGROUND (Right below hero to capture visitor's attention) */}
        <section className="space-y-6 pt-4 text-center">
          <div className="max-w-xl mx-auto space-y-2">
            <h3 className="text-xs font-bold tracking-widest text-blue-500 uppercase font-mono">&gt; INTERACTIVE SYSTEM CORE</h3>
            <h4 className="text-xl md:text-2xl font-extrabold text-white">Take Control of Adejax's Core Shell</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              Test my skills, query my custom AI agent, or simulate a smart contract compile and deploy in real time using the interactive terminal below.
            </p>
          </div>
          <TerminalPlayground />
        </section>

        {/* 2. ABOUT ME & STATS */}
        <section ref={aboutRef} id="about" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-6">
          
          {/* Left Column: Story, Photo/Avatar */}
          <div className="lg:col-span-5 space-y-6 text-left">
            
            {/* Visual profile stack */}
            <div className="relative group">
              {/* Outer glowing ring */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 opacity-30 blur-xl group-hover:opacity-50 transition-opacity duration-300"></div>
              
              {/* Main Photo Frame */}
              <div className="relative bg-[#0E131F] border border-white/10 rounded-2xl overflow-hidden p-3 shadow-2xl">
                
                {/* SVG Digital avatar representation. Custom, responsive, stunning and stable! */}
                <div className="w-full aspect-[4/3] bg-gradient-to-b from-slate-900 via-[#0B0F17] to-[#06080F] rounded-xl flex items-center justify-center overflow-hidden border border-white/5 relative">
                  
                  {/* Decorative digital code matrix in background */}
                  <div className="absolute inset-0 opacity-10 font-mono text-[9px] text-blue-400 p-2 overflow-hidden leading-tight select-none">
                    {Array.from({ length: 15 }).map((_, i) => (
                      <p key={i} className="whitespace-nowrap">0101010100110010101010010101010100011001011010101010101001010</p>
                    ))}
                  </div>

                  {/* SVG Futuristic avatar */}
                  <svg className="w-36 h-36 relative z-10" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                    {/* Glowing Aura */}
                    <circle cx="60" cy="50" r="30" fill="url(#avatarGlow)" opacity="0.3" />
                    
                    {/* Head/Shoulders Silhouette */}
                    <path d="M20,105 C20,80 40,75 60,75 C80,75 100,80 100,105" fill="none" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
                    <circle cx="60" cy="45" r="20" fill="#0E131F" stroke="#3B82F6" strokeWidth="3" />
                    
                    {/* Tech details (eyepiece, circuits) */}
                    <circle cx="55" cy="42" r="3" fill="#10B981" />
                    <line x1="60" y1="45" x2="60" y2="55" stroke="#6366F1" strokeWidth="2" />
                    <line x1="50" y1="45" x2="70" y2="45" stroke="#6366F1" strokeWidth="2" />
                    
                    {/* Glowing nodes */}
                    <circle cx="60" cy="55" r="2" fill="#3B82F6" className="animate-ping" />
                    <circle cx="20" cy="105" r="4" fill="#6366F1" />
                    <circle cx="100" cy="105" r="4" fill="#3B82F6" />
                    <circle cx="60" cy="75" r="4" fill="#10B981" />

                    {/* Definitions */}
                    <defs>
                      <radialGradient id="avatarGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#0E131F" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                  </svg>
                  
                  {/* Floating tags */}
                  <span className="absolute top-4 left-4 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[9px] font-mono font-bold px-2 py-0.5 rounded">FULL-STACK</span>
                  <span className="absolute bottom-4 right-4 bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[9px] font-mono font-bold px-2 py-0.5 rounded">WEB3 BUILDER</span>
                </div>

                {/* Caption info */}
                <div className="mt-4 flex items-center justify-between px-2">
                  <div>
                    <h5 className="text-sm font-bold text-white">Adejax (Adeleye Jackson)</h5>
                    <p className="text-xs text-gray-500">Lisbon, Portugal • Available Remote</p>
                  </div>
                  <div className="flex gap-2">
                    <a 
                      href="https://github.com" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="p-2 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/15 hover:scale-105 text-gray-400 hover:text-white transition-all"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                      </svg>
                    </a>
                    <a 
                      href="https://linkedin.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/15 hover:scale-105 text-gray-400 hover:text-white transition-all"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* Quick summary box */}
            <div className="bg-blue-500/5 border border-blue-500/10 rounded-2xl p-5">
              <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-2">My Mission</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                I help startups and high-growth businesses build modern websites, AI-powered applications, and blockchain solutions. I focus on clean design, fast performance, secure architectures, and transparent communication.
              </p>
            </div>

          </div>

          {/* Right Column: Story Narrative, Values & Stats Grid */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Biography */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold tracking-widest text-blue-500 uppercase font-mono">&gt; THE STORY</h3>
              <h4 className="text-2xl md:text-3xl font-extrabold text-white">Bridging Code and Client Success</h4>
              <div className="text-gray-400 text-sm md:text-base space-y-4 leading-relaxed">
                <p>
                  I'm a full-stack software engineer and Web3 builder specialized in creating high-performance digital systems. Over the past 4 years, I have collaborated with early-stage startups and established tech founders to take ideas from natural-language specs to fully launched, production-ready code.
                </p>
                <p>
                  By cutting out agency middle-men, I work directly with founders as an engineering partner. My unique skill set bridges the gap between high-level React/Next.js interfaces, scalable Node.js/Postgres backends, custom AI agents, and secure Solidity smart contracts.
                </p>
              </div>
            </div>

            {/* Key Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="p-4 bg-white/5 border border-white/5 rounded-xl flex gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0 h-fit">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-white text-sm">Lighthouse 100/100 Speed</h5>
                  <p className="text-xs text-gray-500 mt-1">Ultra-optimized headless architectures that reduce bounce rates and maximize search rankings.</p>
                </div>
              </div>

              <div className="p-4 bg-white/5 border border-white/5 rounded-xl flex gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0 h-fit">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-white text-sm">Security-Audited Web3</h5>
                  <p className="text-xs text-gray-500 mt-1">Gas-optimized, security-vetted Solidity smart contracts that protect DAO and enterprise assets.</p>
                </div>
              </div>

              <div className="p-4 bg-white/5 border border-white/5 rounded-xl flex gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 shrink-0 h-fit">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-white text-sm">AI Agent Automation</h5>
                  <p className="text-xs text-gray-500 mt-1">Custom RAG integrations, LLM pipelines, and AI assistants that automate workflows and cut support costs.</p>
                </div>
              </div>

              <div className="p-4 bg-white/5 border border-white/5 rounded-xl flex gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0 h-fit">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-white text-sm">No Agency Bloat</h5>
                  <p className="text-xs text-gray-500 mt-1">Direct communication with your engineer. Zero overhead, faster revisions, and complete transparency.</p>
                </div>
              </div>

            </div>

            {/* Statistics Counters Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white/5 border border-white/5 rounded-2xl p-6 text-center">
              <div>
                <span className="text-2xl md:text-3xl font-extrabold text-white font-mono">{countYears}+</span>
                <p className="text-[10px] text-gray-500 uppercase font-semibold tracking-wider mt-1">Years Exp</p>
              </div>
              <div className="border-l border-white/5">
                <span className="text-2xl md:text-3xl font-extrabold text-white font-mono">{countProjects}+</span>
                <p className="text-[10px] text-gray-500 uppercase font-semibold tracking-wider mt-1">Projects Completed</p>
              </div>
              <div className="border-l border-white/5">
                <span className="text-2xl md:text-3xl font-extrabold text-blue-400 font-mono">${countSecured}.4M+</span>
                <p className="text-[10px] text-gray-500 uppercase font-semibold tracking-wider mt-1">Assets Secured</p>
              </div>
              <div className="border-l border-white/5">
                <span className="text-2xl md:text-3xl font-extrabold text-emerald-400 font-mono">{countSatisfaction}%</span>
                <p className="text-[10px] text-gray-500 uppercase font-semibold tracking-wider mt-1">Satisfaction Rate</p>
              </div>
            </div>

          </div>

        </section>

        {/* 3. SKILLS SECTION */}
        <section className="space-y-8 pt-6">
          
          <div className="max-w-xl mx-auto text-center space-y-2">
            <h3 className="text-xs font-bold tracking-widest text-blue-500 uppercase font-mono">&gt; TECH STACK</h3>
            <h4 className="text-2xl md:text-3xl font-extrabold text-white">Visually Mapping My Capabilities</h4>
            <p className="text-sm text-gray-400">
              I stay on the cutting-edge of full-stack development, AI pipelines, and decentralized systems. Hover over any technology to check my proficiency.
            </p>
          </div>

          {/* Skill Filter Tabs */}
          <div className="flex justify-center gap-2 flex-wrap max-w-2xl mx-auto">
            {(['all', 'frontend', 'backend', 'web3', 'ai', 'tools'] as const).map((cat) => {
              const labels = {
                all: 'All Stack',
                frontend: 'Frontend',
                backend: 'Backend',
                web3: 'Web3 & Solidity',
                ai: 'AI & Automation',
                tools: 'DevOps & Tools',
              };
              const active = activeSkillCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveSkillCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                    active
                      ? 'bg-blue-500/20 border-blue-500 text-white'
                      : 'bg-white/5 border-white/5 text-gray-400 hover:border-white/10 hover:text-white'
                  }`}
                >
                  {labels[cat]}
                </button>
              );
            })}
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredSkills.map((skill) => (
              <div 
                key={skill.name}
                className="p-4 bg-white/5 border border-white/5 rounded-2xl hover:border-blue-500/30 hover:bg-white/[0.08] transition-all group flex flex-col items-center justify-center text-center relative overflow-hidden"
              >
                
                {/* Tech logo icons placeholder (custom SVG or styled initial) */}
                <div className="w-10 h-10 rounded-xl bg-[#0F1322] border border-white/10 flex items-center justify-center font-bold text-sm text-blue-400 group-hover:text-white group-hover:border-blue-500/30 transition-all mb-3">
                  {skill.name.substring(0, 2)}
                </div>

                <span className="font-bold text-xs text-white group-hover:text-blue-400 transition-colors">
                  {skill.name}
                </span>

                {/* Level Percentage Indicator bar */}
                <div className="w-full mt-3 h-1 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full group-hover:bg-emerald-400 transition-all duration-500" 
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                
                <span className="text-[10px] text-gray-500 font-mono mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  {skill.level}% Mastery
                </span>

              </div>
            ))}
          </div>

          {/* Tech ecosystems footnote */}
          <div className="bg-[#111625]/60 border border-white/5 rounded-2xl p-4 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Clean Code & Security First</p>
                <p className="text-[10px] text-gray-400">My code architecture respects separation of concerns, DRY principles, strict linting rules, and undergoes automated unit testing.</p>
              </div>
            </div>
            <button 
              onClick={() => setIsCVOpen(true)}
              className="text-xs font-bold text-blue-400 hover:text-blue-300 shrink-0 flex items-center gap-1.5 underline cursor-pointer"
            >
              <span>View Certifications & Education</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </section>

        {/* 4. PORTFOLIO SECTION */}
        <section ref={portfolioRef} id="portfolio" className="space-y-8 pt-6">
          
          <div className="max-w-2xl mx-auto text-center space-y-2">
            <h3 className="text-xs font-bold tracking-widest text-blue-500 uppercase font-mono">&gt; PORTFOLIO SHOWCASE</h3>
            <h4 className="text-2xl md:text-3xl font-extrabold text-white">Flagship Projects & Case Studies</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              Explore 8 projects built from specifications. Each card showcases engineering achievements, tech stacks, and metrics. Click "View Case Study" to see full architecture designs and UI mockups.
            </p>
          </div>

          {/* Portfolio Category Filters */}
          <div className="flex justify-center gap-2 flex-wrap max-w-2xl mx-auto">
            {(['all', 'web3', 'ai', 'webapp', 'website'] as const).map((cat) => {
              const labels = {
                all: 'All Projects',
                web3: 'Web3 & Blockchain',
                ai: 'AI Solutions',
                webapp: 'Web Apps / SaaS',
                website: 'Headless Sites',
              };
              const active = activePortfolioCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActivePortfolioCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                    active
                      ? 'bg-blue-500/20 border-blue-500 text-white'
                      : 'bg-white/5 border-white/5 text-gray-400 hover:border-white/10 hover:text-white'
                  }`}
                >
                  {labels[cat]}
                </button>
              );
            })}
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div 
                key={project.id}
                className="bg-[#0D121E]/80 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/40 hover:bg-[#0F1626] transition-all group flex flex-col h-full shadow-lg hover:shadow-2xl hover:shadow-blue-500/5 relative"
              >
                {/* Visual Header Grid Panel */}
                <div className={`h-32 bg-gradient-to-tr ${project.color} relative p-4 flex flex-col justify-between overflow-hidden`}>
                  {/* Grid grid background effect inside card header */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:10px_10px] opacity-30 pointer-events-none"></div>
                  
                  <div className="flex justify-between items-center z-10">
                    <span className="text-[10px] font-bold tracking-wider uppercase text-black bg-white px-2 py-0.5 rounded-full font-mono">
                      {project.difficulty}
                    </span>
                    <span className="text-[10px] font-mono text-black bg-white/70 backdrop-blur-sm px-2 py-0.5 rounded">
                      {project.timeframe}
                    </span>
                  </div>

                  <div className="z-10 text-left">
                    <span className="text-[10px] text-black font-bold uppercase tracking-wider block opacity-70">
                      {project.categoryLabel}
                    </span>
                    <h4 className="text-base font-bold text-black tracking-tight mt-0.5">
                      {project.name}
                    </h4>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between text-left space-y-4">
                  <div className="space-y-3">
                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                      {project.description}
                    </p>

                    {/* Highlights stats / metric badge */}
                    <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg text-emerald-400 text-xs font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{project.metric.label}: <strong>{project.metric.value}</strong></span>
                    </div>

                    {/* Tech tag list */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span key={tech} className="text-[9px] font-mono bg-white/5 border border-white/5 text-blue-300 px-1.5 py-0.5 rounded">
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="text-[9px] font-mono bg-white/5 border border-white/5 text-gray-500 px-1.5 py-0.5 rounded">
                          +{project.techStack.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="space-y-2 pt-4 border-t border-white/5">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className={`w-full py-2.5 rounded-xl bg-gradient-to-r ${project.color} text-black font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-black/15 group-hover:scale-[1.01] active:scale-[0.99] transition-all`}
                    >
                      <span>View Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-[10px] font-mono font-semibold text-center text-gray-300 hover:text-white flex items-center justify-center gap-1.5 transition-all"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                        </svg>
                        <span>GitHub</span>
                      </a>
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-[10px] font-mono font-semibold text-center text-gray-300 hover:text-white flex items-center justify-center gap-1.5 transition-all"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                        <span>Live Demo</span>
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </section>

        {/* 5. SERVICES & PROJECT CALCULATOR */}
        <section ref={servicesRef} id="services" className="space-y-12 pt-6">
          
          <div className="max-w-xl mx-auto text-center space-y-2">
            <h3 className="text-xs font-bold tracking-widest text-blue-500 uppercase font-mono">&gt; SERVICES AVAILABLE</h3>
            <h4 className="text-2xl md:text-3xl font-extrabold text-white">Full-Stack Solutions Built to Grow</h4>
            <p className="text-sm text-gray-400">
              I provide end-to-end consulting, engineering, and launching support for premium startup products. Transparency is key—check typical pricing and delivery terms below.
            </p>
          </div>

          {/* Services Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {servicesData.map((srv) => {
              // Map icon name to lucide icons
              const renderIcon = (name: string) => {
                const props = { className: "w-6 h-6" };
                if (name === 'Globe') return <Globe {...props} className="w-6 h-6 text-blue-400" />;
                if (name === 'Cpu') return <Cpu {...props} className="w-6 h-6 text-indigo-400" />;
                if (name === 'Sparkles') return <Sparkles {...props} className="w-6 h-6 text-purple-400" />;
                return <Shield {...props} className="w-6 h-6 text-emerald-400" />;
              };

              return (
                <div 
                  key={srv.id}
                  className="bg-[#0B0F17]/90 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all text-left flex flex-col justify-between h-full space-y-6"
                >
                  <div className="space-y-4">
                    
                    {/* Header: Icon + Title */}
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                        {renderIcon(srv.iconName)}
                      </div>
                      <div>
                        <h4 className="text-lg font-extrabold text-white tracking-tight">{srv.title}</h4>
                        <span className="text-xs text-gray-500 font-mono italic">{srv.subtitle}</span>
                      </div>
                    </div>

                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                      {srv.description}
                    </p>

                    {/* Features list */}
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Key Features included</p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs text-gray-300">
                        {srv.features.map((feat) => (
                          <li key={feat} className="flex items-start gap-1.5">
                            <span className="text-blue-500 font-bold">✓</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  {/* Pricing & Deliverables footer */}
                  <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-mono">
                    <div>
                      <span className="text-[10px] text-gray-500 block uppercase font-bold">Pricing</span>
                      <span className="text-sm font-bold text-white">{srv.pricing}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 block uppercase font-bold">Average Timeline</span>
                      <span className="text-sm font-bold text-blue-400">{srv.timeline}</span>
                    </div>
                    <button
                      onClick={() => {
                        setContactForm({
                          ...contactForm,
                          serviceType: srv.title,
                          message: `Hi Adejax,\nI am interested in your "${srv.title}" package. Let's discuss details and timelines!`
                        });
                        scrollToSection(contactRef, 'contact');
                      }}
                      className="w-full sm:w-auto px-4 py-2 rounded-lg bg-white/5 border border-white/15 text-white font-bold hover:bg-white/10 hover:border-white/20 transition-all text-center cursor-pointer"
                    >
                      Choose Package
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Cost Calculator Section */}
          <div className="space-y-6 pt-6">
            <div className="max-w-xl mx-auto text-center space-y-2">
              <h4 className="text-xl font-bold text-white">Estimate Your Custom Project Cost</h4>
              <p className="text-xs text-gray-400">
                Play with our interactive project config calculator to configure exact components, speed parameters, and budgets!
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <CostCalculator onSelectEstimate={handleSelectEstimate} />
            </div>
          </div>

        </section>

        {/* 6. CLIENT TESTIMONIALS */}
        <section ref={testimonialsRef} id="testimonials" className="space-y-8 pt-6">
          
          <div className="max-w-xl mx-auto text-center space-y-2">
            <h3 className="text-xs font-bold tracking-widest text-blue-500 uppercase font-mono">&gt; CLIENT REVIEWS</h3>
            <h4 className="text-2xl md:text-3xl font-extrabold text-white">Vouched for by Startup Founders</h4>
            <p className="text-sm text-gray-400">
              Read authentic feedback from project stakeholders who hired Adejax for full-stack architecture, Web3 smart contract deployments, and AI integrations.
            </p>
          </div>

          {/* Testimonial grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonialsData.map((test) => (
              <div 
                key={test.id}
                className="bg-[#0B0F17]/95 border border-white/10 rounded-2xl p-6 flex flex-col justify-between text-left space-y-6 hover:border-blue-500/20 transition-colors"
              >
                {/* Content */}
                <div className="space-y-3">
                  <div className="flex gap-1 text-amber-400">
                    {Array.from({ length: test.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-gray-300 text-xs md:text-sm leading-relaxed italic">
                    "{test.comment}"
                  </p>
                </div>

                {/* User info footer */}
                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    <img 
                      src={test.avatarUrl} 
                      alt={test.name} 
                      className="w-10 h-10 rounded-full object-cover border border-white/10 bg-white/5 shrink-0"
                    />
                    <div>
                      <h5 className="font-bold text-xs text-white">{test.name}</h5>
                      <span className="text-[10px] text-gray-500 block">{test.role}</span>
                    </div>
                  </div>
                  
                  {/* Wrapped Company Name with official sites as requested */}
                  <a 
                    href={test.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-mono text-blue-400 hover:underline bg-blue-500/5 px-2.5 py-1 rounded border border-blue-500/10"
                  >
                    {test.company}
                  </a>
                </div>

              </div>
            ))}
          </div>

        </section>

        {/* 7. DEVELOPER BLOG */}
        <section ref={blogRef} id="blog" className="space-y-8 pt-6">
          
          <div className="max-w-xl mx-auto text-center space-y-2">
            <h3 className="text-xs font-bold tracking-widest text-blue-500 uppercase font-mono">&gt; ENGINEERING THOUGHTS</h3>
            <h4 className="text-2xl md:text-3xl font-extrabold text-white">Adejax Technical Blog</h4>
            <p className="text-sm text-gray-400">
              I share deep-dive breakdowns on Ethereum/Solidity performance optimizations, RAG AI agent pipelines, and building blazing-fast React storefronts.
            </p>
          </div>

          {/* Blog grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPostsData.map((post) => {
              const hasLiked = likedPosts[post.id];
              return (
                <div 
                  key={post.id}
                  onClick={() => setSelectedBlog(post)}
                  className="bg-[#0B0F17]/90 border border-white/10 rounded-2xl p-5 hover:border-blue-500/30 hover:bg-[#0D1321] transition-all group cursor-pointer flex flex-col justify-between text-left h-full space-y-4"
                >
                  <div className="space-y-3">
                    {/* Category & Date metadata */}
                    <div className="flex justify-between items-center text-[10px] font-mono text-gray-500">
                      <span className="text-blue-400 font-bold uppercase">{post.category}</span>
                      <span>{post.date}</span>
                    </div>

                    <h4 className="text-base font-extrabold text-white group-hover:text-blue-400 transition-colors leading-snug">
                      {post.title}
                    </h4>

                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Actions / Stats bottom bar */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5 text-[10px] text-gray-500 font-mono">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-gray-600" />
                        {post.readTime}
                      </span>
                      <button 
                        onClick={(e) => handleLikeBlogPost(post.id, e)}
                        className={`flex items-center gap-1.5 transition-all hover:text-red-400 ${hasLiked ? 'text-red-400 font-bold' : ''}`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-current' : ''}`} />
                        <span>{blogLikes[post.id]}</span>
                      </button>
                    </div>
                    
                    <span className="text-blue-400 group-hover:translate-x-1 transition-transform flex items-center gap-0.5 font-bold">
                      Read Post <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>

                </div>
              );
            })}
          </div>

        </section>

        {/* 8. CONTACT FORM & SOCIALS */}
        <section ref={contactRef} id="contact" className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-6 items-start">
          
          {/* Left Column: Contact details & quick buttons */}
          <div className="lg:col-span-5 space-y-6 text-left">
            
            <div className="space-y-3">
              <h3 className="text-xs font-bold tracking-widest text-blue-500 uppercase font-mono">&gt; CONTACT CHANNELS</h3>
              <h4 className="text-2xl md:text-3xl font-extrabold text-white">Let's Build Something Revolutionary</h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                Have an exciting project idea, looking for a retainer consultant, or need a smart contract audited? Fill out the secure form or reach out through direct channels. I reply within 12 hours.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-3">
              
              <a 
                href="mailto:hello@adejax.dev"
                className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 hover:border-blue-500/30 hover:bg-white/[0.07] rounded-2xl transition-all"
              >
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 block uppercase font-bold tracking-wider">Email Address</span>
                  <span className="text-sm font-bold text-white font-mono">hello@adejax.dev</span>
                </div>
              </a>

              {/* Wrapped company names with official sites as requested */}
              <a 
                href="https://wa.me/351912345678" // mock whatsapp link
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 hover:border-emerald-500/30 hover:bg-white/[0.07] rounded-2xl transition-all"
              >
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.989 3.3 1.472 5.358 1.473 5.4 0 9.795-4.393 9.798-9.795.002-2.618-1.01-5.074-2.852-6.918C17.107 2.07 14.654.88 12.01.88c-5.402 0-9.8 4.393-9.802 9.795-.001 2.083.547 4.11 1.585 5.902l-.999 3.646 3.863-.981zM17.06 14.8c-.277-.139-1.643-.81-1.897-.903-.254-.093-.44-.139-.626.139-.186.277-.72.903-.882 1.087-.162.186-.325.208-.602.069-.277-.14-1.171-.432-2.23-1.377-.824-.735-1.38-1.642-1.542-1.921-.162-.278-.017-.429.122-.568.125-.124.277-.324.416-.486.139-.162.186-.278.277-.463.093-.185.046-.347-.023-.486-.069-.139-.626-1.505-.858-2.06-.225-.542-.472-.468-.626-.476-.162-.008-.347-.01-.532-.01-.185 0-.486.069-.74.347-.254.278-.973.95-0.973 2.315 0 1.365.996 2.685 1.135 2.87.139.185 1.962 3.003 4.757 4.205.665.287 1.184.458 1.589.587.669.213 1.278.183 1.76.111.537-.08 1.643-.671 1.874-1.319.231-.648.231-1.204.162-1.319-.069-.115-.254-.185-.531-.324z"/>
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 block uppercase font-bold tracking-wider">WhatsApp Hotline</span>
                  <span className="text-sm font-bold text-white font-mono">Chat on WhatsApp</span>
                </div>
              </a>

              <a 
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 hover:border-blue-600/30 hover:bg-white/[0.07] rounded-2xl transition-all"
              >
                <div className="p-3 rounded-xl bg-blue-600/10 border border-blue-600/20 text-blue-400">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 block uppercase font-bold tracking-wider">LinkedIn Profile</span>
                  <span className="text-sm font-bold text-white font-mono">Connect on LinkedIn</span>
                </div>
              </a>

              <a 
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 hover:border-purple-500/30 hover:bg-white/[0.07] rounded-2xl transition-all"
              >
                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 block uppercase font-bold tracking-wider">GitHub Codebase</span>
                  <span className="text-sm font-bold text-white font-mono">Explore Repositories</span>
                </div>
              </a>

            </div>

            {/* Quick trust banner */}
            <div className="bg-gradient-to-r from-blue-500/10 to-transparent border-l-2 border-blue-500 p-4 rounded-r-xl">
              <span className="text-xs font-bold text-white block mb-1">⏰ Response Guarantee</span>
              <p className="text-[11px] text-gray-400">
                I operate in Western European Time (WET). Emails or contract drafts receive responses within 12 hours max. NDA agreements can be processed immediately if requested.
              </p>
            </div>

          </div>

          {/* Right Column: Glassmorphic Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#0B0F17]/90 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-2xl text-left relative">
              
              <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Send className="w-5 h-5 text-blue-500 animate-pulse" />
                <span>Submit Client Inquiry Details</span>
              </h4>

              {formSuccess ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-2xl text-emerald-400 space-y-3 animate-in zoom-in-95">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center font-bold text-lg text-emerald-400">✓</div>
                    <h5 className="font-extrabold text-white text-base">MESSAGE RECEIVED SUCCESSFULLY!</h5>
                  </div>
                  <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                    Thank you for your interest! Your project inquiry has been encrypted and transmitted securely via Web3 webhook protocols. A backup email confirmation has been dispatched to your mailbox. Adejax will review the specifications and reach out to you within 12 hours.
                  </p>
                  <div className="bg-[#06080F] border border-emerald-500/10 p-3 rounded-lg font-mono text-[10px] text-gray-500 space-y-1">
                    <p className="text-emerald-500 font-semibold">⚡ Node response telemetry:</p>
                    <p>📍 Status: 200 OK | Event: INQUIRY_RECEIVED</p>
                    <p>🛡️ SHA-256 Hash: 0x9a2f1c...4d92a0</p>
                    <p>📦 Timestamp: {new Date().toISOString()}</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  
                  {/* Name */}
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                      Your Name / Company Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="e.g. Sarah Jenkins, SolVelo Energy"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.08] transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                      Secure Contact Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="e.g. sarah@solvelo.energy"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.08] transition-all"
                    />
                  </div>

                  {/* Project Specifications selection */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                        Project Scope Type
                      </label>
                      <div className="relative">
                        <select
                          value={contactForm.serviceType}
                          onChange={(e) => setContactForm({ ...contactForm, serviceType: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white appearance-none focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.08] transition-all"
                        >
                          <option value="High-Performance Website" className="bg-[#0B0F17] text-white">Headless Website / Shop</option>
                          <option value="Custom Web Application" className="bg-[#0B0F17] text-white">SaaS &amp; Web Application</option>
                          <option value="AI & Automation Solution" className="bg-[#0B0F17] text-white">AI Copilot &amp; Agents</option>
                          <option value="Blockchain & Web3 DApp" className="bg-[#0B0F17] text-white">Smart Contracts / Web3</option>
                          <option value="Custom Project" className="bg-[#0B0F17] text-white">Other Consultancy</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                        Estimated Budget
                      </label>
                      <div className="relative">
                        <select
                          value={contactForm.budget}
                          onChange={(e) => setContactForm({ ...contactForm, budget: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white appearance-none focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.08] transition-all"
                        >
                          <option value="$2,500 - $5,000" className="bg-[#0B0F17] text-white">$2,500 - $5,000</option>
                          <option value="$5,000 - $10,000" className="bg-[#0B0F17] text-white">$5,000 - $10,000</option>
                          <option value="$10,000 - $20,000" className="bg-[#0B0F17] text-white">$10,000 - $20,000</option>
                          <option value="$20,000+" className="bg-[#0B0F17] text-white">$20,000+ (Enterprise)</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                  </div>

                  {/* Message / Specs */}
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                      Project Requirements &amp; Goals <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Describe what you want to build. Highlight target features, integrations, and any specific timelines you have in mind..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.08] transition-all"
                    />
                  </div>

                  {/* Submission status loading or trigger button */}
                  {formSubmitting ? (
                    <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-4 flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full border-2 border-blue-400 border-t-transparent animate-spin shrink-0"></div>
                      <div className="text-xs text-blue-400 font-mono">
                        {formStatusText}
                      </div>
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-blue-500 hover:bg-blue-400 active:scale-98 text-black font-extrabold text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-blue-500/15"
                    >
                      <Send className="w-4 h-4" />
                      <span>Transmit Secure Inquiry</span>
                    </button>
                  )}

                  <div className="text-center">
                    <span className="text-[9px] text-gray-600 font-mono">
                      🔒 End-to-end encrypted channel. Protected by Cloudflare WAF.
                    </span>
                  </div>

                </form>
              )}

            </div>
          </div>

        </section>

      </main>

      {/* PREMIUM FOOTER */}
      <footer className="border-t border-white/5 bg-[#04060B] relative z-10 pt-16 pb-8 text-left">
        <div className="container mx-auto px-4 md:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Column 1: Info and logo */}
            <div className="md:col-span-4 space-y-4">
              <div 
                onClick={() => scrollToSection(homeRef, 'home')} 
                className="flex items-center gap-2 cursor-pointer group w-fit"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center font-extrabold text-black tracking-tighter text-sm group-hover:scale-105 transition-all shadow-lg">
                  AJ
                </div>
                <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-blue-400 transition-colors">
                  Adejax<span className="text-blue-500">.</span>
                </span>
              </div>
              <p className="text-xs text-gray-500 max-w-xs leading-relaxed">
                Premium full-stack engineering, Web3 smart contracts, and custom AI agent workflow integrations. Bridging complex, high-performance backends with beautiful, responsive interfaces.
              </p>
              <div className="flex gap-3 pt-2">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 2: Navigation Links */}
            <div className="md:col-span-2 space-y-4 text-xs font-mono">
              <h5 className="text-xs font-bold text-white uppercase tracking-wider">Navigation</h5>
              <ul className="space-y-2 text-gray-500">
                <li>
                  <button onClick={() => scrollToSection(homeRef, 'home')} className="hover:text-blue-400 cursor-pointer">
                    Home Base
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection(aboutRef, 'about')} className="hover:text-blue-400 cursor-pointer">
                    Developer Info
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection(portfolioRef, 'portfolio')} className="hover:text-blue-400 cursor-pointer">
                    Case Studies
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection(servicesRef, 'services')} className="hover:text-blue-400 cursor-pointer">
                    Pricing &amp; Cost
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection(testimonialsRef, 'testimonials')} className="hover:text-blue-400 cursor-pointer">
                    Vouches
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Tech details */}
            <div className="md:col-span-3 space-y-4 text-xs font-mono">
              <h5 className="text-xs font-bold text-white uppercase tracking-wider">Ecosystem Pillars</h5>
              <ul className="space-y-2 text-gray-500">
                <li>Next.js, TypeScript, React 19</li>
                <li>Solidity Smart Contracts (EVM)</li>
                <li>LangChain, Pinecone, GPT-4 RAG</li>
                <li>Node.js, Postgres, Express</li>
                <li>Docker, AWS, CI/CD, Vercel</li>
              </ul>
            </div>

            {/* Column 4: Newsletter / Quick subscribe */}
            <div className="md:col-span-3 space-y-4">
              <h5 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Telemetry Alert</h5>
              <p className="text-xs text-gray-500 leading-normal">
                Enter your email address to receive occasional engineering logs regarding smart contracts, security templates, and AI workflows.
              </p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 w-full"
                />
                <button 
                  onClick={() => alert('Subscribed! Thank you.')}
                  className="px-3 py-1.5 rounded-lg bg-blue-500 text-black text-xs font-bold hover:bg-blue-400 cursor-pointer"
                >
                  Join
                </button>
              </div>
            </div>

          </div>

          {/* Bottom network bar */}
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-500 font-mono">
            <p>© 2026 Adejax. All rights reserved. Built using React, Tailwind CSS, &amp; Lucide.</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>All Systems Operational</span>
              </div>
              <span>•</span>
              <span>WET Timezone Remote</span>
              <span>•</span>
              <button 
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-white underline cursor-pointer"
              >
                Back to Top ↑
              </button>
            </div>
          </div>

        </div>
      </footer>

      {/* PROJECT DETAILS MODAL */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />

      {/* DIGITAL CV / RESUME MODAL */}
      <CVModal 
        isOpen={isCVOpen} 
        onClose={() => setIsCVOpen(false)} 
      />

      {/* BLOG POST READER MODAL */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-[#0B0F17] border border-white/10 rounded-2xl overflow-hidden shadow-2xl my-8">
            
            {/* Close button */}
            <button 
              onClick={() => setSelectedBlog(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-105 text-gray-400 hover:text-white transition-all z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content Container */}
            <div className="p-6 md:p-10 space-y-6 text-left">
              
              {/* Header Info */}
              <div className="space-y-2 border-b border-white/5 pb-4">
                <div className="flex items-center gap-3 text-xs font-mono text-gray-500">
                  <span className="text-blue-400 font-bold uppercase">{selectedBlog.category}</span>
                  <span>•</span>
                  <span>{selectedBlog.date}</span>
                  <span>•</span>
                  <span>{selectedBlog.readTime}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
                  {selectedBlog.title}
                </h3>
              </div>

              {/* Parsed / Formatted Content Body */}
              <div className="space-y-4">
                {formatBlogContent(selectedBlog.content)}
              </div>

              {/* Bottom stats / interactions */}
              <div className="pt-6 border-t border-white/5 flex items-center justify-between text-xs text-gray-500 font-mono">
                
                <button
                  onClick={(e) => handleLikeBlogPost(selectedBlog.id, e)}
                  className={`flex items-center gap-2 py-2 px-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:text-red-400 transition-all ${
                    likedPosts[selectedBlog.id] ? 'text-red-400 font-bold border-red-500/20 bg-red-500/5' : ''
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>Like this article ({blogLikes[selectedBlog.id]})</span>
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Article URL copied to clipboard!');
                    }}
                    className="py-2 px-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:text-white transition-all"
                  >
                    Share Link
                  </button>
                  <button
                    onClick={() => setSelectedBlog(null)}
                    className="py-2 px-4 rounded-xl bg-blue-500 text-black font-bold hover:bg-blue-400 transition-all"
                  >
                    Close Reader
                  </button>
                </div>

              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
