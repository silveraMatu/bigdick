
import React from 'react';

interface NumericInputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const NumericInput: React.FC<NumericInputProps> = ({ name, value, onChange, placeholder }) => {
  return (
    <input
      type="number"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full max-w-xs bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200"
      min="0"
    />
  );
};

export default NumericInput;
