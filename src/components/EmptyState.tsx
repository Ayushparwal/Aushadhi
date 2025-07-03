import React from 'react';
import { Sparkles, Leaf, Heart, Brain } from 'lucide-react';

interface EmptyStateProps {
  onSampleQuestion: (question: string) => void;
}

<br></br>
const EmptyState: React.FC<EmptyStateProps> = ({ onSampleQuestion }) => {
  const sampleQuestions = [
    {
      icon: <Leaf className="w-5 h-5" />,
      title: "Herbal Remedies",
      question: "What are some effective Ayurvedic herbs for boosting immunity?"
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: "Dosha Balance",
      question: "How can I determine my dosha type and balance it naturally?"
    },
    {
      icon: <Brain className="w-5 h-5" />,
      title: "Daily Routine",
      question: "What is an ideal Ayurvedic daily routine (dinacharya) for better health?"
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "Seasonal Practices",
      question: "How should I adjust my lifestyle according to different seasons in Ayurveda?"
    }
  ];

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-2xl mx-auto text-center">
        {/* Logo and Title */}
        <div className="mb-8">
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome to AyurHaven
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Your AI companion for holistic wellness and Ayurvedic living
          </p>
        </div>

        {/* Sample Questions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {sampleQuestions.map((item, index) => (
            <button
              key={index}
              onClick={() => onSampleQuestion(item.question)}
              className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md transition-all duration-200 text-left group"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-900/50 transition-colors duration-200">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.question}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Features */}
        <div className="text-sm text-gray-500 dark:text-gray-400">
          <p>Ask me about herbal remedies, dosha balancing, nutrition, daily routines, and more!</p>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;