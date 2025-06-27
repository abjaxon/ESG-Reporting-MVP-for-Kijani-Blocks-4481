import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiDatabase, FiCloud, FiServer, FiLink, FiCheck, FiX, FiPlus, FiSettings } = FiIcons;

function ConnectedSources() {
  const [connectedSources, setConnectedSources] = useState([
    {
      id: 1,
      name: 'SAP ERP System',
      type: 'ERP',
      status: 'connected',
      lastSync: '2 hours ago',
      dataTypes: ['Financial', 'Operations', 'HR'],
      icon: FiDatabase,
      metrics: 45
    },
    {
      id: 2,
      name: 'Google Sheets - Energy Data',
      type: 'Spreadsheet',
      status: 'connected',
      lastSync: '1 hour ago',
      dataTypes: ['Environmental'],
      icon: FiCloud,
      metrics: 12
    },
    {
      id: 3,
      name: 'IoT Sensor Network',
      type: 'IoT',
      status: 'connected',
      lastSync: '15 minutes ago',
      dataTypes: ['Environmental'],
      icon: FiServer,
      metrics: 28
    },
    {
      id: 4,
      name: 'HRIS - Workday',
      type: 'HR System',
      status: 'error',
      lastSync: '2 days ago',
      dataTypes: ['Social', 'Governance'],
      icon: FiDatabase,
      metrics: 0
    }
  ]);

  const [availableSources] = useState([
    { name: 'Microsoft Excel Online', type: 'Spreadsheet', icon: FiCloud },
    { name: 'Salesforce', type: 'CRM', icon: FiDatabase },
    { name: 'QuickBooks', type: 'Accounting', icon: FiServer },
    { name: 'Azure SQL Database', type: 'Database', icon: FiDatabase },
    { name: 'Oracle ERP Cloud', type: 'ERP', icon: FiServer }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'text-green-600 bg-green-100';
      case 'error': return 'text-red-600 bg-red-100';
      case 'syncing': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected': return FiCheck;
      case 'error': return FiX;
      case 'syncing': return FiLink;
      default: return FiLink;
    }
  };

  const getDataTypeColor = (type) => {
    switch (type) {
      case 'Environmental': return 'bg-green-100 text-green-800';
      case 'Social': return 'bg-blue-100 text-blue-800';
      case 'Governance': return 'bg-yellow-100 text-yellow-800';
      case 'Financial': return 'bg-purple-100 text-purple-800';
      case 'Operations': return 'bg-gray-100 text-gray-800';
      case 'HR': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalMetrics = connectedSources.reduce((sum, source) => sum + source.metrics, 0);
  const connectedCount = connectedSources.filter(s => s.status === 'connected').length;
  const errorCount = connectedSources.filter(s => s.status === 'error').length;

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sources</p>
              <p className="text-2xl font-bold text-gray-900">{connectedSources.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiDatabase} className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Connected</p>
              <p className="text-2xl font-bold text-green-600">{connectedCount}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiCheck} className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Errors</p>
              <p className="text-2xl font-bold text-red-600">{errorCount}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiX} className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Data Points</p>
              <p className="text-2xl font-bold text-blue-600">{totalMetrics}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiServer} className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Connected Sources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Connected Data Sources</h2>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center space-x-2">
            <SafeIcon icon={FiPlus} className="w-4 h-4" />
            <span>Add Source</span>
          </button>
        </div>

        <div className="space-y-4">
          {connectedSources.map((source, index) => (
            <motion.div
              key={source.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <SafeIcon icon={source.icon} className="w-6 h-6 text-gray-600" />
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900">{source.name}</h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-gray-500">{source.type}</span>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">Last sync: {source.lastSync}</span>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">{source.metrics} metrics</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      {source.dataTypes.map((type, typeIndex) => (
                        <span
                          key={typeIndex}
                          className={`text-xs px-2 py-1 rounded-full ${getDataTypeColor(type)}`}
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getStatusColor(source.status)}`}>
                    <SafeIcon icon={getStatusIcon(source.status)} className="w-4 h-4" />
                    <span className="text-sm font-medium capitalize">{source.status}</span>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                    <SafeIcon icon={FiSettings} className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Available Sources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Available Integrations</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableSources.map((source, index) => (
            <motion.div
              key={source.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-primary-100 transition-colors duration-200">
                  <SafeIcon icon={source.icon} className="w-5 h-5 text-gray-600 group-hover:text-primary-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 group-hover:text-primary-900">{source.name}</h3>
                  <p className="text-sm text-gray-500 group-hover:text-primary-700">{source.type}</p>
                </div>
              </div>
              <button className="w-full mt-3 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-sm hover:bg-primary-600 hover:text-white transition-colors duration-200">
                Connect
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Integration Guide */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Integration Best Practices</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-xs font-bold text-blue-600">1</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Secure Authentication</h4>
                <p className="text-sm text-gray-600">Use OAuth 2.0 or API keys for secure data access</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-xs font-bold text-blue-600">2</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Data Mapping</h4>
                <p className="text-sm text-gray-600">Map source fields to ESG metrics automatically</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-xs font-bold text-blue-600">3</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Real-time Sync</h4>
                <p className="text-sm text-gray-600">Schedule automatic data synchronization</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-xs font-bold text-blue-600">4</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Quality Checks</h4>
                <p className="text-sm text-gray-600">Validate data quality before processing</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ConnectedSources;