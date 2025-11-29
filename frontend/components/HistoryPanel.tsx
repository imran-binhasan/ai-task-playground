'use client';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { HistoryItem } from "@/lib/types";

interface HistoryPanelProps {
  history: HistoryItem[];
}

export function HistoryPanel({ history }: HistoryPanelProps) {
  return (
    <Card className="sticky top-8 h-[600px]">
      <CardHeader>
        <CardTitle>History ({history.length})</CardTitle>
      </CardHeader>
      <CardContent>
        {history.length === 0 ? (
          <p className="text-gray-500 text-sm">No history yet</p>
        ) : (
          <ScrollArea className="h-[480px]">
            <div className="space-y-3">
              {history.map((item) => (
                <div key={item.id} className="p-3 bg-gray-50 rounded-lg border">
                  <p className="text-sm font-medium truncate">{item.prompt}</p>
                  <p className="text-xs text-gray-500">{item.response.usedModel}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
