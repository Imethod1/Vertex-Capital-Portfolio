import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { ComplianceCheck } from '../types/portfolio';

const Page7Compliance: React.FC = () => {
  const [complianceChecks] = useState<ComplianceCheck[]>([
    {
      area: 'Single Security Limit',
      ipsLimit: '≤10%',
      currentStatus: '8.5%',
      breach: false,
      actionRequired: 'None - Within limit',
    },
    {
      area: 'Single Sector Limit',
      ipsLimit: '≤25%',
      currentStatus: '22.3%',
      breach: false,
      actionRequired: 'None - Within limit',
    },
    {
      area: 'Regional Allocation Limit',
      ipsLimit: '≤10%',
      currentStatus: '7.2%',
      breach: false,
      actionRequired: 'None - Within limit',
    },
    {
      area: 'Drawdown Limit',
      ipsLimit: '≤5%',
      currentStatus: '3.1%',
      breach: false,
      actionRequired: 'None - Within limit',
    },
    {
      area: 'Prohibited Instruments',
      ipsLimit: 'None allowed',
      currentStatus: 'None detected',
      breach: false,
      actionRequired: 'None - No prohibited holdings',
    },
    {
      area: 'Credit Rating Compliance',
      ipsLimit: '≥Investment Grade',
      currentStatus: 'A-/BBB+ avg.',
      breach: false,
      actionRequired: 'None - All holdings compliant',
    },
  ]);

  const breachCount = complianceChecks.filter((c) => c.breach).length;
  const compliantCount = complianceChecks.filter((c) => !c.breach).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        pageNumber={7}
        pageTitle="Compliance & IPS Adherence"
        pageDescription="Confirm ongoing compliance with all IPS limits, rules, and restrictions (read-only, managed via Decap CMS)"
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Compliance Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Compliant Areas</h3>
            <p className="text-3xl font-bold text-green-600">{compliantCount}</p>
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
            <h3 className="font-semibold text-red-900 mb-3">🚨 COMPLIANCE BREACHES DETECTED</h3>
            <div className="text-sm text-red-800 space-y-3">
              {complianceChecks
                .filter((c) => c.breach)
                .map((breach, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-4 border border-red-300">
                    <p className="font-semibold">{breach.area}</p>
                    <p className="text-xs text-red-700 mt-1">
                      Current: {breach.currentStatus} | Limit: {breach.ipsLimit}
                    </p>
                    <p className="text-xs font-medium text-red-900 mt-2">
                      Action: {breach.actionRequired}
                    </p>
                  </div>
                ))}
            </div>
            <div className="mt-4 pt-4 border-t border-red-300">
              <p className="font-semibold text-red-900 mb-2">⚠️ Escalation Required:</p>
              <ul className="text-xs text-red-800 space-y-1">
                <li>• Immediate notification to Investment Committee required</li>
                <li>• Corrective action plan must be documented</li>
                <li>• All holdings must be reconciled against limits</li>
                <li>• Trading restrictions may apply until resolved</li>
              </ul>
            </div>
          </div>
        )}

        {/* Compliance Certificate Info */}
        {breachCount === 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-green-900 mb-3">✓ COMPLIANCE CERTIFICATION</h3>
            <p className="text-sm text-green-800 mb-4">
              The portfolio is in full compliance with the Investment Policy Statement (IPS).
              All holdings are within prescribed limits and restrictions.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 border border-green-300">
                <p className="text-sm font-semibold text-green-900 mb-2">Certification Authority</p>
                <p className="text-xs text-green-800">Investment Committee</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-green-300">
                <p className="text-sm font-semibold text-green-900 mb-2">Last Certified</p>
                <p className="text-xs text-green-800">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        )}

        {/* Read-Only Compliance Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Compliance Area</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">IPS Limit / Rule</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Current Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Breach?</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Action Required</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {complianceChecks.map((check, idx) => (
                <tr key={idx} className={`${check.breach ? 'bg-red-50 hover:bg-red-100' : 'hover:bg-gray-50'}`}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{check.area}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{check.ipsLimit}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{check.currentStatus}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      check.breach ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'
                    }`}>
                      {check.breach ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">{check.actionRequired}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* How to Update Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-blue-900 mb-3">📋 How to Update Compliance Data</h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>• Go to <strong>https://vertex-capital-portifolio.netlify.app/admin</strong></li>
            <li>• Login with your GitHub credentials</li>
            <li>• Click "Compliance Data" and update areas/breach status</li>
            <li>• System automatically validates against IPS limits</li>
            <li>• Changes will auto-rebuild and appear here within 1-2 minutes</li>
          </ul>
        </div>

        {/* Original table code removed - now read-only */}

        {/* IPS Summary */}
        <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">📋 Investment Policy Statement Limits</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-700 mb-3">Concentration Limits</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Single security: ≤10%</li>
                <li>• Single sector: ≤25%</li>
                <li>• Regional exposure: ≤10%</li>
                <li>• Cash minimum: 10%</li>
                <li>• Cash maximum: 15%</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-3">Risk & Performance Limits</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Portfolio volatility: 5-7% annualized</li>
                <li>• Quarterly drawdown: ≤5%</li>
                <li>• Q1 return target: 2-3%</li>
                <li>• Credit rating minimum: Investment Grade</li>
                <li>• Portfolio duration (FI): ≤2 years</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Monitoring & Compliance Workflow */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-3">📊 Monitoring Schedule</h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>• Daily: Cash positions and market surveillance</li>
              <li>• Weekly: Security holdings and risk metrics</li>
              <li>• Monthly: Full compliance verification</li>
              <li>• Quarterly: Performance review and certification</li>
              <li>• Ad-hoc: When material changes occur</li>
            </ul>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h3 className="font-semibold text-purple-900 mb-3">✓ Certification Process</h3>
            <ul className="text-sm text-purple-800 space-y-2">
              <li>1. Compile all compliance data</li>
              <li>2. Verify calculations and limits</li>
              <li>3. Identify any breaches or warnings</li>
              <li>4. Document corrective actions</li>
              <li>5. IC approval and certification</li>
              <li>6. Archive documentation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page7Compliance;
