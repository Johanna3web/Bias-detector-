import { Sparkles, ImageIcon, Code, Upload } from "lucide-react";
import { AIGeneratorCard } from "@/components/AIGeneratorCard";
import { VoiceCommands } from "@/components/VoiceCommands";
import { TodoList } from "@/components/TodoList";
import { Notes } from "@/components/Notes";
import { Reminders } from "@/components/Reminders";
import { WeatherWidget } from "@/components/WeatherWidget";
import { TimeConverter } from "@/components/TimeConverter";
import { PersonaSelector } from "@/components/PersonaSelector";
import { ConversationMemory } from "@/components/ConversationMemory";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success("You're back online!");
    };
    const handleOffline = () => {
      setIsOnline(false);
      toast.error("You're offline. Some features may be limited.");
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      toast.success(`File "${file.name}" uploaded successfully!`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-glow)] opacity-50"></div>
        <div className="container mx-auto px-4 py-20 relative">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <div className="inline-flex items-center gap-2 px-6 py-3 mb-6 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/20">
              <Sparkles className="w-5 h-5 text-primary animate-pulse" />
              <span className="text-sm font-semibold text-primary">Powered by Advanced AI</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">
              AI Generator Hub
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Your all-in-one creative powerhouse for generating stunning text, images, and code with cutting-edge AI technology
            </p>

            {/* Mission Statement */}
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-primary/20 shadow-[var(--shadow-card)] mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center justify-center gap-2">
                <Sparkles className="w-6 h-6 text-primary" />
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At AI Generator Hub, we empower creators, developers, and innovators to bring their ideas to life instantly. 
                Our mission is to democratize AI technology, making professional-grade content generation accessible to everyone. 
                Whether you're crafting compelling narratives, designing stunning visuals, or writing powerful code, 
                we provide the tools you need to transform imagination into reality.
              </p>
            </div>

            {/* File Upload */}
            <div className="inline-block">
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-secondary to-secondary/50 border-2 border-primary/30 hover:border-primary hover:shadow-[var(--shadow-glow)] transition-all duration-300">
                  <Upload className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-foreground">
                    {selectedFile ? selectedFile.name : "Upload Image for Analysis"}
                  </span>
                </div>
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Status Indicator */}
      {!isOnline && (
        <div className="container mx-auto px-4 py-2">
          <div className="bg-yellow-500/10 border-2 border-yellow-500/50 rounded-lg p-3 text-center">
            <p className="text-yellow-600 dark:text-yellow-400 font-semibold">
              ⚠️ Offline Mode - Some features may be limited
            </p>
          </div>
        </div>
      )}

      {/* Main Content Tabs */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="generators" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto mb-8">
            <TabsTrigger value="generators">AI Generators</TabsTrigger>
            <TabsTrigger value="productivity">Productivity</TabsTrigger>
            <TabsTrigger value="settings">Settings & Advanced</TabsTrigger>
          </TabsList>

          {/* AI Generators Tab */}
          <TabsContent value="generators">
            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              <AIGeneratorCard
                title="Text Generator"
                description="Create engaging content, stories, and articles with AI-powered writing"
                icon={Sparkles}
                type="text"
                placeholder="Describe the text you want to generate... (e.g., 'Write a blog post about sustainable living')"
              />
              
              <AIGeneratorCard
                title="Image Generator"
                description="Transform your ideas into stunning visuals and artwork"
                icon={ImageIcon}
                type="image"
                placeholder="Describe the image you want to create... (e.g., 'A serene mountain landscape at sunset')"
              />
              
              <AIGeneratorCard
                title="Code Generator"
                description="Generate clean, efficient code snippets and solutions"
                icon={Code}
                type="code"
                placeholder="Describe the code you need... (e.g., 'Create a React component for a todo list')"
              />
            </div>
          </TabsContent>

          {/* Productivity Tab */}
          <TabsContent value="productivity">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              <VoiceCommands />
              <Reminders />
              <TodoList />
              <Notes />
              <WeatherWidget />
              <TimeConverter />
            </div>
          </TabsContent>

          {/* Settings & Advanced Tab */}
          <TabsContent value="settings">
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <PersonaSelector />
              <ConversationMemory />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-muted-foreground">
          Made with <span className="text-primary">♥</span> using advanced AI technology
        </p>
      </div>
    </div>
  );
};

export default Index;
