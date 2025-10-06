import React from "react";

function formatDate(d) {
  if (!d) return "";
  try {
    const dt = new Date(d);
    return dt.toLocaleDateString();
  } catch {
    return d;
  }
}

export default function TaskItem({ task, onDelete, onToggle, onEdit }) {
  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <div className="left">
        <input type="checkbox" checked={task.completed} onChange={onToggle} />
      </div>

      <div className="middle">
        <div className="title-row">
          <h4 className="title">{task.title}</h4>
          <span className={`chip priority-${task.priority.toLowerCase()}`}>{task.priority}</span>
        </div>

        {task.description && <p className="desc">{task.description}</p>}

        <div className="meta">
          {task.dueDate && <span>Due: {formatDate(task.dueDate)}</span>}
        </div>
      </div>

      <div className="right">
        <button className="icon-btn" onClick={onEdit} title="Edit">✏️</button>
        <button className="icon-btn danger" onClick={() => {
          if (window.confirm("Delete this task?")) onDelete();
        }} title="Delete">🗑️</button>
      </div>
    </div>
  );
}
