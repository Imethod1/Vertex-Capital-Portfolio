import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import SecurityExposure from '../components/SecurityExposure';
import { Security, Sector, GeographicExposure, AssetClass } from '../types/portfolio';
import { checkSecurityCompliance, calculateTotalWeight, loadPortfolioData } from '../utils/loadPortfolio';

const Page2SecurityExposure: React.FC = () => {
  const [securities, setSecurities] = useState<Security[]>([
    {
      id: '1',
      name: 'Tanzania Government Bond 2026',
      ticker: 'TGB-26',
      assetClass: 'Fixed Income',
      currentWeight: 25,
      targetWeight: 25,
      deviation: 0,
      sector: 'Government',
      geographicExposure: 'Tanzania',
      marketValue: 25000000,
      quantity: 250,
      purchasePrice: 100000,
      currentPrice: 100000,
      notes: 'Government bond, investment grade',
      ipsCompliant: true,
    },
  ]);

  const [complianceData, setComplianceData] = useState(() => checkSecurityCompliance(securities));

  useEffect(() => {
    // Load securities data from JSON file managed by Decap CMS
    loadPortfolioData().then((data) => {
      if (data.securities && data.securities.length > 0) {
        setSecurities(data.securities);
        setComplianceData(checkSecurityCompliance(data.securities));
      }
    });
  }, []);

  const totalWeight = calculateTotalWeight(securities);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        pageNumber={2}
        pageTitle="Individual Security Exposure"
        pageDescription="Track individual security positions, weights, and IPS compliance (read-only, managed via Decap CMS)"
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Status Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Total Securities</h3>
            <p className="text-3xl font-bold text-gray-900">{securities.length}</p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Total Weight</h3>
            <p className="text-3xl font-bold text-gray-900">{totalWeight.toFixed(2)}%</p>
          </div>
          <div className={`rounded-lg p-6 border-2 ${complianceData.isCompliant ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <h3 className={`text-sm font-semibold ${complianceData.isCompliant ? 'text-green-700' : 'text-red-700'}`}>
              {complianceData.isCompliant ? '✓ Compliant' : '✕ Breaches Detected'}
            </h3>
            <p className="text-xs text-gray-600 mt-1">{complianceData.breaches.length} issues</p>
          </div>
          <div className="rounded-lg p-6 border-2 bg-blue-50 border-blue-200">
            <h3 className="text-sm font-semibold text-blue-700 mb-2">ℹ️ Read-Only</h3>
            <p className="text-xs text-gray-600">Edit via Decap CMS</p>
          </div>
        </div>

        {/* Compliance Alerts */}
        {!complianceData.isCompliant && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-red-900 mb-3">⚠️ Compliance Issues Detected</h3>
            <ul className="text-sm text-red-800 space-y-2">
              {complianceData.breaches.map((breach, idx) => (
                <li key={idx}>• {breach}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Security Exposure Table */}
        <SecurityExposure securities={securities} />

        {/* Compliance Rules */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-3">📋 How to Update Securities</h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>• Go to <strong>https://vertex-capital-portifolio.netlify.app/admin</strong></li>
            <li>• Login with your GitHub credentials</li>
            <li>• Click "Portfolio Data" and edit individual securities</li>
            <li>• Changes will auto-rebuild and appear here within 1-2 minutes</li>
            <li>• System automatically validates IPS compliance rules (≤10% single position, ≤25% sector)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Page2SecurityExposure;
