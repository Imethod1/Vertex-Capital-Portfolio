import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Table from '../components/Table';
import { PortfolioAllocation } from '../types/portfolio';
import { loadPortfolioData, savePortfolioData, needsRebalancing, checkAllocationCompliance } from '../utils/loadPortfolio';

const Page1AllocationSnapshot: React.FC = () => {
  const [allocations, setAllocations] = useState<PortfolioAllocation[]>([
    {
      assetClass: 'Fixed Income',
      target: 50,
      current: 50,
      deviation: 0,
      rebalancingRequired: false,
      notes: 'Government Bonds and T-Bills',
    },
    {
      assetClass: 'Domestic Equities',
      target: 35,
      current: 35,
      deviation: 0,
      rebalancingRequired: false,
      notes: 'DSE listed companies',
    },
    {
      assetClass: 'Regional (EAC/SADC) Equities',
      target: 5,
      current: 5,
      deviation: 0,
      rebalancingRequired: false,
      notes: 'EAC and SADC equities',
    },
    {
      assetClass: 'Cash & Cash Equivalents',
      target: 10,
      current: 10,
      deviation: 0,
      rebalancingRequired: false,
      notes: 'Money market instruments',
    },
  ]);

  const [isCompliant, setIsCompliant] = useState(true);

  useEffect(() => {
    const compliance = checkAllocationCompliance(allocations);
    setIsCompliant(compliance);
  }, [allocations]);

  const handleAllocationChange = (assetClass: string, key: string, value: any) => {
    setAllocations((prev) =>
      prev.map((alloc) => {
        if (alloc.assetClass === assetClass) {
          const updated = { ...alloc, [key]: value };

          // Recalculate deviation
          if (key === 'current') {
            updated.deviation = updated.current - updated.target;
            updated.rebalancingRequired = needsRebalancing(updated.deviation);
          }

          return updated;
        }
        return alloc;
      })
    );
  };

  const handleSave = () => {
    // Save allocations to state
    console.log('Portfolio allocations saved:', allocations);
    alert('Portfolio allocations saved successfully!');
  };

  const columns = [
    { key: 'assetClass', label: 'Asset Class', type: 'text' as const },
    { key: 'target', label: 'Target %', type: 'number' as const },
    { key: 'current', label: 'Current %', type: 'number' as const, editable: true },
    { key: 'deviation', label: 'Deviation %', type: 'number' as const },
    { key: 'rebalancingRequired', label: 'Rebalancing Required', type: 'text' as const },
    { key: 'notes', label: 'Notes', type: 'text' as const, editable: true },
  ];

  const rows = allocations.map((alloc, idx) => ({
    id: String(idx),
    assetClass: alloc.assetClass,
    target: alloc.target,
    current: alloc.current,
    deviation: alloc.deviation,
    rebalancingRequired: alloc.rebalancingRequired ? 'Yes' : 'No',
    notes: alloc.notes,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        pageNumber={1}
        pageTitle="Portfolio Allocation Snapshot"
        pageDescription="Track strategic vs actual asset allocations and identify rebalancing needs"
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Status Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Total Allocation</h3>
            <p className="text-3xl font-bold text-gray-900">
              {allocations.reduce((sum, a) => sum + a.current, 0).toFixed(1)}%
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Rebalancing Required</h3>
            <p className="text-3xl font-bold text-orange-600">
              {allocations.filter((a) => a.rebalancingRequired).length}
            </p>
          </div>
          <div className={`rounded-lg p-6 border-2 ${isCompliant ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <h3 className="text-sm font-semibold mb-2">
              {isCompliant ? (
                <span className="text-green-700">✓ Compliant</span>
              ) : (
                <span className="text-red-700">✕ Non-Compliant</span>
              )}
            </h3>
            <p className="text-sm text-gray-600">IPS allocation limits</p>
          </div>
        </div>

        {/* Table */}
        <Table
          columns={columns}
          rows={rows}
          onRowChange={(rowId, key, value) => {
            const assetClass = allocations[parseInt(rowId)].assetClass;
            handleAllocationChange(assetClass, key, value);
          }}
          addable={false}
          deletable={false}
          sortable={false}
          className="mb-8"
        />

        {/* Action Button */}
        <div className="flex justify-end gap-4">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Save Allocations
          </button>
        </div>

        {/* Key Information */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-3">📋 Update Instructions</h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>• Update "Current %" with today's actual asset allocation percentages</li>
            <li>• System will automatically calculate "Deviation %" and flag rebalancing needs</li>
            <li>• Rebalancing is required if deviation exceeds ±3%</li>
            <li>• Update monthly or when significant market moves occur</li>
            <li>• Add notes explaining any allocation changes</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Page1AllocationSnapshot;
