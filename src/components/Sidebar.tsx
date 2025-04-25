import React from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight,
  FileText, 
  Image, 
  FileLock2, 
  Link2, 
  Radio,
  AlertTriangle,
  Shield,
  Home,
  Users
} from 'lucide-react';
import { cn } from '../utils/cn';
import { AnalysisType } from '../types';

interface SidebarProps {
  activeAnalyzer: AnalysisType | null;
  setActiveAnalyzer: (type: AnalysisType | null, showTeam?: boolean) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  showTeam: boolean;
  setShowTeam: (show: boolean) => void;
  onEmergencySupport: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeAnalyzer, 
  setActiveAnalyzer,
  isSidebarOpen,
  setIsSidebarOpen,
  showTeam,
  setShowTeam,
  onEmergencySupport
}) => {
  const sidebarItems = [
    { 
      type: null,
      label: 'Home',
      icon: <Home size={20} />,
      onClick: () => {
        setActiveAnalyzer(null);
        setShowTeam(false);
      }
    },
    { 
      type: AnalysisType.TEXT, 
      label: 'Text Analysis', 
      icon: <FileText size={20} />,
      onClick: () => setActiveAnalyzer(AnalysisType.TEXT)
    },
    { 
      type: AnalysisType.IMAGE, 
      label: 'Image Analysis', 
      icon: <Image size={20} />,
      onClick: () => setActiveAnalyzer(AnalysisType.IMAGE)
    },
    { 
      type: AnalysisType.AUDIO, 
      label: 'Audio Analysis', 
      icon: <Radio size={20} />,
      onClick: () => setActiveAnalyzer(AnalysisType.AUDIO)
    },
    { 
      type: AnalysisType.DEEPFAKE, 
      label: 'Deepfake Detection', 
      icon: <FileLock2 size={20} />,
      onClick: () => setActiveAnalyzer(AnalysisType.DEEPFAKE)
    },
    { 
      type: AnalysisType.URL, 
      label: 'URL Analysis', 
      icon: <Link2 size={20} />,
      onClick: () => setActiveAnalyzer(AnalysisType.URL)
    },
    {
      type: 'team',
      label: 'Our Team',
      icon: <Users size={20} />,
      onClick: () => {
        setActiveAnalyzer(null, true);
        setShowTeam(true);
      }
    }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      <motion.aside
        className={cn(
          "fixed lg:relative z-30 h-full bg-background-light border-r border-gray-800 transition-all",
          isSidebarOpen ? "w-64" : "w-0 lg:w-20"
        )}
        initial={{ x: -10, opacity: 0.8 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-800 flex items-center justify-between">
            <div className={cn("flex items-center gap-3", !isSidebarOpen && "lg:hidden")}>
              <Shield size={28} className="text-primary" />
              <h1 className="text-xl font-bold">ThreatShield</h1>
            </div>
            {!isSidebarOpen && (
              <div className="hidden lg:flex justify-center w-full">
                <Shield size={28} className="text-primary" />
              </div>
            )}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1 rounded-md hover:bg-gray-700 lg:flex"
            >
              {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
          </div>
          
          <div className="py-4 flex-1 overflow-y-auto scrollbar-hide">
            <div className={cn("space-y-1 px-3", !isSidebarOpen && "lg:px-2")}>
              {sidebarItems.map((item) => (
                <button
                  key={item.type ?? 'home'}
                  onClick={item.onClick}
                  className={cn(
                    "sidebar-item w-full",
                    ((activeAnalyzer === item.type && !showTeam) || (item.type === 'team' && showTeam)) && "active",
                    !isSidebarOpen && "lg:justify-center lg:px-2"
                  )}
                >
                  {item.icon}
                  <span className={cn("whitespace-nowrap", !isSidebarOpen && "lg:hidden")}>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="p-4 border-t border-gray-800">
            <button
              onClick={onEmergencySupport}
              className={cn(
                "w-full flex items-center gap-2 text-red-400 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors",
                !isSidebarOpen && "lg:justify-center"
              )}
            >
              <AlertTriangle size={20} />
              <span className={cn("whitespace-nowrap", !isSidebarOpen && "lg:hidden")}>
                Emergency Support
              </span>
            </button>
          </div>
        </div>
      </motion.aside>
      
      {/* Toggle button for mobile */}
      {!isSidebarOpen && (
        <button
          className="fixed top-4 left-4 z-20 p-2 bg-background-light rounded-md shadow-lg lg:hidden"
          onClick={() => setIsSidebarOpen(true)}
        >
          <ChevronRight size={20} />
        </button>
      )}
    </>
  );
};

export default Sidebar;