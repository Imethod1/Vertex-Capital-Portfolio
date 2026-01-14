import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { LiquidityItem } from '../types/portfolio';

const Page4LiquidityCash: React.FC = () => {
  const [liquidityItems, setLiquidityItems] = useState<LiquidityItem[]>([
    {
      item: 'Cash & Cash Equivalents',
      minimum: 10,
      maximum: 15,
      current: 12.5,
      status: 'Adequate',
      actionNeeded: 'None - Within range',
    },
    {
      item: 'Time to Liquidate 80% Portfolio',
      current: 18,
      status: 'Adequate',
      actionNeeded: 'None - Within 30 days',
    },
    {
      item: 'Bid-Ask Spread Adequacy',
      current: 95,
      status: 'Adequate',
      actionNeeded: 'None - Spreads acceptable',
    },
  ]);

  const criticalItems = liquidityItems.filter((i) => i.status === 'Critical');
  const warningItems = liquidityItems.filter((i) => i.status === 'Warning');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        pageNumber={4}
        pageTitle="Liquidity & Cash Management"
        pageDescription="Ensure sufficient cash for operations and manage liquidity risks (read-only, managed via Decap CMS)"
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Liquidity Gauge */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-600 mb-4">Cash Position</h3>
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {liquidityItems[0]?.current.toFixed(1)}%
                </span>
                <span className="text-xs text-gray-500">Target: 10-15%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    liquidityItems[0]?.status === 'Adequate'
                      ? 'bg-green-500'
                      : liquidityItems[0]?.status === 'Warning'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                  }`}
                  style={{ width: `${Math.min(liquidityItems[0]?.current || 0, 20) * 5}%` }}
                />
              </div>
            </div>
            <div className="text-xs text-gray-600">
              <p>Min: {liquidityItems[0]?.minimum}%</p>
              <p>Max: {liquidityItems[0]?.maximum}%</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">Critical Items</h3>
              <p className="text-3xl font-bold text-red-600">{criticalItems.length}</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">Warnings</h3>
              <p className="text-3xl font-bold text-yellow-600">{warningItems.length}</p>
            </div>
          </div>
        </div>

        {/* Alerts */}
        {criticalItems.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-red-900 mb-3">🚨 Critical Liquidity Issues</h3>
            <ul className="text-sm text-red-800 space-y-2">
              {criticalItems.map((item, idx) => (
                <li key={idx}>
                  • <strong>{item.item}</strong>: {item.current.toFixed(2)}%
                  <br />
                  &nbsp;&nbsp;→ {item.actionNeeded}
                </li>
              ))}
            </ul>
          </div>
        )}

        {warningItems.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-yellow-900 mb-3">⚠️ Liquidity Warnings</h3>
            <ul className="text-sm text-yellow-800 space-y-2">
              {warningItems.map((item, idx) => (
                <li key={idx}>
                  • <strong>{item.item}</strong>: {item.current.toFixed(2)}%
                  <br />
                  &nbsp;&nbsp;→ {item.actionNeeded}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Read-Only Liquidity Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Item</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Min %</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Max %</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Current %</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Action Needed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {liquidityItems.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.item}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{item.minimum || '-'}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{item.maximum || '-'}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-blue-600">{item.current}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === 'Adequate' ? 'bg-green-200 text-green-800' :
                      item.status === 'Warning' ? 'bg-yellow-200 text-yellow-800' :
                      'bg-red-200 text-red-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">{item.actionNeeded}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Liquidity Policy */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-3">💡 Cash Policy</h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>• Maintain 10-15% in cash and equivalents</li>
              <li>• Review weekly cash positions</li>
              <li>• Alerts trigger below 10% or above 15%</li>
              <li>• Invest excess cash in T-bills or money market</li>
              <li>• Maintain 30-day execution timeline</li>
            </ul>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="font-semibold text-green-900 mb-3">📋 How to Update Liquidity Data</h3>
            <ul className="text-sm text-green-800 space-y-2">
              <li>• Go to <strong>https://vertex-capital-portifolio.netlify.app/admin</strong></li>
              <li>• Login with your GitHub credentials</li>
              <li>• Click "Liquidity" and update cash positions</li>
              <li>• Changes will auto-rebuild within 1-2 minutes</li>
              <li>• System escalates critical issues automatically</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page4LiquidityCash;
