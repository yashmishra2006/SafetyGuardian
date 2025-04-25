import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link2 } from 'lucide-react';
import AnalysisButton from '../ui/AnalysisButton';
import ResultCard from '../ui/ResultCard';
import { AnalysisResult } from '../../types';
import { analyzeUrl } from '../../services/api';

const UrlAnalyzer: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!url.trim()) return;

    setIsAnalyzing(true);
    try {
      // In a real app, this would call the Flask backend
      const response = await analyzeUrl(url);
      if (response.success && response.result) {
        setResult(response.result);
      }
    } catch (error) {
      console.error('Error analyzing URL:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const isValidUrl = (urlString: string) => {
    try {
      new URL(urlString);
      return true;
    } catch (err) {;
      return false;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">URL Analysis</h2>
        <p className="text-gray-400">
          Analyze URLs for phishing attempts, malware, or suspicious content
        </p>
      </div>

      <div className="bg-background-light p-6 rounded-xl border border-gray-800 mb-6">
        <div className="mb-4">
          <label htmlFor="url-input" className="block text-sm font-medium mb-2">
            Enter URL to analyze
          </label>
          <input
            id="url-input"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="input-control"
            disabled={isAnalyzing}
          />
          {url && !isValidUrl(url) && !isAnalyzing && (
            <p className="mt-1 text-xs text-danger">Please enter a valid URL</p>
          )}
        </div>

        <div className="flex justify-end">
          <AnalysisButton
            onClick={handleAnalyze}
            isLoading={isAnalyzing}
            disabled={!url.trim() || !isValidUrl(url)}
            icon={<Link2 size={18} />}
          >
            Analyze URL
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

export default UrlAnalyzer;