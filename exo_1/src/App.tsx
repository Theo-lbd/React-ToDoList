import React , { useEffect, useState } from 'react';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import axios from 'axios';
import { motion } from "framer-motion";


const API_URL = 'http://localhost:3000/tasks';
const App = () => {
  
  const [tasks, setTasks] = useState<{ id: number; title: string; completed: boolean }[]>([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

    useEffect(() => {
      axios
        .get(API_URL)
        .then((response) => {
          setTasks(response.data);
        })
        .catch((error) => {
          console.error("Erreur de récupération des taches :", error);
        });
      const savedFilter = localStorage.getItem("taskFilter");
      if (savedFilter) {
        setFilter(savedFilter);
      }
    }, []);
  
  const handleAddTask = (title: string) => {
    const newTask = { title, completed: false };
    axios
      .post(API_URL, newTask)
      .then((response) => {
        setTasks([...tasks, response.data]);
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout de la tâche :", error);
      });
  };

  const toggleTask = (taskId: number) => {
    const task = tasks.find(task => task.id === taskId);
    if (task) {
      const updatedTask = { ...task, completed: !task.completed };
      axios
        .put(`${API_URL}/${taskId}`, updatedTask)
        .then((response) => {
          setTasks(tasks.map(t => t.id === taskId ? response.data : t));
        })
        .catch((error) => console.error("Erreur lors de la mise à jour de la tâche :", error));
    }
  };
  
  const deleteTask = (taskId: number) => {
    axios
      .delete(`http://localhost:3000/tasks/${taskId}`)
      .then(() => {
        setTasks(tasks.filter(task => task.id !== taskId));
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de la tâche :", error);
      });
  };

  const filteredTasks = tasks.filter(task =>
    filter === "all"
      ? true
      : filter === "completed"
      ? task.completed
      : !task.completed
  );
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    localStorage.setItem("taskFilter", newFilter);
  };

  const handleEditTask = (taskId: number, newTitle: string) => {
    const taskToUpdate = tasks.find((task) => task.id === taskId);
    if (!taskToUpdate) return;
  
    const updatedTask = { ...taskToUpdate, title: newTitle };
  
    axios
      .put(`${API_URL}/${taskId}`, updatedTask)
      .then(() => {
        setTasks(tasks.map((t) => (t.id === taskId ? { ...t, title: newTitle } : t)));
      })
      .catch((error) => console.error("Erreur lors de la modification de la tâche :", error));
  };
  
  const searchedTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );
  
  return (
    <div  className="container">
      <h1 className="title">ToDo List</h1>
      <input
        type="text"
        placeholder="Rechercher une tâche..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border px-2 py-1 mb-4 w-full"
      />
      <div className="filter-buttons">
        <button onClick={() => handleFilterChange ("all")}>Toutes</button>
        <button onClick={() => handleFilterChange ("completed")}>Complétées</button>
        <button onClick={() => handleFilterChange ("incomplete")}>Non complétées</button>
      </div>
      <p className="task-count">
        {filteredTasks.length} tâche{filteredTasks.length > 1 ? "s" : ""} sur {tasks.length} affichée{tasks.length > 1 ? "s" : ""}
      </p>

      <AddTodoForm onAddTask={handleAddTask} />
      <motion.div
        key={filter}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        <TodoList tasks={searchedTasks} onToggle={toggleTask} onDelete={deleteTask} onEdit={handleEditTask} />
      </motion.div>
    </div>
  )
}
export default App;