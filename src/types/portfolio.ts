// Portfolio Type Definitions
export type AssetClass = 'Fixed Income' | 'Domestic Equities' | 'Regional (EAC/SADC) Equities' | 'Cash & Cash Equivalents';
export type Sector = 'Banking' | 'Telecommunications' | 'Consumer Goods' | 'Government' | 'Technology' | 'Energy' | 'Other';
export type GeographicExposure = 'Tanzania' | 'Kenya' | 'Uganda' | 'South Africa' | 'Regional';
export type ApprovalStatus = 'Pending' | 'Approved' | 'Rejected';

export interface AllocationTarget {
  assetClass: AssetClass;
  target: number; // percentage
}

export interface PortfolioAllocation {
  assetClass: AssetClass;
  target: number; // percentage
  current: number; // percentage
  deviation: number; // percentage
  rebalancingRequired: boolean;
  notes: string;
}

export interface Security {
  id: string;
  name: string;
  ticker: string;
  assetClass: AssetClass;
  currentWeight: number; // percentage
  targetWeight: number; // percentage
  deviation: number; // percentage
  sector: Sector;
  geographicExposure: GeographicExposure;
  marketValue: number; // TZS
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
  notes: string;
  ipsCompliant: boolean;
}

export interface RiskMetric {
  metric: string;
  ipsLimit: number | string;
  currentValue: number | string;
  status: 'Compliant' | 'Warning' | 'Breach';
  actionRequired: string;
}

export interface LiquidityItem {
  item: string;
  minimum?: number; // percentage
  maximum?: number; // percentage
  current: number; // percentage
  status: 'Adequate' | 'Warning' | 'Critical';
  actionNeeded: string;
}

export interface TacticalAdjustment {
  id: string;
  date: string;
  tacticalMove: string;
  deviationPercent: number;
  marketSignal: string;
  duration: string;
  approvedBy: string; // IC / PM initials
  notes: string;
}

export interface PerformanceMetric {
  metric: string;
  target: number | string;
  current: number | string;
  deviation: number | string;
  notes: string;
}

export interface ComplianceCheck {
  area: string;
  ipsLimit: string;
  currentStatus: string;
  breach: boolean;
  actionRequired: string;
}

export interface PortfolioSnapshot {
  date: string;
  totalValue: number; // TZS
  allocations: PortfolioAllocation[];
  securities: Security[];
  riskMetrics: RiskMetric[];
  liquidity: LiquidityItem[];
  tacticalAdjustments: TacticalAdjustment[];
  performanceMetrics: PerformanceMetric[];
  complianceChecks: ComplianceCheck[];
}

export interface User {
  id: string;
  name: string;
  role: 'Managing Director' | 'Senior Portfolio Manager' | 'Portfolio Manager' | 'Research Analyst' | 'Compliance Officer' | 'Operations Manager';
  email: string;
}

export interface IPSConstraints {
  returnTarget: { min: number; max: number }; // 2-3%
  maxDrawdown: number; // 5%
  maxVolatility: number; // 7% annualized
  minVolatility: number; // 5% annualized
  liquidityTarget: { min: number; max: number }; // 10-15%
  maxDuration: number; // 2 years
  singleSecurityLimit: number; // 10%
  singleSectorLimit: number; // 25%
  regionalAllocationLimit: number; // 10%
}
