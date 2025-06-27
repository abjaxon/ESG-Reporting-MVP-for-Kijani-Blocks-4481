import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiLayout, FiDownload, FiEye, FiStar, FiFilter, FiPlus, FiSettings } = FiIcons;

function ReportTemplates() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFramework, setSelectedFramework] = useState('all');

  const templates = [
    {
      id: 1,
      name: 'Comprehensive ESG Report',
      description: 'Full-featured ESG report template with all standard sections',
      framework: 'GRI',
      category: 'comprehensive',
      sections: ['Executive Summary', 'Environmental', 'Social', 'Governance', 'Metrics', 'Benchmarks'],
      pages: 45,
      downloads: 1250,
      rating: 4.8,
      featured: true,
      preview: '/templates/comprehensive-esg.jpg'
    },
    {
      id: 2,
      name: 'Climate Disclosure Template',
      description: 'Focused template for climate-related financial disclosures',
      framework: 'TCFD',
      category: 'climate',
      sections: ['Governance', 'Strategy', 'Risk Management', 'Metrics & Targets'],
      pages: 28,
      downloads: 890,
      rating: 4.6,
      featured: true,
      preview: '/templates/climate-disclosure.jpg'
    },
    {
      id: 3,
      name: 'SASB Industry Template',
      description: 'Industry-specific template for energy sector reporting',
      framework: 'SASB',
      category: 'industry',
      sections: ['Energy Management', 'Air Quality', 'Workforce Health', 'Customer Relations'],
      pages: 32,
      downloads: 670,
      rating: 4.5,
      featured: false,
      preview: '/templates/sasb-industry.jpg'
    },
    {
      id: 4,
      name: 'Quarterly ESG Update',
      description: 'Streamlined template for quarterly progress reports',
      framework: 'GRI',
      category: 'quarterly',
      sections: ['Performance Overview', 'Key Metrics', 'Progress Updates', 'Next Steps'],
      pages: 18,
      downloads: 1100,
      rating: 4.7,
      featured: false,
      preview: '/templates/quarterly-update.jpg'
    },
    {
      id: 5,
      name: 'IFRS Sustainability Report',
      description: 'Template aligned with IFRS S1 and S2 standards',
      framework: 'IFRS',
      category: 'comprehensive',
      sections: ['General Requirements', 'Climate Disclosures', 'Sustainability Metrics'],
      pages: 38,
      downloads: 520,
      rating: 4.4,
      featured: false,
      preview: '/templates/ifrs-sustainability.jpg'
    },
    {
      id: 6,
      name: 'Executive Summary Template',
      description: 'Concise template for board and stakeholder presentations',
      framework: 'Multi',
      category: 'executive',
      sections: ['Key Performance', 'Strategic Initiatives', 'Risk Overview', 'Outlook'],
      pages: 12,
      downloads: 980,
      rating: 4.9,
      featured: true,
      preview: '/templates/executive-summary.jpg'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Templates' },
    { id: 'comprehensive', name: 'Comprehensive' },
    { id: 'quarterly', name: 'Quarterly Reports' },
    { id: 'climate', name: 'Climate Focused' },
    { id: 'industry', name: 'Industry Specific' },
    { id: 'executive', name: 'Executive Summary' }
  ];

  const frameworks = [
    { id: 'all', name: 'All Frameworks' },
    { id: 'GRI', name: 'GRI Standards' },
    { id: 'SASB', name: 'SASB Standards' },
    { id: 'IFRS', name: 'IFRS S1/S2' },
    { id: 'TCFD', name: 'TCFD' },
    { id: 'Multi', name: 'Multi-Framework' }
  ];

  const getFrameworkColor = (framework) => {
    switch (framework) {
      case 'GRI': return 'bg-green-100 text-green-800';
      case 'SASB': return 'bg-blue-100 text-blue-800';
      case 'IFRS': return 'bg-purple-100 text-purple-800';
      case 'TCFD': return 'bg-yellow-100 text-yellow-800';
      case 'Multi': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTemplates = templates.filter(template => 
    (selectedCategory === 'all' || template.category === selectedCategory) &&
    (selectedFramework === 'all' || template.framework === selectedFramework)
  );

  const featuredTemplates = templates.filter(template => template.featured);

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Report Templates</h2>
            <p className="text-gray-600">Professional templates to accelerate your ESG reporting</p>
          </div>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center space-x-2">
            <SafeIcon icon={FiPlus} className="w-4 h-4" />
            <span>Create Custom Template</span>
          </button>
        </div>
      </motion.div>

      {/* Featured Templates */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
          <SafeIcon icon={FiStar} className="w-5 h-5 text-yellow-500" />
          <span>Featured Templates</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg overflow-hidden hover:border-primary-300 hover:shadow-md transition-all duration-200"
            >
              <div className="h-32 bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                <SafeIcon icon={FiLayout} className="w-12 h-12 text-white" />
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{template.name}</h4>
                  <div className="flex items-center space-x-1">
                    <SafeIcon icon={FiStar} className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-600">{template.rating}</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${getFrameworkColor(template.framework)}`}>
                    {template.framework}
                  </span>
                  <span className="text-sm text-gray-500">{template.pages} pages</span>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 bg-primary-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-primary-700 transition-colors duration-200">
                    Use Template
                  </button>
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <SafeIcon icon={FiEye} className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Framework</label>
            <select
              value={selectedFramework}
              onChange={(e) => setSelectedFramework(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {frameworks.map(framework => (
                <option key={framework.id} value={framework.id}>{framework.name}</option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* All Templates */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="space-y-4"
      >
        <h3 className="text-lg font-semibold text-gray-900">
          All Templates ({filteredTemplates.length})
        </h3>
        
        <div className="space-y-4">
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:border-gray-300 transition-colors duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                    <SafeIcon icon={FiLayout} className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold text-gray-900">{template.name}</h4>
                      {template.featured && (
                        <SafeIcon icon={FiStar} className="w-4 h-4 text-yellow-500" />
                      )}
                      <span className={`text-xs px-2 py-1 rounded-full ${getFrameworkColor(template.framework)}`}>
                        {template.framework}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{template.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {template.sections.map((section, sectionIndex) => (
                        <span
                          key={sectionIndex}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                        >
                          {section}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <SafeIcon icon={FiDownload} className="w-4 h-4" />
                        <span>{template.downloads.toLocaleString()} downloads</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <SafeIcon icon={FiStar} className="w-4 h-4" />
                        <span>{template.rating} rating</span>
                      </div>
                      <span>{template.pages} pages</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200" title="Preview">
                    <SafeIcon icon={FiEye} className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200" title="Customize">
                    <SafeIcon icon={FiSettings} className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200">
                    Use Template
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Template Builder CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-8 text-center"
      >
        <h3 className="text-xl font-semibold text-white mb-4">
          Can't find the perfect template?
        </h3>
        <p className="text-primary-100 mb-6">
          Use our template builder to create a custom report template that matches your specific needs and branding.
        </p>
        <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200">
          Launch Template Builder
        </button>
      </motion.div>
    </div>
  );
}

export default ReportTemplates;