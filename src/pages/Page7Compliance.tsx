import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Table from '../components/Table';
import { ComplianceCheck } from '../types/portfolio';

const Page7Compliance: React.FC = () => {
  const [complianceChecks, setComplianceChecks] = useState<ComplianceCheck[]>([
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

  const handleComplianceChange = (id: string, key: string, value: any) => {
    setComplianceChecks((prev) =>
      prev.map((check, idx) => {
        if (String(idx) === id) {
          return { ...check, [key]: value };
        }
        return check;
      })
    );
  };

  const breachCount = complianceChecks.filter((c) => c.breach).length;
  const compliantCount = complianceChecks.filter((c) => !c.breach).length;

  const columns = [
    { key: 'area', label: 'Compliance Area', type: 'text' as const },
    { key: 'ipsLimit', label: 'IPS Limit / Rule', type: 'text' as const },
    { key: 'currentStatus', label: 'Current Status', type: 'text' as const, editable: true },
    {
      key: 'breach',
      label: 'Breach?',
      type: 'text' as const,
      editable: true,
    },
    { key: 'actionRequired', label: 'Action Required', type: 'text' as const, editable: true },
  ];

  const rows = complianceChecks.map((check, idx) => ({
    id: String(idx),
    area: check.area,
    ipsLimit: check.ipsLimit,
    currentStatus: check.currentStatus,
    breach: check.breach ? 'Yes' : 'No',
    actionRequired: check.actionRequired,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        pageNumber={7}
        pageTitle="Compliance & IPS Adherence"
        pageDescription="Confirm ongoing compliance with all IPS limits, rules, and restrictions"
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
          <div className={`rounded-lg p-6 border-2 ${breachCount === 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <h3 className={`text-sm font-semibold ${breachCount === 0 ? 'text-green-700' : 'text-red-700'}`}>
              {breachCount === 0 ? '✓ COMPLIANT' : '✕ NON-COMPLIANT'}
            </h3>
            <p className="text-xs text-gray-600 mt-1">Certification Status</p>
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

        {/* Table */}
        <Table
          columns={columns}
          rows={rows}
          onRowChange={handleComplianceChange}
          addable={false}
          deletable={false}
          sortable={true}
          className="mb-8"
        />

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
