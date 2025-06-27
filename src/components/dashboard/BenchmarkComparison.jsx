import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from 'recharts';
import { useESG } from '../../context/ESGContext';

function BenchmarkComparison() {
  const { state } = useESG();
  const { company } = state;

  const benchmarkData = [
    {
      metric: 'Carbon Intensity',
      yourCompany: 72,
      industryAverage: 65,
      topPerformers: 85,
      unit: 'Score'
    },
    {
      metric: 'Employee Satisfaction',
      yourCompany: 78,
      industryAverage: 74,
      topPerformers: 88,
      unit: '%'
    },
    {
      metric: 'Board Diversity',
      yourCompany: 40,
      industryAverage: 35,
      topPerformers: 55,
      unit: '%'
    },
    {
      metric: 'Renewable Energy',
      yourCompany: 35,
      industryAverage: 28,
      topPerformers: 65,
      unit: '%'
    },
    {
      metric: 'Waste Reduction',
      yourCompany: 68,
      industryAverage: 62,
      topPerformers: 82,
      unit: 'Score'
    }
  ];

  const getPerformanceStatus = (your, average, top) => {
    if (your >= top * 0.9) return { status: 'excellent', color: 'text-green-600', bg: 'bg-green-100' };
    if (your >= average) return { status: 'above-average', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (your >= average * 0.8) return { status: 'average', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { status: 'below-average', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const chartData = benchmarkData.map(item => ({
    metric: item.metric.split(' ')[0],
    'Your Company': item.yourCompany,
    'Industry Average': item.industryAverage,
    'Top Performers': item.topPerformers
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Benchmark Comparison</h2>
          <p className="text-sm text-gray-600">
            {company.sector.charAt(0).toUpperCase() + company.sector.slice(1)} sector • {company.location}
          </p>
        </div>
        <select className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
          <option>Energy Sector</option>
          <option>Agriculture</option>
          <option>Logistics</option>
          <option>Manufacturing</option>
        </select>
      </div>

      {/* Chart */}
      <div className="mb-8">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="metric" stroke="#666" fontSize={12} />
              <YAxis stroke="#666" fontSize={12} />
              <Bar dataKey="Your Company" fill="#22c55e" name="Your Company" />
              <Bar dataKey="Industry Average" fill="#94a3b8" name="Industry Average" />
              <Bar dataKey="Top Performers" fill="#3b82f6" name="Top Performers" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center space-x-6 mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Your Company</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            <span className="text-sm text-gray-600">Industry Average</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Top Performers</span>
          </div>
        </div>
      </div>

      {/* Detailed Comparison */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900 mb-4">Performance Analysis</h3>
        {benchmarkData.map((item, index) => {
          const performance = getPerformanceStatus(item.yourCompany, item.industryAverage, item.topPerformers);
          return (
            <div key={item.metric} className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700">{item.metric}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${performance.bg} ${performance.color}`}>
                  {performance.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <div className="text-center">
                  <div className="font-semibold text-green-600">{item.yourCompany}{item.unit === 'Score' ? '' : item.unit}</div>
                  <div className="text-xs text-gray-500">You</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-gray-600">{item.industryAverage}{item.unit === 'Score' ? '' : item.unit}</div>
                  <div className="text-xs text-gray-500">Industry</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-blue-600">{item.topPerformers}{item.unit === 'Score' ? '' : item.unit}</div>
                  <div className="text-xs text-gray-500">Top 10%</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Insights */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">Key Insights</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Your company performs above industry average in 4 out of 5 metrics</li>
          <li>• Renewable energy adoption has the highest improvement potential</li>
          <li>• Board diversity exceeds industry standards but trails top performers</li>
        </ul>
      </div>
    </motion.div>
  );
}

export default BenchmarkComparison;