import React, {useState} from 'react';

interface AddTodoFormProps {
    onAddTask: (title: string) => void;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({onAddTask}) => {
    const [title, setTitle] = useState('');
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim() !== '') {
            onAddTask(title);
            setTitle('');
        }
    };
    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ajouter une tâche"
            />
            <button type='submit'>Ajouter</button>
        </form>
    );
};

export default AddTodoForm;
