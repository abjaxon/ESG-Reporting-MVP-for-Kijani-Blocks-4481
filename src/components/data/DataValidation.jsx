import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiCheckCircle, FiAlertTriangle, FiX, FiRefreshCw, FiEye } = FiIcons;

function DataValidation() {
  const [validationResults, setValidationResults] = useState([
    {
      id: 1,
      metric: 'Carbon Emissions',
      value: '1,250 tCO2e',
      status: 'valid',
      confidence: 95,
      issues: [],
      lastValidated: '2 minutes ago'
    },
    {
      id: 2,
      metric: 'Energy Consumption',
      value: '3,400 MWh',
      status: 'warning',
      confidence: 78,
      issues: ['Value 15% higher than previous month'],
      lastValidated: '5 minutes ago'
    },
    {
      id: 3,
      metric: 'Employee Count',
      value: '250',
      status: 'valid',
      confidence: 100,
      issues: [],
      lastValidated: '1 minute ago'
    },
    {
      id: 4,
      metric: 'Water Usage',
      value: '12,500 L',
      status: 'error',
      confidence: 45,
      issues: ['Missing data for last 3 days', 'Unit inconsistency detected'],
      lastValidated: '10 minutes ago'
    },
    {
      id: 5,
      metric: 'Board Diversity',
      value: '40%',
      status: 'valid',
      confidence: 92,
      issues: [],
      lastValidated: '3 minutes ago'
    }
  ]);

  const [selectedTab, setSelectedTab] = useState('all');

  const getStatusIcon = (status) => {
    switch (status) {
      case 'valid': return FiCheckCircle;
      case 'warning': return FiAlertTriangle;
      case 'error': return FiX;
      default: return FiCheckCircle;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'valid': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredResults = selectedTab === 'all' 
    ? validationResults 
    : validationResults.filter(result => result.status === selectedTab);

  const validCount = validationResults.filter(r => r.status === 'valid').length;
  const warningCount = validationResults.filter(r => r.status === 'warning').length;
  const errorCount = validationResults.filter(r => r.status === 'error').length;

  const runValidation = () => {
    // Simulate validation process
    setValidationResults(prev => prev.map(result => ({
      ...result,
      lastValidated: 'Just now'
    })));
  };

  return (
    <div className="space-y-8">
      {/* Validation Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Data Validation Results</h2>
            <p className="text-gray-600">AI-powered quality checks and validation</p>
          </div>
          <button 
            onClick={runValidation}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center space-x-2"
          >
            <SafeIcon icon={FiRefreshCw} className="w-4 h-4" />
            <span>Run Validation</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900 mb-1">{validationResults.length}</div>
            <div className="text-sm text-gray-600">Total Metrics</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-1">{validCount}</div>
            <div className="text-sm text-gray-600">Valid</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600 mb-1">{warningCount}</div>
            <div className="text-sm text-gray-600">Warnings</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600 mb-1">{errorCount}</div>
            <div className="text-sm text-gray-600">Errors</div>
          </div>
        </div>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'all', name: 'All Results', count: validationResults.length },
              { id: 'valid', name: 'Valid', count: validCount },
              { id: 'warning', name: 'Warnings', count: warningCount },
              { id: 'error', name: 'Errors', count: errorCount }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  selectedTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.name}</span>
                <span className="bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Validation Results */}
        <div className="space-y-4">
          {filteredResults.map((result, index) => (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(result.status)}`}>
                    <SafeIcon icon={getStatusIcon(result.status)} className="w-4 h-4" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{result.metric}</h3>
                      <div className="flex items-center space-x-4">
                        <span className={`text-sm font-medium ${getConfidenceColor(result.confidence)}`}>
                          {result.confidence}% confidence
                        </span>
                        <span className="text-sm text-gray-500">{result.lastValidated}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-semibold text-gray-900">{result.value}</span>
                      <button className="text-primary-600 hover:text-primary-700 flex items-center space-x-1 text-sm">
                        <SafeIcon icon={FiEye} className="w-4 h-4" />
                        <span>View Details</span>
                      </button>
                    </div>
                    
                    {result.issues.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-700">Issues Found:</h4>
                        <ul className="space-y-1">
                          {result.issues.map((issue, issueIndex) => (
                            <li key={issueIndex} className="text-sm text-red-600 flex items-center space-x-2">
                              <div className="w-1 h-1 bg-red-600 rounded-full"></div>
                              <span>{issue}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Validation Rules */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Validation Rules</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Data Completeness</h4>
            <p className="text-sm text-blue-800">
              Checks for missing values and data gaps in time series
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">Range Validation</h4>
            <p className="text-sm text-green-800">
              Validates values are within expected ranges and industry norms
            </p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-medium text-yellow-900 mb-2">Consistency Checks</h4>
            <p className="text-sm text-yellow-800">
              Ensures data consistency across related metrics and time periods
            </p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h4 className="font-medium text-purple-900 mb-2">Unit Verification</h4>
            <p className="text-sm text-purple-800">
              Verifies units of measurement match expected standards
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default DataValidation;