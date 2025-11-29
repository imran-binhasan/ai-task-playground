'use client';

import { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

interface PromptFormProps {
  onSubmit: (prompt: string, temperature: number) => void;
  loading: boolean;
}

export function PromptForm({ onSubmit, loading }: PromptFormProps) {
  const [prompt, setPrompt] = useState('');
  const [temperature, setTemperature] = useState(0.7);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    onSubmit(prompt, temperature);
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
              Your Prompt
            </label>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask me anything..."
              className="h-40"
              disabled={loading}
            />
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
          </div>

          <Button type="submit" className="w-full" disabled={loading || !prompt.trim()}>
            {loading ? 'Generating...' : 'Generate Response'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
