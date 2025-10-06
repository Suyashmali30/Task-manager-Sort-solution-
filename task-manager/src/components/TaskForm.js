import React, { useEffect, useState } from "react";

const empty = {
  title: "",
  description: "",
  priority: "Low",
  dueDate: ""
};

export default function TaskForm({ onSave, onCancel, editingTask }) {
  const [form, setForm] = useState(empty);

  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title || "",
        description: editingTask.description || "",
        priority: editingTask.priority || "Low",
        dueDate: editingTask.dueDate || ""
      });
    } else {
      setForm(empty);
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return alert("Please add a task title.");
    onSave(form);
    setForm(empty);
  };

  return (
    <div className="taskform-card">
      <form onSubmit={handleSubmit}>
        <h3>{editingTask ? "Edit Task" : "New Task"}</h3>

        <label>
          Title
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="e.g., Fix bug #123"
          />
        </label>

        <label>
          Description
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Optional details..."
            rows={3}
          />
        </label>

        <div className="row">
          <label>
            Priority
            <select
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </label>

          <label>
            Due date
            <input
              type="date"
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            />
          </label>
        </div>

        <div className="form-actions">
          <button type="button" className="btn" onClick={onCancel}>Cancel</button>
          <button type="submit" className="btn primary">{editingTask ? "Update" : "Add"}</button>
        </div>
      </form>
    </div>
  );
}
