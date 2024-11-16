import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';  // Import AuthProvider
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './components/NotFound';


function App() {
  return (
    <AuthProvider> {/* Wrap the entire app in AuthProvider */}
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
