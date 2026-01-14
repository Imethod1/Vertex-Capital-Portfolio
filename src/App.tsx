import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Page1AllocationSnapshot from './pages/Page1AllocationSnapshot';
import Page2SecurityExposure from './pages/Page2SecurityExposure';
import Page3RiskMetrics from './pages/Page3RiskMetrics';
import Page4LiquidityCash from './pages/Page4LiquidityCash';
import Page5TacticalLog from './pages/Page5TacticalLog';
import Page6Performance from './pages/Page6Performance';
import Page7Compliance from './pages/Page7Compliance';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Navigate to="/allocation" replace />} />
              <Route path="/allocation" element={<Page1AllocationSnapshot />} />
              <Route path="/security-exposure" element={<Page2SecurityExposure />} />
              <Route path="/risk-metrics" element={<Page3RiskMetrics />} />
              <Route path="/liquidity" element={<Page4LiquidityCash />} />
              <Route path="/tactical-log" element={<Page5TacticalLog />} />
              <Route path="/performance" element={<Page6Performance />} />
              <Route path="/compliance" element={<Page7Compliance />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
