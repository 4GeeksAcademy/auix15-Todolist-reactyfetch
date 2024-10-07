const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            tasks: [] // Para guardar las tareas que obtenemos de la API
        },
        actions: {
            // Obtener tareas desde la API y guardarlas en el store
            loadTasks: async () => {
                try {
                    const response = await fetch("https://playground.4geeks.com/todo/docs#/");
                    if (!response.ok) throw new Error("Error fetching tasks");
                    const data = await response.json();
                    setStore({ tasks: data });
                } catch (error) {
                    console.error("Error loading tasks:", error);
                }
            },
            // Enviar una nueva tarea a la API y actualizar el estado
            addTasks: async (task) => {
                try {
                    const store = getStore();
                    const updatedTasks = [...store.tasks, { label: task, done: false }];

                    const response = await fetch("https://playground.4geeks.com/todo/docs#/", {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(updatedTasks),
                    });

                    if (!response.ok) throw new Error("Error adding task");

                    // Actualiza el estado con la nueva lista de tareas
                    setStore({ tasks: updatedTasks });
                } catch (error) {
                    console.error("Error adding task:", error);
                }
            },
            // Eliminar una tarea de la API y actualizar el estado
            deleteTask: async (taskId) => {
                try {
                    const store = getStore();
                    const updatedTasks = store.tasks.filter((_, index) => index !== taskId);

                    const response = await fetch("https://playground.4geeks.com/todo/docs#/", {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ tasks: updatedTasks }),
                    });

                    if (!response.ok) throw new Error("Error deleting task");

                    // Actualiza el estado con la nueva lista de tareas
                    setStore({ tasks: updatedTasks });
                } catch (error) {
                    console.error("Error deleting task:", error);
                }
            },
        },
    };
};

export default getState;
