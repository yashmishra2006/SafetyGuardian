import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Radio } from 'lucide-react';
import FileUploader from '../ui/FileUploader';
import AnalysisButton from '../ui/AnalysisButton';
import ResultCard from '../ui/ResultCard';
import { AnalysisResult } from '../../types';
import { analyzeAudio } from '../../services/api'; // Assuming you'll switch to real API here

const AudioAnalyzer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setResult(null); // Reset result when a new file is selected
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return; // Prevent analysis if no file is selected

    setIsAnalyzing(true); // Indicate that analysis is in progress

    try {
      // Call the real API service to analyze audio file
      const response = await analyzeAudio(selectedFile); // This should be your actual API call
      console.log('API Response:', response); // Log the response to inspect its structure
      // If analysis is successful, update the result state with the analysis data
      if (response.success && response.result) {
        setResult(response.result);
      } else {
        // Log an error if response structure is unexpected
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      console.error('Error analyzing audio:', error);
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
        <h2 className="text-2xl font-bold mb-2">Audio Analysis</h2>
        <p className="text-gray-400">
          Analyze audio files for synthetic voice generation, manipulated content, or hidden messages
        </p>
      </div>

      <div className="bg-background-light p-6 rounded-xl border border-gray-800 mb-6">
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Upload audio file for analysis
          </label>
          <FileUploader
            onFileSelect={handleFileSelect}
            selectedFile={selectedFile}
            fileType="audio"
            accept={{
              'audio/*': ['.mp3', '.wav', '.ogg', '.m4a'] // Define accepted audio file types
            }}
          />
        </div>

        <div className="flex justify-end">
          <AnalysisButton
            onClick={handleAnalyze}
            isLoading={isAnalyzing}
            disabled={!selectedFile} // Disable button if no file is selected
            icon={<Radio size={18} />} // Custom icon for audio analysis
          >
            Analyze Audio
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

export default AudioAnalyzer;
