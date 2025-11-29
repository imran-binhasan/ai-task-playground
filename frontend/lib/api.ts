import axios, { AxiosError } from 'axios';
import { PromptRequest, PromptResponse, ApiResponse, ModelsResponse, Model } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});


export const generatePrompt = async (data: PromptRequest): Promise<PromptResponse> => {
  try {
    const response = await apiClient.post<ApiResponse<PromptResponse>>('/api/generate', data);

    if (response.data.success && response.data.data) {
      return response.data.data;
    }

    throw new Error('Invalid response from server');
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      const apiError = error.response.data as ApiResponse<never>;
      throw new Error(apiError.error?.message || 'Failed to generate response');
    }
    throw error;
  }
};

export const getModels = async (): Promise<Model[]> => {
  try {
    const response = await apiClient.get<ApiResponse<ModelsResponse>>('/api/models');

    if (response.data.success && response.data.data?.models) {
      return response.data.data.models;
    }

    throw new Error('Failed to fetch models');
  } catch (error) {
    console.error('Error fetching models:', error);
    throw error;
  }
};

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);
