import React from 'react';
import { PortfolioAllocation } from '../types/portfolio';

interface AllocationSnapshotProps {
  allocations: PortfolioAllocation[];
  onUpdate?: (allocations: PortfolioAllocation[]) => void;
}

export const AllocationSnapshot: React.FC<AllocationSnapshotProps> = ({ allocations, onUpdate }) => {
  const handleInputChange = (index: number, field: keyof PortfolioAllocation, value: string | number | boolean) => {
    if (!onUpdate) return;
    const updated = [...allocations];
    if (field === 'rebalancingRequired') {
      updated[index][field] = value as boolean;
    } else if (field === 'current' || field === 'target') {
      const numValue = typeof value === 'string' ? parseFloat(value) || 0 : value;
      updated[index][field] = numValue;
      updated[index].deviation = numValue - updated[index].target;
    } else {
      updated[index][field] = value as any;
    }
    onUpdate(updated);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Portfolio Allocation Snapshot
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track strategic vs actual allocations and identify rebalancing needs.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-brand-50 dark:bg-gray-800">
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                Asset Class
              </th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                Target %
              </th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                Current %
              </th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                Deviation %
              </th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                Rebalancing Required
              </th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                Notes
              </th>
            </tr>
          </thead>
          <tbody>
            {allocations.map((alloc, index) => (
              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-white font-medium">
                  {alloc.assetClass}
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-700 dark:text-gray-300">
                  {alloc.target}%
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={alloc.current || ''}
                    onChange={(e) => handleInputChange(index, 'current', e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="—"
                  />
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-700 dark:text-gray-300 font-medium">
                  {alloc.deviation !== 0 ? `${alloc.deviation > 0 ? '+' : ''}${alloc.deviation.toFixed(1)}%` : '—'}
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={alloc.rebalancingRequired}
                      onChange={(e) => handleInputChange(index, 'rebalancingRequired', e.target.checked)}
                      className="rounded"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">
                      {alloc.rebalancingRequired ? 'Yes' : 'No'}
                    </span>
                  </label>
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                  <textarea
                    value={alloc.notes}
                    onChange={(e) => handleInputChange(index, 'notes', e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    rows={1}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900 rounded border border-blue-200 dark:border-blue-700">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>Update Instructions:</strong> Fill in current % monthly; highlight any deviations &gt; ±3% for rebalancing.
        </p>
      </div>
    </div>
  );
};

export default AllocationSnapshot;
