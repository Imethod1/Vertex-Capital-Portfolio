import React from 'react';
import { PortfolioAllocation } from '../types/portfolio';

interface AllocationSnapshotProps {
  allocations: PortfolioAllocation[];
}

export const AllocationSnapshot: React.FC<AllocationSnapshotProps> = ({ allocations }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Portfolio Allocation Snapshot
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Current portfolio allocations and strategic targets (read-only).
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
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-700 dark:text-gray-300">
                  {alloc.current}%
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-700 dark:text-gray-300 font-medium">
                  {alloc.deviation !== 0 ? `${alloc.deviation > 0 ? '+' : ''}${alloc.deviation.toFixed(1)}%` : '—'}
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-700 dark:text-gray-300">
                  {alloc.rebalancingRequired ? (
                    <span className="inline-block px-3 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full text-sm font-medium">
                      Yes
                    </span>
                  ) : (
                    <span className="text-gray-500 dark:text-gray-400">No</span>
                  )}
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-700 dark:text-gray-300 text-sm">
                  {alloc.notes || '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900 rounded border border-blue-200 dark:border-blue-700">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>Data is read-only.</strong> To update allocations, use the Decap CMS admin panel.
        </p>
      </div>
    </div>
  );
};

export default AllocationSnapshot;
