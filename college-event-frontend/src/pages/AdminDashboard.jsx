import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Calendar, Users, Plus, Trash2, Edit, LogOut, Search, ChevronRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

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
    if (window.confirm("Bhai, kya sach mein is event ko udaana hai? 🗑️")) {
      try {
        await axios.delete(`http://localhost:5000/api/events/${id}`);
        setEvents(events.filter(event => event._id !== id));
        alert("Event successfully deleted! ✅");
      } catch (err) {
        alert("Delete fail ho gaya! ❌");
      }
    }
  };

  // Filter events based on search
  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="font-bold text-slate-600 animate-pulse">Loading Admin Power...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-indigo-950 text-white p-8 hidden lg:flex flex-col border-r border-indigo-900">
        <div className="flex items-center gap-3 mb-12">
          <div className="p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-500/30">
            <LayoutDashboard size={24} className="text-white" />
          </div>
          <span className="text-2xl font-black tracking-tight">UniEvents</span>
        </div>
        
        <nav className="flex-1 space-y-2">
          <Link to="/admin/dashboard" className="flex items-center gap-3 p-4 bg-indigo-600/20 text-indigo-400 rounded-2xl border border-indigo-400/20 font-bold transition-all">
            <Calendar size={20} /> Events List
          </Link>
          <Link to="/admin/add-event" className="flex items-center gap-3 p-4 text-indigo-200/60 hover:bg-indigo-800/40 rounded-2xl font-medium transition-all group">
            <Plus size={20} className="group-hover:rotate-90 transition-transform" /> Add New Event
          </Link>
        </nav>

        <button 
          onClick={() => { localStorage.clear(); navigate('/login'); }} 
          className="flex items-center gap-3 text-red-400 p-4 hover:bg-red-500/10 rounded-2xl transition-all font-bold mt-auto"
        >
          <LogOut size={20}/> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Manage Events</h1>
            <p className="text-slate-500 font-medium">Welcome back, Admin! Here's what's happening.</p>
          </div>
          <Link to="/admin/add-event" className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 hover:-translate-y-1 active:scale-95">
            <Plus size={22} /> Create Event
          </Link>
        </div>

        {/* Stats Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">Total Events</p>
            <h3 className="text-3xl font-black text-slate-800">{events.length}</h3>
          </div>
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">Total Registrations</p>
            <h3 className="text-3xl font-black text-indigo-600">
              {events.reduce((acc, event) => acc + (event.attendees?.length || 0), 0)}
            </h3>
          </div>
        </div>

        {/* Search & Table Card */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-white flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search events..." 
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50">
                <tr>
                  <th className="p-6 font-black text-slate-400 uppercase text-[10px] tracking-widest">Event Info</th>
                  <th className="p-6 font-black text-slate-400 uppercase text-[10px] tracking-widest">Date & Time</th>
                  <th className="p-6 font-black text-slate-400 uppercase text-[10px] tracking-widest">Attendees</th>
                  <th className="p-6 font-black text-slate-400 uppercase text-[10px] tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.length > 0 ? filteredEvents.map((event) => (
                  <tr key={event._id} className="border-t border-slate-50 hover:bg-slate-50/80 transition-all group">
                    <td className="p-6">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-800 text-lg group-hover:text-indigo-600 transition-colors">{event.title}</span>
                        <span className="text-xs font-bold text-indigo-500 bg-indigo-50 w-fit px-2 py-0.5 rounded-md mt-1">{event.category}</span>
                      </div>
                    </td>
                    <td className="p-6 text-slate-600 font-medium">
                      <div className="flex flex-col">
                        <span>{new Date(event.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                        <span className="text-xs text-slate-400">{event.time || "Time not set"}</span>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-slate-400" />
                        <span className="font-black text-slate-700">{event.attendees?.length || 0}</span>
                      </div>
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => navigate(`/admin/edit-event/${event._id}`)}
                          className="p-3 text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all"
                          title="Edit Event"
                        >
                          <Edit size={20} />
                        </button>
                        <button 
                          onClick={() => handleDelete(event._id)}
                          className="p-3 text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                          title="Delete Event"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="4" className="p-20 text-center text-slate-400 font-medium italic">
                      No events found. Time to create some magic! ✨
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;