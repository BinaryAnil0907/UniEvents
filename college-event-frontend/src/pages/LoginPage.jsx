import React, { useState } from 'react';
import { Users, LayoutDashboard, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [role, setRole] = useState('student'); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const primaryColor = role === 'admin' ? 'bg-indigo-600' : 'bg-blue-600';
  const accentText = role === 'admin' ? 'text-indigo-600' : 'text-blue-600';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // API call (Humein sirf email/password bhejna hai, role hum yahan check karenge)
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      
      const loggedInUser = res.data.user;

      // 🔥 ROLE SECURITY CHECK:
      // Agar DB ka role aur toggle wala role match nahi karte toh error dikhao
      if (loggedInUser.role.toLowerCase() !== role.toLowerCase()) {
        alert(`Access Denied! Aapka account as a "${loggedInUser.role}" registered hai. Please sahi switch select karein.`);
        setLoading(false);
        return;
      }

      // Token aur User save karo
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(loggedInUser));

      alert(`${role.charAt(0).toUpperCase() + role.slice(1)} Login Successful! 🎉`);
      
      // Redirect logic
      if (loggedInUser.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }

    } catch (err) {
      alert(err.response?.data?.message || "Login Failed! Check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className={`hidden lg:flex w-1/2 items-center justify-center relative transition-colors duration-500 ${role === 'admin' ? 'bg-indigo-900' : 'bg-blue-900'}`}>
        <div className="z-10 text-center px-10">
          <h1 className="text-5xl font-bold text-white mb-4">UniEvents Portal</h1>
          <p className="text-blue-100 text-lg max-w-md mx-auto">Your gateway to campus life.</p>
        </div>
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Sign In</h2>
          <p className="text-slate-500 mb-8 font-medium">Access your <span className={accentText}>{role}</span> dashboard</p>

          <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-8 shadow-inner">
            <button type="button" onClick={() => setRole('student')} className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${role === 'student' ? 'bg-white shadow-md text-blue-600' : 'text-slate-500'}`}>
              <Users className="w-4 h-4" /> Student
            </button>
            <button type="button" onClick={() => setRole('admin')} className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${role === 'admin' ? 'bg-white shadow-md text-indigo-600' : 'text-slate-500'}`}>
              <LayoutDashboard className="w-4 h-4" /> Admin
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-slate-50" placeholder="zoro@gmail.com" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 pr-12 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-slate-50" placeholder="••••••••" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-slate-400">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className={`w-full ${primaryColor} text-white py-4 rounded-xl font-bold shadow-lg transition-all disabled:opacity-70`}>
              {loading ? "Verifying..." : `Login as ${role === 'admin' ? 'Administrator' : 'Student'}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;