import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages Import
import LandingPage from './pages/LandingPage.jsx';
import RegistrationPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Dashboard from './pages/Dashboard.jsx'; 
import AdminDashboard from './pages/AdminDashboard.jsx'; 
import AddEvent from './pages/AddEvent.jsx'; 
import EditEvent from './pages/EditEvent.jsx'; 

// 🛡️ Security Guards
const StudentRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" />;
  if (user?.role === 'admin') return <Navigate to="/admin/dashboard" />;
  return children;
};

const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" />;
  if (user?.role !== 'admin') return <Navigate to="/dashboard" />;
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />

        {/* 🎓 Student */}
        <Route path="/dashboard" element={<StudentRoute><Dashboard /></StudentRoute>} />

        {/* 🛠️ Admin */}
        <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/add-event" element={<AdminRoute><AddEvent /></AdminRoute>} />
        <Route path="/admin/edit-event/:id" element={<AdminRoute><EditEvent /></AdminRoute>} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;