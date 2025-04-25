import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Image, Radio, FileLock2, Link2, Users } from 'lucide-react';
import Sidebar from './components/Sidebar';
import TextAnalyzer from './components/analyzers/TextAnalyzer';
import ImageAnalyzer from './components/analyzers/ImageAnalyzer';
import AudioAnalyzer from './components/analyzers/AudioAnalyzer';
import DeepfakeAnalyzer from './components/analyzers/DeepfakeAnalyzer';
import UrlAnalyzer from './components/analyzers/UrlAnalyzer';
import TeamPage from './components/TeamPage';
import EmergencySupport from './components/EmergencySupport';
import { AnalysisType } from './types';

function App() {
  const [activeAnalyzer, setActiveAnalyzer] = useState<AnalysisType | null>(null);
  const [showTeam, setShowTeam] = useState(false);
  const [showEmergencySupport, setShowEmergencySupport] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const analyzerCards = [
    {
      type: AnalysisType.TEXT,
      title: 'Text Analysis',
      description: 'Analyze text for threats, misinformation, or harmful content',
      icon: <FileText size={24} className="text-primary" />,
    },
    {
      type: AnalysisType.IMAGE,
      title: 'Image Analysis',
      description: 'Detect manipulated images and analyze visual content',
      icon: <Image size={24} className="text-primary" />,
    },
    {
      type: AnalysisType.AUDIO,
      title: 'Audio Analysis',
      description: 'Analyze audio files for synthetic voices and manipulation',
      icon: <Radio size={24} className="text-primary" />,
    },
    {
      type: AnalysisType.DEEPFAKE,
      title: 'Deepfake Detection',
      description: 'Identify AI-generated and manipulated media content',
      icon: <FileLock2 size={24} className="text-primary" />,
    },
    {
      type: AnalysisType.URL,
      title: 'URL Analysis',
      description: 'Check URLs for phishing attempts and malicious content',
      icon: <Link2 size={24} className="text-primary" />,
    },
  ];

  const handleNavigate = (type: AnalysisType | null, showTeamPage = false) => {
    setActiveAnalyzer(type);
    setShowTeam(showTeamPage);
    setShowEmergencySupport(false);
  };

  const renderContent = () => {
    if (showEmergencySupport) {
      return <EmergencySupport onClose={() => setShowEmergencySupport(false)} />;
    }
    
    if (showTeam) {
      return <TeamPage />;
    }

    switch (activeAnalyzer) {
      case AnalysisType.TEXT:
        return <TextAnalyzer />;
      case AnalysisType.IMAGE:
        return <ImageAnalyzer />;
      case AnalysisType.AUDIO:
        return <AudioAnalyzer />;
      case AnalysisType.DEEPFAKE:
        return <DeepfakeAnalyzer />;
      case AnalysisType.URL:
        return <UrlAnalyzer />;
      default:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-3">Welcome to ThreatShield</h1>
              <p className="text-gray-400">
                Select an analysis type to begin detecting and preventing potential threats
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {analyzerCards.map((card) => (
                <motion.div
                  key={card.type}
                  className="bg-background-light p-6 rounded-xl border border-gray-800 hover:border-primary/50 cursor-pointer transition-all duration-200"
                  onClick={() => handleNavigate(card.type)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="mb-4">{card.icon}</div>
                  <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
                  <p className="text-gray-400 text-sm">{card.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <button
                onClick={() => handleNavigate(null, true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
              >
                <Users size={20} />
                Meet Our Team
              </button>
            </motion.div>
          </motion.div>
        );
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar 
        activeAnalyzer={activeAnalyzer}
        setActiveAnalyzer={handleNavigate}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        showTeam={showTeam}
        setShowTeam={setShowTeam}
        onEmergencySupport={() => {
          setShowEmergencySupport(true);
          setShowTeam(false);
          setActiveAnalyzer(null);
        }}
      />
      
      <motion.main 
        className="flex-1 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </motion.main>
    </div>
  );
}

export default App;