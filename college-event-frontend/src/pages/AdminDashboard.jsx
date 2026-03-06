import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Calendar, Users, Plus, Trash2, Edit, LogOut } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
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

  // 🔥 DELETE LOGIC
  const handleDelete = async (id) => {
    if (window.confirm("Bhai, kya sach mein is event ko udaana hai? 🗑️")) {
      try {
        await axios.delete(`http://localhost:5000/api/events/${id}`);
        setEvents(events.filter(event => event._id !== id));
        alert("Event successfully deleted!");
      } catch (err) {
        alert("Delete fail ho gaya!");
      }
    }
  };

  if (loading) return <div className="p-10 text-center font-bold">Loading Admin Power...</div>;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar (Shortened for brevity) */}
      <aside className="w-64 bg-indigo-900 text-white p-6 hidden lg:block">
        <div className="flex items-center gap-2 mb-10">
          <LayoutDashboard className="text-indigo-400" />
          <span className="text-xl font-bold">Admin Panel</span>
        </div>
        <nav className="space-y-4">
          <Link to="/admin/dashboard" className="block p-3 bg-indigo-800 rounded-xl font-bold">Events List</Link>
          <button onClick={() => { localStorage.clear(); navigate('/login'); }} className="flex items-center gap-2 text-red-300 p-3 hover:text-red-100"><LogOut size={20}/> Logout</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black text-slate-800">Manage Events</h1>
          <Link to="/admin/add-event" className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition shadow-lg shadow-indigo-100">
            <Plus size={20} /> Create New Event
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="p-4 font-bold text-slate-600">Event Name</th>
                <th className="p-4 font-bold text-slate-600">Date</th>
                <th className="p-4 font-bold text-slate-600">Attendees</th>
                <th className="p-4 font-bold text-slate-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                  <td className="p-4">
                    <p className="font-bold text-slate-800">{event.title}</p>
                    <p className="text-xs text-slate-500">{event.category}</p>
                  </td>
                  <td className="p-4 text-slate-600 text-sm">{event.date}</td>
                  <td className="p-4">
                    <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold">
                      {event.attendees?.length || 0} Registered
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    {/* 🔥 EDIT BUTTON */}
                    <button 
                      onClick={() => navigate(`/admin/edit-event/${event._id}`)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition inline-block"
                    >
                      <Edit size={18} />
                    </button>
                    {/* 🔥 DELETE BUTTON */}
                    <button 
                      onClick={() => handleDelete(event._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition inline-block"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;