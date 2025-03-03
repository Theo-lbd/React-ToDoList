import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type TaskProps = {
  task: { id: number; title: string; completed: boolean };
  onToggle: (taskId: number) => void;
  onDelete: (taskId: number) => void;
  onEdit: (taskId: number, newTitle: string) => void;
};

const Task = ({ task, onToggle, onDelete, onEdit }: TaskProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.title);

  return (
    <motion.li
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

      <div className="flex gap-2">
        {isEditing ? (
          <button
            onClick={() => {
              onEdit(task.id, editText);
              setIsEditing(false);
            }}
            className="bg-green-500 text-white px-2 py-1"
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
