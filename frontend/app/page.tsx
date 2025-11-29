"use client";

import { useState } from "react";
import { PromptResponse } from "@/lib/types";
import { PromptForm } from "@/components/PromptForm";
import { generatePrompt } from "@/lib/api";

export default function Home() {
  const [selectedModel, setSelectedModel] = useState<string>("gpt-5-nano");
  const [response, setResponse] = useState<PromptResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const handlePromptSubmit = async (prompt: string, temperature: number) => {
    setLoading(true);
    try {
      const result = await generatePrompt({
        prompt,
        model: selectedModel,
        temperature,
      });
      setResponse(result);
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
          <h1 className="text-4xl font-medium text-gray-900 mb-2">
            AI Prompt Playground
          </h1>
          <p className="text-gray-600">
            Experiment with different models and temperature settings
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <PromptForm onSubmit={handlePromptSubmit} loading={loading} />
            {response && (
              <div className="bg-white rounded-lg shadow-md  border h-60"></div>
            )}
          </div>
          <div className="lg:col-span-1">
            <div className="lg:col-span-1 h-[680px] border bg-white rounded-lg shadow-md"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
