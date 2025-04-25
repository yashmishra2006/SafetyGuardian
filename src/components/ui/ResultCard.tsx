import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  ShieldAlert, 
  ShieldX,
  Clock,
  BarChart3
} from 'lucide-react';
import { AnalysisResult } from '../../types';
import { cn } from '../../utils/cn';

interface ResultCardProps {
  result: AnalysisResult;
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const { threat_level, score, details, timestamp } = result;
  
  const getThreatIcon = () => {
    switch (threat_level) {
      case 'safe':
        return <ShieldCheck className="text-success" size={24} />;
      case 'suspicious':
        return <ShieldAlert className="text-warning" size={24} />;
      case 'dangerous':
        return <ShieldX className="text-danger" size={24} />;
      default:
        return <ShieldCheck className="text-success" size={24} />;
    }
  };
  
  const getThreatColor = () => {
    switch (threat_level) {
      case 'safe':
        return 'bg-success/10 border-success/20 text-success';
      case 'suspicious':
        return 'bg-warning/10 border-warning/20 text-warning';
      case 'dangerous':
        return 'bg-danger/10 border-danger/20 text-danger';
      default:
        return 'bg-success/10 border-success/20 text-success';
    }
  };
  
  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const scoreBarWidth = `${score * 100}%`;

  return (
    <motion.div 
      className="bg-background-light border border-gray-700 rounded-xl overflow-hidden shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {getThreatIcon()}
            <h3 className={cn(
              "text-lg font-semibold capitalize",
              threat_level === 'safe' && "text-success",
              threat_level === 'suspicious' && "text-warning",
              threat_level === 'dangerous' && "text-danger"
            )}>
              {threat_level}
            </h3>
          </div>
          <div className="flex items-center text-gray-400 text-sm">
            <Clock size={14} className="mr-1" />
            {formatTimestamp(timestamp)}
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-300 mb-2">{details.summary}</p>
          
          {details.categories && details.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {details.categories.map((category, index) => (
                <span 
                  key={index}
                  className="text-xs font-medium px-2 py-1 rounded-full bg-gray-700 text-gray-300"
                >
                  {category}
                </span>
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <BarChart3 size={16} />
              <span className="text-sm font-medium">Threat Score</span>
            </div>
            <span className="text-sm font-bold">{(score * 100).toFixed(1)}%</span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full rounded-full",
                score < 0.3 ? "bg-success" : 
                score < 0.7 ? "bg-warning" : "bg-danger"
              )}
              style={{ width: scoreBarWidth }}
            />
          </div>
        </div>
        
        {details.highlights && details.highlights.length > 0 && (
          <div className="mt-5">
            <h4 className="text-sm font-medium mb-2">Highlighted Content:</h4>
            <div className={cn(
              "p-3 rounded-lg border text-sm font-mono",
              getThreatColor()
            )}>
              {details.highlights.map((highlight, index) => (
                <div key={index}>
                  {highlight.text}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ResultCard;