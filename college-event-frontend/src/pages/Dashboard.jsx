import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LayoutDashboard, Calendar, User, LogOut, Menu, X,
  MapPin, Clock, Users, Bell, Search, Sparkles, 
  BookmarkCheck, ArrowUpRight, Sun, Moon, CheckCircle2
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all"); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [loading, setLoading] = useState(true);
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (!token || !storedUser) { navigate("/login"); return; }
    setUser(JSON.parse(storedUser));
    fetchEvents();
  }, [navigate]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/events");
      setEvents(res.data);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const handleRegister = async (eventId) => {
    try {
      const studentId = user.id || user._id;
      const res = await axios.post(`http://localhost:5000/api/events/${eventId}/register`, { studentId });
      alert(res.data.message || "Registered! 🎉");
      fetchEvents();
    } catch (err) { alert(err.response?.data?.message || "Registration failed!"); }
  };

  const handleLogout = () => { localStorage.clear(); navigate("/login"); };

  const filteredEvents = events.filter(e => 
    e.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayEvents = activeTab === "all" ? filteredEvents : filteredEvents.filter(e => e.attendees?.includes(user?.id || user?._id));

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-950">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-blue-600 font-black tracking-tighter animate-pulse uppercase">UniEvents Loading... 🚀</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex font-sans transition-colors duration-500">
      
      {/* 🟢 Sidebar: Hero Gradient Style */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 p-6 transition-transform duration-300 lg:translate-x-0 lg:static ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="h-full bg-gradient-to-b from-blue-600 to-indigo-700 rounded-[2.5rem] shadow-2xl flex flex-col p-8 text-white relative overflow-hidden">
          {/* Subtle decoration for sidebar */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          
          <div className="flex items-center gap-3 mb-12 relative z-10">
            <div className="bg-white/20 p-2.5 rounded-2xl backdrop-blur-md border border-white/30">
              <Calendar className="text-white w-6 h-6" />
            </div>
            <span className="font-black text-2xl tracking-tighter uppercase italic">UniEvents</span>
          </div>

          <nav className="flex-1 space-y-4 relative z-10">
            <button onClick={() => setActiveTab("all")} className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${activeTab === "all" ? "bg-white text-blue-600 shadow-xl" : "text-blue-100 hover:bg-white/10"}`}>
              <LayoutDashboard size={20} /> <span className="font-bold">Browser Events</span>
            </button>
            <button onClick={() => setActiveTab("my-registrations")} className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${activeTab === "my-registrations" ? "bg-white text-blue-600 shadow-xl" : "text-blue-100 hover:bg-white/10"}`}>
              <BookmarkCheck size={20} /> <span className="font-bold">My Registrations</span>
            </button>
          </nav>

          <div className="mt-auto relative z-10 pt-4 border-t border-white/10">
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-red-200 hover:bg-white/10 font-bold transition-all">
              <LogOut size={20} /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* 🔵 Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 p-4 lg:p-8">
        
        {/* Top Header */}
        <header className="flex justify-between items-center mb-10 px-4">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden p-3 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
              <Menu size={20} className="text-slate-600 dark:text-white" />
            </button>
            <h2 className="hidden md:block text-2xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase">Explore <span className="text-blue-600">Events</span></h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-white dark:bg-slate-900 px-5 py-3 rounded-2xl w-80 gap-3 border border-slate-200 dark:border-slate-800 shadow-sm">
              <Search size={18} className="text-slate-400" />
              <input type="text" placeholder="Search events..." className="bg-transparent outline-none w-full text-sm font-medium dark:text-white" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-3 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-yellow-400 transition-all hover:scale-110">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black shadow-lg">
              {user?.fullName?.split(" ").map(n => n[0]).join("").toUpperCase()}
            </div>
          </div>
        </header>

        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[3rem] p-10 mb-12 text-white relative overflow-hidden shadow-2xl shadow-blue-200 dark:shadow-none">
          <div className="relative z-10 max-w-lg">
             <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-none mb-4 italic uppercase">
               {activeTab === "all" ? "What's the move today?" : "Your Secured Passes"}
             </h1>
             <p className="text-blue-100 font-medium mb-6 opacity-90">Explore events happening across the campus right now.</p>
             <button onClick={() => setActiveTab("all")} className="bg-white text-blue-600 px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform">Discover Now</button>
          </div>
          <Sparkles className="absolute right-10 top-10 w-32 h-32 text-white/10 rotate-12" />
        </div>

        {/* Events Grid */}
        <div className="flex-1 overflow-y-auto px-2 pb-10 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {displayEvents.length > 0 ? (
              displayEvents.map((event) => {
                const isRegistered = event.attendees?.includes(user.id || user._id);
                return (
                  <div key={event._id} className="group bg-white dark:bg-slate-900 rounded-[2.5rem] p-3 border border-slate-100 dark:border-slate-800 hover:border-blue-200 transition-all duration-500 hover:shadow-2xl">
                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] p-7 relative h-full flex flex-col">
                      <div className="flex justify-between items-start mb-6">
                        <span className="bg-blue-600 text-white text-[9px] font-black px-4 py-1.5 rounded-xl uppercase tracking-widest">{event.category}</span>
                        <div className="text-slate-400 group-hover:text-blue-600 transition-colors"><ArrowUpRight size={18} /></div>
                      </div>
                      
                      <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tighter leading-tight italic uppercase truncate">
                        {event.title}
                      </h4>
                      <div className="space-y-2 mb-8 font-bold text-slate-500 dark:text-slate-400 text-sm">
                        <p className="flex items-center gap-2"><MapPin size={16} className="text-blue-600"/> {event.location}</p>
                        <p className="flex items-center gap-2"><Clock size={16} className="text-blue-600"/> {event.date}</p>
                        <p className="flex items-center gap-2"><Users size={16} className="text-blue-600"/> {event.attendees?.length || 0} attending</p>
                      </div>

                      <button
                        onClick={() => handleRegister(event._id)}
                        disabled={isRegistered}
                        className={`mt-auto w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all transform active:scale-95 flex items-center justify-center gap-2 ${
                          isRegistered 
                          ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200" 
                          : "bg-slate-900 text-white shadow-lg hover:bg-blue-600"
                        }`}
                      >
                        {isRegistered ? (
                          <>already joined <CheckCircle2 size={16} /></>
                        ) : (
                          "Join Event 🚀"
                        )}
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-20 bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-100 dark:border-slate-800">
                <p className="text-slate-400 font-black italic uppercase tracking-widest">No Events Found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;