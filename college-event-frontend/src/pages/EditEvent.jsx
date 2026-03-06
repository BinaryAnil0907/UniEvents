import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '', description: '', date: '', time: '', location: '', category: 'Technology'
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/events/${id}`);
        setFormData(res.data);
      } catch (err) {
        alert("Error loading event data");
      }
    };
    fetchEvent();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`http://localhost:5000/api/events/${id}`, formData);
      alert("Event Updated Successfully! ✨");
      navigate('/admin/dashboard');
    } catch (err) {
      alert("Update failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-4xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100">
        <div className="bg-blue-700 md:w-1/3 p-10 text-white flex flex-col justify-center">
          <button onClick={() => navigate('/admin/dashboard')} className="flex items-center gap-2 mb-10 hover:underline"><ArrowLeft size={20}/> Back</button>
          <h2 className="text-4xl font-black mb-4">Edit Event</h2>
          <p className="text-blue-100">Modify the details of your event here.</p>
        </div>
        <form onSubmit={handleSubmit} className="md:w-2/3 p-10 space-y-4">
          <input className="w-full p-4 bg-slate-50 border rounded-2xl" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="Event Title" required />
          <textarea className="w-full p-4 bg-slate-50 border rounded-2xl h-32" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Description" required />
          <div className="grid grid-cols-2 gap-4">
            <input type="date" className="w-full p-4 bg-slate-50 border rounded-2xl" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} required />
            <input type="time" className="w-full p-4 bg-slate-50 border rounded-2xl" value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} required />
          </div>
          <input className="w-full p-4 bg-slate-50 border rounded-2xl" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} placeholder="Location" required />
          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition">
            {loading ? "Updating..." : "Update Event ✨"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEvent;