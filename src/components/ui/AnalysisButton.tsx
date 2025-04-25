  import React from 'react';
  import { motion } from 'framer-motion';
  import { Loader2 } from 'lucide-react';
  import { cn } from '../../utils/cn';

  interface AnalysisButtonProps {
    onClick: () => void;
    isLoading: boolean;
    disabled?: boolean;
    className?: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
  }

  const AnalysisButton: React.FC<AnalysisButtonProps> = ({
    onClick,
    isLoading,
    disabled = false,
    className,
    icon,
    children
  }) => {
    return (
      <motion.button
        onClick={onClick}
        disabled={disabled || isLoading}
        className={cn(
          "btn btn-primary relative overflow-hidden",
          (disabled || isLoading) && "opacity-70 cursor-not-allowed",
          className
        )}
        whileTap={{ scale: 0.98 }}
        whileHover={!disabled && !isLoading ? { scale: 1.02 } : {}}
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            <span>Analyzing...</span>
          </>
        ) : (
          <>
            {icon}
            {children}
          </>
        )}
        
        {isLoading && (
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-white/20"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
        )}
      </motion.button>
    );
  };

  export default AnalysisButton;