import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import Page Components
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import QuizPage from './pages/QuizPage';
import ReportPage from './pages/ReportPage';

// Import Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Import Global Styles (optional, but good practice)
import './assets/styles/global.css';

function App() {
  return (
    <Router>
      {/* Navbar will be displayed on every page */}
      <Navbar />
      
      {/* Main content area where pages will be rendered */}
      <main className="container">
        <Routes>
          {/* Define the route for each page */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/quiz/:id" element={<QuizPage />} />
          <Route path="/report" element={<ReportPage />} />
        </Routes>
      </main>

      {/* Footer will be displayed on every page */}
      <Footer />
    </Router>
  );
}

export default App;
