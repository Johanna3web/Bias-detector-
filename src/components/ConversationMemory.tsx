import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Memory {
  id: string;
  context: string;
  timestamp: string;
}

export const ConversationMemory = () => {
  const [memories, setMemories] = useState<Memory[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("conversationMemory");
    if (saved) setMemories(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("conversationMemory", JSON.stringify(memories));
  }, [memories]);

  const addMemory = (context: string) => {
    const newMemory: Memory = {
      id: Date.now().toString(),
      context,
      timestamp: new Date().toISOString(),
    };
    setMemories([newMemory, ...memories].slice(0, 10)); // Keep last 10 memories
  };

  const clearMemories = () => {
    setMemories([]);
    toast.success("Memory cleared!");
  };

  // Expose addMemory globally for other components
  useEffect(() => {
    (window as any).addAIMemory = addMemory;
  }, []);

  return (
    <Card className="p-6 bg-card border-2 border-primary/20">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Brain className="w-5 h-5" />
          Conversational Memory
        </h3>
        <Button onClick={clearMemories} variant="outline" size="sm" className="gap-2">
          <Trash2 className="w-4 h-4" />
          Clear
        </Button>
      </div>
      
      <div className="space-y-2 max-h-[300px] overflow-auto">
        {memories.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No conversation memory yet. Interactions will be remembered here.
          </p>
        ) : (
          memories.map((memory) => (
            <div key={memory.id} className="p-3 bg-secondary/30 rounded-lg">
              <p className="text-sm text-foreground">{memory.context}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {new Date(memory.timestamp).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};