import React, { useState } from 'react';
import { User, Mail, Lock, CheckCircle, GraduationCap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // 1. Axios import kiya

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: '',
    year: ''
  });

  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      // 2. API Call - Backend URL (Port 5000)
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        department: formData.department,
        year: formData.year,
        role: 'student' // Default role
      });

      if (response.status === 201) {
        alert("Registration Successful! 🎉");
        navigate('/login'); // Login page par bhej do
      }
    } catch (err) {
      // Error handling
      alert(err.response?.data?.message || "Registration Failed! ❌");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-blue-600 p-6 text-center">
          <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
            <GraduationCap /> Student Register
          </h2>
          <p className="text-blue-100 text-sm mt-1">Join your college event hub</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 text-slate-400 w-5 h-5" />
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="John Doe" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">University Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 text-slate-400 w-5 h-5" />
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="student@uni.edu" required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
              <select name="department" value={formData.department} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required>
                <option value="">Select</option>
                <option value="cs">Computer Science</option>
                <option value="it">Information Tech</option>
                <option value="mech">Mechanical</option>
                <option value="civil">Civil</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Year</label>
              <select name="year" value={formData.year} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required>
                <option value="">Select</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 text-slate-400 w-5 h-5" />
              <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 text-slate-400 w-5 h-5" />
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2`}
          >
            <CheckCircle className="w-5 h-5" /> {loading ? "Creating..." : "Create Student Account"}
          </button>
          
          <p className="text-center text-sm text-slate-600">
            Already have an account? <Link to="/login" className="text-blue-600 font-bold">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;