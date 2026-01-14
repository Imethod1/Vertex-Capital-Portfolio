import React, { useState } from 'react';
import DataCell from './DataCell';

interface Column {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'select' | 'date' | 'status';
  editable?: boolean;
  sortable?: boolean;
  options?: { label: string; value: string }[];
  width?: string;
}

interface Row {
  [key: string]: any;
  id: string;
}

interface TableProps {
  columns: Column[];
  rows: Row[];
  onRowChange?: (rowId: string, key: string, value: any) => void;
  onAddRow?: () => void;
  onDeleteRow?: (rowId: string) => void;
  sortable?: boolean;
  deletable?: boolean;
  addable?: boolean;
  className?: string;
}

const Table: React.FC<TableProps> = ({
  columns,
  rows,
  onRowChange,
  onAddRow,
  onDeleteRow,
  sortable = true,
  deletable = true,
  addable = true,
  className = '',
}) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  const handleSort = (columnKey: string) => {
    if (!sortable) return;

    setSortConfig((prev) => {
      if (prev?.key === columnKey) {
        return {
          key: columnKey,
          direction: prev.direction === 'asc' ? 'desc' : 'asc',
        };
      }
      return { key: columnKey, direction: 'asc' };
    });
  };

  const getSortedRows = () => {
    if (!sortConfig) return rows;

    return [...rows].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      const aStr = String(aValue).toLowerCase();
      const bStr = String(bValue).toLowerCase();

      if (sortConfig.direction === 'asc') {
        return aStr.localeCompare(bStr);
      }
      return bStr.localeCompare(aStr);
    });
  };

  const sortedRows = getSortedRows();

  return (
    <div className={`bg-white rounded-lg border border-gray-200 overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b-2 border-gray-200">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-4 text-left text-sm font-semibold text-gray-900 ${
                    column.width || ''
                  } ${column.sortable !== false && sortable ? 'cursor-pointer hover:bg-gray-100' : ''}`}
                  onClick={() => {
                    if (column.sortable !== false && sortable) {
                      handleSort(column.key);
                    }
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span>{column.label}</span>
                    {sortConfig?.key === column.key && sortable && (
                      <span className="text-blue-600 font-bold">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              {deletable && <th className="px-6 py-4 text-sm font-semibold text-gray-900">Action</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedRows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                {columns.map((column) => (
                  <td key={`${row.id}-${column.key}`} className="px-6 py-4">
                    <DataCell
                      value={row[column.key] || ''}
                      type={column.type}
                      editable={column.editable}
                      status={column.type === 'status' ? (row[column.key] as any) : undefined}
                      options={column.options}
                      onChange={(value) => {
                        onRowChange?.(row.id, column.key, value);
                      }}
                    />
                  </td>
                ))}
                {deletable && (
                  <td className="px-6 py-4">
                    <button
                      onClick={() => onDeleteRow?.(row.id)}
                      className="text-red-600 hover:text-red-800 hover:bg-red-50 px-3 py-1 rounded-lg transition-colors text-sm font-medium"
                      title="Delete row"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {addable && (
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onAddRow}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
          >
            + Add Row
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
