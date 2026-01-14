// Sample Portfolio Data
import { PortfolioSnapshot, Security, PortfolioAllocation, RiskMetric, LiquidityItem, PerformanceMetric, ComplianceCheck } from '../types/portfolio';

const defaultAllocations: PortfolioAllocation[] = [
  {
    assetClass: 'Fixed Income',
    target: 50,
    current: 0,
    deviation: 0,
    rebalancingRequired: false,
    notes: 'Government and investment-grade corporate bonds'
  },
  {
    assetClass: 'Domestic Equities',
    target: 35,
    current: 0,
    deviation: 0,
    rebalancingRequired: false,
    notes: 'DSE-listed securities'
  },
  {
    assetClass: 'Regional (EAC/SADC) Equities',
    target: 5,
    current: 0,
    deviation: 0,
    rebalancingRequired: false,
    notes: 'EAC and SADC market exposure'
  },
  {
    assetClass: 'Cash & Cash Equivalents',
    target: 10,
    current: 0,
    deviation: 0,
    rebalancingRequired: false,
    notes: 'Treasury bills and bank deposits'
  }
];

const defaultRiskMetrics: RiskMetric[] = [
  { metric: 'Single Security Exposure', ipsLimit: '≤10%', currentValue: '—', status: 'Compliant', actionRequired: 'None' },
  { metric: 'Single Sector Exposure', ipsLimit: '≤25%', currentValue: '—', status: 'Compliant', actionRequired: 'None' },
  { metric: 'Regional Allocation', ipsLimit: '≤10%', currentValue: '—', status: 'Compliant', actionRequired: 'None' },
  { metric: 'Weighted Portfolio Duration', ipsLimit: '≤2 yrs', currentValue: '—', status: 'Compliant', actionRequired: 'None' },
  { metric: 'Portfolio Volatility', ipsLimit: '5–7% ann.', currentValue: '—', status: 'Compliant', actionRequired: 'None' },
  { metric: 'Drawdown Limit', ipsLimit: '≤5%', currentValue: '—', status: 'Compliant', actionRequired: 'None' },
  { metric: 'Credit Rating Compliance', ipsLimit: '≥Investment Grade', currentValue: '—', status: 'Compliant', actionRequired: 'None' }
];

const defaultLiquidity: LiquidityItem[] = [
  { item: 'Cash & Cash Equivalents', minimum: 10, maximum: 15, current: 0, status: 'Adequate', actionNeeded: 'Monitor' },
  { item: 'Time to Liquidate 80% Portfolio', maximum: 30, current: 0, status: 'Adequate', actionNeeded: 'Track daily volume' },
  { item: 'Bid–Ask Spread / Daily Volume', current: 0, status: 'Adequate', actionNeeded: 'Monitor spreads' }
];

const defaultPerformance: PerformanceMetric[] = [
  { metric: 'Total Portfolio Return', target: '2–3%', current: '—', deviation: '—', notes: 'Q1 2026 target' },
  { metric: 'Asset Class Returns', target: 'TBD', current: '—', deviation: '—', notes: 'Track individually' },
  { metric: 'Benchmark-relative Return', target: 'Positive', current: '—', deviation: '—', notes: 'vs composite index' },
  { metric: 'Risk-adjusted Metrics (Sharpe, Sortino, etc.)', target: 'Positive', current: '—', deviation: '—', notes: 'Monitor post-period' }
];

const defaultCompliance: ComplianceCheck[] = [
  { area: 'Single Security Limit', ipsLimit: '≤10%', currentStatus: 'Compliant', breach: false, actionRequired: 'None' },
  { area: 'Single Sector Limit', ipsLimit: '≤25%', currentStatus: 'Compliant', breach: false, actionRequired: 'None' },
  { area: 'Regional Allocation Limit', ipsLimit: '≤10%', currentStatus: 'Compliant', breach: false, actionRequired: 'None' },
  { area: 'Drawdown Limit', ipsLimit: '≤5%', currentStatus: 'Compliant', breach: false, actionRequired: 'None' },
  { area: 'Prohibited Instruments', ipsLimit: 'None', currentStatus: 'Compliant', breach: false, actionRequired: 'None' },
  { area: 'Credit Rating Compliance', ipsLimit: '≥Investment Grade', currentStatus: 'Compliant', breach: false, actionRequired: 'None' }
];

export const initialPortfolioSnapshot: PortfolioSnapshot = {
  date: new Date().toISOString().split('T')[0],
  totalValue: 100000000, // TZS 100 million
  allocations: defaultAllocations,
  securities: [],
  riskMetrics: defaultRiskMetrics,
  liquidity: defaultLiquidity,
  tacticalAdjustments: [],
  performanceMetrics: defaultPerformance,
  complianceChecks: defaultCompliance
};

export default initialPortfolioSnapshot;
