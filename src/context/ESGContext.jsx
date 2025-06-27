import React, { createContext, useContext, useReducer, useEffect } from 'react';

const ESGContext = createContext();

const initialState = {
  user: {
    id: 1,
    name: 'Sarah Johnson',
    role: 'ESG Manager',
    company: 'GreenTech Solutions Ltd.',
    sector: 'energy',
    location: 'Kenya'
  },
  company: {
    name: 'GreenTech Solutions Ltd.',
    sector: 'energy',
    size: 'mid-sized',
    employees: 250,
    location: 'Nairobi, Kenya',
    reportingStandards: ['GRI', 'SASB']
  },
  esgData: {
    environmental: {
      carbonEmissions: 1250,
      energyConsumption: 3400,
      waterUsage: 12500,
      wasteGenerated: 45,
      renewableEnergyPercentage: 35
    },
    social: {
      employeeSatisfaction: 78,
      diversityIndex: 65,
      trainingHours: 1200,
      communityInvestment: 150000,
      safetyIncidents: 2
    },
    governance: {
      boardDiversity: 40,
      ethicsTraining: 95,
      dataPrivacyCompliance: 85,
      transparencyScore: 72,
      riskManagement: 80
    }
  },
  reports: [],
  benchmarks: {
    industry: 'energy',
    region: 'east-africa',
    size: 'mid-sized'
  },
  notifications: [
    {
      id: 1,
      type: 'warning',
      message: 'Carbon emissions target requires attention',
      date: new Date()
    },
    {
      id: 2,
      type: 'success',
      message: 'Q3 ESG report generated successfully',
      date: new Date()
    }
  ]
};

function esgReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_ESG_DATA':
      return {
        ...state,
        esgData: {
          ...state.esgData,
          [action.category]: {
            ...state.esgData[action.category],
            ...action.data
          }
        }
      };
    case 'ADD_REPORT':
      return {
        ...state,
        reports: [...state.reports, action.report]
      };
    case 'UPDATE_COMPANY_INFO':
      return {
        ...state,
        company: { ...state.company, ...action.data }
      };
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [action.notification, ...state.notifications]
      };
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.id)
      };
    default:
      return state;
  }
}

export function ESGProvider({ children }) {
  const [state, dispatch] = useReducer(esgReducer, initialState);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate slight variations in ESG metrics
      const categories = ['environmental', 'social', 'governance'];
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      
      // Small random updates to simulate real data changes
      if (Math.random() > 0.8) { // 20% chance of update
        const updates = {};
        const currentData = state.esgData[randomCategory];
        Object.keys(currentData).forEach(key => {
          if (typeof currentData[key] === 'number') {
            const variation = (Math.random() - 0.5) * 0.02; // ±1% variation
            updates[key] = Math.max(0, Math.round(currentData[key] * (1 + variation)));
          }
        });
        
        dispatch({
          type: 'UPDATE_ESG_DATA',
          category: randomCategory,
          data: updates
        });
      }
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [state.esgData]);

  return (
    <ESGContext.Provider value={{ state, dispatch }}>
      {children}
    </ESGContext.Provider>
  );
}

export function useESG() {
  const context = useContext(ESGContext);
  if (!context) {
    throw new Error('useESG must be used within an ESGProvider');
  }
  return context;
}