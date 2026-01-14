import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Table from '../components/Table';
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

  const handleLiquidityChange = (id: string, key: string, value: any) => {
    setLiquidityItems((prev) =>
      prev.map((item, idx) => {
        if (String(idx) === id) {
          const updated = { ...item, [key]: value };

          // Auto-update status based on values
          if (key === 'current') {
            if (item.item === 'Cash & Cash Equivalents') {
              if (updated.current >= 10 && updated.current <= 15) {
                updated.status = 'Adequate';
                updated.actionNeeded = 'None - Within range';
              } else if (updated.current < 10) {
                updated.status = 'Critical';
                updated.actionNeeded = 'Raise cash immediately - Below 10% minimum';
              } else if (updated.current > 15) {
                updated.status = 'Warning';
                updated.actionNeeded = 'Excess cash - Consider deploying';
              }
            } else if (item.item === 'Time to Liquidate 80% Portfolio') {
              if (updated.current <= 30) {
                updated.status = 'Adequate';
                updated.actionNeeded = 'None - Within 30 days';
              } else {
                updated.status = 'Warning';
                updated.actionNeeded = 'Liquidity concern - Portfolio too concentrated';
              }
            }
          }

          return updated;
        }
        return item;
      })
    );
  };

  const criticalItems = liquidityItems.filter((i) => i.status === 'Critical');
  const warningItems = liquidityItems.filter((i) => i.status === 'Warning');

  const columns = [
    { key: 'item', label: 'Item', type: 'text' as const },
    { key: 'minimum', label: 'Min %', type: 'number' as const },
    { key: 'maximum', label: 'Max %', type: 'number' as const },
    { key: 'current', label: 'Current %', type: 'number' as const, editable: true },
    { key: 'status', label: 'Status', type: 'status' as const },
    { key: 'actionNeeded', label: 'Action Needed', type: 'text' as const, editable: true },
  ];

  const rows = liquidityItems.map((item, idx) => ({
    id: String(idx),
    item: item.item,
    minimum: item.minimum || '-',
    maximum: item.maximum || '-',
    current: item.current,
    status: item.status.toLowerCase(),
    actionNeeded: item.actionNeeded,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        pageNumber={4}
        pageTitle="Liquidity & Cash Management"
        pageDescription="Ensure sufficient cash for operations and manage liquidity risks"
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

        {/* Table */}
        <Table
          columns={columns}
          rows={rows}
          onRowChange={handleLiquidityChange}
          addable={false}
          deletable={false}
          sortable={true}
          className="mb-8"
        />

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
            <h3 className="font-semibold text-green-900 mb-3">📋 Liquidity Monitoring</h3>
            <ul className="text-sm text-green-800 space-y-2">
              <li>• Monitor daily cash balances</li>
              <li>• Track execution spreads for all assets</li>
              <li>• Measure time to liquidate 80% portfolio</li>
              <li>• Document all cash flow projections</li>
              <li>• Escalate critical issues immediately</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page4LiquidityCash;
