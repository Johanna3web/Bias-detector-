import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

interface Reminder {
  id: string;
  text: string;
  time: string;
}

export const Reminders = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [newReminder, setNewReminder] = useState("");
  const [newTime, setNewTime] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("reminders");
    if (saved) setReminders(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminders));
    
    // Check for due reminders
    const interval = setInterval(() => {
      const now = new Date().toISOString().slice(0, 16);
      reminders.forEach(reminder => {
        if (reminder.time === now) {
          toast.success(`Reminder: ${reminder.text}`, {
            duration: 5000,
          });
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Reminder', { body: reminder.text });
          }
        }
      });
    }, 30000);

    return () => clearInterval(interval);
  }, [reminders]);

  const addReminder = () => {
    if (!newReminder.trim() || !newTime) {
      toast.error("Please enter reminder text and time");
      return;
    }
    setReminders([...reminders, { id: Date.now().toString(), text: newReminder, time: newTime }]);
    setNewReminder("");
    setNewTime("");
    toast.success("Reminder added!");
    
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  };

  const deleteReminder = (id: string) => {
    setReminders(reminders.filter(r => r.id !== id));
    toast.success("Reminder deleted!");
  };

  return (
    <Card className="p-6 bg-card border-2 border-primary/20">
      <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
        <Bell className="w-5 h-5" />
        Natural Language Reminders
      </h3>
      <div className="space-y-3 mb-4">
        <Input
          value={newReminder}
          onChange={(e) => setNewReminder(e.target.value)}
          placeholder="What do you want to be reminded about?"
        />
        <div className="flex gap-2">
          <Input
            type="datetime-local"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
            className="flex-1"
          />
          <Button onClick={addReminder} size="icon">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="space-y-2 max-h-[250px] overflow-auto">
        {reminders.map((reminder) => (
          <div key={reminder.id} className="flex items-center gap-2 p-3 bg-secondary/30 rounded-lg">
            <Bell className="w-4 h-4 text-primary" />
            <div className="flex-1">
              <p className="text-foreground text-sm">{reminder.text}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(reminder.time).toLocaleString()}
              </p>
            </div>
            <Button size="icon" variant="ghost" onClick={() => deleteReminder(reminder.id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};