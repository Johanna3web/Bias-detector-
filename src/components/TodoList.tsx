import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) setTodos(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!newTodo.trim()) return;
    setTodos([...todos, { id: Date.now().toString(), text: newTodo, completed: false }]);
    setNewTodo("");
    toast.success("Todo added!");
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(t => t.id !== id));
    toast.success("Todo deleted!");
  };

  return (
    <Card className="p-6 bg-card border-2 border-primary/20">
      <h3 className="text-xl font-bold text-foreground mb-4">To-Do List</h3>
      <div className="flex gap-2 mb-4">
        <Input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task..."
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        />
        <Button onClick={addTodo} size="icon">
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      <div className="space-y-2 max-h-[300px] overflow-auto">
        {todos.map((todo) => (
          <div key={todo.id} className="flex items-center gap-2 p-2 bg-secondary/30 rounded-lg">
            <Checkbox
              checked={todo.completed}
              onCheckedChange={() => toggleTodo(todo.id)}
            />
            <span className={`flex-1 ${todo.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
              {todo.text}
            </span>
            <Button size="icon" variant="ghost" onClick={() => deleteTodo(todo.id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};