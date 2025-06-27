import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiFileText, FiUpload, FiUsers, FiSettings, FiCheck, FiClock } = FiIcons;

function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: 'report',
      title: 'Q3 ESG Report Generated',
      description: 'GRI Standards compliance report completed',
      user: 'System',
      timestamp: '2 hours ago',
      status: 'completed',
      icon: FiFileText
    },
    {
      id: 2,
      type: 'data',
      title: 'Energy Data Uploaded',
      description: 'Monthly consumption data processed',
      user: 'John Doe',
      timestamp: '4 hours ago',
      status: 'completed',
      icon: FiUpload
    },
    {
      id: 3,
      type: 'team',
      title: 'New Team Member Added',
      description: 'Maria Santos joined as Sustainability Analyst',
      user: 'Sarah Johnson',
      timestamp: '1 day ago',
      status: 'completed',
      icon: FiUsers
    },
    {
      id: 4,
      type: 'system',
      title: 'Benchmark Update',
      description: 'Industry benchmarks refreshed for Energy sector',
      user: 'System',
      timestamp: '2 days ago',
      status: 'completed',
      icon: FiSettings
    },
    {
      id: 5,
      type: 'data',
      title: 'Carbon Footprint Analysis',
      description: 'Automated analysis in progress',
      user: 'AI Engine',
      timestamp: '3 days ago',
      status: 'in-progress',
      icon: FiClock
    }
  ];

  const getActivityColor = (type) => {
    switch (type) {
      case 'report': return 'bg-green-100 text-green-600';
      case 'data': return 'bg-blue-100 text-blue-600';
      case 'team': return 'bg-purple-100 text-purple-600';
      case 'system': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    return status === 'completed' ? FiCheck : FiClock;
  };

  const getStatusColor = (status) => {
    return status === 'completed' 
      ? 'text-green-600 bg-green-100' 
      : 'text-yellow-600 bg-yellow-100';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}>
              <SafeIcon icon={activity.icon} className="w-4 h-4" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  {activity.title}
                </h3>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${getStatusColor(activity.status)}`}>
                  <SafeIcon icon={getStatusIcon(activity.status)} className="w-3 h-3" />
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-1">
                {activity.description}
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>by {activity.user}</span>
                <span>{activity.timestamp}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-primary-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-primary-900">Next Scheduled Task</h4>
            <p className="text-xs text-primary-700">Monthly data collection due in 5 days</p>
          </div>
          <button className="text-sm bg-primary-600 text-white px-3 py-1.5 rounded-lg hover:bg-primary-700 transition-colors duration-200">
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default RecentActivity;