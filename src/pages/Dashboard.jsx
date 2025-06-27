import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useESG } from '../context/ESGContext';
import ESGScoreCard from '../components/dashboard/ESGScoreCard';
import MetricsOverview from '../components/dashboard/MetricsOverview';
import RecentActivity from '../components/dashboard/RecentActivity';
import RiskAlerts from '../components/dashboard/RiskAlerts';
import BenchmarkComparison from '../components/dashboard/BenchmarkComparison';
import AIInsightsPanel from '../components/ai/AIInsightsPanel';

const { FiTrendingUp, FiAlertTriangle, FiTarget, FiAward } = FiIcons;

function Dashboard() {
  const { state } = useESG();
  const { esgData, company, user } = state;

  // Calculate overall ESG score
  const calculateESGScore = () => {
    const envScore = (esgData.environmental.renewableEnergyPercentage + 
      (100 - (esgData.environmental.carbonEmissions / 20))) / 2;
    const socialScore = (esgData.social.employeeSatisfaction + esgData.social.diversityIndex) / 2;
    const govScore = (esgData.governance.boardDiversity + 
      esgData.governance.ethicsTraining + esgData.governance.transparencyScore) / 3;
    return Math.round((envScore + socialScore + govScore) / 3);
  };

  const overallScore = calculateESGScore();

  const quickStats = [
    {
      title: 'ESG Score',
      value: overallScore,
      suffix: '/100',
      change: '+2.3',
      changeType: 'positive',
      icon: FiAward,
      color: 'primary'
    },
    {
      title: 'Carbon Emissions',
      value: esgData.environmental.carbonEmissions,
      suffix: ' tCO2e',
      change: '-5.2%',
      changeType: 'positive',
      icon: FiTrendingUp,
      color: 'green'
    },
    {
      title: 'Risk Alerts',
      value: 3,
      suffix: ' Active',
      change: '+1',
      changeType: 'negative',
      icon: FiAlertTriangle,
      color: 'red'
    },
    {
      title: 'Compliance',
      value: 94,
      suffix: '%',
      change: '+1.2%',
      changeType: 'positive',
      icon: FiTarget,
      color: 'blue'
    }
  ];

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
              Welcome back, {user.name}
            </h1>
            <p className="text-gray-600">
              Here's your ESG performance overview for {company.name}
            </p>
          </motion.div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  stat.color === 'primary' ? 'bg-primary-100' :
                  stat.color === 'green' ? 'bg-green-100' :
                  stat.color === 'red' ? 'bg-red-100' : 'bg-blue-100'
                }`}>
                  <SafeIcon icon={stat.icon} className={`w-6 h-6 ${
                    stat.color === 'primary' ? 'text-primary-600' :
                    stat.color === 'green' ? 'text-green-600' :
                    stat.color === 'red' ? 'text-red-600' : 'text-blue-600'
                  }`} />
                </div>
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                  stat.changeType === 'positive' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}{stat.suffix}
              </h3>
              <p className="text-gray-600 text-sm">{stat.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <ESGScoreCard />
            <MetricsOverview />
            <BenchmarkComparison />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <AIInsightsPanel />
            <RiskAlerts />
            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;