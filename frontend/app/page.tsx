'use client';
import { useState, useEffect } from 'react';
import { PromptResponse, HistoryItem, Model } from '@/lib/types';
import { getModels, generatePrompt } from '@/lib/api';
import { PromptForm } from '@/components/PromptForm';
import { ResponseCard } from '@/components/ResponseCard';
import { HistoryPanel } from '@/components/HistoryPanel';

export default function Home() {
  const [models, setModels] = useState<Model[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>('gpt-5-nano');
  const [response, setResponse] = useState<PromptResponse | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getModels().then(setModels).catch(console.error);
  }, []);

  const handlePromptSubmit = async (prompt: string, temperature: number) => {
    setLoading(true);
    try {
      const result = await generatePrompt({ prompt, model: selectedModel, temperature });
      setResponse(result);
      setHistory((prev) => [
        { id: Date.now().toString(), prompt, response: result, timestamp: new Date().toISOString() },
        ...prev,
      ]);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
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
            <HistoryPanel history={history} />
          </div>
        </div>
      </div>
    </main>
  );
}
