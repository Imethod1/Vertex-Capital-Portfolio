import React from 'react';
import { Security } from '../types/portfolio';

interface SecurityExposureProps {
  securities: Security[];
  onAdd?: (security: Security) => void;
  onUpdate?: (securities: Security[]) => void;
}

export const SecurityExposure: React.FC<SecurityExposureProps> = ({ securities, onUpdate }) => {
  const handleInputChange = (index: number, field: keyof Security, value: string | number | boolean) => {
    if (!onUpdate) return;
    const updated = [...securities];
    const security = updated[index];
    
    if (field === 'currentWeight' || field === 'targetWeight') {
      const numValue = typeof value === 'string' ? parseFloat(value) || 0 : value;
      security[field] = numValue;
      security.deviation = numValue - security.targetWeight;
    } else if (typeof value === 'string') {
      (security[field] as any) = value;
    } else {
      (security[field] as any) = value;
    }
    onUpdate(updated);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Individual Security Exposure
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track positions, IPS compliance, and sector/geography distribution.
        </p>
      </div>

      {securities.length === 0 ? (
        <div className="bg-gray-50 dark:bg-gray-800 rounded p-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">No securities added yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-brand-50 dark:bg-gray-800">
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                  Security / Ticker
                </th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                  Asset Class
                </th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                  Weight %
                </th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                  Target %
                </th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                  Deviation %
                </th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                  Sector
                </th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                  Geographic Exposure
                </th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                  IPS Compliant
                </th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody>
              {securities.map((sec, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-white font-medium">
                    {sec.name} <span className="text-gray-600 dark:text-gray-400">{sec.ticker}</span>
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-700 dark:text-gray-300">
                    {sec.assetClass}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      value={sec.currentWeight || ''}
                      onChange={(e) => handleInputChange(index, 'currentWeight', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-700 dark:text-gray-300">
                    {sec.targetWeight}%
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-700 dark:text-gray-300">
                    {sec.deviation !== 0 ? `${sec.deviation > 0 ? '+' : ''}${sec.deviation.toFixed(1)}%` : '—'}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-700 dark:text-gray-300">
                    {sec.sector}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-700 dark:text-gray-300">
                    {sec.geographicExposure}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                    <span className={`px-2 py-1 rounded text-sm font-medium ${
                      sec.ipsCompliant
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                        : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                    }`}>
                      {sec.ipsCompliant ? '✓ Yes' : '✗ No'}
                    </span>
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">
                    <textarea
                      value={sec.notes}
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
      )}

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900 rounded border border-blue-200 dark:border-blue-700">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>Instructions:</strong> Add each security; check IPS compliance (single security ≤10%, sector ≤25%).
        </p>
      </div>
    </div>
  );
};

export default SecurityExposure;
