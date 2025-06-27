import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useESG } from '../../context/ESGContext';

function ESGScoreCard() {
  const { state } = useESG();
  const { esgData } = state;

  // Calculate individual scores
  const calculateScores = () => {
    const envScore = Math.round((esgData.environmental.renewableEnergyPercentage + 
                               (100 - (esgData.environmental.carbonEmissions / 20))) / 2);
    const socialScore = Math.round((esgData.social.employeeSatisfaction + 
                                  esgData.social.diversityIndex) / 2);
    const govScore = Math.round((esgData.governance.boardDiversity + 
                               esgData.governance.ethicsTraining + 
                               esgData.governance.transparencyScore) / 3);
    
    return { envScore, socialScore, govScore };
  };

  const { envScore, socialScore, govScore } = calculateScores();
  const overallScore = Math.round((envScore + socialScore + govScore) / 3);

  const data = [
    { name: 'Environmental', value: envScore, color: '#22c55e' },
    { name: 'Social', value: socialScore, color: '#3b82f6' },
    { name: 'Governance', value: govScore, color: '#f59e0b' }
  ];

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Improvement';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">ESG Score Overview</h2>
        <span className="text-sm text-gray-500">Last updated: Today</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Overall Score */}
        <div className="text-center">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[{ value: overallScore }, { value: 100 - overallScore }]}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={60}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                >
                  <Cell fill="#22c55e" />
                  <Cell fill="#e5e7eb" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className={`text-2xl font-bold ${getScoreColor(overallScore)}`}>
                  {overallScore}
                </div>
                <div className="text-xs text-gray-500">Overall</div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-gray-900 mb-1">Overall ESG Score</h3>
            <p className={`text-sm font-medium ${getScoreColor(overallScore)}`}>
              {getScoreLabel(overallScore)}
            </p>
          </div>
        </div>

        {/* Individual Scores */}
        <div className="space-y-4">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm font-medium text-gray-700">{item.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${item.value}%`, 
                      backgroundColor: item.color 
                    }}
                  ></div>
                </div>
                <span className={`text-sm font-semibold ${getScoreColor(item.value)}`}>
                  {item.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">AI Recommendations</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Focus on renewable energy adoption to improve Environmental score</li>
          <li>• Enhance board diversity for better Governance rating</li>
          <li>• Increase employee training hours to boost Social metrics</li>
        </ul>
      </div>
    </motion.div>
  );
}

export default ESGScoreCard;