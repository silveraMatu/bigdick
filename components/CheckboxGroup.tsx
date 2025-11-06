
import {FC} from 'react';
import { Option } from '../types';

interface CheckboxGroupProps {
  name: string;
  options: Option[];
  selectedValues: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxSelections?: number;
}

const CheckboxGroup: FC<CheckboxGroupProps> = ({ name, options, selectedValues, onChange, maxSelections }) => {
  const isMaxSelected = maxSelections ? selectedValues.length >= maxSelections : false;

  return (
    <div className="space-y-3">
      {options.map((option) => {
        const isChecked = selectedValues.includes(option.value);
        const isDisabled = isMaxSelected && !isChecked;
        return (
          <label key={option.value} className={`flex items-center p-3 rounded-md bg-gray-700/50 transition-colors duration-200 ${isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-gray-700'}`}>
            <input
              type="checkbox"
              name={name}
              value={option.value}
              checked={isChecked}
              onChange={onChange}
              disabled={isDisabled}
              className="h-5 w-5 text-teal-500 bg-gray-600 border-gray-500 rounded focus:ring-teal-500 focus:ring-2 cursor-pointer disabled:cursor-not-allowed"
            />
            <span className={`ml-4 ${isDisabled ? 'text-gray-500' : 'text-gray-300'}`}>{option.label}</span>
          </label>
        );
      })}
      {maxSelections && <p className="text-xs text-gray-500 mt-2">Seleccionados: {selectedValues.length} de {maxSelections}.</p>}
    </div>
  );
};

export default CheckboxGroup;
