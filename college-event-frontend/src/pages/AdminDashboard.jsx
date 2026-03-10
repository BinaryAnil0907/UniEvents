import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Calendar, Users, Plus, Trash2, Edit, 
  LogOut, Search, Eye, Sparkles, ChevronRight, Clock, BarChart3, Sun, Moon 
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // 🌓 Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('admin-theme') === 'dark';
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  // 🔥 Apply Theme Effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('admin-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('admin-theme', 'light');
    }
  }, [isDarkMode]);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/events');
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bhai, are you sure? Ye event hamesha ke liye delete ho jayega! 🗑️")) {
      try {
        await axios.delete(`http://localhost:5000/api/events/${id}`);
        setEvents(events.filter(event => event._id !== id));
        alert("Event successfully deleted! ✅");
      } catch (err) {
        alert("Failed to delete. ❌");
      }
    }
  };

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalEvents = events.length;
  const totalParticipants = events.reduce((acc, curr) => acc + (curr.attendees?.length || 0), 0);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950 text-indigo-700 font-black italic uppercase tracking-tighter">
      UniEvents Admin Loading... 🚀
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex font-sans selection:bg-indigo-100 transition-colors duration-500">
      
      {/* 🟢 Sidebar: Classic Deep Indigo (Stays Dark for contrast) */}
      <aside className="w-72 bg-indigo-950 text-white p-8 hidden lg:flex flex-col shadow-2xl relative shrink-0">
        <div className="mb-12 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600 rounded-2xl shadow-lg border border-white/10">
              <LayoutDashboard size={24} className="text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase italic leading-none">UniEvents</span>
          </div>
          <p className="text-[10px] font-black text-indigo-400 tracking-[0.4em] uppercase mt-2 ml-14">ADMIN</p>
        </div>
        
        <nav className="flex-1 space-y-3 relative z-10">
          <p className="px-4 text-[11px] font-black uppercase tracking-[0.3em] text-white mb-6 border-b border-white/10 pb-2">MANAGEMENT</p>
          
          <Link to="/admin/dashboard" className="flex items-center justify-between p-4 bg-white/10 text-white rounded-[1.5rem] border border-white/10 font-black italic uppercase text-xs tracking-widest shadow-xl">
            <div className="flex items-center gap-3"><Calendar size={18} /> Events List</div>
            <ChevronRight size={14} />
          </Link>
          <Link to="/admin/add-event" className="flex items-center gap-3 p-4 text-indigo-100 hover:text-white hover:bg-white/5 rounded-[1.5rem] font-black uppercase text-xs tracking-widest transition-all group">
            <Plus size={18} className="group-hover:rotate-90 transition-transform" /> Add New Event
          </Link>
        </nav>

        <button 
          onClick={() => { localStorage.clear(); navigate('/login'); }} 
          className="flex items-center gap-3 text-red-400 p-4 hover:bg-red-500/10 rounded-2xl transition-all font-black uppercase text-[10px] tracking-widest mt-auto border-t border-indigo-900/50 pt-8"
        >
          <LogOut size={18}/> Sign Out
        </button>
      </aside>

      {/* 🔵 Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* Simple Header */}
        <header className="p-6 md:p-10 pb-4 bg-slate-50 dark:bg-slate-900 transition-colors">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 shadow-md">
                <Sparkles size={12} /> Authorized Access
              </div>
              <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter leading-none italic uppercase">Events <span className="text-indigo-600">Management.</span></h1>
            </div>

            {/* 🌓 Theme Switcher Button */}
            <div className="flex items-center gap-4">
               <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-yellow-400 transition-all hover:scale-110"
              >
                {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
              </button>

              <Link to="/admin/add-event" className="group bg-indigo-600 text-white px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 dark:shadow-none">
                <Plus size={20} className="group-hover:rotate-90 transition-transform" /> Create Event
              </Link>
            </div>
          </div>

          {/* 📊 Stats Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
             <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border-2 border-slate-100 dark:border-slate-700 shadow-sm flex items-center justify-between group hover:border-indigo-400 transition-all">
                <div>
                  <p className="text-[12px] font-black text-slate-900 dark:text-slate-400 uppercase tracking-[0.2em] mb-2 border-l-4 border-indigo-600 pl-3">Total Active Events</p>
                  <h3 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase">{totalEvents}</h3>
                </div>
                <div className="p-5 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 rounded-3xl group-hover:scale-110 transition-transform border border-indigo-100 dark:border-indigo-800">
                  <BarChart3 size={32}/>
                </div>
             </div>
             <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border-2 border-slate-100 dark:border-slate-700 shadow-sm flex items-center justify-between group hover:border-emerald-400 transition-all">
                <div>
                  <p className="text-[12px] font-black text-slate-900 dark:text-slate-400 uppercase tracking-[0.2em] mb-2 border-l-4 border-emerald-500 pl-3">Total Participants</p>
                  <h3 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase">{totalParticipants}</h3>
                </div>
                <div className="p-5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-3xl group-hover:scale-110 transition-transform border border-emerald-100 dark:border-emerald-800">
                  <Users size={32}/>
                </div>
             </div>
          </div>
        </header>

        {/* 📋 Modern Table Section */}
        <main className="flex-1 px-6 md:px-10 pb-10 overflow-y-auto custom-scrollbar dark:bg-slate-950">
          <div className="bg-white dark:bg-slate-800 rounded-[3rem] shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
            <div className="p-6 border-b border-slate-50 dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Filter by event title..." 
                  className="w-full pl-12 pr-6 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-[1.5rem] focus:bg-white dark:focus:bg-slate-950 dark:text-white focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all font-bold text-sm"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 dark:bg-slate-900/50">
                    <th className="p-8 text-[11px] font-black text-slate-800 dark:text-slate-400 uppercase tracking-[0.3em]">Event Overview</th>
                    <th className="p-8 text-[11px] font-black text-slate-800 dark:text-slate-400 uppercase tracking-[0.3em]">Schedule</th>
                    <th className="p-8 text-[11px] font-black text-slate-800 dark:text-slate-400 uppercase tracking-[0.3em] text-center">Enrollment</th>
                    <th className="p-8 text-[11px] font-black text-slate-800 dark:text-slate-400 uppercase tracking-[0.3em] text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-700">
                  {filteredEvents.map((event) => (
                    <tr key={event._id} className="group hover:bg-slate-50 dark:hover:bg-slate-900 transition-all duration-300">
                      <td className="p-8">
                        <div className="flex flex-col">
                          <span className="font-black text-slate-900 dark:text-white text-lg tracking-tight italic leading-none uppercase group-hover:text-indigo-600 transition-colors">{event.title}</span>
                          <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mt-2 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-lg w-fit border border-indigo-100 dark:border-indigo-800">{event.category}</span>
                        </div>
                      </td>
                      <td className="p-8">
                        <div className="flex flex-col gap-1.5 font-bold text-slate-700 dark:text-slate-400">
                          <span className="text-sm">{new Date(event.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                          <span className="text-[10px] font-black uppercase text-slate-400 italic tracking-widest flex items-center gap-1"><Clock size={12}/>{event.time || "10:00 AM"}</span>
                        </div>
                      </td>
                      <td className="p-8">
                        <div className="flex justify-center">
                          <div className="flex flex-col items-center bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm min-w-[100px] group-hover:border-indigo-200">
                             <span className="text-2xl font-black text-slate-900 dark:text-white leading-none">{event.attendees?.length || 0}</span>
                             <span className="text-[9px] font-black text-slate-400 uppercase mt-1 italic">Students</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-8">
                        <div className="flex justify-end gap-3">
                          <button onClick={() => navigate(`/admin/view-participants/${event._id}`)} className="p-4 text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-600 hover:text-white rounded-2xl transition-all shadow-sm border border-emerald-100 dark:border-emerald-800"><Eye size={18} /></button>
                          <button onClick={() => navigate(`/admin/edit-event/${event._id}`)} className="p-4 text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-600 hover:text-white rounded-2xl transition-all shadow-sm border border-indigo-100 dark:border-indigo-800"><Edit size={18} /></button>
                          <button onClick={() => handleDelete(event._id)} className="p-4 text-red-500 bg-red-50 dark:bg-red-900/20 hover:bg-red-600 hover:text-white rounded-2xl transition-all shadow-sm border border-red-100 dark:border-red-800"><Trash2 size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;