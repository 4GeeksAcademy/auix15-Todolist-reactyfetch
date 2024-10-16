import React, {useEffect, useState } from "react";
import TodoList from "./todoList";
import Input from "./input"; 
import UserForm from "./userForm";



const App = () => {
  const [tasks, setTasks] = useState([]);

   // Fetch para obtener las tareas del servidor al cargar la app
   useEffect(() => {
    fetch("https://playground.4geeks.com/todo/users/auix15")
      .then((resp) => resp.json()) 
      .then((data) => {
        console.log(data); // Tareas recibidas del servidor

        setTasks(Array.isArray(data) ? data : []); // Actualiza el estado con las tareas recibidas
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error); // Manejar cualquier error
      });
  }, []); // El array vacío significa que esto solo se ejecutará una vez cuando el componente se monte.

   // Función para agregar una nueva tarea
   const addTask = (task) => {
    if (task.trim() !== "") {
      const newTask = {
        "label": task,
        "is_done": false
      }
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      // Sincronizar con el servidor
      updateServerTasks(newTask);
    }
  };

  // Función para eliminar una tarea
  const removeTask = (taskIndex) => {
    const updatedTasks = tasks.filter((_, index) => index !== taskIndex);
    setTasks(updatedTasks);
    // Sincronizar con el servidor
    updateServerTasks(updatedTasks);
  };

   // Función para sincronizar las tareas con el servidor
   const updateServerTasks = (updatedTasks) => {
   
      
    fetch("https://playground.4geeks.com/todo/users/auix15", {
      method: "POST",
      body: JSON.stringify(updatedTasks),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        console.log("Tareas sincronizadas:", resp.ok); 
      })
      .catch((error) => {
        console.error("Error syncing tasks:", error); 
      });
  };

  return (
    <div className="app-container">
      <h1>Lista de Tareas</h1>
      <Input addTask={addTask} />
      {/* Expresión para contar las tareas */}
      <p>{tasks.length} {tasks.length === 1 ? "tarea" : "tareas"} pendientes</p>
      <TodoList tasks={tasks} removeTask={removeTask} />
      <UserForm/>
    </div>
  );
};

export default App;
