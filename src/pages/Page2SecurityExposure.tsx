import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Table from '../components/Table';
import { Security, Sector, GeographicExposure, AssetClass } from '../types/portfolio';
import { checkSecurityCompliance, calculateTotalWeight } from '../utils/loadPortfolio';

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

  const handleSecurityChange = (id: string, key: string, value: any) => {
    setSecurities((prev) => {
      const updated = prev.map((sec) => {
        if (sec.id === id) {
          const newSec = { ...sec, [key]: value };
          if (key === 'currentWeight' || key === 'targetWeight') {
            newSec.deviation = newSec.currentWeight - newSec.targetWeight;
          }
          return newSec;
        }
        return sec;
      });

      // Update compliance
      setComplianceData(checkSecurityCompliance(updated));
      return updated;
    });
  };

  const handleAddSecurity = () => {
    const newId = String(Math.max(...securities.map((s) => parseInt(s.id)), 0) + 1);
    const newSecurity: Security = {
      id: newId,
      name: '',
      ticker: '',
      assetClass: 'Domestic Equities',
      currentWeight: 0,
      targetWeight: 0,
      deviation: 0,
      sector: 'Banking',
      geographicExposure: 'Tanzania',
      marketValue: 0,
      quantity: 0,
      purchasePrice: 0,
      currentPrice: 0,
      notes: '',
      ipsCompliant: true,
    };
    setSecurities([...securities, newSecurity]);
  };

  const handleDeleteSecurity = (id: string) => {
    setSecurities((prev) => prev.filter((sec) => sec.id !== id));
  };

  const assetClassOptions = [
    { label: 'Fixed Income', value: 'Fixed Income' },
    { label: 'Domestic Equities', value: 'Domestic Equities' },
    { label: 'Regional (EAC/SADC) Equities', value: 'Regional (EAC/SADC) Equities' },
    { label: 'Cash & Cash Equivalents', value: 'Cash & Cash Equivalents' },
  ];

  const sectorOptions = [
    { label: 'Banking', value: 'Banking' },
    { label: 'Telecommunications', value: 'Telecommunications' },
    { label: 'Consumer Goods', value: 'Consumer Goods' },
    { label: 'Government', value: 'Government' },
    { label: 'Technology', value: 'Technology' },
    { label: 'Energy', value: 'Energy' },
    { label: 'Other', value: 'Other' },
  ];

  const regionOptions = [
    { label: 'Tanzania', value: 'Tanzania' },
    { label: 'Kenya', value: 'Kenya' },
    { label: 'Uganda', value: 'Uganda' },
    { label: 'South Africa', value: 'South Africa' },
    { label: 'Regional', value: 'Regional' },
  ];

  const columns = [
    { key: 'name', label: 'Security Name', type: 'text' as const, editable: true },
    { key: 'ticker', label: 'Ticker', type: 'text' as const, editable: true },
    { key: 'assetClass', label: 'Asset Class', type: 'select' as const, editable: true, options: assetClassOptions },
    { key: 'currentWeight', label: 'Current Weight %', type: 'number' as const, editable: true },
    { key: 'targetWeight', label: 'Target Weight %', type: 'number' as const, editable: true },
    { key: 'deviation', label: 'Deviation %', type: 'number' as const },
    { key: 'sector', label: 'Sector', type: 'select' as const, editable: true, options: sectorOptions },
    { key: 'geographicExposure', label: 'Geographic Exposure', type: 'select' as const, editable: true, options: regionOptions },
    { key: 'notes', label: 'Notes', type: 'text' as const, editable: true },
  ];

  const rows = securities.map((sec) => ({
    id: sec.id,
    name: sec.name,
    ticker: sec.ticker,
    assetClass: sec.assetClass,
    currentWeight: sec.currentWeight,
    targetWeight: sec.targetWeight,
    deviation: sec.deviation,
    sector: sec.sector,
    geographicExposure: sec.geographicExposure,
    notes: sec.notes,
  }));

  const totalWeight = calculateTotalWeight(securities);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        pageNumber={2}
        pageTitle="Individual Security Exposure"
        pageDescription="Track individual security positions, weights, and IPS compliance"
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
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Avg Position</h3>
            <p className="text-3xl font-bold text-gray-900">
              {securities.length > 0 ? (totalWeight / securities.length).toFixed(2) : 0}%
            </p>
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

        {/* Table */}
        <Table
          columns={columns}
          rows={rows}
          onRowChange={handleSecurityChange}
          onAddRow={handleAddSecurity}
          onDeleteRow={handleDeleteSecurity}
          className="mb-8"
        />

        {/* Compliance Rules */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-3">📋 IPS Compliance Rules</h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>• Single security exposure: ≤10% maximum</li>
            <li>• Single sector exposure: ≤25% maximum</li>
            <li>• Regional allocation: ≤10% maximum</li>
            <li>• All positions must be tracked with current and target weights</li>
            <li>• System will flag breaches automatically</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Page2SecurityExposure;
