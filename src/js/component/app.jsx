import React, {useEffect, useState } from "react";
import TodoList from "./todoList";
import Input from "./input"; 
import UserForm from "./userForm";



const App = () => {
  const [tasks, setTasks] = useState([]);

   // Fetch para obtener las tareas del servidor al cargar la app. Inicia el cmponente
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
      };
      addTaskToServer(newTask)
  }};
  
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
          console.log("Nueva tarea agregada:", addedTask)
        })
        .catch((error) => {
          console.error("Error syncing tasks:", error); 
        });
    };
    
    const completeTask = (taskId) => {
      const taskToUpdate = tasks.find((task) => task.id === taskId);
        if(taskToUpdate) {
          const updatedTasks = {...taskToUpdate, is_done: true};
          updateTaskOnServer(updatedTasks)
        }
    };

   // Función para sincronizar las tareas con el servidor
   const updateTaskOnServer = (updatedTask) => {
    fetch(`https://playground.4geeks.com/todo/todos/${updatedTask.id}`, {
      method: "PUT",
      body: JSON.stringify(updatedTask),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((resp) => resp.json())
    .then((task) => {
      setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
      console.log("Tarea actualizada:", task)
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
      <TodoList tasks={tasks} deleteTask={completeTask} />
      <UserForm/>
    </div>
  );
};

export default App;
