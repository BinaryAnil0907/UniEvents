import React, { useState, useEffect } from "react";
import {
  Calendar,
  User,
  LayoutDashboard,
  Menu,
  X,
  ArrowRight,
  Mail,
  Github,
  Twitter,
  Linkedin,
  MapPin,
  Phone,
  Sparkles,
  Zap,
  Moon,
  Sun,
} from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return (
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  // 🌗 Theme Toggler Logic (Tailwind v4 Compatible)
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      title: "Easy Registration",
      desc: "Streamlined sign-up process for students and faculty.",
      icon: <User className="w-6 h-6 text-blue-600" />,
    },
    {
      title: "Real-time Updates",
      desc: "Instant notifications for event changes and schedules.",
      icon: <Zap className="w-6 h-6 text-blue-600" />,
    },
    {
      title: "Admin Control",
      desc: "Powerful dashboard for managing events and users.",
      icon: <LayoutDashboard className="w-6 h-6 text-blue-600" />,
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-sans flex flex-col transition-colors duration-500 selection:bg-blue-100 selection:text-blue-900">
      {/* 🚀 Dynamic Navbar */}
      <nav
        className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
          scrolled
            ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-blue-600 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-blue-200">
              <Calendar className="text-white w-6 h-6" />
            </div>
            <span className="font-black text-2xl text-slate-900 dark:text-white tracking-tighter">
              UniEvents
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-base font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </Link>
            {/* 🌗 Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-yellow-400 hover:scale-110 transition-all focus:outline-none"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Link
              to="/login"
              className="text-base font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all relative group"
            >
              Login
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link
              to="/register"
              className="bg-slate-900 dark:bg-white dark:text-slate-950 text-white px-8 py-3 rounded-full hover:bg-blue-600 dark:hover:bg-blue-100 transition-all font-bold shadow-xl shadow-slate-200 dark:shadow-none hover:-translate-y-0.5"
            >
              Get Started
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg"
            >
              {isDarkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-slate-600 dark:text-white bg-slate-100 dark:bg-slate-800 rounded-lg"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-t dark:border-slate-800 p-6 space-y-4 animate-in slide-in-from-top duration-300">
            <Link to="/" className="block text-slate-600 dark:text-slate-400 font-bold">Home</Link>
            <Link to="/login" className="block text-slate-600 dark:text-slate-400 font-bold">Login</Link>
            <Link to="/register" className="block bg-blue-600 text-white text-center py-3 rounded-xl font-bold">Register</Link>
          </div>
        )}
      </nav>

      {/* 🎯 Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4">
              <Sparkles size={14} /> The Future of Campus Life
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.9] mb-8">
              The Campus <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Pulse.
              </span>
            </h1>

            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
              The all-in-one platform for students to explore, organize, and
              attend university events with a single click.
            </p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-8 pt-4">
              <Link
                to="/register"
                className="group bg-blue-600 text-white px-10 py-5 rounded-full font-black text-lg hover:bg-blue-700 transition-all flex items-center gap-3 shadow-2xl shadow-blue-200 dark:shadow-none hover:-translate-y-1"
              >
                Explore Events{" "}
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-full border-4 border-white dark:border-slate-900 bg-slate-200 overflow-hidden shadow-sm"
                    >
                      <img src={`https://i.pravatar.cc/150?u=${i + 25}`} alt="user" />
                    </div>
                  ))}
                </div>
                <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase italic">
                  2k+ Joiners
                </p>
              </div>
            </div>
          </div>

          {/* Right Image Grid (Cleaned up) */}
          <div className="lg:w-1/2 relative">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="h-72 rounded-[3rem] overflow-hidden shadow-2xl transform hover:-rotate-3 transition-transform duration-500 grayscale-[30%] dark:grayscale-0">
                  <img
                    src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80"
                    alt="Workshop"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-44 rounded-[2.5rem] overflow-hidden shadow-2xl bg-blue-600 flex items-center justify-center p-8 text-white relative group cursor-default">
                  <Zap size={40} className="opacity-20 absolute right-4 top-4 group-hover:scale-125 transition-transform" />
                  <p className="font-black text-2xl leading-tight italic text-left text-white">
                    Your Campus. Your Events. ⚡
                  </p>
                </div>
              </div>
              <div className="space-y-6 pt-16">
                <div className="h-72 rounded-[3rem] overflow-hidden shadow-2xl transform hover:-rotate-3 transition-transform duration-500">
                  <img
                    src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80"
                    alt="Fest"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 Features */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-32 border-y border-slate-100 dark:border-slate-800 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-4">Why Choose UniEvents?</h2>
            <p className="text-slate-400 font-black uppercase text-[10px] tracking-[0.3em] mb-20">Redefining campus life</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="p-12 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 group hover:shadow-2xl transition-all">
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 transition-colors mx-auto">
                  {React.cloneElement(feature.icon, { className: "w-8 h-8 text-blue-600 group-hover:text-white" })}
                </div>
                <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-4">{feature.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🏁 Footer: Professional Light/Dark Compatible */}
      <footer className="bg-white dark:bg-slate-950 py-20 border-t border-slate-100 dark:border-slate-900 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="space-y-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="bg-blue-600 p-2 rounded-xl text-white"><Calendar size={18} /></div>
              <span className="font-black text-xl tracking-tighter text-slate-900 dark:text-white">UniEvents</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm leading-relaxed italic">"Designed for students, by students."</p>
            <div className="flex justify-center md:justify-start gap-6">
              <Twitter className="w-5 h-5 text-slate-400 hover:text-blue-500 cursor-pointer" />
              <Linkedin className="w-5 h-5 text-slate-400 hover:text-blue-600 cursor-pointer" />
              <Github className="w-5 h-5 text-slate-400 dark:hover:text-white hover:text-slate-900 cursor-pointer" />
            </div>
          </div>
          
          <div className="text-center md:text-left">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white mb-8">Navigation</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-600 dark:text-slate-400">
              <li><Link to="/" className="hover:text-blue-500">Home</Link></li>
              <li><Link to="/login" className="hover:text-blue-500">Login</Link></li>
              <li><Link to="/register" className="hover:text-blue-500">Register</Link></li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white mb-8">Resources</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-600 dark:text-slate-400">
              <li><a href="#" className="hover:text-blue-500">Privacy Guide</a></li>
              <li><a href="#" className="hover:text-blue-500">Guidelines</a></li>
              <li><a href="#" className="hover:text-blue-500">Help Center</a></li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white mb-8">Contact</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-500 dark:text-slate-400">
              <li className="flex items-center justify-center md:justify-start gap-3 italic">
                <Mail size={16} className="text-blue-600" /> sahanianil0907@gmail.com
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3 italic">
                <Phone size={16} className="text-blue-600" /> +91 84696 87662
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3 italic">
                <MapPin size={16} className="text-blue-600" /> Surat, Gujarat
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-20 pt-10 border-t border-slate-50 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
          <p>© 2026 UniEvents. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;