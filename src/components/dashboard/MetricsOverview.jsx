import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useESG } from '../../context/ESGContext';

function MetricsOverview() {
  const { state } = useESG();
  const { esgData } = state;

  // Mock historical data for charts
  const monthlyData = [
    { month: 'Jan', environmental: 65, social: 72, governance: 68 },
    { month: 'Feb', environmental: 68, social: 74, governance: 70 },
    { month: 'Mar', environmental: 70, social: 76, governance: 72 },
    { month: 'Apr', environmental: 72, social: 78, governance: 74 },
    { month: 'May', environmental: 74, social: 79, governance: 76 },
    { month: 'Jun', environmental: 76, social: 80, governance: 78 }
  ];

  const keyMetrics = [
    {
      category: 'Environmental',
      metrics: [
        { name: 'Carbon Emissions', value: esgData.environmental.carbonEmissions, unit: 'tCO2e', trend: -5.2 },
        { name: 'Energy Consumption', value: esgData.environmental.energyConsumption, unit: 'MWh', trend: -2.1 },
        { name: 'Renewable Energy', value: esgData.environmental.renewableEnergyPercentage, unit: '%', trend: 8.5 }
      ]
    },
    {
      category: 'Social',
      metrics: [
        { name: 'Employee Satisfaction', value: esgData.social.employeeSatisfaction, unit: '%', trend: 3.2 },
        { name: 'Diversity Index', value: esgData.social.diversityIndex, unit: '%', trend: 1.8 },
        { name: 'Training Hours', value: esgData.social.trainingHours, unit: 'hrs', trend: 12.5 }
      ]
    },
    {
      category: 'Governance',
      metrics: [
        { name: 'Board Diversity', value: esgData.governance.boardDiversity, unit: '%', trend: 2.5 },
        { name: 'Ethics Training', value: esgData.governance.ethicsTraining, unit: '%', trend: 1.2 },
        { name: 'Transparency Score', value: esgData.governance.transparencyScore, unit: '/100', trend: 4.1 }
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">ESG Metrics Trends</h2>
        <select className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
          <option>Last 6 months</option>
          <option>Last year</option>
          <option>Last 2 years</option>
        </select>
      </div>

      {/* Trend Chart */}
      <div className="mb-8">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" fontSize={12} />
              <YAxis stroke="#666" fontSize={12} />
              <Line 
                type="monotone" 
                dataKey="environmental" 
                stroke="#22c55e" 
                strokeWidth={3}
                dot={{ fill: '#22c55e', r: 4 }}
                name="Environmental"
              />
              <Line 
                type="monotone" 
                dataKey="social" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 4 }}
                name="Social"
              />
              <Line 
                type="monotone" 
                dataKey="governance" 
                stroke="#f59e0b" 
                strokeWidth={3}
                dot={{ fill: '#f59e0b', r: 4 }}
                name="Governance"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center space-x-6 mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Environmental</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Social</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Governance</span>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {keyMetrics.map((category) => (
          <div key={category.category} className="space-y-4">
            <h3 className="font-semibold text-gray-900 border-b border-gray-200 pb-2">
              {category.category}
            </h3>
            {category.metrics.map((metric) => (
              <div key={metric.name} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">{metric.name}</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {metric.value}{metric.unit}
                  </p>
                </div>
                <div className={`text-sm font-medium px-2 py-1 rounded-full ${
                  metric.trend > 0 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {metric.trend > 0 ? '+' : ''}{metric.trend}%
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default MetricsOverview;