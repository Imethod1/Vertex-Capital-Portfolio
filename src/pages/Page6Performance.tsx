import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { PerformanceMetric } from '../types/portfolio';

const Page6Performance: React.FC = () => {
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([
    {
      metric: 'Total Portfolio Return',
      target: '2-3% (Q1)',
      current: '2.4%',
      deviation: '+0.4%',
      notes: 'On track for Q1 target',
    },
    {
      metric: 'Fixed Income Return',
      target: '2-2.5%',
      current: '2.2%',
      deviation: '+0.2%',
      notes: 'Bond yields favorable',
    },
    {
      metric: 'Domestic Equities Return',
      target: '3-4%',
      current: '2.8%',
      deviation: '-0.2%',
      notes: 'Market consolidation phase',
    },
    {
      metric: 'Regional Equities Return',
      target: '4-5%',
      current: '3.5%',
      deviation: '-1.5%',
      notes: 'Performance lagging expectations',
    },
    {
      metric: 'Benchmark-Relative Return',
      target: 'Composite Index',
      current: '+1.1%',
      deviation: 'Outperformance',
      notes: 'Beating composite benchmark',
    },
    {
      metric: 'Sharpe Ratio',
      target: '> 0.5',
      current: '0.68',
      deviation: 'Positive',
      notes: 'Good risk-adjusted returns',
    },
    {
      metric: 'Sortino Ratio',
      target: '> 1.0',
      current: '1.15',
      deviation: 'Positive',
      notes: 'Strong downside protection',
    },
  ]);

  // Calculate composite benchmark: 35% DSE + 5% Regional + 50% Gov Bonds + 10% T-bill
  const benchmarkReturn = 35 * 0.028 + 5 * 0.035 + 50 * 0.022 + 10 * 0.018;
  const portfolioReturn = 2.4;
  const overperformance = portfolioReturn - benchmarkReturn;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        pageNumber={6}
        pageTitle="Performance Monitoring"
        pageDescription="Track portfolio returns against benchmarks and IPS targets (read-only, managed via Decap CMS)"
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Performance Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Portfolio Return (Q1)</h3>
            <p className="text-3xl font-bold text-green-600">+{portfolioReturn.toFixed(2)}%</p>
            <p className="text-xs text-gray-600 mt-1">Target: 2-3%</p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Benchmark Return</h3>
            <p className="text-3xl font-bold text-gray-900">+{benchmarkReturn.toFixed(2)}%</p>
            <p className="text-xs text-gray-600 mt-1">Composite Index</p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Outperformance</h3>
            <p className="text-3xl font-bold text-green-600">
              {overperformance > 0 ? '+' : ''}{overperformance.toFixed(2)}%
            </p>
            <p className="text-xs text-gray-600 mt-1">vs Composite Index</p>
          </div>
          <div className="rounded-lg p-6 border-2 bg-blue-50 border-blue-200">
            <h3 className="text-sm font-semibold text-blue-700 mb-2">ℹ️ Read-Only</h3>
            <p className="text-xs text-gray-600">Edit via Decap CMS</p>
          </div>
        </div>

        {/* Performance Chart Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">📊 Asset Class Performance Breakdown</h3>
          <div className="space-y-4">
            {[
              { name: 'Fixed Income', return: 2.2, target: 2.25 },
              { name: 'Domestic Equities', return: 2.8, target: 3.5 },
              { name: 'Regional Equities', return: 3.5, target: 4.5 },
            ].map((asset) => (
              <div key={asset.name}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{asset.name}</span>
                  <span className="text-sm text-gray-600">
                    {asset.return.toFixed(2)}% / {asset.target.toFixed(2)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{
                      width: `${Math.min((asset.return / asset.target) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Read-Only Performance Metrics Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Metric</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Target / Benchmark</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Current Value</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Deviation</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {performanceMetrics.map((metric, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{metric.metric}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{metric.target}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-blue-600">{metric.current}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{metric.deviation}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{metric.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Benchmark Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-blue-900 mb-3">📋 Composite Benchmark Composition</h3>
          <p className="text-sm text-blue-800 mb-4">
            The portfolio is benchmarked against a composite index weighted as follows:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-white rounded-lg p-3 border border-blue-200">
              <p className="font-semibold text-blue-900">DSE Index</p>
              <p className="text-blue-800">35%</p>
            </div>
            <div className="bg-white rounded-lg p-3 border border-blue-200">
              <p className="font-semibold text-blue-900">Regional Equities</p>
              <p className="text-blue-800">5%</p>
            </div>
            <div className="bg-white rounded-lg p-3 border border-blue-200">
              <p className="font-semibold text-blue-900">Gov Bonds</p>
              <p className="text-blue-800">50%</p>
            </div>
            <div className="bg-white rounded-lg p-3 border border-blue-200">
              <p className="font-semibold text-blue-900">T-Bills</p>
              <p className="text-blue-800">10%</p>
            </div>
          </div>
        </div>

        {/* Analysis Instructions */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="font-semibold text-green-900 mb-3">📈 How to Update Performance Data</h3>
          <ul className="text-sm text-green-800 space-y-2">
            <li>• Go to <strong>https://vertex-capital-portifolio.netlify.app/admin</strong></li>
            <li>• Login with your GitHub credentials</li>
            <li>• Click "Performance Metrics" and update returns</li>
            <li>• System automatically calculates outperformance vs benchmarks</li>
            <li>• Changes will auto-rebuild and appear here within 1-2 minutes</li>
            <li>• Monitor risk-adjusted metrics (Sharpe, Sortino) for portfolio quality</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Page6Performance;
