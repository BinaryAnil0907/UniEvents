import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages Import
import LandingPage from './pages/LandingPage.jsx';
import RegistrationPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Dashboard from './pages/Dashboard.jsx'; // Student Dashboard
import AdminDashboard from './pages/AdminDashboard.jsx'; // Admin Dashboard
import AddEvent from './pages/AddEvent.jsx'; // Add Event Page
import EditEvent from './pages/EditEvent.jsx'; // Edit Event Page

// 🛡️ Security Guard 1: Sirf Students ke liye (Admin ko yahan allow nahi karenge)
const StudentRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  
  if (!token) return <Navigate to="/login" />;
  
  // Agar koi admin student dashboard kholne ki koshish kare, toh use admin panel bhej do
  if (user?.role === 'admin') return <Navigate to="/admin/dashboard" />;
  
  return children;
};

// 🛡️ Security Guard 2: Sirf Admin ke liye
const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  
  if (!token) return <Navigate to="/login" />;
  
  // Agar koi student admin panel kholne ki koshish kare, toh use student dashboard bhej do
  if (user?.role !== 'admin') return <Navigate to="/dashboard" />;
  
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* --- Public Routes --- */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />

        {/* --- 🎓 Protected Student Routes --- */}
        <Route 
          path="/dashboard" 
          element={
            <StudentRoute>
              <Dashboard />
            </StudentRoute>
          } 
        />

        {/* --- 🛠️ Protected Admin Routes --- */}
        <Route 
          path="/admin/dashboard" 
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } 
        />
        
        <Route 
          path="/admin/add-event" 
          element={
            <AdminRoute>
              <AddEvent />
            </AdminRoute>
          } 
        />

        {/* ✅ Edit Event Route Added */}
        <Route 
          path="/admin/edit-event/:id" 
          element={
            <AdminRoute>
              <EditEvent />
            </AdminRoute>
          } 
        />

        {/* Catch-all: Galat URL par seedha landing page ya login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;