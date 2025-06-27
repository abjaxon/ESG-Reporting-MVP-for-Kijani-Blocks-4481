import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiArrowRight, FiTarget, FiShield, FiTrendingUp, FiGlobe, FiUsers, FiFileText, FiBarChart3, FiDatabase, FiAward } = FiIcons;

function Landing() {
  const features = [
    {
      icon: FiDatabase,
      title: 'Automated Data Collection',
      description: 'AI-powered extraction from structured and unstructured sources with smart mapping to ESG metrics.'
    },
    {
      icon: FiFileText,
      title: 'Compliant Reporting',
      description: 'Generate reports aligned with GRI, SASB, and IFRS standards with automated compliance checking.'
    },
    {
      icon: FiTrendingUp,
      title: 'Performance Benchmarking',
      description: 'Compare your ESG performance against industry peers and regional standards.'
    },
    {
      icon: FiGlobe,
      title: 'Localized Insights',
      description: 'Tailored recommendations for local sustainability challenges and regulatory requirements.'
    },
    {
      icon: FiShield,
      title: 'Risk Assessment',
      description: 'AI-driven risk identification and mitigation strategies for ESG-related challenges.'
    },
    {
      icon: FiUsers,
      title: 'Collaborative Platform',
      description: 'Role-based access and collaboration tools for seamless team coordination.'
    }
  ];

  const sectors = [
    { name: 'Agriculture', icon: '🌾' },
    { name: 'Energy', icon: '⚡' },
    { name: 'Logistics', icon: '🚛' },
    { name: 'Manufacturing', icon: '🏭' },
    { name: 'Technology', icon: '💻' },
    { name: 'Healthcare', icon: '🏥' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">KB</span>
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold text-gray-900">
                  Kijani Blocks
                </h1>
                <p className="text-sm text-gray-600">AI-Powered ESG Reporting</p>
              </div>
            </div>
            <Link
              to="/dashboard"
              className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200 flex items-center space-x-2"
            >
              <span>Get Started</span>
              <SafeIcon icon={FiArrowRight} className="w-4 h-4" />
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-6">
                Simplify ESG Reporting
                <span className="block text-primary-600">with AI Intelligence</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Automate data collection, generate compliant reports, and gain actionable insights 
                tailored for mid-sized companies across Africa and beyond.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/dashboard"
                  className="bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Start Free Trial</span>
                  <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
                </Link>
                <button className="border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-primary-50 transition-colors duration-200">
                  Watch Demo
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Comprehensive ESG Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to streamline ESG reporting and drive sustainable business practices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <SafeIcon icon={feature.icon} className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Built for Your Industry
            </h2>
            <p className="text-xl text-gray-600">
              Specialized insights and benchmarks for key sectors across emerging markets.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {sectors.map((sector, index) => (
              <motion.div
                key={sector.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-4xl mb-3">{sector.icon}</div>
                <h3 className="font-semibold text-gray-900">{sector.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
              Ready to Transform Your ESG Reporting?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Join leading companies that trust Kijani Blocks for their sustainability reporting needs.
            </p>
            <Link
              to="/dashboard"
              className="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-200 inline-flex items-center space-x-2"
            >
              <span>Start Your Journey</span>
              <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">KB</span>
              </div>
              <div>
                <h3 className="font-display font-semibold">Kijani Blocks</h3>
                <p className="text-sm text-gray-400">© 2024 All rights reserved</p>
              </div>
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;