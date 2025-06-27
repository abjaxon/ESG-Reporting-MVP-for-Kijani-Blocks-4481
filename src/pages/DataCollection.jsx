import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import DataUpload from '../components/data/DataUpload';
import DataMapping from '../components/data/DataMapping';
import DataValidation from '../components/data/DataValidation';
import ConnectedSources from '../components/data/ConnectedSources';

const { FiUpload, FiDatabase, FiCheckCircle, FiSettings } = FiIcons;

function DataCollection() {
  const [activeTab, setActiveTab] = useState('upload');

  const tabs = [
    { id: 'upload', name: 'Data Upload', icon: FiUpload, component: DataUpload },
    { id: 'mapping', name: 'Data Mapping', icon: FiDatabase, component: DataMapping },
    { id: 'validation', name: 'Validation', icon: FiCheckCircle, component: DataValidation },
    { id: 'sources', name: 'Connected Sources', icon: FiSettings, component: ConnectedSources }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || DataUpload;

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
              Data Collection & Management
            </h1>
            <p className="text-gray-600">
              Upload, map, and validate your ESG data from multiple sources
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

export default DataCollection;