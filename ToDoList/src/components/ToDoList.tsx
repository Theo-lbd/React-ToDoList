import Task from "./Task";

type TaskListProps = {
  tasks: { id: number; title: string; completed: boolean }[];
  onToggle: (taskId: number) => void;
  onDelete: (taskId: number) => void;
  onEdit: (taskId: number, newTitle: string) => void;
};

const TodoList = ({ tasks, onToggle, onDelete, onEdit }: TaskListProps) => {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <Task key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </ul>
  );
};

export default TodoList;