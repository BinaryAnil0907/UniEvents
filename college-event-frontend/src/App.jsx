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
// 🔥 Naya Page Import
import ViewParticipants from './pages/ViewParticipants.jsx'; 

// 🛡️ Security Guards
const StudentRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  if (!token) return <Navigate to="/login" />;
  if (user?.role === 'admin') return <Navigate to="/admin/dashboard" />;
  return children;
};

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
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

        {/* 🎓 Student Dashboard */}
        <Route path="/dashboard" element={<StudentRoute><Dashboard /></StudentRoute>} />

        {/* 🛠️ Admin Panel */}
        <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        
        {/* Add Event */}
        <Route path="/admin/add-event" element={<AdminRoute><AddEvent /></AdminRoute>} />
        
        {/* Edit Event */}
        <Route path="/admin/edit-event/:id" element={<AdminRoute><EditEvent /></AdminRoute>} />

        {/* ✅ View Participants Route (Naya Rasta) */}
        <Route 
          path="/admin/view-participants/:id" 
          element={
            <AdminRoute>
              <ViewParticipants />
            </AdminRoute>
          } 
        />

        {/* Catch-all Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;