import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useESG } from '../context/ESGContext';

const { FiUser, FiBuilding, FiSettings, FiBell, FiShield, FiGlobe, FiSave, FiEdit3 } = FiIcons;

function Settings() {
  const { state, dispatch } = useESG();
  const { user, company } = state;
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState({});

  const tabs = [
    { id: 'profile', name: 'Profile', icon: FiUser },
    { id: 'company', name: 'Company', icon: FiBuilding },
    { id: 'notifications', name: 'Notifications', icon: FiBell },
    { id: 'preferences', name: 'Preferences', icon: FiSettings },
    { id: 'security', name: 'Security', icon: FiShield },
    { id: 'integrations', name: 'Integrations', icon: FiGlobe }
  ];

  const [profileData, setProfileData] = useState({
    name: user.name,
    email: 'sarah.johnson@greentech.co.ke',
    role: user.role,
    phone: '+254 712 345 678',
    department: 'Sustainability',
    location: 'Nairobi, Kenya'
  });

  const [companyData, setCompanyData] = useState({
    name: company.name,
    sector: company.sector,
    size: company.size,
    employees: company.employees,
    location: company.location,
    website: 'https://greentech.co.ke',
    description: 'Leading renewable energy solutions provider in East Africa'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailReports: true,
    riskAlerts: true,
    dataUpdates: false,
    weeklyDigest: true,
    systemMaintenance: true,
    complianceDeadlines: true
  });

  const [preferences, setPreferences] = useState({
    language: 'English',
    timezone: 'Africa/Nairobi',
    dateFormat: 'DD/MM/YYYY',
    currency: 'KES',
    theme: 'light',
    defaultFramework: 'GRI'
  });

  const handleEdit = (field) => {
    setIsEditing({ ...isEditing, [field]: true });
  };

  const handleSave = (field) => {
    setIsEditing({ ...isEditing, [field]: false });
    // Here you would typically save to backend
    if (field === 'profile') {
      dispatch({ type: 'UPDATE_USER_INFO', data: profileData });
    } else if (field === 'company') {
      dispatch({ type: 'UPDATE_COMPANY_INFO', data: companyData });
    }
  };

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-6">
        <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
          <SafeIcon icon={FiUser} className="w-8 h-8 text-primary-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{profileData.name}</h3>
          <p className="text-gray-600">{profileData.role}</p>
          <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            Change Photo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(profileData).map(([key, value]) => (
          <div key={key} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </label>
            <div className="flex items-center space-x-2">
              {isEditing[key] ? (
                <>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => setProfileData({ ...profileData, [key]: e.target.value })}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                  <button
                    onClick={() => handleSave('profile')}
                    className="p-2 text-green-600 hover:text-green-700"
                  >
                    <SafeIcon icon={FiSave} className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <span className="flex-1 py-2 text-gray-900">{value}</span>
                  <button
                    onClick={() => handleEdit(key)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <SafeIcon icon={FiEdit3} className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCompanySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(companyData).map(([key, value]) => (
          <div key={key} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </label>
            <div className="flex items-center space-x-2">
              {isEditing[key] ? (
                <>
                  {key === 'sector' ? (
                    <select
                      value={value}
                      onChange={(e) => setCompanyData({ ...companyData, [key]: e.target.value })}
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="energy">Energy</option>
                      <option value="agriculture">Agriculture</option>
                      <option value="logistics">Logistics</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="technology">Technology</option>
                      <option value="healthcare">Healthcare</option>
                    </select>
                  ) : key === 'size' ? (
                    <select
                      value={value}
                      onChange={(e) => setCompanyData({ ...companyData, [key]: e.target.value })}
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="small">Small (1-50 employees)</option>
                      <option value="mid-sized">Mid-sized (51-500 employees)</option>
                      <option value="large">Large (500+ employees)</option>
                    </select>
                  ) : (
                    <input
                      type={key === 'employees' ? 'number' : 'text'}
                      value={value}
                      onChange={(e) => setCompanyData({ ...companyData, [key]: e.target.value })}
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  )}
                  <button
                    onClick={() => handleSave('company')}
                    className="p-2 text-green-600 hover:text-green-700"
                  >
                    <SafeIcon icon={FiSave} className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <span className="flex-1 py-2 text-gray-900">{value}</span>
                  <button
                    onClick={() => handleEdit(key)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <SafeIcon icon={FiEdit3} className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
      <div className="space-y-4">
        {Object.entries(notificationSettings).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <h4 className="font-medium text-gray-900">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </h4>
              <p className="text-sm text-gray-600">
                {key === 'emailReports' && 'Receive automated ESG reports via email'}
                {key === 'riskAlerts' && 'Get notified about high-priority risk alerts'}
                {key === 'dataUpdates' && 'Notifications when new data is processed'}
                {key === 'weeklyDigest' && 'Weekly summary of ESG performance'}
                {key === 'systemMaintenance' && 'System updates and maintenance notices'}
                {key === 'complianceDeadlines' && 'Reminders for compliance deadlines'}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => setNotificationSettings({ 
                  ...notificationSettings, 
                  [key]: e.target.checked 
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPreferences = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Application Preferences</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(preferences).map(([key, value]) => (
          <div key={key} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </label>
            <select
              value={value}
              onChange={(e) => setPreferences({ ...preferences, [key]: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {key === 'language' && (
                <>
                  <option value="English">English</option>
                  <option value="French">French</option>
                  <option value="Spanish">Spanish</option>
                  <option value="Portuguese">Portuguese</option>
                  <option value="Swahili">Swahili</option>
                </>
              )}
              {key === 'timezone' && (
                <>
                  <option value="Africa/Nairobi">Africa/Nairobi</option>
                  <option value="Africa/Lagos">Africa/Lagos</option>
                  <option value="Africa/Cairo">Africa/Cairo</option>
                  <option value="Africa/Johannesburg">Africa/Johannesburg</option>
                </>
              )}
              {key === 'dateFormat' && (
                <>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </>
              )}
              {key === 'currency' && (
                <>
                  <option value="KES">KES - Kenyan Shilling</option>
                  <option value="NGN">NGN - Nigerian Naira</option>
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                </>
              )}
              {key === 'theme' && (
                <>
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="auto">Auto</option>
                </>
              )}
              {key === 'defaultFramework' && (
                <>
                  <option value="GRI">GRI Standards</option>
                  <option value="SASB">SASB Standards</option>
                  <option value="IFRS">IFRS S1/S2</option>
                  <option value="TCFD">TCFD</option>
                </>
              )}
            </select>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
      
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Password</h4>
          <p className="text-sm text-gray-600 mb-3">Last changed 30 days ago</p>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200">
            Change Password
          </button>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Two-Factor Authentication</h4>
          <p className="text-sm text-gray-600 mb-3">Add an extra layer of security to your account</p>
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            Enable 2FA
          </button>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Active Sessions</h4>
          <p className="text-sm text-gray-600 mb-3">Manage your active sessions across devices</p>
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            View Sessions
          </button>
        </div>
        
        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
          <h4 className="font-medium text-red-900 mb-2">Delete Account</h4>
          <p className="text-sm text-red-800 mb-3">Permanently delete your account and all associated data</p>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );

  const renderIntegrations = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Connected Integrations</h3>
      
      <div className="space-y-4">
        {[
          { name: 'SAP ERP', status: 'Connected', icon: FiBuilding },
          { name: 'Google Workspace', status: 'Connected', icon: FiGlobe },
          { name: 'Microsoft 365', status: 'Available', icon: FiSettings },
          { name: 'Salesforce', status: 'Available', icon: FiUser },
        ].map((integration, index) => (
          <div key={integration.name} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <SafeIcon icon={integration.icon} className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{integration.name}</h4>
                <p className="text-sm text-gray-600">{integration.status}</p>
              </div>
            </div>
            <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              integration.status === 'Connected' 
                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                : 'bg-primary-600 text-white hover:bg-primary-700'
            }`}>
              {integration.status === 'Connected' ? 'Disconnect' : 'Connect'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'profile': return renderProfileSettings();
      case 'company': return renderCompanySettings();
      case 'notifications': return renderNotificationSettings();
      case 'preferences': return renderPreferences();
      case 'security': return renderSecurity();
      case 'integrations': return renderIntegrations();
      default: return renderProfileSettings();
    }
  };

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
              Settings
            </h1>
            <p className="text-gray-600">
              Manage your account, company information, and preferences
            </p>
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'bg-primary-50 text-primary-700 border border-primary-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <SafeIcon icon={tab.icon} className="w-5 h-5" />
                  <span className="font-medium">{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
            >
              {renderActiveTab()}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;