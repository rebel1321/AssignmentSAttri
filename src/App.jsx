import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';
import UploadModal from './components/UploadModal';
import LoginPage from './pages/LoginPage';
import ContractsDashboard from './pages/ContractsDashboard';
import ContractDetailPage from './pages/ContractDetailPage';

// Placeholder components for other routes
const InsightsPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-gray-900">Insights</h1>
    <p className="text-gray-600 mt-2">Analytics and insights dashboard coming soon.</p>
  </div>
);

const ReportsPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
    <p className="text-gray-600 mt-2">Reports and analytics coming soon.</p>
  </div>
);

const SettingsPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
    <p className="text-gray-600 mt-2">Application settings coming soon.</p>
  </div>
);

// App layout wrapper that includes upload modal
const AppLayout = () => {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  // Listen for upload modal trigger
  React.useEffect(() => {
    const handleUploadModal = () => {
      setUploadModalOpen(true);
    };

    // Add global event listener for upload button
    document.addEventListener('upload-modal-open', handleUploadModal);
    
    return () => {
      document.removeEventListener('upload-modal-open', handleUploadModal);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<ContractsDashboard />} />
          <Route path="contract/:id" element={<ContractDetailPage />} />
        </Route>
        <Route path="/insights" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<InsightsPage />} />
        </Route>
        <Route path="/reports" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<ReportsPage />} />
        </Route>
        <Route path="/settings" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<SettingsPage />} />
        </Route>
      </Routes>
      
      <UploadModal 
        isOpen={uploadModalOpen} 
        onClose={() => setUploadModalOpen(false)} 
      />
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppLayout />
    </AuthProvider>
  );
}

export default App;
