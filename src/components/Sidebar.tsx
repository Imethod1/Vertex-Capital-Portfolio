import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const navItems = [
    { path: '/allocation', label: '1. Allocation Snapshot', icon: '📊' },
    { path: '/security-exposure', label: '2. Security Exposure', icon: '📈' },
    { path: '/risk-metrics', label: '3. Risk Metrics', icon: '⚠️' },
    { path: '/liquidity', label: '4. Liquidity & Cash', icon: '💰' },
    { path: '/tactical-log', label: '5. Tactical Log', icon: '📝' },
    { path: '/performance', label: '6. Performance', icon: '🎯' },
    { path: '/compliance', label: '7. Compliance', icon: '✓' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside
      className={`bg-white border-r border-gray-200 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div className="p-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle sidebar"
        >
          {isOpen ? '◀' : '▶'}
        </button>
      </div>

      <nav className="space-y-2 px-3 py-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive(item.path)
                ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
            title={isOpen ? '' : item.label}
          >
            <span className="text-xl flex-shrink-0">{item.icon}</span>
            {isOpen && <span className="text-sm font-medium">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {isOpen && (
        <div className="p-4 border-t border-gray-200 mt-8">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-xs font-semibold text-gray-600 mb-3">Quick Stats</p>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Return:</span>
                <span className="font-bold text-green-600">+2.1%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Allocation Drift:</span>
                <span className="font-bold text-orange-600">1.5%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Risk Status:</span>
                <span className="font-bold text-green-600">✓ Compliant</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
