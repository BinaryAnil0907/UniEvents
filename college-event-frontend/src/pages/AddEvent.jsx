import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, Tag } from 'lucide-react';
import axios from 'axios';

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '', description: '', date: '', time: '', location: '', category: 'Technology'
  });

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/events/${id}`);
        // 🔥 Date Formatting: ISO string se YYYY-MM-DD nikalna zaroori hai
        const rawDate = res.data.date;
        const formattedDate = rawDate ? new Date(rawDate).toISOString().split('T')[0] : '';
        
        setFormData({ ...res.data, date: formattedDate });
      } catch (err) {
        console.error(err);
        alert("Bhai, event data load nahi ho raha! Check backend.");
      }
    };
    if (id) fetchEvent();
  }, [id]);

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
      <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100">
        <div className="bg-indigo-700 md:w-1/3 p-10 text-white flex flex-col justify-center">
          <button onClick={() => navigate('/admin/dashboard')} className="flex items-center gap-2 mb-10 hover:bg-white/10 w-fit p-2 rounded-lg transition">
            <ArrowLeft size={20}/> Back
          </button>
          <h2 className="text-4xl font-black mb-4">Edit Event</h2>
          <p className="text-indigo-100">Update the details. Past dates are blocked.</p>
        </div>

        <form onSubmit={handleSubmit} className="md:w-2/3 p-10 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Title</label>
              <input className="w-full p-4 bg-slate-50 border rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
            </div>

            <div>
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Description</label>
              <textarea className="w-full p-4 bg-slate-50 border rounded-2xl h-32 focus:ring-2 focus:ring-indigo-500 outline-none" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 text-[10px]">Date (Min: Today)</label>
                <input type="date" min={today} className="w-full p-4 bg-slate-50 border rounded-2xl outline-none" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} required />
              </div>
              <div>
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Time</label>
                <input type="time" className="w-full p-4 bg-slate-50 border rounded-2xl outline-none" value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} required />
              </div>
            </div>

            <div>
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Location</label>
              <input className="w-full p-4 bg-slate-50 border rounded-2xl outline-none" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} required />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition active:scale-95">
            {loading ? "Saving Changes..." : "Update Event ✨"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEvent;