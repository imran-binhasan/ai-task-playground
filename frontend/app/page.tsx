'use client';
import { useState, useEffect } from 'react';
import { PromptResponse, HistoryItem, Model } from '@/lib/types';
import { getModels, generatePrompt } from '@/lib/api';
import { PromptForm } from '@/components/PromptForm';
import { ResponseCard } from '@/components/ResponseCard';
import { HistoryPanel } from '@/components/HistoryPanel';
import { toast } from "sonner";

export default function Home() {
  const [models, setModels] = useState<Model[]>([]);
  const [response, setResponse] = useState<PromptResponse | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getModels()
      .then(setModels)
      .catch((err) => {
        console.error('Failed to fetch models:', err);
        toast.error('Failed to load models');
      });
  }, []);

  const handlePromptSubmit = async (prompt: string, temperature: number, model: string) => {

    setLoading(true);
    try {
      const result = await generatePrompt({ prompt, model, temperature });
      setResponse(result);
      setHistory(prev => [
        { 
          id: Date.now().toString(), 
          prompt, 
          response: result, 
          timestamp: new Date().toISOString() 
        },
        ...prev,
      ]);
      toast.success("Response generated successfully");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to generate response";
      toast.error(message, {
        duration: 5000, 
      });
      console.error('Generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleHistorySelect = (item: HistoryItem) => {
    setResponse(item.response);
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-medium text-gray-900 mb-2">AI Prompt Playground</h1>
          <p className="text-gray-600">Experiment with different models and temperature settings</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <PromptForm onSubmit={handlePromptSubmit} loading={loading} />
            {response && <ResponseCard response={response} />}
          </div>
          <div className="lg:col-span-1">
            <HistoryPanel history={history} onSelect={handleHistorySelect} />
          </div>
        </div>
      </div>
    </main>
  );
}