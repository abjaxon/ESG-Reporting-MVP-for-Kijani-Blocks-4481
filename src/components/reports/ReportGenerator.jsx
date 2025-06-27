import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useESG } from '../../context/ESGContext';

const { FiFileText, FiDownload, FiCalendar, FiSettings, FiPlay, FiCheck } = FiIcons;

function ReportGenerator() {
  const { state, dispatch } = useESG();
  const [reportConfig, setReportConfig] = useState({
    title: 'Q4 2024 ESG Report',
    framework: 'GRI',
    period: 'Q4 2024',
    sections: ['executive-summary', 'environmental', 'social', 'governance', 'metrics'],
    format: 'PDF',
    language: 'English'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  const frameworks = [
    { id: 'GRI', name: 'GRI Standards', description: 'Global Reporting Initiative standards' },
    { id: 'SASB', name: 'SASB Standards', description: 'Sustainability Accounting Standards Board' },
    { id: 'IFRS', name: 'IFRS S1/S2', description: 'International Financial Reporting Standards' },
    { id: 'TCFD', name: 'TCFD', description: 'Task Force on Climate-related Financial Disclosures' }
  ];

  const sections = [
    { id: 'executive-summary', name: 'Executive Summary', required: true },
    { id: 'environmental', name: 'Environmental Performance', required: true },
    { id: 'social', name: 'Social Impact', required: true },
    { id: 'governance', name: 'Governance Practices', required: true },
    { id: 'metrics', name: 'Key Metrics & KPIs', required: true },
    { id: 'benchmarking', name: 'Industry Benchmarking', required: false },
    { id: 'risks', name: 'Risk Assessment', required: false },
    { id: 'targets', name: 'Future Targets', required: false }
  ];

  const formats = ['PDF', 'Excel', 'HTML', 'Word'];
  const languages = ['English', 'French', 'Spanish', 'Portuguese', 'Swahili'];

  const generateReport = async () => {
    setIsGenerating(true);
    setGenerationProgress(0);

    // Simulate report generation with progress updates
    const steps = [
      { message: 'Collecting data...', progress: 20 },
      { message: 'Applying framework standards...', progress: 40 },
      { message: 'Generating charts and visualizations...', progress: 60 },
      { message: 'Performing compliance checks...', progress: 80 },
      { message: 'Finalizing report...', progress: 100 }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setGenerationProgress(step.progress);
    }

    // Add report to library
    const newReport = {
      id: Date.now(),
      title: reportConfig.title,
      framework: reportConfig.framework,
      period: reportConfig.period,
      format: reportConfig.format,
      createdAt: new Date(),
      status: 'completed',
      size: '2.4 MB'
    };

    dispatch({ type: 'ADD_REPORT', report: newReport });
    
    setTimeout(() => {
      setIsGenerating(false);
      setGenerationProgress(0);
    }, 1000);
  };

  return (
    <div className="space-y-8">
      {/* Report Configuration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Report Configuration</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Report Title
            </label>
            <input
              type="text"
              value={reportConfig.title}
              onChange={(e) => setReportConfig(prev => ({ ...prev, title: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reporting Period
            </label>
            <select
              value={reportConfig.period}
              onChange={(e) => setReportConfig(prev => ({ ...prev, period: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option>Q4 2024</option>
              <option>Q3 2024</option>
              <option>Annual 2024</option>
              <option>H2 2024</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Output Format
            </label>
            <select
              value={reportConfig.format}
              onChange={(e) => setReportConfig(prev => ({ ...prev, format: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {formats.map(format => (
                <option key={format} value={format}>{format}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <select
              value={reportConfig.language}
              onChange={(e) => setReportConfig(prev => ({ ...prev, language: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {languages.map(language => (
                <option key={language} value={language}>{language}</option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Framework Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Reporting Framework</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {frameworks.map((framework) => (
            <div
              key={framework.id}
              onClick={() => setReportConfig(prev => ({ ...prev, framework: framework.id }))}
              className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                reportConfig.framework === framework.id
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">{framework.name}</h3>
                {reportConfig.framework === framework.id && (
                  <SafeIcon icon={FiCheck} className="w-5 h-5 text-primary-600" />
                )}
              </div>
              <p className="text-sm text-gray-600">{framework.description}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Section Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Report Sections</h2>
        
        <div className="space-y-3">
          {sections.map((section) => (
            <div key={section.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={reportConfig.sections.includes(section.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setReportConfig(prev => ({
                        ...prev,
                        sections: [...prev.sections, section.id]
                      }));
                    } else if (!section.required) {
                      setReportConfig(prev => ({
                        ...prev,
                        sections: prev.sections.filter(s => s !== section.id)
                      }));
                    }
                  }}
                  disabled={section.required}
                  className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <div>
                  <h3 className="font-medium text-gray-900">{section.name}</h3>
                  {section.required && (
                    <span className="text-xs text-gray-500">Required</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Generation Progress */}
      {isGenerating && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Generating Report</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Progress</span>
              <span className="text-sm font-medium text-gray-900">{generationProgress}%</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${generationProgress}%` }}
              ></div>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></div>
              <span>AI is analyzing your data and generating the report...</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Generate Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-900 mb-1">Ready to Generate</h3>
            <p className="text-sm text-gray-600">
              Report will be generated based on your current configuration
            </p>
          </div>
          
          <button
            onClick={generateReport}
            disabled={isGenerating}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <SafeIcon icon={isGenerating ? FiSettings : FiPlay} className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Generating...' : 'Generate Report'}</span>
          </button>
        </div>
      </motion.div>

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Report Insights</h3>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Data Coverage Analysis</h4>
            <p className="text-sm text-blue-800">
              Your data covers 95% of required {reportConfig.framework} indicators. Missing: Water recycling metrics.
            </p>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">Performance Highlights</h4>
            <p className="text-sm text-green-800">
              Carbon emissions reduced by 12% compared to last quarter. Employee satisfaction increased by 8%.
            </p>
          </div>
          
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-medium text-yellow-900 mb-2">Improvement Opportunities</h4>
            <p className="text-sm text-yellow-800">
              Consider including scope 3 emissions data and supply chain sustainability metrics for comprehensive reporting.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ReportGenerator;