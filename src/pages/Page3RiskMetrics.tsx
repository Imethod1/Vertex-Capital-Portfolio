import React, { useState, useMemo } from 'react';
import Navigation from '../components/Navigation';
import Table from '../components/Table';
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

  const handleMetricChange = (id: string, key: string, value: any) => {
    setRiskMetrics((prev) =>
      prev.map((metric, idx) => {
        if (String(idx) === id) {
          return { ...metric, [key]: value };
        }
        return metric;
      })
    );
  };

  const breachCount = useMemo(() => riskMetrics.filter((m) => m.status === 'Breach').length, [riskMetrics]);
  const warningCount = useMemo(() => riskMetrics.filter((m) => m.status === 'Warning').length, [riskMetrics]);
  const compliantCount = useMemo(() => riskMetrics.filter((m) => m.status === 'Compliant').length, [riskMetrics]);

  const columns = [
    { key: 'metric', label: 'Metric', type: 'text' as const },
    { key: 'ipsLimit', label: 'IPS Limit', type: 'text' as const },
    { key: 'currentValue', label: 'Current Value', type: 'text' as const, editable: true },
    { key: 'status', label: 'Status', type: 'status' as const },
    { key: 'actionRequired', label: 'Action Required', type: 'text' as const, editable: true },
  ];

  const rows = riskMetrics.map((metric, idx) => ({
    id: String(idx),
    metric: metric.metric,
    ipsLimit: metric.ipsLimit,
    currentValue: metric.currentValue,
    status: metric.status.toLowerCase(),
    actionRequired: metric.actionRequired,
  }));

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
        pageDescription="Monitor overall portfolio risk exposure and IPS compliance with thresholds"
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
          <div className={`rounded-lg p-6 border-2 ${breachCount === 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <h3 className={`text-sm font-semibold ${breachCount === 0 ? 'text-green-700' : 'text-red-700'}`}>
              {breachCount === 0 ? '✓ All Compliant' : '✕ Action Required'}
            </h3>
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

        {/* Table */}
        <Table
          columns={columns}
          rows={rows}
          onRowChange={handleMetricChange}
          addable={false}
          deletable={false}
          sortable={true}
          className="mb-8"
        />

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
          <h3 className="font-semibold text-blue-900 mb-3">📋 Monitoring Instructions</h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>• Update metrics monthly or immediately after significant portfolio changes</li>
            <li>• System automatically flags breaches and recommendations for action</li>
            <li>• Investigate any warning status with 3 business days</li>
            <li>• Breaches require immediate escalation to Investment Committee</li>
            <li>• Document all corrective actions taken</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Page3RiskMetrics;
