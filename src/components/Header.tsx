import React from 'react';

const Header: React.FC = () => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-lg">
            VC
          </div>
          <div>
            <h1 className="text-2xl font-bold">Vertex Capital</h1>
            <p className="text-gray-400 text-sm">Portfolio Monitoring System</p>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div className="text-right">
            <p className="text-sm text-gray-400">Portfolio Value</p>
            <p className="text-xl font-bold">TZS 100M</p>
          </div>
          <div className="text-right border-l border-gray-700 pl-8">
            <p className="text-sm text-gray-400">{today}</p>
            <p className="text-sm font-semibold">Q1 2026</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
