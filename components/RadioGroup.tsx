
import React from 'react';
import { Option } from '../types';

interface RadioGroupProps {
  name: string;
  options: Option[];
  selectedValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ name, options, selectedValue, onChange }) => {
  return (
    <div className="space-y-3">
      {options.map((option) => (
        <label key={option.value} className="flex items-center p-3 rounded-md bg-gray-700/50 hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={onChange}
            className="h-5 w-5 text-teal-500 bg-gray-600 border-gray-500 focus:ring-teal-500 focus:ring-2 cursor-pointer"
          />
          <span className="ml-4 text-gray-300">{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioGroup;
