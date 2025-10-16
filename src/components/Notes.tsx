import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Save, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Note {
  id: string;
  title: string;
  content: string;
}

export const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("notes");
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const createNote = () => {
    const newNote = { id: Date.now().toString(), title: "New Note", content: "" };
    setNotes([...notes, newNote]);
    setCurrentNote(newNote);
    toast.success("Note created!");
  };

  const saveNote = () => {
    if (!currentNote) return;
    setNotes(notes.map(n => n.id === currentNote.id ? currentNote : n));
    toast.success("Note saved!");
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
    if (currentNote?.id === id) setCurrentNote(null);
    toast.success("Note deleted!");
  };

  return (
    <Card className="p-6 bg-card border-2 border-primary/20">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-foreground">Notes</h3>
        <Button onClick={createNote} size="sm" className="gap-2">
          <Plus className="w-4 h-4" /> New Note
        </Button>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2 max-h-[400px] overflow-auto">
          {notes.map((note) => (
            <div
              key={note.id}
              className={`p-3 rounded-lg cursor-pointer flex justify-between items-center ${
                currentNote?.id === note.id ? 'bg-primary/20' : 'bg-secondary/30'
              }`}
              onClick={() => setCurrentNote(note)}
            >
              <span className="text-sm font-medium truncate">{note.title}</span>
              <Button size="icon" variant="ghost" onClick={(e) => { e.stopPropagation(); deleteNote(note.id); }}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
        {currentNote && (
          <div className="md:col-span-2 space-y-3">
            <Input
              value={currentNote.title}
              onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
              placeholder="Note title"
            />
            <Textarea
              value={currentNote.content}
              onChange={(e) => setCurrentNote({ ...currentNote, content: e.target.value })}
              placeholder="Write your note..."
              className="min-h-[300px]"
            />
            <Button onClick={saveNote} className="gap-2">
              <Save className="w-4 h-4" /> Save Note
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};