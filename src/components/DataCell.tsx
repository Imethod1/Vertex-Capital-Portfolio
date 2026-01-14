import React, { useState, useEffect } from 'react';

interface DataCellProps {
  value: string | number | boolean;
  type?: 'text' | 'number' | 'select' | 'date' | 'status';
  editable?: boolean;
  status?: 'compliant' | 'warning' | 'breach';
  options?: { label: string; value: string }[];
  onChange?: (value: string | number) => void;
  placeholder?: string;
  min?: number;
  max?: number;
  className?: string;
}

const DataCell: React.FC<DataCellProps> = ({
  value,
  type = 'text',
  editable = false,
  status,
  options = [],
  onChange,
  placeholder,
  min,
  max,
  className = '',
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(String(value));

  useEffect(() => {
    setInputValue(String(value));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newValue = type === 'number' ? e.currentTarget.value : e.currentTarget.value;
    setInputValue(newValue);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (onChange && inputValue !== String(value)) {
      if (type === 'number') {
        onChange(Number(inputValue));
      } else {
        onChange(inputValue);
      }
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'compliant':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'warning':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'breach':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return '';
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'compliant':
        return '✓ Compliant';
      case 'warning':
        return '⚠ Warning';
      case 'breach':
        return '✕ Breach';
      default:
        return '';
    }
  };

  if (type === 'status') {
    return (
      <div
        className={`px-3 py-2 rounded-lg inline-block font-medium text-sm ${getStatusColor()}`}
      >
        {getStatusBadge()}
      </div>
    );
  }

  if (!editable) {
    return (
      <div className={`px-3 py-2 text-gray-900 ${className}`}>
        {type === 'number' ? Number(value).toFixed(2) : String(value)}
      </div>
    );
  }

  if (isEditing) {
    if (type === 'select') {
      return (
        <select
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
          aria-label="Select option"
          className="w-full px-3 py-2 border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select...</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        type={type === 'date' ? 'date' : type === 'number' ? 'number' : 'text'}
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        autoFocus
        placeholder={placeholder}
        min={min}
        max={max}
        className="w-full px-3 py-2 border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    );
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className="px-3 py-2 cursor-pointer hover:bg-blue-50 rounded-lg transition-colors group"
      title="Click to edit"
    >
      <span className="text-gray-900 group-hover:text-blue-600">
        {type === 'number' ? Number(value).toFixed(2) : String(value)}
      </span>
      <span className="ml-2 text-gray-400 group-hover:text-blue-400 text-xs">✎</span>
    </div>
  );
};

export default DataCell;
