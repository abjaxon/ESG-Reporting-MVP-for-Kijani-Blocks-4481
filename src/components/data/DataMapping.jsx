import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiArrowRight, FiCheck, FiX, FiSettings, FiTarget } = FiIcons;

function DataMapping() {
  const [mappings, setMappings] = useState([
    {
      id: 1,
      sourceField: 'Total Energy Consumption (kWh)',
      targetMetric: 'Energy Consumption',
      framework: 'GRI 302-1',
      status: 'mapped',
      confidence: 95
    },
    {
      id: 2,
      sourceField: 'CO2 Emissions',
      targetMetric: 'Direct GHG Emissions',
      framework: 'GRI 305-1',
      status: 'mapped',
      confidence: 88
    },
    {
      id: 3,
      sourceField: 'Employee Count',
      targetMetric: 'Total Workforce',
      framework: 'GRI 102-7',
      status: 'mapped',
      confidence: 100
    },
    {
      id: 4,
      sourceField: 'Water Usage (Liters)',
      targetMetric: 'Water Consumption',
      framework: 'GRI 303-5',
      status: 'pending',
      confidence: 0
    },
    {
      id: 5,
      sourceField: 'Board Members - Female',
      targetMetric: 'Board Gender Diversity',
      framework: 'GRI 405-1',
      status: 'review',
      confidence: 72
    }
  ]);

  const [selectedFramework, setSelectedFramework] = useState('GRI');

  const frameworks = ['GRI', 'SASB', 'IFRS'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'mapped': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'review': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const updateMappingStatus = (id, newStatus) => {
    setMappings(prev => prev.map(mapping => 
      mapping.id === id ? { ...mapping, status: newStatus } : mapping
    ));
  };

  return (
    <div className="space-y-8">
      {/* Header Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Data Mapping Configuration</h2>
            <p className="text-gray-600">Map your data fields to standardized ESG metrics</p>
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
            <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200">
              Auto-Map All
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mapping Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Mapping Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-1">3</div>
            <div className="text-sm text-gray-600">Mapped</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600 mb-1">1</div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600 mb-1">1</div>
            <div className="text-sm text-gray-600">Review</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-1">85%</div>
            <div className="text-sm text-gray-600">Complete</div>
          </div>
        </div>
      </motion.div>

      {/* Mapping Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Field Mappings</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source Field
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mapping
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Target Metric
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Framework
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Confidence
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mappings.map((mapping, index) => (
                <motion.tr
                  key={mapping.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{mapping.sourceField}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <SafeIcon icon={FiArrowRight} className="w-4 h-4 text-gray-400 mx-auto" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{mapping.targetMetric}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {mapping.framework}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {mapping.confidence > 0 && (
                      <span className={`text-sm font-medium ${getConfidenceColor(mapping.confidence)}`}>
                        {mapping.confidence}%
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(mapping.status)}`}>
                      {mapping.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center space-x-2">
                      {mapping.status === 'pending' && (
                        <button
                          onClick={() => updateMappingStatus(mapping.id, 'mapped')}
                          className="text-green-600 hover:text-green-700"
                        >
                          <SafeIcon icon={FiCheck} className="w-4 h-4" />
                        </button>
                      )}
                      {mapping.status === 'review' && (
                        <>
                          <button
                            onClick={() => updateMappingStatus(mapping.id, 'mapped')}
                            className="text-green-600 hover:text-green-700"
                          >
                            <SafeIcon icon={FiCheck} className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => updateMappingStatus(mapping.id, 'pending')}
                            className="text-red-600 hover:text-red-700"
                          >
                            <SafeIcon icon={FiX} className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      <button className="text-gray-400 hover:text-gray-600">
                        <SafeIcon icon={FiSettings} className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* AI Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Mapping Suggestions</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div>
              <h4 className="font-medium text-blue-900">New Field Detected</h4>
              <p className="text-sm text-blue-800">
                "Waste Generated (kg)" could map to GRI 306-3: Waste Generated
              </p>
            </div>
            <button className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-blue-700 transition-colors duration-200">
              Apply
            </button>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div>
              <h4 className="font-medium text-green-900">Optimization Suggestion</h4>
              <p className="text-sm text-green-800">
                Consider mapping "Training Budget" to GRI 404-1 for better social metrics coverage
              </p>
            </div>
            <button className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-green-700 transition-colors duration-200">
              Review
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default DataMapping;