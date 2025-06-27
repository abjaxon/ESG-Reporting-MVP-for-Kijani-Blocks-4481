import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiAlertTriangle, FiAlertCircle, FiInfo, FiChevronRight } = FiIcons;

function RiskAlerts() {
  const alerts = [
    {
      id: 1,
      type: 'high',
      title: 'Carbon Emissions Target',
      description: 'Q4 emissions tracking 15% above target',
      category: 'Environmental',
      timeAgo: '2 hours ago',
      action: 'Review mitigation plan'
    },
    {
      id: 2,
      type: 'medium',
      title: 'Board Diversity Gap',
      description: 'Current diversity below industry benchmark',
      category: 'Governance',
      timeAgo: '1 day ago',
      action: 'Schedule recruitment review'
    },
    {
      id: 3,
      type: 'low',
      title: 'Training Compliance',
      description: '5% of employees pending ethics training',
      category: 'Social',
      timeAgo: '3 days ago',
      action: 'Send reminders'
    },
    {
      id: 4,
      type: 'info',
      title: 'New GRI Standards',
      description: 'GRI 2024 updates available for review',
      category: 'Compliance',
      timeAgo: '1 week ago',
      action: 'Review changes'
    }
  ];

  const getAlertIcon = (type) => {
    switch (type) {
      case 'high': return FiAlertTriangle;
      case 'medium': return FiAlertCircle;
      case 'low': return FiInfo;
      default: return FiInfo;
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Environmental': return 'bg-green-100 text-green-800';
      case 'Social': return 'bg-blue-100 text-blue-800';
      case 'Governance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Risk Alerts</h2>
        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {alerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-start space-x-3 p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors duration-200 cursor-pointer group"
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getAlertColor(alert.type)}`}>
              <SafeIcon icon={getAlertIcon(alert.type)} className="w-4 h-4" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-semibold text-gray-900 truncate">
                  {alert.title}
                </h3>
                <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(alert.category)}`}>
                  {alert.category}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">
                {alert.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{alert.timeAgo}</span>
                <button className="text-xs text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span>{alert.action}</span>
                  <SafeIcon icon={FiChevronRight} className="w-3 h-3" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Risk Score</h4>
            <p className="text-xs text-gray-600">Based on current alerts</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-yellow-600">Medium</div>
            <div className="text-xs text-gray-500">Risk Level</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default RiskAlerts;