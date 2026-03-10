import React, { useState } from 'react';
import { User, Mail, Lock, CheckCircle, GraduationCap, ArrowLeft, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: '',
    year: '',
    division: '', 
    rollNo: ''    
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const divInput = formData.division.toUpperCase();
    const validDivs = ['A', 'B', 'C', 'D'];
    if (!validDivs.includes(divInput)) {
      alert("Invalid Division! Please enter A, B, C, or D. ❌");
      return;
    }

    const rollNum = parseInt(formData.rollNo);
    if (isNaN(rollNum) || rollNum < 1 || rollNum > 100) {
      alert("Invalid Roll No! Enter a number between 1 and 100. ❌");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        ...formData,
        division: divInput,
        rollNo: rollNum,
        role: 'student'
      });

      if (response.status === 201) {
        alert("Registration Successful! 🎉");
        navigate('/login');
      }
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed! ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      {/* 🔙 Back to Home */}
      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold transition-all">
        <ArrowLeft size={20} /> Back
      </Link>

      <div className="bg-white w-full max-w-4xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-200">
        
        {/* Left Side: Professional Blue Banner */}
        <div className="md:w-5/12 bg-blue-600 p-12 text-white flex flex-col justify-between relative">
          <div>
            <div className="bg-white/20 w-14 h-14 rounded-xl flex items-center justify-center mb-8 backdrop-blur-md">
              <GraduationCap size={32} />
            </div>
            <h1 className="text-4xl font-black tracking-tight leading-tight mb-4">
              Join the <br /> Community.
            </h1>
            <p className="text-blue-100 font-medium text-sm">
              Create an account to browse upcoming events, workshops, and campus activities.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl border border-white/10">
              <Sparkles size={18} className="text-blue-200" />
              <p className="text-xs font-bold uppercase tracking-wider">Official Event Portal</p>
            </div>
          </div>
        </div>

        {/* Right Side: Simple Form */}
        <div className="md:w-7/12 p-8 md:p-12 bg-white">
          <div className="mb-10">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-1">Create Account</h2>
            <p className="text-slate-400 text-sm font-medium">Please fill in your details to register.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 text-slate-300 w-5 h-5" />
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:bg-white outline-none transition-all" placeholder="Enter your full name" required />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-slate-300 w-5 h-5" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:bg-white outline-none transition-all" placeholder="email@university.edu" required />
              </div>
            </div>

            {/* Div & RollNo (Simple - No Icons) */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Division</label>
                <input type="text" name="division" maxLength="1" value={formData.division} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:bg-white outline-none transition-all uppercase" placeholder="e.g. A" required />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Roll No</label>
                <input type="number" name="rollNo" value={formData.rollNo} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:bg-white outline-none transition-all" placeholder="1-100" required />
              </div>
            </div>

            {/* Dept & Year */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Department</label>
                <select name="department" value={formData.department} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:bg-white outline-none transition-all cursor-pointer" required>
                  <option value="">Select</option>
                  <option value="cs">Computer Science</option>
                  <option value="it">Information Tech</option>
                  <option value="mech">Mechanical</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Year</label>
                <select name="year" value={formData.year} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:bg-white outline-none transition-all cursor-pointer" required>
                  <option value="">Select</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>
            </div>

            {/* Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 text-slate-300 w-5 h-5" />
                  <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:bg-white outline-none transition-all" placeholder="••••••••" required />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Confirm</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 text-slate-300 w-5 h-5" />
                  <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:bg-white outline-none transition-all" placeholder="••••••••" required />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all shadow-lg shadow-blue-100 mt-4 active:scale-95`}
            >
              {loading ? "Registering..." : "Create Account"}
            </button>
            
            <p className="text-center text-xs font-bold text-slate-400">
              Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;