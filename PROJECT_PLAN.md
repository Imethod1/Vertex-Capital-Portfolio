# Vertex Capital Portfolio Monitoring System – Project Plan

**Project Location:** `c:\laragon\www\Vertex-Capital-Portfolio`  
**Status:** Planning Phase  
**Start Date:** January 12, 2026  
**Portfolio Value:** TZS 100 Million  
**Investment Period:** Q1 2026 (January - March 2026)

---

## 1. PROJECT OVERVIEW

The Vertex Capital Portfolio Monitoring System is a React-based web application designed to track, monitor, and manage a TZS 100 million discretionary investment portfolio for Q1 2026. The application implements a comprehensive portfolio monitoring framework with 7 interactive pages aligned to the Investment Policy Statement (IPS).

**Primary Objectives:**
- Capital preservation with targeted income generation (2-3% Q1 return)
- Real-time monitoring of allocations, risk metrics, and IPS compliance
- Support tactical decision-making with documented audit trails
- Provide transparent reporting to Investment Committee

**Key Constraints:**
- Maximum 5% quarterly drawdown threshold
- Quarterly volatility target: 5-7% annualized
- ±3% rebalancing trigger for asset allocation drift
- 10-15% liquidity maintenance

---

## 2. TECHNOLOGY STACK

**Frontend Framework:**
- React 18.2.0
- TypeScript 5.3.3
- React Router DOM 6.20.0

**Build & Development:**
- Vite 5.0.8 (bundler & dev server)
- PostCSS 8.4.32
- Autoprefixer 10.4.16

