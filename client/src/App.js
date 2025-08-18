import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import Page Components
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import QuizPage from './pages/QuizPage';
import ReportPage from './pages/ReportPage';

// Import Layout Components (Paths corrected here)
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import PrivateRoute from './components/routing/PrivateRoute';

// Import Global Styles
import './assets/styles/global.css';

function App() {
  return (
    <Router>
      {/* Navbar will be displayed on every page */}
      <Navbar />

      {/* Main content area where pages will be rendered */}
      <main className="container">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/quiz/:id"
            element={
              <PrivateRoute>
                <QuizPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/report"
            element={
              <PrivateRoute>
                <ReportPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>

      {/* Footer will be displayed on every page */}
      <Footer />
    </Router>
  );
}

export default App;