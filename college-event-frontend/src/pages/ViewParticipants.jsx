import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Mail, Download, Search, UserCheck, 
  ShieldCheck, Printer, Sun, Moon, Sparkles, Users, CheckCircle2 
} from 'lucide-react'; // 🔥 Sparkles aur baaki missing icons yahan add kar diye hain
import axios from 'axios';

const ViewParticipants = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('admin-theme') === 'dark';
  });

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/events/${id}`);
        setEvent(res.data);
      } catch (err) { 
        alert("Error loading list"); 
      } finally { 
        setLoading(false); 
      }
    };
    fetchParticipants();
  }, [id]);

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  const filteredStudents = event?.attendees?.filter(student => 
    student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const downloadCSV = () => {
    const headers = ["Name, Email, Roll No, Division\n"];
    const rows = event.attendees.map(s => `${s.fullName}, ${s.email}, ${s.rollNo}, ${s.division}\n`);
    const blob = new Blob([headers, ...rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${event.title}_Participants.csv`;
    a.click();
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-950 text-indigo-600 font-black italic uppercase">
       Loading Records... 🚀
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-10 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => navigate('/admin/dashboard')} 
            className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-black uppercase text-xs tracking-widest hover:text-indigo-600 transition-all"
          >
            <ArrowLeft size={18} /> Back
          </button>
          
          <div className="flex gap-3">
             <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-3 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-yellow-400">
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
             </button>
             <button onClick={downloadCSV} className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-indigo-100 dark:shadow-none">
               <Download size={16} /> Export CSV
             </button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl shadow-slate-200/50 dark:shadow-none overflow-hidden border border-slate-100 dark:border-slate-800 mb-10">
          <div className="bg-indigo-950 p-10 md:p-14 text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-white/10">
                <ShieldCheck size={14} className="text-emerald-400" /> Verified List
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter italic uppercase leading-tight mb-2">
                {event?.title}
              </h1>
              <div className="flex items-center gap-2 mt-6">
                <UserCheck className="text-indigo-400" size={20} />
                <span className="text-2xl font-black italic">{event?.attendees?.length || 0}</span>
                <span className="text-[10px] font-black uppercase text-indigo-300 tracking-[0.2em] ml-2">Registered Students</span>
              </div>
            </div>
            <Sparkles className="absolute right-10 top-10 w-40 h-40 text-white/5 -rotate-12" />
          </div>

          <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
             <div className="relative w-full max-w-md group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder="Search participants..." 
                  className="w-full pl-12 pr-6 py-4 bg-slate-50 dark:bg-slate-950 dark:text-white border border-slate-100 dark:border-slate-800 rounded-[1.5rem] focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all font-bold text-sm"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
               <Printer size={14} /> Records Office Copy
             </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-950/50 border-b border-slate-50 dark:border-slate-800">
                  <th className="p-8 text-[11px] font-black text-slate-800 dark:text-slate-400 uppercase tracking-[0.3em]">Student Profile</th>
                  <th className="p-8 text-[11px] font-black text-slate-800 dark:text-slate-400 uppercase tracking-[0.3em]">Contact Details</th>
                  <th className="p-8 text-[11px] font-black text-slate-800 dark:text-slate-400 uppercase tracking-[0.3em] text-right">Academic Id</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {filteredStudents?.length > 0 ? filteredStudents.map((student, index) => (
                  <tr key={index} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all duration-300">
                    <td className="p-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-black text-sm border border-indigo-100 dark:border-indigo-800 uppercase shadow-sm">
                          {student.fullName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-black text-slate-900 dark:text-white text-lg tracking-tight italic uppercase group-hover:text-indigo-600 transition-colors leading-none">
                            {student.fullName}
                          </p>
                          <p className="text-[9px] font-black text-indigo-500 uppercase tracking-widest mt-2">Active Attendee</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-8">
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-bold text-sm">
                        <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-400"><Mail size={14}/></div>
                        {student.email}
                      </div>
                    </td>
                    <td className="p-8">
                      <div className="flex items-center justify-end gap-3">
                        <span className="bg-slate-900 dark:bg-white/10 text-white px-4 py-2 rounded-xl text-[10px] font-black tracking-widest uppercase shadow-sm">
                          Roll: {student.rollNo}
                        </span>
                        <span className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-[10px] font-black tracking-widest uppercase shadow-lg shadow-indigo-100 dark:shadow-none">
                          Div: {student.division}
                        </span>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="3" className="p-32 text-center">
                       <div className="flex flex-col items-center opacity-30">
                          <Users size={48} className="mb-4 text-slate-400" />
                          <p className="font-black uppercase tracking-widest text-xs italic text-slate-400">No students found</p>
                       </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-center text-slate-400 dark:text-slate-600 text-[9px] font-black uppercase tracking-[0.5em] mt-10">
          Powered by UniEvents Engine • 2026
        </p>
      </div>
    </div>
  );
};

export default ViewParticipants;