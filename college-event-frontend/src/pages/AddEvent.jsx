import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { PlusCircle, Calendar, MapPin, Clock, Tag, AlignLeft, ArrowLeft } from 'lucide-react';

import axios from 'axios';



const AddEvent = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({

    title: '',

    description: '',

    date: '',

    time: '',

    location: '',

    category: 'Technology'

  });



  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const res = await axios.post('http://localhost:5000/api/events', formData);

      alert("Event Added Successfully! 🚀");

      navigate('/admin/dashboard'); // Event banne ke baad admin dashboard pe wapis

    } catch (err) {

      alert(err.response?.data?.message || "Failed to add event");

    } finally {

      setLoading(false);

    }

  };



  return (

    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">

      <div className="bg-white w-full max-w-4xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100">

       

        {/* Left Side: Instructions */}

        <div className="bg-indigo-600 md:w-1/3 p-10 text-white flex flex-col justify-center">

          <button

            onClick={() => navigate('/admin/dashboard')}

            className="flex items-center gap-2 text-indigo-100 mb-12 hover:text-white transition-all w-fit"

          >

            <ArrowLeft size={20} /> Back to Panel

          </button>

          <h2 className="text-4xl font-black mb-6 leading-tight">Post a New Event</h2>

          <p className="text-indigo-100 leading-relaxed">Fill out the details to announce a new activity. All students will see this on their dashboard.</p>

        </div>



        {/* Right Side: Form */}

        <form onSubmit={handleSubmit} className="md:w-2/3 p-10 grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="md:col-span-2">

            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Event Title</label>

            <input

              type="text"

              placeholder="e.g. Annual Tech Fest 2026"

              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"

              onChange={(e) => setFormData({...formData, title: e.target.value})}

              required

            />

          </div>



          <div className="md:col-span-2">

            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Description</label>

            <textarea

              placeholder="Describe what the event is about..."

              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none h-32 resize-none"

              onChange={(e) => setFormData({...formData, description: e.target.value})}

              required

            />

          </div>



          <div>

            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Date</label>

            <input

              type="date"

              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none"

              onChange={(e) => setFormData({...formData, date: e.target.value})}

              required

            />

          </div>



          <div>

            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Time</label>

            <input

              type="time"

              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none"

              onChange={(e) => setFormData({...formData, time: e.target.value})}

              required

            />

          </div>



          <div>

            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Location</label>

            <input

              type="text"

              placeholder="Auditorium / Lab 101"

              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none"

              onChange={(e) => setFormData({...formData, location: e.target.value})}

              required

            />

          </div>



          <div>

            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Category</label>

            <select

              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none appearance-none"

              onChange={(e) => setFormData({...formData, category: e.target.value})}

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

            className="md:col-span-2 bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all transform hover:-translate-y-1 active:scale-95 disabled:bg-indigo-300"

          >

            {loading ? "Publishing..." : "Launch Event 🚀"}

          </button>

        </form>

      </div>

    </div>

  );

};



export default AddEvent;

