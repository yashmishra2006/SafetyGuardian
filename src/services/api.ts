import axios from 'axios';
import { AnalysisResponse } from '../types';

const API_BASE_URL = 'https://backend-dzob.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const analyzeText = async (text: string): Promise<AnalysisResponse> => {
  const response = await api.post('/analyze/text', { text });
  return response.data;
};

export const analyzeUrl = async (url: string): Promise<AnalysisResponse> => {
  const response = await api.post('/analyze/url', { url });
  return response.data;
};

export const analyzeImage = async (file: File): Promise<AnalysisResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', 'image');

  const response = await api.post('/analyze/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const analyzeAudio = async (file: File): Promise<AnalysisResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', 'audio');

  const response = await api.post('/analyze/audio', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const analyzeFile = async (file: File, type: string): Promise<AnalysisResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', type);

  const response = await api.post('/analyze/file', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getResult = async (analysisId: string): Promise<AnalysisResponse> => {
  const response = await api.get(`/results/${analysisId}`);
  return response.data;
};