
import {FC} from 'react';

interface QuestionCardProps {
  number: number;
  title: string;
  children: React.ReactNode;
}

const QuestionCard: FC<QuestionCardProps> = ({ number, title, children }) => {
  return (
    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 shadow-md">
      <h3 className="text-lg font-semibold text-white mb-4">
        <span className="bg-teal-500 text-gray-900 rounded-full h-8 w-8 flex items-center justify-center font-bold mr-3 float-left">{number}</span>
        {title}
      </h3>
      <div className="pt-2 pl-11">
        {children}
      </div>
    </div>
  );
};

export default QuestionCard;
