import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Table from '../components/Table';
import { TacticalAdjustment } from '../types/portfolio';

const Page5TacticalLog: React.FC = () => {
  const [tactics, setTactics] = useState<TacticalAdjustment[]>([
    {
      id: '1',
      date: '2026-01-15',
      tacticalMove: 'Increased Fixed Income by 3%',
      deviationPercent: 3,
      marketSignal: 'Rising interest rates expected, locking in bond yields',
      duration: '2 weeks',
      approvedBy: 'IC',
      notes: 'Opportunistic position based on economic forecasts',
    },
  ]);

  const handleTacticChange = (id: string, key: string, value: any) => {
    setTactics((prev) =>
      prev.map((tactic) => {
        if (tactic.id === id) {
          return { ...tactic, [key]: value };
        }
        return tactic;
      })
    );
  };

  const handleAddTactic = () => {
    const newId = String(Math.max(...tactics.map((t) => parseInt(t.id)), 0) + 1);
    const newTactic: TacticalAdjustment = {
      id: newId,
      date: new Date().toISOString().split('T')[0],
      tacticalMove: '',
      deviationPercent: 0,
      marketSignal: '',
      duration: '',
      approvedBy: '',
      notes: '',
    };
    setTactics([...tactics, newTactic]);
  };

  const handleDeleteTactic = (id: string) => {
    setTactics((prev) => prev.filter((t) => t.id !== id));
  };

  const columns = [
    { key: 'date', label: 'Date', type: 'date' as const, editable: true },
    { key: 'tacticalMove', label: 'Tactical Move', type: 'text' as const, editable: true },
    { key: 'deviationPercent', label: 'Deviation %', type: 'number' as const, editable: true },
    { key: 'marketSignal', label: 'Market Signal / Rationale', type: 'text' as const, editable: true },
    { key: 'duration', label: 'Duration', type: 'text' as const, editable: true },
    { key: 'approvedBy', label: 'Approved By (IC/PM)', type: 'text' as const, editable: true },
    { key: 'notes', label: 'Notes', type: 'text' as const, editable: true },
  ];

  const rows = tactics.map((tactic) => ({
    id: tactic.id,
    date: tactic.date,
    tacticalMove: tactic.tacticalMove,
    deviationPercent: tactic.deviationPercent,
    marketSignal: tactic.marketSignal,
    duration: tactic.duration,
    approvedBy: tactic.approvedBy,
    notes: tactic.notes,
  }));

  const totalDeviations = tactics.reduce((sum, t) => sum + Math.abs(t.deviationPercent), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        pageNumber={5}
        pageTitle="Tactical Adjustment Log"
        pageDescription="Document all short-term deviations from strategic allocation with audit trail"
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Total Adjustments</h3>
            <p className="text-3xl font-bold text-gray-900">{tactics.length}</p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Total Deviations</h3>
            <p className="text-3xl font-bold text-blue-600">{totalDeviations.toFixed(2)}%</p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Max Deviation</h3>
            <p className="text-3xl font-bold text-gray-900">
              {tactics.length > 0 ? Math.max(...tactics.map((t) => Math.abs(t.deviationPercent))).toFixed(2) : 0}%
            </p>
          </div>
          <div className={`rounded-lg p-6 border-2 ${totalDeviations <= 5 ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
            <h3 className={`text-sm font-semibold ${totalDeviations <= 5 ? 'text-green-700' : 'text-yellow-700'}`}>
              {totalDeviations <= 5 ? '✓ Within Limit' : '⚠ Approaching Limit'}
            </h3>
            <p className="text-xs text-gray-600 mt-1">Max ±5% allowed</p>
          </div>
        </div>

        {/* Deviation Warnings */}
        {totalDeviations > 5 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-yellow-900 mb-3">⚠️ Deviation Limit Warning</h3>
            <p className="text-sm text-yellow-800">
              Total tactical deviations ({totalDeviations.toFixed(2)}%) are exceeding the ±5% maximum threshold.
              Consider reverting completed tactics to strategic allocation.
            </p>
          </div>
        )}

        {/* Tactical Approval Status Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-blue-900 mb-3">📋 Tactical Adjustment Requirements</h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>• Approval required from Investment Committee (IC) before execution</li>
            <li>• All adjustments must have documented market rationale</li>
            <li>• Maximum deviation limit: ±5% from strategic weights</li>
            <li>• Duration should be specified (e.g., "2 weeks", "1 month")</li>
            <li>• Tactical moves must revert to strategic allocation upon completion</li>
            <li>• Full audit trail maintained for all decisions</li>
          </ul>
        </div>

        {/* Table */}
        <Table
          columns={columns}
          rows={rows}
          onRowChange={handleTacticChange}
          onAddRow={handleAddTactic}
          onDeleteRow={handleDeleteTactic}
          className="mb-8"
        />

        {/* Decision Workflow Info */}
        <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">🔄 Decision Workflow</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold mb-2">
                1
              </div>
              <p className="text-sm font-medium">Proposed</p>
              <p className="text-xs text-gray-600">Tactic logged</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold mb-2">
                2
              </div>
              <p className="text-sm font-medium">Approved</p>
              <p className="text-xs text-gray-600">IC sign-off</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold mb-2">
                3
              </div>
              <p className="text-sm font-medium">Active</p>
              <p className="text-xs text-gray-600">Executed</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold mb-2">
                4
              </div>
              <p className="text-sm font-medium">Completed</p>
              <p className="text-xs text-gray-600">Reverted</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page5TacticalLog;
