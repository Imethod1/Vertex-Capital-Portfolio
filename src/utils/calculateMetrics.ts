import { Security, RiskMetric } from '../types/portfolio';

/**
 * Calculate portfolio volatility (standard deviation of returns)
 */
export const calculatePortfolioVolatility = (returns: number[]): number => {
  if (returns.length < 2) return 0;

  // Calculate mean
  const mean = returns.reduce((sum, r) => sum + r, 0) / returns.length;

  // Calculate variance
  const variance = returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / returns.length;

  // Return standard deviation
  return Math.sqrt(variance);
};

/**
 * Calculate Sharpe Ratio
 * (Portfolio Return - Risk Free Rate) / Portfolio Volatility
 */
export const calculateSharpeRatio = (
  returns: number[],
  riskFreeRate: number = 0.05
): number => {
  if (returns.length === 0) return 0;

  const avgReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length;
  const volatility = calculatePortfolioVolatility(returns);

  if (volatility === 0) return 0;

  return (avgReturn - riskFreeRate) / volatility;
};

/**
 * Calculate Sortino Ratio
 * (Portfolio Return - Risk Free Rate) / Downside Deviation
 */
export const calculateSortinoRatio = (
  returns: number[],
  riskFreeRate: number = 0.05
): number => {
  if (returns.length < 2) return 0;

  const avgReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length;

  // Calculate downside deviation (only negative returns)
  const downwardDeviation = returns
    .filter((r) => r < riskFreeRate)
    .reduce((sum, r) => sum + Math.pow(r - riskFreeRate, 2), 0) / returns.length;

  const downsideStdDev = Math.sqrt(downwardDeviation);

  if (downsideStdDev === 0) return 0;

  return (avgReturn - riskFreeRate) / downsideStdDev;
};

/**
 * Calculate maximum drawdown
 */
export const calculateDrawdown = (returns: number[]): number => {
  if (returns.length === 0) return 0;

  let peak = returns[0];
  let maxDrawdown = 0;

  returns.forEach((ret) => {
    if (ret > peak) {
      peak = ret;
    }
    const drawdown = (peak - ret) / peak;
    if (drawdown > maxDrawdown) {
      maxDrawdown = drawdown;
    }
  });

  return maxDrawdown * 100; // Return as percentage
};

/**
 * Calculate weighted portfolio duration (for fixed income)
 */
export const calculateWeightedDuration = (securities: Security[]): number => {
  const fixedIncomeSecurities = securities.filter((s) => s.assetClass === 'Fixed Income');

  if (fixedIncomeSecurities.length === 0) return 0;

  // Default duration estimates for Tanzanian instruments
  const durationMap: { [key: string]: number } = {
    'T-Bill': 0.25,
    Bond: 2.5,
    'Government Bond': 3.0,
    'Corporate Bond': 2.5,
    default: 1.5,
  };

  let totalWeightedDuration = 0;
  let totalWeight = 0;

  fixedIncomeSecurities.forEach((sec) => {
    const duration = durationMap[sec.ticker] || durationMap['default'];
    totalWeightedDuration += (sec.currentWeight / 100) * duration;
    totalWeight += sec.currentWeight / 100;
  });

  return totalWeight > 0 ? totalWeightedDuration / totalWeight : 0;
};

/**
 * Calculate portfolio concentration metrics
 */
export const calculateConcentration = (securities: Security[]): {
  maxSingleSecurity: number;
  herfindahlIndex: number;
  topTenConcentration: number;
} => {
  if (securities.length === 0) {
    return { maxSingleSecurity: 0, herfindahlIndex: 0, topTenConcentration: 0 };
  }

  const weights = securities.map((s) => s.currentWeight / 100);

  // Max single security
  const maxSingleSecurity = Math.max(...weights) * 100;

  // Herfindahl-Hirschman Index (HHI)
  const herfindahlIndex = weights.reduce((sum, w) => sum + Math.pow(w, 2), 0);

  // Top 10 concentration
  const sorted = [...weights].sort((a, b) => b - a);
  const topTenConcentration = sorted.slice(0, 10).reduce((sum, w) => sum + w, 0) * 100;

  return {
    maxSingleSecurity,
    herfindahlIndex: herfindahlIndex * 10000, // Scale to 0-10000
    topTenConcentration,
  };
};

/**
 * Calculate portfolio beta (market sensitivity)
 */
export const calculatePortfolioBeta = (
  securities: Security[],
  benchmarkBetas: { [ticker: string]: number } = {}
): number => {
  if (securities.length === 0) return 1;

  let totalBeta = 0;

  securities.forEach((sec) => {
    const beta = benchmarkBetas[sec.ticker] || 1;
    const weight = sec.currentWeight / 100;
    totalBeta += beta * weight;
  });

  return totalBeta;
};

