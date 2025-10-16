import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Globe } from "lucide-react";
import { toast } from "sonner";

const personas = [
  { id: "professional", name: "Professional Mode", icon: "💼" },
  { id: "chill", name: "Chill Mode", icon: "😎" },
  { id: "creative", name: "Creative Mode", icon: "🎨" },
  { id: "technical", name: "Technical Mode", icon: "⚙️" },
];

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "ja", name: "Japanese" },
  { code: "zh", name: "Chinese" },
];

export const PersonaSelector = () => {
  const [selectedPersona, setSelectedPersona] = useState("professional");
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const handlePersonaChange = (persona: string) => {
    setSelectedPersona(persona);
    localStorage.setItem("aiPersona", persona);
    toast.success(`Switched to ${personas.find(p => p.id === persona)?.name}`);
  };

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    localStorage.setItem("aiLanguage", lang);
    toast.success(`Language changed to ${languages.find(l => l.code === lang)?.name}`);
  };

  return (
    <Card className="p-6 bg-card border-2 border-primary/20">
      <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
        <User className="w-5 h-5" />
        AI Persona & Language
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">AI Persona Mode</label>
          <div className="grid grid-cols-2 gap-2">
            {personas.map((persona) => (
              <Button
                key={persona.id}
                variant={selectedPersona === persona.id ? "default" : "outline"}
                onClick={() => handlePersonaChange(persona.id)}
                className="justify-start gap-2"
              >
                <span>{persona.icon}</span>
                <span className="text-sm">{persona.name}</span>
              </Button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm text-muted-foreground mb-2 block flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Multi-Language Support
          </label>
          <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="p-3 bg-secondary/30 rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Current Configuration:</p>
          <p className="text-sm font-medium text-foreground">
            {personas.find(p => p.id === selectedPersona)?.icon} {personas.find(p => p.id === selectedPersona)?.name}
          </p>
          <p className="text-sm text-muted-foreground">
            Language: {languages.find(l => l.code === selectedLanguage)?.name}
          </p>
        </div>
      </div>
    </Card>
  );
};