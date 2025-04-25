import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import AnalysisButton from '../ui/AnalysisButton';
import ResultCard from '../ui/ResultCard';
import { AnalysisResult } from '../../types';
import { analyzeText } from '../../services/api';

const TextAnalyzer: React.FC = () => {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!text.trim()) return;

    setIsAnalyzing(true);
    setError(null);
    
    try {
      const response = await analyzeText(text);
      if (response.success && response.result) {
        setResult(response.result);
      } else {
        setError('Analysis failed. Please try again.');
      }
    } catch (error) {
      console.error('Error analyzing text:', error);
      setError('An error occurred while analyzing the text.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Text Analysis</h2>
        <p className="text-gray-400">
          Analyze text for threats, misinformation, or harmful content
        </p>
      </div>

      <div className="bg-background-light p-6 rounded-xl border border-gray-800 mb-6">
        <div className="mb-4">
          <label htmlFor="text-input" className="block text-sm font-medium mb-2">
            Enter text to analyze
          </label>
          <textarea
            id="text-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter or paste text content to analyze for threats..."
            className="input-control min-h-32"
            rows={5}
            disabled={isAnalyzing}
          />
        </div>

        {error && (
          <div className="mb-4 p-3 bg-danger/10 border border-danger/20 rounded-lg text-danger text-sm">
            {error}
          </div>
        )}

        <div className="flex justify-end">
          <AnalysisButton
            onClick={handleAnalyze}
            isLoading={isAnalyzing}
            disabled={!text.trim()}
            icon={<FileText size={18} />}
          >
            Analyze Text
          </AnalysisButton>
        </div>
      </div>

      {result && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Analysis Results</h3>
          <ResultCard result={result} />
        </div>
      )}
    </motion.div>
  );
};

export default TextAnalyzer;