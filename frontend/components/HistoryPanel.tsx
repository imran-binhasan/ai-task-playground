import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HistoryItem } from "@/lib/types";

interface HistoryPanelProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
}

export function HistoryPanel({ history, onSelect }: HistoryPanelProps) {
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
                <div
                  key={item.id}
                  onClick={() => onSelect(item)}
                  className="p-3 bg-gray-50 rounded-lg border cursor-pointer hover:bg-gray-100"
                >
                  <p className="text-sm font-medium truncate">{item.prompt}</p>
                  <p className="text-xs text-gray-500">
                    {item.response.usedModel} •{" "}
                    {new Date(item.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
