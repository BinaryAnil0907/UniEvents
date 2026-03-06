import React, { useState } from 'react';
import { 
  Calendar, 
  User, 
  LayoutDashboard, 
  Menu, 
  X,
  ArrowRight 
} from 'lucide-react';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      title: "Easy Registration",
      desc: "Streamlined sign-up process for students and faculty.",
      icon: <User className="w-6 h-6 text-blue-600" />
    },
    {
      title: "Real-time Updates",
      desc: "Instant notifications for event changes and schedules.",
      icon: <Calendar className="w-6 h-6 text-blue-600" />
    },
    {
      title: "Admin Control",
      desc: "Powerful dashboard for managing events and users.",
      icon: <LayoutDashboard className="w-6 h-6 text-blue-600" />
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Calendar className="text-white w-6 h-6" />
              </div>
              <span className="font-bold text-xl text-slate-800">UniEvents</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <a href="#" className="text-slate-600 hover:text-blue-600 font-medium">Home</a>
              <a href="#" className="text-slate-600 hover:text-blue-600 font-medium">Events</a>
              <a href="/login" className="text-slate-600 hover:text-blue-600 font-medium">Login</a>
              <a href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Register</a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t p-4 space-y-3">
            <a href="#" className="block text-slate-600">Home</a>
            <a href="#" className="block text-slate-600">Events</a>
            <a href="/login" className="block text-slate-600">Login</a>
            <a href="/register" className="block text-blue-600 font-bold">Register</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
            Campus Life, <br/>
            <span className="text-blue-600">Curated for You.</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-lg mx-auto md:mx-0">
            Discover workshops, seminars, and cultural events happening at your university. Stay connected, stay updated.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <a href="/register" className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition flex items-center gap-2">
              Explore Events <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
          {/* Illustration Placeholder */}
          <div className="w-full max-w-md h-64 bg-gradient-to-tr from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-blue-200">
            <span className="text-blue-400 font-medium">Event Illustration</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Why Choose UniEvents?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 bg-slate-50 rounded-xl hover:shadow-lg transition border border-slate-100">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;