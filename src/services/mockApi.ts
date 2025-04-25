import { AnalysisResponse, AnalysisType } from '../types';

// Helper to generate a random ID
const generateId = () => Math.random().toString(36).substring(2, 15);

// Helper to simulate API delay
const simulateDelay = (ms = 2000) => new Promise(resolve => setTimeout(resolve, ms));

// Mock text analysis API
export const mockAnalyzeText = async (text: string): Promise<AnalysisResponse> => {
  await simulateDelay();
  
  // Simulate different threat levels based on content
  const hasKeywords = ['hack', 'attack', 'breach', 'threat', 'malware']
    .some(keyword => text.toLowerCase().includes(keyword));
  
  const threatLevel = hasKeywords ? 'suspicious' : 'safe';
  const score = hasKeywords ? 0.65 : 0.12;
  
  return {
    success: true,
    result: {
      id: generateId(),
      type: AnalysisType.TEXT,
      timestamp: new Date().toISOString(),
      score: score,
      threat_level: threatLevel as 'safe' | 'suspicious' | 'dangerous',
      details: {
        summary: hasKeywords 
          ? "The text contains potentially concerning keywords related to security threats."
          : "No significant threats detected in the provided text.",
        confidence: 0.92,
        categories: hasKeywords ? ['Security Threats', 'Suspicious Language'] : ['Safe Content'],
        highlights: hasKeywords 
          ? [{ text: "Highlighted suspicious words: " + ['hack', 'attack', 'breach', 'threat', 'malware']
            .filter(keyword => text.toLowerCase().includes(keyword))
            .join(', ') }] 
          : []
      }
    }
  };
};

// Mock image analysis API
export const mockAnalyzeImage = async (file: File): Promise<AnalysisResponse> => {
  await simulateDelay(3000);
  
  // Randomly determine threat level for demo purposes
  const rand = Math.random();
  let threatLevel: 'safe' | 'suspicious' | 'dangerous';
  let score: number;
  
  if (rand < 0.7) {
    threatLevel = 'safe';
    score = 0.08;
  } else if (rand < 0.9) {
    threatLevel = 'suspicious';
    score = 0.55;
  } else {
    threatLevel = 'dangerous';
    score = 0.85;
  }
  
  return {
    success: true,
    result: {
      id: generateId(),
      type: AnalysisType.IMAGE,
      timestamp: new Date().toISOString(),
      score: score,
      threat_level: threatLevel,
      details: {
        summary: threatLevel === 'safe' 
          ? "No issues detected in the image."
          : threatLevel === 'suspicious'
            ? "The image contains potentially manipulated elements."
            : "The image appears to be synthetically generated or contains harmful content.",
        confidence: 0.89,
        categories: threatLevel === 'safe' 
          ? ['Safe Content'] 
          : threatLevel === 'suspicious'
            ? ['Possible Manipulation', 'AI-Generated Content']
            : ['Harmful Content', 'Policy Violation'],
        metadata: {
          dimensions: `${Math.round(Math.random() * 1000 + 500)}x${Math.round(Math.random() * 1000 + 500)}`,
          format: file.type,
          size: file.size
        }
      }
    }
  };
};

// Mock audio analysis API
export const mockAnalyzeAudio = async (file: File): Promise<AnalysisResponse> => {
  await simulateDelay(2500);
  
  // Randomly determine threat level
  const rand = Math.random();
  let threatLevel: 'safe' | 'suspicious' | 'dangerous';
  let score: number;
  
  if (rand < 0.6) {
    threatLevel = 'safe';
    score = 0.15;
  } else if (rand < 0.9) {
    threatLevel = 'suspicious';
    score = 0.68;
  } else {
    threatLevel = 'dangerous';
    score = 0.92;
  }
  
  return {
    success: true,
    result: {
      id: generateId(),
      type: AnalysisType.AUDIO,
      timestamp: new Date().toISOString(),
      score: score,
      threat_level: threatLevel,
      details: {
        summary: threatLevel === 'safe' 
          ? "No synthetic voice or manipulated content detected."
          : threatLevel === 'suspicious'
            ? "Possible voice synthesis detected in parts of the audio."
            : "High confidence that this audio contains synthetic voice generation.",
        confidence: 0.88,
        categories: threatLevel === 'safe' 
          ? ['Authentic Audio'] 
          : threatLevel === 'suspicious'
            ? ['Possible Voice Synthesis', 'Partial Manipulation']
            : ['AI Generated Audio', 'Voice Cloning'],
        metadata: {
          duration: `${Math.round(Math.random() * 60 + 10)} seconds`,
          format: file.type,
          size: file.size
        }
      }
    }
  };
};

