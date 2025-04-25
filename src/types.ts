export enum AnalysisType {
  TEXT = 'text',
  IMAGE = 'image',
  AUDIO = 'audio',
  DEEPFAKE = 'deepfake',
  URL = 'url'
}

export interface AnalysisResult {
  id: string;
  type: AnalysisType;
  timestamp: string;
  score: number;
  threat_level: 'safe' | 'suspicious' | 'dangerous';
  details: {
    summary: string;
    confidence: number;
    categories?: string[];
    metadata?: Record<string, any>;
    highlights?: {
      text?: string;
      position?: number[];
    }[];
  };
  raw_data?: any;
}

export interface FileUploadResponse {
  success: boolean;
  message: string;
  fileId?: string;
  error?: string;
}

export interface AnalysisResponse {
  success: boolean;
  result?: AnalysisResult;
  error?: string;
}