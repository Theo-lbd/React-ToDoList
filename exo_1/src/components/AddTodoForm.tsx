import React, {useState} from 'react';

interface AddTodoFormProps {
    onAddTask: (title: string, priority: string) => void;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({onAddTask}) => {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState("medium"); 
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        onAddTask(title, priority);
        setTitle("");
        setPriority("medium");
      };
    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Ajouter une tâche..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="low">Basse</option>
                <option value="medium">Moyenne</option>
                <option value="high">Haute</option>
            </select>
            <button type="submit">Ajouter</button>
        </form>
    );
};

export default AddTodoForm;