**Styling:**
- Tailwind CSS 3.4.1
- Custom color scheme (primary: #1F2937, accent: #3B82F6)

**Testing & Quality:**
- Vitest 1.0.4
- ESLint (code quality)

**Version Control & Deployment:**
- Git
- Build output: `dist/` folder

---

## 3. FOLDER STRUCTURE

```
Vertex-Capital-Portfolio/
├── public/
│   ├── index.html
│   └── assets/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Navigation.tsx
│   │   ├── Table.tsx
│   │   └── DataCell.tsx
│   ├── pages/
│   │   ├── Page1AllocationSnapshot.tsx
│   │   ├── Page2SecurityExposure.tsx
│   │   ├── Page3RiskMetrics.tsx
│   │   ├── Page4LiquidityCash.tsx
│   │   ├── Page5TacticalLog.tsx
│   │   ├── Page6Performance.tsx
│   │   └── Page7Compliance.tsx
│   ├── data/
│   │   ├── portfolio.json
│   │   └── initialPortfolio.ts
│   ├── types/
│   │   └── portfolio.ts
│   ├── utils/
│   │   ├── loadPortfolio.ts
│   │   └── calculateMetrics.ts
│   ├── styles/
│   │   ├── globals.css
│   │   └── tailwind.css
│   ├── App.tsx
│   └── main.tsx
├── tests/
│   └── setup.ts
├── package.json
├── vite.config.ts
├── vitest.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── tailwind.config.cjs
├── postcss.config.cjs
├── .gitignore
├── README.md
└── PROJECT_PLAN.md
```

---

## 4. DATA MODELS & TYPES

### 4.1 TypeScript Interfaces (`src/types/portfolio.ts`)

```typescript
// Asset allocation snapshot
interface AllocationSnapshot {
  assetClass: string;
  targetPercent: number;
  currentPercent: number;
  deviationPercent: number;
  rebalancingRequired: boolean;
  notes: string;
}

// Individual security holding
interface Security {
  id: string;
  name: string;
  ticker: string;
  assetClass: 'Fixed Income' | 'Domestic Equities' | 'Regional (EAC/SADC) Equities' | 'Cash & Cash Equivalents';
  currentWeightPercent: number;
  targetWeightPercent: number;
  deviationPercent: number;
  sector: string;
  geographicExposure: string;
  notes: string;
  creditRating?: string;
  liquidityScore?: number;
}

// Risk metrics tracking
interface RiskMetric {
  metricName: string;
  ipsLimit: string;
  currentValue: string;
  status: 'Compliant' | 'Warning' | 'Breach';
  actionRequired: string;
}

// Liquidity management
interface LiquidityItem {
  item: string;
  minimumMaximum: string;
  currentPercent: number;
  status: string;
  actionNeeded: string;
}

// Tactical adjustments log
interface TacticalAdjustment {
  id: string;
  date: string;
  tacticalMove: string;
  deviationPercent: number;
  marketSignalRationale: string;
  duration: string;
  approvalBy: string;
  notes: string;
}

// Performance tracking
interface PerformanceMetric {
  metricName: string;
  targetBenchmark: string;
  currentValue: string;
  deviation: string;
  notes: string;
}

// Compliance verification
interface ComplianceCheck {
  complianceArea: string;
  ipsLimitRule: string;
  currentStatus: string;
  breach: 'Yes' | 'No';
  actionRequired: string;
}

// Portfolio state snapshot
interface PortfolioState {
  date: string;
  allocations: AllocationSnapshot[];
  securities: Security[];
  riskMetrics: RiskMetric[];
  liquidityItems: LiquidityItem[];
  tacticalAdjustments: TacticalAdjustment[];
  performanceMetrics: PerformanceMetric[];
  complianceChecks: ComplianceCheck[];
}
```

### 4.2 Initial Data Structure (`src/data/portfolio.json`)

Template JSON file with:
- 4 asset classes with target/current allocations
- Empty securities array for future holdings
- 7 risk metrics (all initialized as Compliant)
- 3 liquidity items (Pending status)
- Empty tactical adjustments array
- 4 performance metrics (0% returns)
- 6 compliance checks (all Compliant)

---

## 5. PAGE SPECIFICATIONS

### **PAGE 1: Portfolio Allocation Snapshot**

**File:** `src/pages/Page1AllocationSnapshot.tsx`

**Purpose:** Track strategic vs actual asset allocations and identify rebalancing needs.

**Table Columns:**
- Asset Class (Fixed Income, Domestic Equities, Regional, Cash)
- Target % (50%, 35%, 5%, 10%)
- Current % (editable input)
- Deviation % (auto-calculated: current - target)
- Rebalancing Required (Yes/No, triggered if |deviation| > ±3%)
- Notes (text)

**Key Features:**
- Monthly update frequency
- Real-time deviation calculation
- Visual highlighting (red if rebalance needed, green if compliant)
- Input validation (0-100%)

**User Actions:**
- Enter current allocation percentages
- System auto-calculates deviations
- Flags rebalancing needs > ±3%

---

### **PAGE 2: Individual Security Exposure**

**File:** `src/pages/Page2SecurityExposure.tsx`

**Purpose:** Track individual security positions, weights, and IPS compliance.

**Table Columns:**
- Security Name / Ticker (editable)
- Asset Class (dropdown: Fixed Income, Domestic Equities, Regional, Cash)
- Current Weight % (editable)
- Target Weight % (editable)
- Deviation % (auto-calculated)
- Sector (Banking, Telecom, Consumer, etc.)
- Geographic Exposure (Tanzania, Kenya, South Africa, etc.)
- Notes / IPS Compliance (text, flagged if >10% or sector >25%)

**Key Features:**
- Add/Edit/Delete security rows
- IPS compliance checking:
  - Single security ≤10% limit
  - Sector ≤25% limit
  - Regional allocation ≤10% limit
- Visual compliance indicators (green/yellow/red)
- Export functionality (CSV)

**User Actions:**
- Add new securities with full details
- Update weights and allocations
- Monitor compliance status in real-time
- Delete or archive securities

---

### **PAGE 3: Risk & Concentration Metrics**

**File:** `src/pages/Page3RiskMetrics.tsx`

**Purpose:** Monitor overall portfolio risk exposure and IPS compliance with thresholds.

**Monitored Metrics:**
| Metric | IPS Limit | Current Value | Status |
|--------|-----------|---------------|--------|
| Single Security Exposure | ≤10% | - | - |
| Single Sector Exposure | ≤25% | - | - |
| Regional Allocation | ≤10% | - | - |
| Weighted Portfolio Duration | ≤2 yrs | - | - |
| Portfolio Volatility | 5-7% ann. | - | - |
| Drawdown Limit | ≤5% | - | - |
| Credit Rating Compliance | ≥Investment Grade | - | - |

**Key Features:**
- Status indicators: Compliant (green) / Warning (yellow) / Breach (red)
- Action required column (auto-populated for breaches)
- Monthly update trigger or immediate review if breach
- Dashboard view with traffic light system
- Automated breach alerts

**User Actions:**
- Input current metric values
- System flags breaches automatically
- Review recommended actions
- Document corrective measures

---

### **PAGE 4: Liquidity & Cash Management**

**File:** `src/pages/Page4LiquidityCash.tsx`

**Purpose:** Ensure sufficient cash for operations and manage liquidity risks.

**Tracked Items:**

| Item | Minimum / Maximum | Current % | Status |
|------|------------------|-----------|--------|
| Cash & Cash Equivalents | 10-15% | - | - |
| Time to Liquidate 80% Portfolio | ≤30 days | - | - |
| Bid-Ask Spread / Daily Volume | Adequate | - | - |

**Key Features:**
- Weekly cash level tracking
- Visual liquidity gauge (adequate/low/critical)
- Alert system for cash falling below 10% or exceeding 15%
- Execution efficiency monitoring
- Cash flow projections

**User Actions:**
- Record weekly cash positions
- Monitor liquidation timeline
- Track execution spreads and volumes
- Plan for period-end requirements

---

### **PAGE 5: Tactical Adjustment Log**

**File:** `src/pages/Page5TacticalLog.tsx`

**Purpose:** Document all short-term deviations from strategic allocation with audit trail.

**Table Columns:**
- Date (timestamp)
- Tactical Move (description, e.g., "Increase Fixed Income by 3%")
- % Deviation (e.g., +3% from target)
- Market Signal / Rationale (text explanation)
- Duration (Expected holding period)
- Approval (IC / PM signature)
- Notes (additional context)

**Key Features:**
- Automatic timestamp on creation
- Approval workflow (Investment Committee sign-off required)
- Status tracking (Proposed → Approved → Active → Completed)
- Deviation limits: ±5% maximum from strategic weights
- Audit trail with full history
- Reversion trigger tracking

**User Actions:**
- Log new tactical decisions with rationale
- Submit for Investment Committee approval
- Mark as active when executed
- Track completion and reversion to strategic targets
- View full decision history

---

### **PAGE 6: Performance Monitoring**

**File:** `src/pages/Page6Performance.tsx`

**Purpose:** Track portfolio returns against benchmarks and IPS targets.

**Monitored Metrics:**

| Metric | Target / Benchmark | Current Value | Deviation | Notes |
|--------|------------------|----------------|-----------|-------|
| Total Portfolio Return | 2-3% (Q1) / 8-12% ann. | - | - | - |
| Asset Class Returns | Per allocation | - | - | - |
| Benchmark-relative Return | Composite Index | - | - | - |
| Risk-adjusted Metrics | Sharpe, Sortino Ratio | - | - | - |

**Composite Benchmark:** 35% DSE + 5% Regional + 50% Gov Bonds + 10% T-bill

**Key Features:**
- Monthly performance calculation
- Benchmark comparison (absolute & relative)
- Asset class performance breakdown
- Risk-adjusted metrics (Sharpe Ratio, Sortino Ratio)
- Performance attribution analysis
- Visual charting (line/bar charts)

**User Actions:**
- Input monthly returns
- View performance vs benchmarks
- Analyze shortfalls
- Review asset class contribution
- Export performance reports

---

### **PAGE 7: Compliance & IPS Adherence**

**File:** `src/pages/Page7Compliance.tsx`

**Purpose:** Confirm ongoing compliance with all IPS limits, rules, and restrictions.

**Compliance Checklist:**

| Compliance Area | IPS Limit / Rule | Current Status | Breach? | Action Required |
|-----------------|-----------------|----------------|---------|-----------------|
| Single Security Limit | ≤10% | - | Y/N | - |
| Single Sector Limit | ≤25% | - | Y/N | - |
| Regional Allocation Limit | ≤10% | - | Y/N | - |
| Drawdown Limit | ≤5% | - | Y/N | - |
| Prohibited Instruments | None | - | Y/N | - |
| Credit Rating Compliance | ≥Investment Grade | - | Y/N | - |

**Key Features:**
- Monthly or post-tactical deviation compliance check
- Binary breach detection (Yes/No)
- Automated status based on threshold comparison
- Breach escalation (flag for immediate review)
- Corrective action recommendations
- Compliance certification sign-off

**User Actions:**
- Review monthly compliance status
- Investigate and resolve breaches
- Document corrective actions
- Certify compliance (with signature/date)
- Maintain compliance history

---

## 6. COMPONENT ARCHITECTURE

### 6.1 Reusable Components

**Header.tsx**
- Logo and project title
- Current date display
- Portfolio value (TZS 100M)
- User/role indicator

**Sidebar.tsx**
- Navigation links to all 7 pages
- Active page highlighting
- Collapsible menu for mobile
- Quick stats (total return, allocation %, risk status)

**Navigation.tsx**
- Page tabs and breadcrumbs
- Page title and purpose
- Instructions panel

**Table.tsx**
- Generic table component
- Sortable columns
- Editable cells
- Add/delete row functionality
- Status indicators (colors based on values)

**DataCell.tsx**
- Input types: text, number, dropdown, date
- Validation logic
- Status coloring
- Icon indicators

### 6.2 Page Components

Each page imports:
- `Table.tsx` for data display
- Type definitions from `types/portfolio.ts`
- Utility functions from `utils/`
- Portfolio data from `data/portfolio.json`

---

## 7. UTILITY FUNCTIONS

### `src/utils/loadPortfolio.ts`
```typescript
- loadPortfolioData(): Promise<PortfolioState>
- savePortfolioData(state: PortfolioState): void
- calculateDeviations(target: number, current: number): number
- checkAllocationCompliance(weights: AllocationSnapshot[]): boolean
- checkSecurityCompliance(securities: Security[]): boolean
```

### `src/utils/calculateMetrics.ts`
```typescript
- calculatePortfolioVolatility(returns: number[]): number
- calculateSharpeRatio(returns: number[], riskFreeRate: number): number
- calculateSortinoRatio(returns: number[], riskFreeRate: number): number
- calculateDrawdown(returns: number[]): number
- calculateWeightedDuration(securities: Security[]): number
```

---

## 8. SETUP & CONFIGURATION FILES

### `package.json`
```json
{
  "name": "vertex-capital-portfolio",
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0"
  },
  "devDependencies": {
    // ... dev dependencies
  }
}
```

### `vite.config.ts`
- Port: 3000
- Auto-open browser on dev
- React plugin enabled
- Terser minification

### `tailwind.config.cjs`
- Colors: primary (#1F2937), accent (#3B82F6), danger (#EF4444), success (#10B981), warning (#F59E0B)
- Font: Inter
- Custom spacing and utilities

### `tsconfig.json`
- Target: ES2020
- Strict mode enabled
- JSX: react-jsx

---

## 9. IMPLEMENTATION STEPS

### **Phase 1: Project Setup** (Step 1-3)
1. ✅ Create project directory structure
2. ✅ Create config files (tsconfig, vite, tailwind, postcss)
3. Create `package.json` and install dependencies
4. Create `index.html` and `public/` assets

### **Phase 2: Data Layer** (Step 4-5)
5. Create `src/types/portfolio.ts` with all interfaces
6. Create `src/data/portfolio.json` with initial data
7. Create `src/utils/loadPortfolio.ts` utility functions
8. Create `src/utils/calculateMetrics.ts` calculation functions

### **Phase 3: Core Components** (Step 6-7)
9. Create `src/components/Header.tsx`
10. Create `src/components/Sidebar.tsx`
11. Create `src/components/Navigation.tsx`
12. Create `src/components/Table.tsx`
13. Create `src/components/DataCell.tsx`

### **Phase 4: Page Components** (Step 8-14)
14. Create `src/pages/Page1AllocationSnapshot.tsx`
15. Create `src/pages/Page2SecurityExposure.tsx`
16. Create `src/pages/Page3RiskMetrics.tsx`
17. Create `src/pages/Page4LiquidityCash.tsx`
18. Create `src/pages/Page5TacticalLog.tsx`
19. Create `src/pages/Page6Performance.tsx`
20. Create `src/pages/Page7Compliance.tsx`

### **Phase 5: Application Shell** (Step 15-16)
21. Create `src/App.tsx` with routing
22. Create `src/main.tsx` entry point
23. Create `src/styles/globals.css`

### **Phase 6: Testing & Finalization** (Step 17-18)
24. Create `tests/setup.ts` and test files
25. Create `README.md` with setup and usage instructions
26. Create `.gitignore` and finalize project

---

## 10. RUNNING THE PROJECT

### Development Environment
```bash
# Install dependencies
npm install

# Start dev server (opens http://localhost:3000)
npm run dev

# Run tests
npm run test

# Build for production
npm build

# Preview production build
npm preview
```

### Key NPM Scripts
- `dev`: Start Vite dev server with HMR
- `build`: TypeScript compilation + Vite build
- `preview`: Preview production build locally
- `test`: Run Vitest suite
- `test:ui`: Launch Vitest UI dashboard

---

## 11. FOLDER & FILE CHECKLIST

**Configuration Files:**
- [ ] `package.json`
- [ ] `vite.config.ts`
- [ ] `vitest.config.ts`
- [ ] `tsconfig.json`
- [ ] `tsconfig.node.json`
- [ ] `tailwind.config.cjs`
- [ ] `postcss.config.cjs`
- [ ] `.gitignore`

**Source Files:**
- [ ] `src/main.tsx`
- [ ] `src/App.tsx`
- [ ] `src/index.html`

**Types:**
- [ ] `src/types/portfolio.ts`

**Data:**
- [ ] `src/data/portfolio.json`
- [ ] `src/data/initialPortfolio.ts`

**Components:**
- [ ] `src/components/Header.tsx`
- [ ] `src/components/Sidebar.tsx`
- [ ] `src/components/Navigation.tsx`
- [ ] `src/components/Table.tsx`
- [ ] `src/components/DataCell.tsx`

**Pages:**
- [ ] `src/pages/Page1AllocationSnapshot.tsx`
- [ ] `src/pages/Page2SecurityExposure.tsx`
- [ ] `src/pages/Page3RiskMetrics.tsx`
- [ ] `src/pages/Page4LiquidityCash.tsx`
- [ ] `src/pages/Page5TacticalLog.tsx`
- [ ] `src/pages/Page6Performance.tsx`
- [ ] `src/pages/Page7Compliance.tsx`

**Utilities:**
- [ ] `src/utils/loadPortfolio.ts`
- [ ] `src/utils/calculateMetrics.ts`

**Styles:**
- [ ] `src/styles/globals.css`
- [ ] `src/styles/tailwind.css`

**Public Assets:**
- [ ] `public/index.html`
- [ ] `public/assets/` (logos, icons)

**Tests:**
- [ ] `tests/setup.ts`

**Documentation:**
- [ ] `README.md`
- [ ] `PROJECT_PLAN.md` (this file)

---

## 12. KEY FEATURES SUMMARY

✅ **7 Portfolio Monitoring Pages** aligned to IPS requirements  
✅ **Real-time Compliance Tracking** with automated breach detection  
✅ **Interactive Data Tables** with editable cells and calculations  
✅ **Responsive Design** using Tailwind CSS  
✅ **TypeScript** for type safety  
✅ **Vite** for fast builds and HMR  
✅ **React Router** for navigation between pages  
✅ **Audit Trail** for tactical decisions and approvals  
✅ **Performance Benchmarking** against composite index  
✅ **Monthly/Weekly Update Cycles** with clear workflows  

---

## 13. NEXT STEPS

1. **Confirm Project Plan** – Review and approve this document
2. **Begin Implementation** – Follow phases in Section 9
3. **Paste Back & Continue** – Return this plan to proceed with code generation
4. **Deploy Locally** – Test at `http://localhost:3000`
5. **Iterate & Refine** – Gather feedback and enhance features

---

**Document Version:** 1.0  
**Last Updated:** January 12, 2026  
**Project Lead:** Vertex Capital Portfolio Team
