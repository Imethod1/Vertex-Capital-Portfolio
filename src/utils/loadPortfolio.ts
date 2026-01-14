import { PortfolioState, AllocationSnapshot, Security } from '../types/portfolio';

const STORAGE_KEY = 'vertex_portfolio_state';

/**
 * Load portfolio data from localStorage or return default structure
 */
export const loadPortfolioData = async (): Promise<PortfolioState> => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.warn('Failed to load portfolio from localStorage:', error);
  }

  // Return default/initial state
  return {
    date: new Date().toISOString().split('T')[0],
    allocations: [],
    securities: [],
    riskMetrics: [],
    liquidityItems: [],
    tacticalAdjustments: [],
    performanceMetrics: [],
    complianceChecks: [],
  };
};

/**
 * Save portfolio data to localStorage
 */
export const savePortfolioData = (state: PortfolioState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    console.log('Portfolio data saved successfully');
  } catch (error) {
    console.error('Failed to save portfolio data:', error);
  }
};

/**
 * Calculate deviation between target and current values
 */
export const calculateDeviation = (target: number, current: number): number => {
  return current - target;
};

/**
 * Calculate percentage deviation
 */
export const calculatePercentageDeviation = (target: number, current: number): number => {
  if (target === 0) return 0;
  return ((current - target) / target) * 100;
};

/**
 * Check if allocation needs rebalancing (deviation > ±3%)
 */
export const needsRebalancing = (deviation: number): boolean => {
  return Math.abs(deviation) > 3;
};

/**
 * Check if all allocations are compliant
 */
export const checkAllocationCompliance = (allocations: AllocationSnapshot[]): boolean => {
  return allocations.every((alloc) => !alloc.rebalancingRequired);
};

/**
 * Check security compliance limits
 */
export const checkSecurityCompliance = (securities: Security[]): {
  isCompliant: boolean;
  breaches: string[];
} => {
  const breaches: string[] = [];

  // Check individual security limit (≤10%)
  const oversizedSecurities = securities.filter((s) => s.currentWeight > 10);
  if (oversizedSecurities.length > 0) {
    breaches.push(
      `Single security limit breached: ${oversizedSecurities.map((s) => `${s.ticker} (${s.currentWeight.toFixed(2)}%)`).join(', ')}`
    );
  }

  // Check sector limit (≤25%)
  const sectorWeights: { [key: string]: number } = {};
  securities.forEach((s) => {
    sectorWeights[s.sector] = (sectorWeights[s.sector] || 0) + s.currentWeight;
  });

  const oversizedSectors = Object.entries(sectorWeights).filter(([_, weight]) => weight > 25);
  if (oversizedSectors.length > 0) {
    breaches.push(
      `Sector limit breached: ${oversizedSectors.map(([sector, weight]) => `${sector} (${weight.toFixed(2)}%)`).join(', ')}`
    );
  }

  // Check regional limit (≤10%)
  const regionalWeights: { [key: string]: number } = {};
  securities.forEach((s) => {
    regionalWeights[s.geographicExposure] = (regionalWeights[s.geographicExposure] || 0) + s.currentWeight;
  });

  const oversizedRegions = Object.entries(regionalWeights).filter(([_, weight]) => weight > 10);
  if (oversizedRegions.length > 0) {
    breaches.push(
      `Regional limit breached: ${oversizedRegions.map(([region, weight]) => `${region} (${weight.toFixed(2)}%)`).join(', ')}`
    );
  }

  return {
    isCompliant: breaches.length === 0,
    breaches,
  };
};

/**
 * Calculate total portfolio weight (should be ~100%)
 */
export const calculateTotalWeight = (securities: Security[]): number => {
  return securities.reduce((sum, s) => sum + s.currentWeight, 0);
};

/**
 * Calculate weighted average metrics
 */
export const calculateWeightedAverage = (
  values: Array<{ weight: number; value: number }>
): number => {
  const totalWeight = values.reduce((sum, item) => sum + item.weight, 0);
  if (totalWeight === 0) return 0;

  const weightedSum = values.reduce((sum, item) => sum + item.weight * item.value, 0);
  return weightedSum / totalWeight;
};

/**
 * Format currency to TZS format
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-TZ', {
    style: 'currency',
    currency: 'TZS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format percentage
 */
export const formatPercentage = (value: number, decimals: number = 2): string => {
  return `${value.toFixed(decimals)}%`;
};

/**
 * Get status badge color based on value
 */
export const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'compliant':
    case 'adequate':
      return 'text-green-600';
    case 'warning':
      return 'text-yellow-600';
    case 'breach':
    case 'critical':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
};

/**
 * Get status badge background color
 */
export const getStatusBgColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'compliant':
    case 'adequate':
      return 'bg-green-50';
    case 'warning':
      return 'bg-yellow-50';
    case 'breach':
    case 'critical':
      return 'bg-red-50';
    default:
      return 'bg-gray-50';
  }
};
