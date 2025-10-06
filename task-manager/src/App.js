import React, { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const LOCAL_STORAGE_KEY = "taskManager.tasks.v1";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      try {
        setTasks(JSON.parse(raw));
      } catch (e) {
        console.error("Failed to parse tasks from localStorage", e);
      }
    } else {
      // optional sample task
      setTasks([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    const newTask = {
      id: Date.now().toString() + Math.random().toString(36).slice(2, 9),
      title: task.title,
      description: task.description || "",
      priority: task.priority || "Low",
      dueDate: task.dueDate || "",
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const updateTask = (id, updates) => {
    setTasks((prev) => prev.map(t => (t.id === id ? { ...t, ...updates } : t)));
    setEditingTask(null);
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter(t => t.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks((prev) => prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const filteredTasks = tasks.filter(t =>
    t.title.toLowerCase().includes(filterText.toLowerCase()) ||
    t.description.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="app">
      <header className="header">
        <h1>Task Manager</h1>
        <div className="header-actions">
          <input
            className="search"
            placeholder="Search tasks..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
          <button className="btn primary" onClick={() => { setShowForm(true); setEditingTask(null); }}>
            + New Task
          </button>
        </div>
      </header>

      <main className="main">
        {showForm && (
          <TaskForm
            onSave={(task) => {
              if (editingTask) updateTask(editingTask.id, task);
              else addTask(task);
              setShowForm(false);
            }}
            onCancel={() => { setEditingTask(null); setShowForm(false); }}
            editingTask={editingTask}
          />
        )}

        <TaskList
          tasks={filteredTasks}
          onDelete={deleteTask}
          onToggle={toggleComplete}
          onEdit={handleEdit}
        />
      </main>

      <footer className="footer">
        <small>Saved in your browser • Simple React project</small>
      </footer>
    </div>
  );
}

export default App;
