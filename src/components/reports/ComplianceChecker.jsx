import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiCheckCircle, FiAlertTriangle, FiX, FiInfo, FiRefreshCw, FiFileText } = FiIcons;

function ComplianceChecker() {
  const [selectedFramework, setSelectedFramework] = useState('GRI');
  const [isChecking, setIsChecking] = useState(false);

  const frameworks = ['GRI', 'SASB', 'IFRS', 'TCFD'];

  const complianceResults = {
    GRI: {
      overall: 94,
      requirements: [
        { id: 'GRI-102-1', name: 'Organization Name', status: 'compliant', coverage: 100 },
        { id: 'GRI-102-7', name: 'Scale of Organization', status: 'compliant', coverage: 100 },
        { id: 'GRI-302-1', name: 'Energy Consumption', status: 'compliant', coverage: 95 },
        { id: 'GRI-305-1', name: 'Direct GHG Emissions', status: 'compliant', coverage: 85 },
        { id: 'GRI-401-1', name: 'New Employee Hires', status: 'partial', coverage: 75 },
        { id: 'GRI-405-1', name: 'Diversity of Governance Bodies', status: 'partial', coverage: 60 },
        { id: 'GRI-303-5', name: 'Water Consumption', status: 'missing', coverage: 0 },
        { id: 'GRI-306-3', name: 'Waste Generated', status: 'missing', coverage: 0 }
      ]
    },
    SASB: {
      overall: 88,
      requirements: [
        { id: 'IF-EU-110a.1', name: 'Total Energy Delivered', status: 'compliant', coverage: 100 },
        { id: 'IF-EU-110a.2', name: 'Percentage Grid Electricity', status: 'compliant', coverage: 90 },
        { id: 'IF-EU-120a.1', name: 'Air Quality', status: 'partial', coverage: 70 },
        { id: 'IF-EU-000.A', name: 'Number of Customers', status: 'compliant', coverage: 100 },
        { id: 'IF-EU-320a.1', name: 'Workforce Health & Safety', status: 'partial', coverage: 65 },
        { id: 'IF-EU-550a.1', name: 'Nuclear Safety', status: 'missing', coverage: 0 }
      ]
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'compliant': return 'text-green-600 bg-green-100';
      case 'partial': return 'text-yellow-600 bg-yellow-100';
      case 'missing': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'compliant': return FiCheckCircle;
      case 'partial': return FiAlertTriangle;
      case 'missing': return FiX;
      default: return FiInfo;
    }
  };

  const runComplianceCheck = async () => {
    setIsChecking(true);
    // Simulate compliance checking
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsChecking(false);
  };

  const currentResults = complianceResults[selectedFramework] || complianceResults.GRI;
  const compliantCount = currentResults.requirements.filter(r => r.status === 'compliant').length;
  const partialCount = currentResults.requirements.filter(r => r.status === 'partial').length;
  const missingCount = currentResults.requirements.filter(r => r.status === 'missing').length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Compliance Checker</h2>
            <p className="text-gray-600">Automated compliance verification against reporting standards</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedFramework}
              onChange={(e) => setSelectedFramework(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {frameworks.map(framework => (
                <option key={framework} value={framework}>{framework} Standards</option>
              ))}
            </select>
            <button
              onClick={runComplianceCheck}
              disabled={isChecking}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50"
            >
              <SafeIcon icon={FiRefreshCw} className={`w-4 h-4 ${isChecking ? 'animate-spin' : ''}`} />
              <span>{isChecking ? 'Checking...' : 'Run Check'}</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Compliance Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Compliance Overview</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">{currentResults.overall}%</div>
            <div className="text-sm text-gray-600">Overall Compliance</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{compliantCount}</div>
            <div className="text-sm text-gray-600">Fully Compliant</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">{partialCount}</div>
            <div className="text-sm text-gray-600">Partially Compliant</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">{missingCount}</div>
            <div className="text-sm text-gray-600">Missing Data</div>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div
            className="bg-primary-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${currentResults.overall}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-sm text-gray-600">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </motion.div>

      {/* Detailed Requirements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          {selectedFramework} Requirements Details
        </h3>
        
        <div className="space-y-4">
          {currentResults.requirements.map((requirement, index) => (
            <motion.div
              key={requirement.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors duration-200"
            >
              <div className="flex items-center space-x-4 flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(requirement.status)}`}>
                  <SafeIcon icon={getStatusIcon(requirement.status)} className="w-4 h-4" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-1">
                    <h4 className="font-medium text-gray-900">{requirement.name}</h4>
                    <span className="text-sm text-gray-500">{requirement.id}</span>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          requirement.status === 'compliant' ? 'bg-green-500' :
                          requirement.status === 'partial' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${requirement.coverage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">{requirement.coverage}% coverage</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(requirement.status)}`}>
                  {requirement.status.replace('-', ' ').toUpperCase()}
                </span>
                <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors duration-200">
                  <SafeIcon icon={FiFileText} className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Compliance Recommendations</h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <h4 className="font-medium text-red-900 mb-2">🚨 Critical Missing Data</h4>
            <p className="text-sm text-red-800 mb-3">
              Water consumption and waste generation data are required for full {selectedFramework} compliance.
            </p>
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors duration-200">
              Set Up Data Collection
            </button>
          </div>
          
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h4 className="font-medium text-yellow-900 mb-2">⚠️ Improve Data Quality</h4>
            <p className="text-sm text-yellow-800 mb-3">
              Employee diversity and workforce safety metrics need additional data points for complete coverage.
            </p>
            <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-yellow-700 transition-colors duration-200">
              Review Data Sources
            </button>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2">💡 Best Practice</h4>
            <p className="text-sm text-blue-800 mb-3">
              Consider implementing automated data collection for energy and emissions metrics to maintain compliance.
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors duration-200">
              Explore Automation
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ComplianceChecker;