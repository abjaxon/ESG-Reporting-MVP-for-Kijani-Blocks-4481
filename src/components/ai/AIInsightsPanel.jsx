import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useAI } from '../../hooks/useAI';
import { useESG } from '../../context/ESGContext';

const { FiZap, FiRefreshCw, FiAlertTriangle, FiTrendingUp, FiTarget, FiLightbulb } = FiIcons;

function AIInsightsPanel() {
  const { state } = useESG();
  const { generateInsights, isLoading, error } = useAI();
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    loadInsights();
  }, [state.esgData, state.company]);

  const loadInsights = async () => {
    const aiInsights = await generateInsights(state.esgData, state.company);
    setInsights(aiInsights);
  };

  const getInsightIcon = (type) => {
    switch (type) {
      case 'performance': return FiTrendingUp;
      case 'warning': return FiAlertTriangle;
      case 'opportunity': return FiTarget;
      case 'prediction': return FiLightbulb;
      default: return FiZap;
    }
  };

  const getInsightColor = (type, priority) => {
    if (priority === 'high') {
      return type === 'warning' ? 'bg-red-50 border-red-200 text-red-800' : 'bg-blue-50 border-blue-200 text-blue-800';
    }
    if (type === 'performance') return 'bg-green-50 border-green-200 text-green-800';
    if (type === 'warning') return 'bg-yellow-50 border-yellow-200 text-yellow-800';
    if (type === 'opportunity') return 'bg-purple-50 border-purple-200 text-purple-800';
    return 'bg-gray-50 border-gray-200 text-gray-800';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
            <SafeIcon icon={FiZap} className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">AI Insights</h2>
            <p className="text-sm text-gray-600">Powered by advanced ESG analytics</p>
          </div>
        </div>
        
        <button
          onClick={loadInsights}
          disabled={isLoading}
          className="flex items-center space-x-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 disabled:opacity-50"
        >
          <SafeIcon icon={FiRefreshCw} className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        {insights.map((insight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`p-4 rounded-lg border ${getInsightColor(insight.type, insight.priority)}`}
          >
            <div className="flex items-start space-x-3">
              <SafeIcon icon={getInsightIcon(insight.type)} className="w-5 h-5 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium">{insight.title}</h4>
                  <span className="text-xs px-2 py-1 bg-white bg-opacity-50 rounded-full">
                    {insight.category}
                  </span>
                </div>
                <p className="text-sm mb-3 opacity-90">{insight.message}</p>
                {insight.action && (
                  <div className="flex items-center justify-between">
                    <p className="text-xs opacity-75">
                      <strong>Next step:</strong> {insight.action}
                    </p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      insight.priority === 'high' ? 'bg-red-100 text-red-700' :
                      insight.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {insight.priority}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {isLoading && (
        <div className="text-center py-8">
          <div className="inline-flex items-center space-x-2 text-gray-600">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600"></div>
            <span>AI is analyzing your ESG data...</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default AIInsightsPanel;