import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Calendar, Clock, MapPin, Tag, FileText } from 'lucide-react';
import axios from 'axios';

const AddEvent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // 1. Initial State - Naye event ke liye khali form
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
      // ✅ Yahan POST request use hogi naye data ke liye
      await axios.post('http://localhost:5000/api/events', formData);
      alert("Success: Event Published! 🚀");
      navigate('/admin/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-5xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100">
        
        {/* Left Branding Panel */}
        <div className="bg-indigo-600 md:w-1/3 p-10 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <button 
              onClick={() => navigate('/admin/dashboard')} 
              className="flex items-center gap-2 text-indigo-100 mb-12 hover:text-white transition-all group font-bold"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
              Back
            </button>
            <h2 className="text-4xl font-black mb-6 leading-tight tracking-tight">Post New Event.</h2>
            <p className="text-indigo-100/80 text-lg">Create an exciting activity for your students.</p>
          </div>

          <div className="bg-white/10 p-6 rounded-2xl border border-white/20 relative z-10">
            <p className="text-[10px] font-black uppercase tracking-widest text-indigo-200 mb-2">Notice</p>
            <p className="text-sm italic">"Events will be visible to all registered students instantly."</p>
          </div>
        </div>

        {/* Right Form Panel */}
        <form onSubmit={handleSubmit} className="md:w-2/3 p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white">
          <div className="md:col-span-2">
            <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
              <Sparkles size={14} className="text-indigo-600"/> Event Title
            </label>
            <input 
              name="title"
              type="text" 
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all font-medium" 
              placeholder="e.g. Annual Tech Fest"
              value={formData.title} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
              <FileText size={14} className="text-indigo-600"/> Description
            </label>
            <textarea 
              name="description"
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl h-32 resize-none focus:ring-2 focus:ring-indigo-600 outline-none font-medium" 
              placeholder="What is this event about?"
              value={formData.description} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
              <Calendar size={14} className="text-indigo-600"/> Date
            </label>
            <input 
              name="date"
              type="date" 
              min={today} 
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 font-medium" 
              value={formData.date} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
              <Clock size={14} className="text-indigo-600"/> Time
            </label>
            <input 
              name="time"
              type="time" 
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 font-medium" 
              value={formData.time} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
              <MapPin size={14} className="text-indigo-600"/> Location
            </label>
            <input 
              name="location"
              type="text" 
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 font-medium" 
              placeholder="e.g. Lab 101"
              value={formData.location} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
              <Tag size={14} className="text-indigo-600"/> Category
            </label>
            <select 
              name="category"
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 font-medium" 
              value={formData.category} 
              onChange={handleChange}
            >
              <option value="Technology">Technology</option>
              <option value="Culture">Culture</option>
              <option value="Sports">Sports</option>
              <option value="Workshop">Workshop</option>
            </select>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="md:col-span-2 bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95 disabled:bg-slate-300"
          >
            {loading ? "Publishing..." : "Launch Event 🚀"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;