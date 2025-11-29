'use client';

import { useState, useEffect } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getModels } from '@/lib/api';
import { Model } from '@/lib/types';

interface PromptFormProps {
  onSubmit: (prompt: string, temperature: number, model: string) => void;
  loading: boolean;
}

export function PromptForm({ onSubmit, loading }: PromptFormProps) {
  const [prompt, setPrompt] = useState('');
  const [temperature, setTemperature] = useState(0.7);
  const [selectedModel, setSelectedModel] = useState('gpt-5-nano');
  const [models, setModels] = useState<Model[]>([]);
  
  const [errors, setErrors] = useState<{
    prompt?: string;
    temperature?: string;
  }>({});

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const data = await getModels();
        if (data.length > 0) setModels(data);
      } catch (err) {
        console.error('Failed to fetch models, using default local model.');
      }
    };
    fetchModels();
  }, []);

  const validatePrompt = (value: string) => {
   const trimmedLength = value.trim().length;
if (trimmedLength < 2) {
  setErrors(prev => ({ ...prev, prompt: 'Prompt must be at least 2 characters' }));
} else if (trimmedLength > 2000) { 
  setErrors(prev => ({ ...prev, prompt: 'Prompt must not exceed 2000 characters' }));
}
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    validatePrompt(prompt);
    
    if (prompt.length < 2 || prompt.length > 2000) {
      return;
    }
    
    onSubmit(prompt, temperature, selectedModel);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Write Prompt</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Model
            </label>
            <Select
              value={selectedModel}
              onValueChange={setSelectedModel}
              disabled={loading || models.length === 0}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                {models.length > 0
                  ? models.map((model) => (
                      <SelectItem key={model.id} value={model.id}>
                        {model.name}
                      </SelectItem>
                    ))
                  : <SelectItem value="gpt-5-nano">gpt-5-nano (Local)</SelectItem>
                }
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Your Prompt
            </label>
            <Textarea
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
                validatePrompt(e.target.value);
              }}
              placeholder="Ask me anything..."
              className={`h-40 resize-none ${errors.prompt ? 'border-red-500' : ''}`}
              disabled={loading}
            />
            {errors.prompt && (
              <p className="text-sm text-red-600 mt-1">{errors.prompt}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              {prompt.length} / 2000 characters
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Temperature: {temperature.toFixed(1)}
            </label>
            <Slider
              value={[temperature]}
              max={1}
              min={0}
              step={0.1}
              disabled={loading}
              onValueChange={(val) => setTemperature(val[0])}
            />
            <p className="text-xs text-gray-500 mt-1">
              {temperature < 0.3 && 'Focused & deterministic'}
              {temperature >= 0.3 && temperature < 0.7 && 'Balanced'}
              {temperature >= 0.7 && 'Creative & varied'}
            </p>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading || !prompt.trim() || !!errors.prompt}
          >
            {loading ? 'Generating...' : 'Generate Response'}
          </Button>

        </form>
      </CardContent>
    </Card>
  );
}