// Mock deepfake analysis API
export const mockAnalyzeDeepfake = async (file: File): Promise<AnalysisResponse> => {
  await simulateDelay(4000);
  
  // Randomly determine threat level
  const rand = Math.random();
  let threatLevel: 'safe' | 'suspicious' | 'dangerous';
  let score: number;
  
  if (rand < 0.5) {
    threatLevel = 'safe';
    score = 0.07;
  } else if (rand < 0.8) {
    threatLevel = 'suspicious';
    score = 0.72;
  } else {
    threatLevel = 'dangerous';
    score = 0.96;
  }
  
  return {
    success: true,
    result: {
      id: generateId(),
      type: AnalysisType.DEEPFAKE,
      timestamp: new Date().toISOString(),
      score: score,
      threat_level: threatLevel,
      details: {
        summary: threatLevel === 'safe' 
          ? "No evidence of deepfake manipulation detected."
          : threatLevel === 'suspicious'
            ? "Some indicators of possible deepfake manipulation detected."
            : "Strong evidence that this content has been artificially generated or manipulated.",
        confidence: 0.94,
        categories: threatLevel === 'safe' 
          ? ['Authentic Content'] 
          : threatLevel === 'suspicious'
            ? ['Possible Deepfake', 'Partial Manipulation']
            : ['Confirmed Deepfake', 'AI Generated'],
        highlights: threatLevel !== 'safe' 
          ? [{ text: "Inconsistencies detected in facial features and movement patterns." }] 
          : []
      }
    }
  };
};

// Mock URL analysis API
export const mockAnalyzeUrl = async (url: string): Promise<AnalysisResponse> => {
  await simulateDelay(2200);
  
  // Determine threat level based on domain for demo purposes
  const domain = new URL(url).hostname;
  let threatLevel: 'safe' | 'suspicious' | 'dangerous';
  let score: number;
  
  if (domain.includes('example') || domain.includes('google') || domain.includes('github')) {
    threatLevel = 'safe';
    score = 0.05;
  } else if (domain.includes('free') || domain.includes('download') || domain.length > 20) {
    threatLevel = 'suspicious';
    score = 0.65;
  } else {
    // Random chance for other domains
    const rand = Math.random();
    if (rand < 0.6) {
      threatLevel = 'safe';
      score = 0.15;
    } else if (rand < 0.9) {
      threatLevel = 'suspicious';
      score = 0.58;
    } else {
      threatLevel = 'dangerous';
      score = 0.88;
    }
  }
  
  return {
    success: true,
    result: {
      id: generateId(),
      type: AnalysisType.URL,
      timestamp: new Date().toISOString(),
      score: score,
      threat_level: threatLevel,
      details: {
        summary: threatLevel === 'safe' 
          ? "URL appears to be safe with no detected threats."
          : threatLevel === 'suspicious'
            ? "URL has some suspicious characteristics that warrant caution."
            : "URL likely leads to malicious content or phishing attempt.",
        confidence: 0.91,
        categories: threatLevel === 'safe' 
          ? ['Safe Website'] 
          : threatLevel === 'suspicious'
            ? ['Suspicious Domain', 'Potential Phishing']
            : ['Malware', 'Phishing', 'Data Theft'],
        metadata: {
          domain: domain,
          protocol: new URL(url).protocol,
          redirectCount: Math.floor(Math.random() * 3)
        }
      }
    }
  };
};