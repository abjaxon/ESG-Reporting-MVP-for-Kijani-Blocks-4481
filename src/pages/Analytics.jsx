import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useESG } from '../context/ESGContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const { FiTrendingUp, FiBarChart3, FiPieChart, FiActivity, FiTarget, FiCalendar } = FiIcons;

function Analytics() {
  const { state } = useESG();
  const { esgData, company } = state;
  const [selectedTimeframe, setSelectedTimeframe] = useState('12months');
  const [selectedMetric, setSelectedMetric] = useState('overall');

  // Mock analytics data
  const performanceData = [
    { month: 'Jan', environmental: 65, social: 72, governance: 68, overall: 68 },
    { month: 'Feb', environmental: 68, social: 74, governance: 70, overall: 71 },
    { month: 'Mar', environmental: 70, social: 76, governance: 72, overall: 73 },
    { month: 'Apr', environmental: 72, social: 78, governance: 74, overall: 75 },
    { month: 'May', environmental: 74, social: 79, governance: 76, overall: 76 },
    { month: 'Jun', environmental: 76, social: 80, governance: 78, overall: 78 },
    { month: 'Jul', environmental: 78, social: 81, governance: 79, overall: 79 },
    { month: 'Aug', environmental: 77, social: 82, governance: 80, overall: 80 },
    { month: 'Sep', environmental: 79, social: 83, governance: 81, overall: 81 },
    { month: 'Oct', environmental: 80, social: 84, governance: 82, overall: 82 },
    { month: 'Nov', environmental: 81, social: 85, governance: 83, overall: 83 },
    { month: 'Dec', environmental: 82, social: 86, governance: 84, overall: 84 }
  ];

  const sectorComparison = [
    { sector: 'Your Company', environmental: 82, social: 86, governance: 84 },
    { sector: 'Energy Avg', environmental: 75, social: 78, governance: 76 },
    { sector: 'Regional Avg', environmental: 70, social: 74, governance: 72 },
    { sector: 'Global Best', environmental: 90, social: 92, governance: 88 }
  ];

  const impactMetrics = [
    { name: 'Carbon Reduced', value: 1250, unit: 'tCO2e', trend: 12.5, color: '#22c55e' },
    { name: 'Energy Saved', value: 340, unit: 'MWh', trend: 8.2, color: '#3b82f6' },
    { name: 'Water Conserved', value: 12500, unit: 'L', trend: 15.3, color: '#06b6d4' },
    { name: 'Employees Trained', value: 245, unit: 'people', trend: 22.1, color: '#8b5cf6' }
  ];

  const riskAssessment = [
    { risk: 'Climate Risk', current: 65, target: 80, industry: 70 },
    { risk: 'Supply Chain', current: 78, target: 85, industry: 72 },
    { risk: 'Regulatory', current: 82, target: 90, industry: 75 },
    { risk: 'Reputation', current: 75, target: 85, industry: 68 },
    { risk: 'Financial', current: 80, target: 88, industry: 73 }
  ];

  const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

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
              ESG Analytics & Insights
            </h1>
            <p className="text-gray-600">
              Advanced analytics and AI-powered insights for {company.name}
            </p>
          </motion.div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="6months">Last 6 Months</option>
            <option value="12months">Last 12 Months</option>
            <option value="24months">Last 24 Months</option>
          </select>
          
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="overall">Overall ESG</option>
            <option value="environmental">Environmental</option>
            <option value="social">Social</option>
            <option value="governance">Governance</option>
          </select>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {impactMetrics.map((metric, index) => (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: metric.color + '20' }}>
                  <SafeIcon icon={FiTrendingUp} className="w-6 h-6" style={{ color: metric.color }} />
                </div>
                <span className="text-sm font-medium px-2 py-1 rounded-full bg-green-100 text-green-800">
                  +{metric.trend}%
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {metric.value.toLocaleString()}{metric.unit}
              </h3>
              <p className="text-gray-600 text-sm">{metric.name}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Performance Trends */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Performance Trends</h2>
              <SafeIcon icon={FiTrendingUp} className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#666" fontSize={12} />
                  <YAxis stroke="#666" fontSize={12} />
                  <Line
                    type="monotone"
                    dataKey={selectedMetric}
                    stroke="#22c55e"
                    strokeWidth={3}
                    dot={{ fill: '#22c55e', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Sector Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Sector Comparison</h2>
              <SafeIcon icon={FiBarChart3} className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sectorComparison} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="sector" stroke="#666" fontSize={12} />
                  <YAxis stroke="#666" fontSize={12} />
                  <Bar dataKey="environmental" fill="#22c55e" name="Environmental" />
                  <Bar dataKey="social" fill="#3b82f6" name="Social" />
                  <Bar dataKey="governance" fill="#f59e0b" name="Governance" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Risk Assessment Radar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Risk Assessment</h2>
              <SafeIcon icon={FiActivity} className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={riskAssessment}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="risk" tick={{ fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                  <Radar
                    name="Current"
                    dataKey="current"
                    stroke="#22c55e"
                    fill="#22c55e"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                  <Radar
                    name="Target"
                    dataKey="target"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.1}
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                  <Radar
                    name="Industry"
                    dataKey="industry"
                    stroke="#f59e0b"
                    fill="none"
                    strokeWidth={2}
                    strokeDasharray="2 2"
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex justify-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Current</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Target</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Industry</span>
              </div>
            </div>
          </motion.div>

          {/* AI Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">AI-Powered Insights</h2>
              <SafeIcon icon={FiTarget} className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-900 mb-2">🎯 Performance Highlight</h4>
                <p className="text-sm text-green-800">
                  Your ESG score improved by 16 points over the last 12 months, outperforming 78% of companies in the energy sector.
                </p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">📊 Trend Analysis</h4>
                <p className="text-sm text-blue-800">
                  Social metrics show the strongest growth trajectory (+14%), driven by improved employee satisfaction and diversity initiatives.
                </p>
              </div>
              
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h4 className="font-medium text-yellow-900 mb-2">⚠️ Risk Alert</h4>
                <p className="text-sm text-yellow-800">
                  Climate risk score is below target. Consider implementing additional renewable energy projects to improve resilience.
                </p>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h4 className="font-medium text-purple-900 mb-2">🔮 Predictive Insight</h4>
                <p className="text-sm text-purple-800">
                  Based on current trends, you're projected to achieve an 87 overall ESG score by Q2 2025, exceeding your 85 target.
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-2">💡 Optimization Opportunity</h4>
                <p className="text-sm text-gray-800">
                  Investing in water conservation technology could improve your Environmental score by an estimated 5-7 points.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;