import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  LayoutDashboard, Calendar, User, LogOut, Menu, X, MapPin, Clock, Users, Bell, Search, Filter 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // 'all' ya 'my-registrations'
  const [searchTerm, setSearchTerm] = useState(''); // Search state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!token || !storedUser) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(storedUser));
    fetchEvents();
  }, [navigate]);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/events');
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (eventId) => {
    try {
      const studentId = user.id || user._id;
      const res = await axios.post(`http://localhost:5000/api/events/${eventId}/register`, { studentId });
      alert(res.data.message || "Registration Successful! 🎉");
      fetchEvents(); 
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed!");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  // 🔥 Point 1: Search Logic
  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🔥 Point 2: Tabs Filter Logic
  const displayEvents = activeTab === 'all' 
    ? filteredEvents 
    : filteredEvents.filter(event => event.attendees?.includes(user?.id || user?._id));

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 text-blue-600 font-bold italic">
      UniEvents is loading... 🚀
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static`}>
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="bg-blue-600 p-2 rounded-lg text-white"><Calendar size={24} /></div>
            <span className="font-bold text-xl text-slate-800 tracking-tight">UniEvents</span>
          </div>
          <nav className="flex-1 space-y-2">
            <button onClick={() => setActiveTab('all')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'all' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}>
              <LayoutDashboard size={20} /> Browse Events
            </button>
            <button onClick={() => setActiveTab('my-registrations')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'my-registrations' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}>
              <Bell size={20} /> My Registrations
            </button>
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 mt-auto font-medium">
              <LogOut size={20} /> Logout
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center px-8 border-b border-slate-100">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden p-2 bg-slate-100 rounded-lg"><Menu /></button>
          
          {/* 🔥 Search Bar in Header */}
          <div className="hidden md:flex items-center bg-slate-100 px-4 py-2 rounded-xl w-96 gap-2">
            <Search size={18} className="text-slate-400" />
            <input 
              type="text" 
              placeholder="Search events, tech, sports..." 
              className="bg-transparent outline-none w-full text-sm text-slate-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-800">{user?.fullName}</p>
              <p className="text-[10px] text-blue-600 font-black uppercase tracking-wider">{user?.role}</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-100">
              {user?.fullName?.split(' ').map(n => n[0]).join('').toUpperCase()}
            </div>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-slate-800">
              {activeTab === 'all' ? `Hey ${user?.fullName?.split(' ')[0]}! Find your next event.` : 'Your Registered Events'}
            </h2>
            <p className="text-slate-500 text-sm">Showing {displayEvents.length} events matching your interest.</p>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden mb-6 flex items-center bg-white border border-slate-200 px-4 py-3 rounded-xl gap-2 shadow-sm">
            <Search size={18} className="text-slate-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="outline-none w-full text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayEvents.length > 0 ? displayEvents.map((event) => {
              const isRegistered = event.attendees?.includes(user.id || user._id);

              return (
                <div key={event._id} className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="bg-slate-100 p-4 flex justify-between items-center border-b border-slate-50">
                    <span className="bg-blue-600 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                      {event.category}
                    </span>
                    <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                      <Clock size={12} /> Upcoming
                    </p>
                  </div>
                  
                  <div className="p-7">
                    <h4 className="text-xl font-bold text-slate-800 mb-3 leading-tight h-14 line-clamp-2">{event.title}</h4>
                    
                    <div className="space-y-3 text-sm text-slate-500 mb-8">
                      <p className="flex items-center gap-3"><Calendar size={16} className="text-blue-500" /> {event.date}</p>
                      <p className="flex items-center gap-3"><MapPin size={16} className="text-blue-500" /> {event.location}</p>
                      <p className="flex items-center gap-3"><Users size={16} className="text-blue-500" /> {event.attendees?.length || 0} attending</p>
                    </div>

                    <button 
                      onClick={() => handleRegister(event._id)}
                      disabled={isRegistered}
                      className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all transform active:scale-95 ${
                        isRegistered 
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100 cursor-not-allowed' 
                        : 'bg-slate-900 text-white hover:bg-blue-600 shadow-xl shadow-slate-100'
                      }`}
                    >
                      {isRegistered ? "Already Joined ✓" : "Join Event 🚀"}
                    </button>
                  </div>
                </div>
              );
            }) : (
              <div className="col-span-full text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
                <p className="text-slate-400 font-bold text-lg mb-2">Empty Space! 🌌</p>
                <p className="text-slate-400 text-sm">Aapne abhi koi event {activeTab === 'all' ? 'post hote nahi dekha' : 'join nahi kiya hai'}.</p>
                {activeTab === 'my-registrations' && (
                  <button onClick={() => setActiveTab('all')} className="mt-4 text-blue-600 font-bold underline">Browse all events</button>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;