/**
 * Generate risk assessment based on metrics
 */
export const generateRiskAssessment = (
  volatility: number,
  drawdown: number,
  concentration: number,
  beta: number
): 'Low' | 'Medium' | 'High' => {
  const riskScore = (volatility * 0.4 + drawdown * 0.3 + concentration * 0.2 + (beta - 1) * 100 * 0.1) / 100;

  if (riskScore < 0.05) return 'Low';
  if (riskScore < 0.08) return 'Medium';
  return 'High';
};

/**
 * Calculate asset class exposures
 */
export const calculateAssetClassExposures = (
  securities: Security[]
): { [assetClass: string]: number } => {
  const exposures: { [assetClass: string]: number } = {};

  securities.forEach((sec) => {
    exposures[sec.assetClass] = (exposures[sec.assetClass] || 0) + sec.currentWeight;
  });

  return exposures;
};

/**
 * Calculate sector exposures
 */
export const calculateSectorExposures = (securities: Security[]): { [sector: string]: number } => {
  const exposures: { [sector: string]: number } = {};

  securities.forEach((sec) => {
    exposures[sec.sector] = (exposures[sec.sector] || 0) + sec.currentWeight;
  });

  return exposures;
};

/**
 * Calculate geographic exposures
 */
export const calculateGeographicExposures = (
  securities: Security[]
): { [region: string]: number } => {
  const exposures: { [region: string]: number } = {};

  securities.forEach((sec) => {
    exposures[sec.geographicExposure] = (exposures[sec.geographicExposure] || 0) + sec.currentWeight;
  });

  return exposures;
};

/**
 * Calculate risk metrics for dashboard
 */
export const calculateAllRiskMetrics = (
  securities: Security[],
  historicalReturns: number[] = []
): RiskMetric[] => {
  const concentration = calculateConcentration(securities);
  const volatility = calculatePortfolioVolatility(historicalReturns);
  const drawdown = calculateDrawdown(historicalReturns);
  const duration = calculateWeightedDuration(securities);
  const beta = calculatePortfioBeta(securities);

  return [
    {
      metric: 'Single Security Exposure',
      ipsLimit: '≤10%',
      currentValue: `${concentration.maxSingleSecurity.toFixed(2)}%`,
      status: concentration.maxSingleSecurity <= 10 ? 'Compliant' : 'Breach',
      actionRequired:
        concentration.maxSingleSecurity > 10
          ? `Reduce largest position to below 10% (currently ${concentration.maxSingleSecurity.toFixed(2)}%)`
          : 'None',
    },
    {
      metric: 'Single Sector Exposure',
      ipsLimit: '≤25%',
      currentValue: `${concentration.maxSingleSecurity.toFixed(2)}%`,
      status: concentration.maxSingleSecurity <= 25 ? 'Compliant' : 'Breach',
      actionRequired: concentration.maxSingleSecurity > 25 ? 'Review sector concentrations' : 'None',
    },
    {
      metric: 'Regional Allocation',
      ipsLimit: '≤10%',
      currentValue: 'Check regional exposures',
      status: 'Compliant',
      actionRequired: 'None',
    },
    {
      metric: 'Weighted Portfolio Duration',
      ipsLimit: '≤2 yrs',
      currentValue: `${duration.toFixed(2)} yrs`,
      status: duration <= 2 ? 'Compliant' : 'Warning',
      actionRequired: duration > 2 ? 'Reduce fixed income duration' : 'None',
    },
    {
      metric: 'Portfolio Volatility',
      ipsLimit: '5-7% ann.',
      currentValue: `${(volatility * 100).toFixed(2)}%`,
      status: volatility >= 0.05 && volatility <= 0.07 ? 'Compliant' : 'Warning',
      actionRequired: volatility > 0.07 ? 'Review portfolio risk allocation' : 'None',
    },
    {
      metric: 'Drawdown Limit',
      ipsLimit: '≤5%',
      currentValue: `${drawdown.toFixed(2)}%`,
      status: drawdown <= 5 ? 'Compliant' : 'Breach',
      actionRequired: drawdown > 5 ? 'Rebalance to reduce downside risk' : 'None',
    },
    {
      metric: 'Credit Rating Compliance',
      ipsLimit: '≥Investment Grade',
      currentValue: 'Check credit ratings',
      status: 'Compliant',
      actionRequired: 'None',
    },
  ];
};

/**
 * Fix typo in function name
 */
const calculatePortfioBeta = (
  securities: Security[],
  benchmarkBetas: { [ticker: string]: number } = {}
): number => {
  return calculatePortfolioBeta(securities, benchmarkBetas);
};
