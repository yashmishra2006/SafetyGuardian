import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileLock2 } from 'lucide-react';
import FileUploader from '../ui/FileUploader';
import AnalysisButton from '../ui/AnalysisButton';
import ResultCard from '../ui/ResultCard';
import { AnalysisResult } from '../../types';
import { mockAnalyzeDeepfake } from '../../services/mockApi';

const DeepfakeAnalyzer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setResult(null);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    try {
      // In a real app, this would upload to the Flask backend
      const response = await mockAnalyzeDeepfake(selectedFile);
      if (response.success && response.result) {
        setResult(response.result);
      }
    } catch (error) {
      console.error('Error analyzing file for deepfake:', error);
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
        <h2 className="text-2xl font-bold mb-2">Deepfake Detection</h2>
        <p className="text-gray-400">
          Analyze videos and images to detect AI-generated or manipulated content
        </p>
      </div>

      <div className="bg-background-light p-6 rounded-xl border border-gray-800 mb-6">
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Upload media for deepfake analysis
          </label>
          <FileUploader
            onFileSelect={handleFileSelect}
            selectedFile={selectedFile}
            fileType="media"
            accept={{
              'video/*': ['.mp4', '.mov', '.avi', '.webm'],
              'image/*': ['.jpeg', '.jpg', '.png']
            }}
          />
        </div>

        <div className="flex justify-end">
          <AnalysisButton
            onClick={handleAnalyze}
            isLoading={isAnalyzing}
            disabled={!selectedFile}
            icon={<FileLock2 size={18} />}
          >
            Detect Deepfake
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

export default DeepfakeAnalyzer;