import React, { useState, useMemo } from 'react';
import Navigation from '../components/Navigation';
import { RiskMetric } from '../types/portfolio';

const Page3RiskMetrics: React.FC = () => {
  const [riskMetrics, setRiskMetrics] = useState<RiskMetric[]>([
    {
      metric: 'Single Security Exposure',
      ipsLimit: '≤10%',
      currentValue: '8.5%',
      status: 'Compliant',
      actionRequired: 'None - Monitor',
    },
    {
      metric: 'Single Sector Exposure',
      ipsLimit: '≤25%',
      currentValue: '22.3%',
      status: 'Compliant',
      actionRequired: 'None - Within limit',
    },
    {
      metric: 'Regional Allocation',
      ipsLimit: '≤10%',
      currentValue: '7.2%',
      status: 'Compliant',
      actionRequired: 'None - Within limit',
    },
    {
      metric: 'Weighted Portfolio Duration',
      ipsLimit: '≤2 yrs',
      currentValue: '1.8 yrs',
      status: 'Compliant',
      actionRequired: 'None - Within limit',
    },
    {
      metric: 'Portfolio Volatility',
      ipsLimit: '5-7% ann.',
      currentValue: '6.2% ann.',
      status: 'Compliant',
      actionRequired: 'None - Within target range',
    },
    {
      metric: 'Drawdown Limit',
      ipsLimit: '≤5%',
      currentValue: '3.1%',
      status: 'Compliant',
      actionRequired: 'None - Within limit',
    },
    {
      metric: 'Credit Rating Compliance',
      ipsLimit: '≥Investment Grade',
      currentValue: 'A-/BBB+ avg.',
      status: 'Compliant',
      actionRequired: 'None - All holdings investment grade',
    },
  ]);

  const breachCount = useMemo(() => riskMetrics.filter((m) => m.status === 'Breach').length, [riskMetrics]);
  const warningCount = useMemo(() => riskMetrics.filter((m) => m.status === 'Warning').length, [riskMetrics]);
  const compliantCount = useMemo(() => riskMetrics.filter((m) => m.status === 'Compliant').length, [riskMetrics]);

  const statusColors: { [key: string]: string } = {
    Compliant: 'bg-green-100 border-l-4 border-green-500',
    Warning: 'bg-yellow-100 border-l-4 border-yellow-500',
    Breach: 'bg-red-100 border-l-4 border-red-500',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        pageNumber={3}
        pageTitle="Risk & Concentration Metrics"
        pageDescription="Monitor overall portfolio risk exposure and IPS compliance with thresholds (read-only, managed via Decap CMS)"
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Status Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Compliant</h3>
            <p className="text-3xl font-bold text-green-600">{compliantCount}</p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Warnings</h3>
            <p className="text-3xl font-bold text-yellow-600">{warningCount}</p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Breaches</h3>
            <p className="text-3xl font-bold text-red-600">{breachCount}</p>
          </div>
          <div className="rounded-lg p-6 border-2 bg-blue-50 border-blue-200">
            <h3 className="text-sm font-semibold text-blue-700 mb-2">ℹ️ Read-Only</h3>
            <p className="text-xs text-gray-600">Edit via Decap CMS</p>
          </div>
        </div>

        {/* Breach Alerts */}
        {breachCount > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-red-900 mb-3">🚨 Compliance Breaches Detected</h3>
            <ul className="text-sm text-red-800 space-y-2">
              {riskMetrics
                .filter((m) => m.status === 'Breach')
                .map((m, idx) => (
                  <li key={idx}>
                    • <strong>{m.metric}</strong>: {m.currentValue} (Limit: {m.ipsLimit})
                    <br />
                    &nbsp;&nbsp;→ {m.actionRequired}
                  </li>
                ))}
            </ul>
          </div>
        )}

        {/* Warning Alerts */}
        {warningCount > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-yellow-900 mb-3">⚠️ Warning Indicators</h3>
            <ul className="text-sm text-yellow-800 space-y-2">
              {riskMetrics
                .filter((m) => m.status === 'Warning')
                .map((m, idx) => (
                  <li key={idx}>
                    • <strong>{m.metric}</strong>: {m.currentValue} (Limit: {m.ipsLimit})
                  </li>
                ))}
            </ul>
          </div>
        )}

        {/* Read-Only Risk Metrics Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Metric</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">IPS Limit</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Current Value</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Action Required</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {riskMetrics.map((metric, idx) => (
                <tr key={idx} className={`${statusColors[metric.status]} hover:opacity-75`}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{metric.metric}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{metric.ipsLimit}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-semibold">{metric.currentValue}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      metric.status === 'Compliant' ? 'bg-green-200 text-green-800' :
                      metric.status === 'Warning' ? 'bg-yellow-200 text-yellow-800' :
                      'bg-red-200 text-red-800'
                    }`}>
                      {metric.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">{metric.actionRequired}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Traffic Light Legend */}
        <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">📊 Status Legend</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-lg ${statusColors.Compliant}`}>
              <p className="font-semibold text-green-900">✓ Compliant</p>
              <p className="text-xs text-green-800">Within IPS limits</p>
            </div>
            <div className={`p-4 rounded-lg ${statusColors.Warning}`}>
              <p className="font-semibold text-yellow-900">⚠ Warning</p>
              <p className="text-xs text-yellow-800">Approaching limit - monitor closely</p>
            </div>
            <div className={`p-4 rounded-lg ${statusColors.Breach}`}>
              <p className="font-semibold text-red-900">✕ Breach</p>
              <p className="text-xs text-red-800">Exceeds IPS limit - immediate action required</p>
            </div>
          </div>
        </div>

        {/* Monitoring Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-3">📋 How to Update Risk Metrics</h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>• Go to <strong>https://vertex-capital-portifolio.netlify.app/admin</strong></li>
            <li>• Login with your GitHub credentials</li>
            <li>• Click "Risk Metrics" and update values</li>
            <li>• System automatically validates compliance with IPS thresholds</li>
            <li>• Changes will auto-rebuild and appear here within 1-2 minutes</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Page3RiskMetrics;
