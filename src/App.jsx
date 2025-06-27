import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Dashboard from './pages/Dashboard';
import DataCollection from './pages/DataCollection';
import Reports from './pages/Reports';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Landing from './pages/Landing';
import { ESGProvider } from './context/ESGContext';

function App() {
  return (
    <ESGProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route
              path="/dashboard"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Navbar />
                  <Dashboard />
                </motion.div>
              }
            />
            <Route
              path="/data-collection"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Navbar />
                  <DataCollection />
                </motion.div>
              }
            />
            <Route
              path="/reports"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Navbar />
                  <Reports />
                </motion.div>
              }
            />
            <Route
              path="/analytics"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Navbar />
                  <Analytics />
                </motion.div>
              }
            />
            <Route
              path="/settings"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Navbar />
                  <Settings />
                </motion.div>
              }
            />
          </Routes>
        </div>
      </Router>
    </ESGProvider>
  );
}

export default App;