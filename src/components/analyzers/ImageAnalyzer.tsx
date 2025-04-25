import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Image } from 'lucide-react';
import FileUploader from '../ui/FileUploader';
import AnalysisButton from '../ui/AnalysisButton';
import ResultCard from '../ui/ResultCard';
import { AnalysisResult } from '../../types';
import { analyzeImage } from '../../services/api';

const ImageAnalyzer: React.FC = () => {
  console.log('Rendering ImageAnalyzer'); // Debug rendering
  
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
      const response = await analyzeImage(selectedFile);
      console.log('API Response:', response);  // Log the response to inspect its structure
  
      if (response.success && response.result) {
        setResult(response.result);
      } else {
        // Log an error if response structure is unexpected
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      console.error('Error analyzing image:', error);
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
        <h2 className="text-2xl font-bold mb-2">Image Analysis</h2>
        <p className="text-gray-400">
          Analyze images for manipulated content, inappropriate material, or hidden threats
        </p>
      </div>

      <div className="bg-background-light p-6 rounded-xl border border-gray-800 mb-6">
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Upload image for analysis
          </label>
          <FileUploader
            onFileSelect={handleFileSelect}
            selectedFile={selectedFile}
            fileType="image"
            accept={{
              'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
            }}
          />
        </div>

        <div className="flex justify-end">
          <AnalysisButton
            onClick={() => {
              handleAnalyze();
            }}
            isLoading={isAnalyzing}
            disabled={!selectedFile}
            icon={<Image size={18} />}
          >
            Analyze Image
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

export default ImageAnalyzer;