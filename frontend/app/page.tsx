'use client';

import { useState } from 'react';
import { PromptResponse } from '@/lib/types';

export default function Home() {
  const [response, setResponse] = useState<PromptResponse | null>(null);


  return (
    <main className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl font-medium text-gray-900 mb-2">
            AI Prompt Playground
          </h1>
          <p className="text-gray-600">
            Experiment with different models and temperature settings
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Form */}
            <div className="bg-white rounded-lg shadow-md h-96">
            </div>

            {response && (
              <div className="bg-white rounded-lg shadow-md  border h-60">
              </div>
            )}
          </div>

          <div className="lg:col-span-1 h-[680px] border bg-white rounded-lg shadow-md">
          </div>
        </div>
      </div>
    </main>
  );
}