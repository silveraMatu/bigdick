
import {FC} from 'react';

interface TextAreaProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}

const TextArea: FC<TextAreaProps> = ({ name, value, onChange, placeholder }) => {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={4}
      className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 resize-y"
    />
  );
};

export default TextArea;
