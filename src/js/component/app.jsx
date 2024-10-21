import React, { useEffect, useState } from "react";
import TodoList from "./todoList";
import Input from "./input";
import UserForm from "./userForm";

const App = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch para obtener las tareas del servidor al cargar la app. Inicia el componente
  useEffect(() => {
    fetch("https://playground.4geeks.com/todo/users/auix15")
      .then((resp) => resp.json())
      .then((data) => {
        console.log("Tareas cargadas:", data);
        setTasks(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []); // El array vacío significa que esto solo se ejecutará una vez cuando el componente se monte.

  // Función para agregar una nueva tarea
  const addTask = (task) => {
    if (task.trim() !== "") {
      const newTask = {
        label: task,
        is_done: false,
      };
      addTaskToServer(newTask);
    }
  };

  const addTaskToServer = (newTask) => {
    fetch("https://playground.4geeks.com/todo/todos/auix15", {
      method: "POST",
      body: JSON.stringify(newTask),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((addedTask) => {
        setTasks([...tasks, addedTask]);
        console.log("Nueva tarea agregada:", addedTask);
      })
      .catch((error) => {
        console.error("Error syncing tasks:", error);
      });
  };

  // Función para eliminar una tarea
  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    deleteTaskFromServer(taskId);
  };

  // Elimina la tarea del servidor
  const deleteTaskFromServer = (taskId) => {
    fetch(`https://playground.4geeks.com/todo/todos/${taskId}`, {
      method: "DELETE",
    })
      .then((resp) => {
        if (resp.ok) {
          console.log(`Tarea con id ${taskId} eliminada del servidor`);
        } else {
          console.error(`Error al eliminar la tarea con id ${taskId}`);
        }
      })
      .catch((error) => {
        console.error("Error eliminando la tarea del servidor:", error);
      });
  };

  return (
    <div className="app-container">
      <h1>Lista de Tareas</h1>
      <Input addTask={addTask} />
      {/* Expresión para contar las tareas */}
      <p>
        {tasks.length} {tasks.length === 1 ? "tarea" : "tareas"} pendientes
      </p>
      <TodoList tasks={tasks} deleteTask={deleteTask} />
      <UserForm />
    </div>
  );
};

export default App;
