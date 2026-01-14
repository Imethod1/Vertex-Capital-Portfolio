import React from 'react';

interface NavigationProps {
  pageNumber: number;
  pageTitle: string;
  pageDescription: string;
}

const Navigation: React.FC<NavigationProps> = ({ pageNumber, pageTitle, pageDescription }) => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white text-sm font-bold">
                {pageNumber}
              </span>
              <h2 className="text-3xl font-bold text-gray-900">{pageTitle}</h2>
            </div>
            <p className="text-gray-600 ml-11">{pageDescription}</p>
          </div>
          <div className="text-right text-sm text-gray-500">
            <p>Last Updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
