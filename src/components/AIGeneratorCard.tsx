import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { LucideIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AIGeneratorCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  type: "text" | "image" | "code";
  placeholder: string;
}

export const AIGeneratorCard = ({ 
  title, 
  description, 
  icon: Icon, 
  type,
  placeholder 
}: AIGeneratorCardProps) => {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke('generate-ai', {
        body: { type, prompt }
      });

      if (error) throw error;

      setResult(data.result);
      toast.success(`${title} generated successfully!`);
    } catch (error) {
      console.error("Generation error:", error);
      toast.error("Failed to generate content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="group p-6 bg-card hover:shadow-[var(--shadow-glow)] transition-all duration-500 border-2 border-border hover:border-primary/50 hover:scale-[1.02]">
      <div className="flex items-start gap-4 mb-4">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      
      <Textarea
        placeholder={placeholder}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="mb-4 min-h-[100px] resize-none border-2 focus:border-primary transition-colors"
      />
      
      <Button 
        onClick={handleGenerate}
        disabled={loading}
        className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-accent text-primary-foreground font-semibold shadow-md hover:shadow-lg transition-all duration-300"
      >
        {loading ? "Generating..." : `Generate ${title}`}
      </Button>

      {result && (
        <div className="mt-4 p-4 rounded-lg bg-secondary/50 border-2 border-primary/20 animate-fade-in">
          {type === "image" ? (
            <img 
              src={result} 
              alt="Generated" 
              className="w-full rounded-lg shadow-lg"
            />
          ) : (
            <pre className="whitespace-pre-wrap text-sm text-foreground overflow-auto max-h-[400px]">
              {result}
            </pre>
          )}
        </div>
      )}
    </Card>
  );
};
