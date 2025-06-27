import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useESG } from '../../context/ESGContext';

const { FiFileText, FiDownload, FiEye, FiShare2, FiTrash2, FiFilter, FiSearch, FiCalendar } = FiIcons;

function ReportLibrary() {
  const { state } = useESG();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFramework, setFilterFramework] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  // Mock report data
  const reports = [
    {
      id: 1,
      title: 'Q4 2024 ESG Report',
      framework: 'GRI',
      period: 'Q4 2024',
      format: 'PDF',
      size: '2.4 MB',
      createdAt: new Date('2024-12-15'),
      status: 'completed',
      downloads: 12
    },
    {
      id: 2,
      title: 'Annual Sustainability Report 2024',
      framework: 'SASB',
      period: 'Annual 2024',
      format: 'PDF',
      size: '5.8 MB',
      createdAt: new Date('2024-12-01'),
      status: 'completed',
      downloads: 28
    },
    {
      id: 3,
      title: 'Q3 2024 Climate Disclosure',
      framework: 'TCFD',
      period: 'Q3 2024',
      format: 'Excel',
      size: '1.2 MB',
      createdAt: new Date('2024-10-15'),
      status: 'completed',
      downloads: 8
    },
    {
      id: 4,
      title: 'H1 2024 ESG Performance',
      framework: 'IFRS',
      period: 'H1 2024',
      format: 'PDF',
      size: '3.1 MB',
      createdAt: new Date('2024-07-30'),
      status: 'completed',
      downloads: 15
    },
    {
      id: 5,
      title: 'Q2 2024 Compliance Report',
      framework: 'GRI',
      period: 'Q2 2024',
      format: 'Word',
      size: '1.8 MB',
      createdAt: new Date('2024-07-15'),
      status: 'completed',
      downloads: 6
    }
  ];

  const getFrameworkColor = (framework) => {
    switch (framework) {
      case 'GRI': return 'bg-green-100 text-green-800';
      case 'SASB': return 'bg-blue-100 text-blue-800';
      case 'IFRS': return 'bg-purple-100 text-purple-800';
      case 'TCFD': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFormatIcon = (format) => {
    switch (format) {
      case 'PDF': return FiFileText;
      case 'Excel': return FiFileText;
      case 'Word': return FiFileText;
      default: return FiFileText;
    }
  };

  const filteredReports = reports
    .filter(report => 
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterFramework === 'all' || report.framework === filterFramework)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'downloads':
          return b.downloads - a.downloads;
        default:
          return 0;
      }
    });

  return (
    <div className="space-y-8">
      {/* Header with Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Report Library</h2>
            <p className="text-gray-600">Access and manage all your generated ESG reports</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200">
              Generate New Report
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-1">{reports.length}</div>
            <div className="text-sm text-gray-600">Total Reports</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {reports.reduce((sum, report) => sum + report.downloads, 0)}
            </div>
            <div className="text-sm text-gray-600">Downloads</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {reports.filter(r => r.createdAt > new Date(Date.now() - 30*24*60*60*1000)).length}
            </div>
            <div className="text-sm text-gray-600">This Month</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600 mb-1">
              {(reports.reduce((sum, report) => sum + parseFloat(report.size), 0)).toFixed(1)} MB
            </div>
            <div className="text-sm text-gray-600">Total Size</div>
          </div>
        </div>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <select
            value={filterFramework}
            onChange={(e) => setFilterFramework(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Frameworks</option>
            <option value="GRI">GRI Standards</option>
            <option value="SASB">SASB Standards</option>
            <option value="IFRS">IFRS S1/S2</option>
            <option value="TCFD">TCFD</option>
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="date">Sort by Date</option>
            <option value="title">Sort by Title</option>
            <option value="downloads">Sort by Downloads</option>
          </select>
        </div>
      </motion.div>

      {/* Reports Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-4"
      >
        {filteredReports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:border-gray-300 transition-colors duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <SafeIcon icon={getFormatIcon(report.format)} className="w-6 h-6 text-gray-600" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-gray-900 truncate">{report.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${getFrameworkColor(report.framework)}`}>
                      {report.framework}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <SafeIcon icon={FiCalendar} className="w-4 h-4" />
                      <span>{report.period}</span>
                    </div>
                    <span>{report.format}</span>
                    <span>{report.size}</span>
                    <span>{report.downloads} downloads</span>
                    <span>Created {report.createdAt.toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200" title="Preview">
                  <SafeIcon icon={FiEye} className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-green-600 transition-colors duration-200" title="Download">
                  <SafeIcon icon={FiDownload} className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200" title="Share">
                  <SafeIcon icon={FiShare2} className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200" title="Delete">
                  <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredReports.length === 0 && (
        <div className="text-center py-12">
          <SafeIcon icon={FiFileText} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
          <p className="text-gray-600">
            {searchTerm || filterFramework !== 'all' 
              ? 'Try adjusting your search and filter criteria'
              : 'Generate your first ESG report to get started'
            }
          </p>
        </div>
      )}
    </div>
  );
}

export default ReportLibrary;