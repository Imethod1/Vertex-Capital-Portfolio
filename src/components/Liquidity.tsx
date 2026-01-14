import React from 'react';
import { LiquidityItem } from '../types/portfolio';

interface LiquidityProps {
  items: LiquidityItem[];
  onUpdate?: (items: LiquidityItem[]) => void;
}

export const Liquidity: React.FC<LiquidityProps> = ({ items, onUpdate }) => {
  const handleInputChange = (index: number, field: keyof LiquidityItem, value: string | number) => {
    if (!onUpdate) return;
    const updated = [...items];
    if (field === 'current') {
      updated[index][field] = typeof value === 'string' ? parseFloat(value) || 0 : value;
    } else {
      (updated[index][field] as any) = value;
    }
    onUpdate(updated);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Liquidity & Cash Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Ensure sufficient cash and manage liquidity risks.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-brand-50 dark:bg-gray-800">
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                Item
              </th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                Min / Max
              </th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                Current %
              </th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                Status
              </th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                Action Needed
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => {
              const statusColor = item.status === 'Adequate'
                ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                : item.status === 'Warning'
                ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';

              return (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-white font-medium">
                    {item.item}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-700 dark:text-gray-300">
                    {item.minimum !== undefined && item.maximum !== undefined
                      ? `${item.minimum}–${item.maximum}%`
                      : item.maximum !== undefined
                      ? `≤${item.maximum} days`
                      : '—'}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={item.current || ''}
                      onChange={(e) => handleInputChange(index, 'current', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="—"
                    />
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                    <select
                      value={item.status}
                      onChange={(e) => handleInputChange(index, 'status', e.target.value as any)}
                      className={`px-3 py-1 rounded text-sm font-medium border-0 cursor-pointer ${statusColor}`}
                    >
                      <option value="Adequate">Adequate</option>
                      <option value="Warning">Warning</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                    <input
                      type="text"
                      value={item.actionNeeded}
                      onChange={(e) => handleInputChange(index, 'actionNeeded', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900 rounded border border-blue-200 dark:border-blue-700">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>Instructions:</strong> Record cash levels weekly; ensure operational requirements are met.
        </p>
      </div>
    </div>
  );
};

export default Liquidity;
