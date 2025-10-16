import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";

export const TimeConverter = () => {
  const [currentTime] = useState(new Date());

  const timezones = [
    { name: "New York", offset: -5 },
    { name: "London", offset: 0 },
    { name: "Tokyo", offset: 9 },
    { name: "Sydney", offset: 11 },
  ];

  const getTimeInTimezone = (offset: number) => {
    const utc = currentTime.getTime() + (currentTime.getTimezoneOffset() * 60000);
    const newDate = new Date(utc + (3600000 * offset));
    return newDate.toLocaleTimeString();
  };

  return (
    <Card className="p-6 bg-card border-2 border-primary/20">
      <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5" />
        Time & Timezone Converter
      </h3>
      <div className="space-y-3">
        <div className="p-3 bg-primary/10 rounded-lg">
          <p className="text-sm text-muted-foreground">Current Local Time</p>
          <p className="text-xl font-bold text-foreground">{currentTime.toLocaleTimeString()}</p>
          <p className="text-xs text-muted-foreground">{currentTime.toLocaleDateString()}</p>
        </div>
        {timezones.map((tz) => (
          <div key={tz.name} className="flex justify-between items-center p-3 bg-secondary/30 rounded-lg">
            <span className="font-medium text-foreground">{tz.name}</span>
            <span className="text-primary font-semibold">{getTimeInTimezone(tz.offset)}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};