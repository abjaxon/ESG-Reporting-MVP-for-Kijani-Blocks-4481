import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import ReportGenerator from '../components/reports/ReportGenerator';
import ReportLibrary from '../components/reports/ReportLibrary';
import ComplianceChecker from '../components/reports/ComplianceChecker';
import ReportTemplates from '../components/reports/ReportTemplates';

const { FiFileText, FiFolder, FiCheckCircle, FiLayout } = FiIcons;

function Reports() {
  const [activeTab, setActiveTab] = useState('generator');

  const tabs = [
    { id: 'generator', name: 'Generate Report', icon: FiFileText, component: ReportGenerator },
    { id: 'library', name: 'Report Library', icon: FiFolder, component: ReportLibrary },
    { id: 'compliance', name: 'Compliance Check', icon: FiCheckCircle, component: ComplianceChecker },
    { id: 'templates', name: 'Templates', icon: FiLayout, component: ReportTemplates }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || ReportGenerator;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
              ESG Reports & Compliance
            </h1>
            <p className="text-gray-600">
              Generate compliant ESG reports aligned with GRI, SASB, and IFRS standards
            </p>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <SafeIcon icon={tab.icon} className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Active Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ActiveComponent />
        </motion.div>
      </div>
    </div>
  );
}

export default Reports;