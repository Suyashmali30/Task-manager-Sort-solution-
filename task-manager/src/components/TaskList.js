import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onDelete, onToggle, onEdit }) {
  if (!tasks.length) {
    return <div className="empty">No tasks yet — add one ✨</div>;
  }

  // sort: incomplete first, then by createdAt
  const sorted = [...tasks].sort((a,b) => {
    if (a.completed === b.completed) return new Date(b.createdAt) - new Date(a.createdAt);
    return a.completed ? 1 : -1;
  });

  return (
    <div className="task-list">
      {sorted.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={() => onDelete(task.id)}
          onToggle={() => onToggle(task.id)}
          onEdit={() => onEdit(task)}
        />
      ))}
    </div>
  );
}
