import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, Tag, FileText, Sparkles } from 'lucide-react';
import axios from 'axios';

const EditEvent = () => {
  const { id } = useParams(); // URL se ID nikalna
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '', description: '', date: '', time: '', location: '', category: 'Technology'
  });

  const today = new Date().toISOString().split('T')[0];
  const currentTime = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  useEffect(() => {
    // 🔥 Sabse Important Check: Agar ID nahi hai toh fetch mat karo
    if (!id) {
      console.error("No ID found in URL parameters");
      return;
    }

    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/events/${id}`);
        const formattedDate = res.data.date ? new Date(res.data.date).toISOString().split('T')[0] : '';
        setFormData({ ...res.data, date: formattedDate });
      } catch (err) {
        alert("Bhai, event data load nahi ho raha! Redirecting...");
        navigate('/admin/dashboard');
      }
    };
    fetchEvent();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`http://localhost:5000/api/events/${id}`, formData);
      alert("Event Updated Successfully! ✨");
      navigate('/admin/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || "Update failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-5xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100">
        
        <div className="bg-indigo-950 md:w-1/3 p-10 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-600 rounded-full blur-3xl opacity-20"></div>
          
          <div className="relative z-10">
            <button onClick={() => navigate('/admin/dashboard')} className="flex items-center gap-2 text-indigo-300 mb-12 hover:text-white transition-all group font-bold">
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
              Back to Dashboard
            </button>
            <h2 className="text-4xl font-black mb-6 leading-tight tracking-tight">Modify Event.</h2>
            <p className="text-indigo-200/70 text-lg">Changes made here will be visible to students instantly.</p>
          </div>
          
          <div className="bg-indigo-900/50 p-6 rounded-2xl border border-indigo-700/30 relative z-10">
            <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-2">Editor Mode</p>
            <p className="text-sm italic text-indigo-100">"Check the time carefully before saving."</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="md:w-2/3 p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white">
          <div className="md:col-span-2">
            <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2"><Sparkles size={14} className="text-indigo-600"/> Title</label>
            <input type="text" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all font-medium" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2"><FileText size={14} className="text-indigo-600"/> Description</label>
            <textarea className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl h-32 resize-none focus:ring-2 focus:ring-indigo-600 outline-none font-medium" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required />
          </div>

          <div>
            <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2"><Calendar size={14} className="text-indigo-600"/> Date</label>
            <input type="date" min={today} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 font-medium" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} required />
          </div>

          <div>
            <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2"><Clock size={14} className="text-indigo-600"/> Time</label>
            <input type="time" min={formData.date === today ? currentTime : ""} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 font-medium" value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} required />
          </div>

          <div>
            <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2"><MapPin size={14} className="text-indigo-600"/> Location</label>
            <input type="text" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 font-medium" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} required />
          </div>

          <div>
            <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2"><Tag size={14} className="text-indigo-600"/> Category</label>
            <select className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 font-medium" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
              <option value="Technology">Technology</option>
              <option value="Culture">Culture</option>
              <option value="Sports">Sports</option>
              <option value="Workshop">Workshop</option>
            </select>
          </div>

          <button type="submit" disabled={loading} className="md:col-span-2 bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95 disabled:bg-slate-300">
            {loading ? "Syncing..." : "Update Event ✨"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEvent;