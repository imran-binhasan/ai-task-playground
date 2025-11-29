export interface PromptRequest {
  prompt: string;
  model: string;
  temperature: number;
}

export interface PromptResponse {
  reply: string;
  usedModel: string;
  temperature: number;
  createdAt: string;
  metadata?: {
    source: 'openai' | 'mock';
    responseTime: string;
    tokensUsed?: number;
    note?: string;
  };
}

export interface ValidationErrorDetail {
  field: string;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    status?: number;
    details?: ValidationErrorDetail[]; 
    count?: number; 
  };
}

export interface ModelsResponse {
  models: Model[];
}

export interface Model {
  id: string;
  name: string;
  description: string;
  pricing: string;
  maxTokens: number;
  recommended: boolean;
  speed: string;
}

export interface HistoryItem {
  id: string;
  prompt: string;
  response: PromptResponse;
  timestamp: string;
}