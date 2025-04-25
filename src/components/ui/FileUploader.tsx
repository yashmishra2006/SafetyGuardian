import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, X, FileText } from 'lucide-react';
import { cn } from '../../utils/cn';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  fileType: string;
  accept: Record<string, string[]>;
  maxSize?: number;
}

const FileUploader: React.FC<FileUploaderProps> = ({ 
  onFileSelect, 
  selectedFile, 
  fileType,
  accept,
  maxSize = 10 * 1024 * 1024 // 10MB default
}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { 
    getRootProps, 
    getInputProps, 
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({ 
    onDrop,
    accept,
    maxSize,
    multiple: false 
  });

  const removeFile = () => {
    onFileSelect(null as unknown as File);
  };

  return (
    <div className="w-full">
      {!selectedFile ? (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-6 transition-all duration-200 text-center cursor-pointer",
            isDragActive && "border-primary bg-primary/5",
            isDragAccept && "border-success bg-success/5",
            isDragReject && "border-danger bg-danger/5",
            !isDragActive && "border-gray-700 hover:border-primary/50"
          )}
        >
          <input {...getInputProps()} />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center gap-3"
          >
            <div className={cn(
              "p-3 rounded-full",
              isDragActive ? "bg-primary/10" : "bg-gray-800"
            )}>
              <Upload 
                size={24} 
                className={cn(
                  isDragAccept && "text-success",
                  isDragReject && "text-danger",
                  !isDragActive && !isDragAccept && !isDragReject && "text-primary"
                )}
              />
            </div>
            <div>
              <p className="text-sm mb-1">
                {isDragActive
                  ? isDragAccept
                    ? `Drop the ${fileType} file here`
                    : "This file type is not supported"
                  : `Drag & drop ${fileType} file here`}
              </p>
              <p className="text-xs text-gray-400">or click to browse files</p>
            </div>
          </motion.div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="border rounded-lg p-4 bg-background-light"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText size={20} className="text-primary" />
              </div>
              <div className="truncate">
                <p className="text-sm font-medium truncate">{selectedFile.name}</p>
                <p className="text-xs text-gray-400">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              onClick={removeFile}
              className="p-1 hover:bg-gray-700 rounded-full transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default FileUploader;