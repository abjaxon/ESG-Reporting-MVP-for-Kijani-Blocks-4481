import { useState, useCallback } from 'react';

// Mock AI service for demo purposes
const mockAIService = {
  async generateESGInsights(esgData, companyInfo) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return [
      {
        type: "performance",
        category: "environmental",
        title: "Carbon Emissions Reduction",
        message: "Your carbon emissions have decreased by 12% compared to last quarter, indicating strong environmental progress.",
        priority: "medium",
        action: "Continue current reduction strategies and set more ambitious targets"
      },
      {
        type: "opportunity",
        category: "social",
        title: "Employee Engagement Growth",
        message: "Employee satisfaction scores show positive trends. Consider expanding diversity and inclusion programs.",
        priority: "medium",
        action: "Implement structured D&I training programs"
      },
      {
        type: "warning",
        category: "governance",
        title: "Board Diversity Gap",
        message: "Board diversity is below industry benchmark. Consider prioritizing diverse candidates in next recruitment cycle.",
        priority: "high",
        action: "Schedule board recruitment review"
      }
    ];
  },

  async generateComplianceRecommendations(framework, complianceData) {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return [
      {
        priority: "high",
        requirement: "Data Collection",
        issue: "Missing water consumption and waste generation data",
        solution: "Implement automated data collection systems",
        impact: "Required for full compliance certification",
        timeframe: "3 months"
      },
      {
        priority: "medium",
        requirement: "Board Diversity Reporting",
        issue: "Incomplete diversity metrics documentation",
        solution: "Enhance HR data collection processes",
        impact: "Improve governance score by 15-20 points",
        timeframe: "6 weeks"
      }
    ];
  },

  async generateExecutiveSummary(esgData, companyInfo, period) {
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    return `${companyInfo.name} demonstrates strong commitment to sustainability in our ${period} ESG report. Key achievements include improved environmental performance and enhanced governance practices. We continue to focus on measurable progress across all ESG dimensions while driving business value. Our carbon emissions reduction of 12% and increased employee satisfaction scores highlight our dedication to sustainable operations.`;
  },

  async validateDataQuality(dataPoints) {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return {
      issues: [
        {
          type: "anomaly",
          field: "Energy Consumption",
          value: "3400 MWh",
          severity: "medium",
          explanation: "15% higher than previous month average",
          suggestion: "Verify meter readings and check for seasonal adjustments"
        }
      ],
      overallQuality: 'good',
      confidence: 85
    };
  }
};

export function useAI() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateInsights = useCallback(async (esgData, companyInfo) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const insights = await mockAIService.generateESGInsights(esgData, companyInfo);
      return insights;
    } catch (err) {
      setError('Failed to generate AI insights');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const generateComplianceRecommendations = useCallback(async (framework, complianceData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const recommendations = await mockAIService.generateComplianceRecommendations(framework, complianceData);
      return recommendations;
    } catch (err) {
      setError('Failed to generate compliance recommendations');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const generateExecutiveSummary = useCallback(async (esgData, companyInfo, period) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const summary = await mockAIService.generateExecutiveSummary(esgData, companyInfo, period);
      return summary;
    } catch (err) {
      setError('Failed to generate executive summary');
      return `Executive summary for ${companyInfo.name} ${period} ESG report.`;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const validateDataQuality = useCallback(async (dataPoints) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const validation = await mockAIService.validateDataQuality(dataPoints);
      return validation;
    } catch (err) {
      setError('Failed to validate data quality');
      return { issues: [], overallQuality: 'good', confidence: 0 };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    generateInsights,
    generateComplianceRecommendations,
    generateExecutiveSummary,
    validateDataQuality,
    isLoading,
    error
  };
}