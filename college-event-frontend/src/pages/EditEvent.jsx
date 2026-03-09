import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import axios from 'axios';

const AddEvent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // 1. Initial State (Ekdum khali)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: 'Technology'
  });

  const today = new Date().toISOString().split('T')[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ Yahan POST request hai, aur koi ID nahi hai URL mein
      await axios.post('http://localhost:5000/api/events', formData);
      alert("Success: The event has been published! 🚀");
      navigate('/admin/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100">
        
        {/* Left Side: Instructions */}
        <div className="bg-indigo-600 md:w-1/3 p-10 text-white flex flex-col justify-center">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="flex items-center gap-2 text-indigo-100 mb-12 hover:text-white transition-all w-fit font-bold"
          >
            <ArrowLeft size={20} /> Back
          </button>
          <h2 className="text-4xl font-black mb-6 leading-tight">Post New Event</h2>
          <p className="text-indigo-100">Make sure to fill all fields for the students.</p>
        </div>

        {/* Right Side: Fresh Form */}
        <form onSubmit={handleSubmit} className="md:w-2/3 p-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-xs font-black text-slate-400 uppercase mb-2">Event Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter event name..."
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-black text-slate-400 uppercase mb-2">Description</label>
            <textarea
              name="description"
              placeholder="What is this event about?"
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl h-32 resize-none outline-none"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-black text-slate-400 uppercase mb-2">Date</label>
            <input
              type="date"
              name="date"
              min={today}
              className="w-full p-4 bg-slate-50 border rounded-2xl outline-none"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-black text-slate-400 uppercase mb-2">Time</label>
            <input
              type="time"
              name="time"
              className="w-full p-4 bg-slate-50 border rounded-2xl outline-none"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition active:scale-95 shadow-xl shadow-indigo-100"
          >
            {loading ? "Publishing..." : "Launch Event 🚀"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;