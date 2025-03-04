import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type TaskProps = {
  task: { id: number; title: string; completed: boolean; priority: string };
  onToggle: (taskId: number) => void;
  onDelete: (taskId: number) => void;
  onEdit: (taskId: number, newTitle: string) => void;
};

const getPriorityClass = (priority: string) => {
  switch (priority) {
    case "high": return "priority-high";
    case "medium": return "priority-medium";
    case "low": return "priority-low";
    default: return "priority-default";
  }
};


const Task = ({ task, onToggle, onDelete, onEdit }: TaskProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.title);

  return (
    <motion.li
      className="task-item"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }} 
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence mode="wait">
        {isEditing ? (
          <motion.input
            key="edit-mode"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
        ) : (
          <motion.span
            key="view-mode"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            style={{ textDecoration: task.completed ? "line-through" : "none" }}
            onClick={() => onToggle(task.id)}
          >
            {task.title}
          </motion.span>
        )}
      </AnimatePresence>
      <motion.span className={`priority-badge ${getPriorityClass(task.priority)}`}>
        {task.priority === "high" ? "Haute" : task.priority === "medium" ? "Moyenne" : "Basse"}
      </motion.span>
      <div>
        {isEditing ? (
          <button
            onClick={() => {
              onEdit(task.id, editText);
              setIsEditing(false);
            }}
          >
            💾
          </button>
        ) : (
          <button onClick={() => setIsEditing(true)}>
            ✏️
          </button>
        )}

        <button onClick={() => onToggle(task.id)}>
          {task.completed ? "✅" : "❌"}
        </button>

        <button onClick={() => onDelete(task.id)}>
          🗑️
        </button>
      </div>
      </motion.li>
  );
};

export default Task;
