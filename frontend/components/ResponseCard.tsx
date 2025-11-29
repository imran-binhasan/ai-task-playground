"use client";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { PromptResponse } from "@/lib/types";

interface ResponseCardProps {
  response: PromptResponse;
}

export function ResponseCard({ response }: ResponseCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Response</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 whitespace-pre-wrap">{response.reply}</p>
        <div className="mt-4 pt-4 border-t text-sm text-gray-500">
          Model: {response.usedModel} | Temperature: {response.temperature} |
          Source: {response.metadata?.source || "unknown"} | Time:{" "}
          {new Date(response.createdAt).toLocaleString()}
        </div>
      </CardContent>
    </Card>
  );
}
