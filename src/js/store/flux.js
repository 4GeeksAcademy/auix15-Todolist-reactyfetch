const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            tasks: [] // Para guardar las tareas que obtenemos de la API
        },
        actions: {
            // Obtener tareas desde la API y guardarlas en el store
            loadTasks: async () => {
                try {
                    const response = await fetch("https://playground.4geeks.com/todo/users/auix15");
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
                    //CREAR OBJETO DE LA API
                    const newTasks = { label: task, done: false, }
                    
                    //MODIFICAR RUTA CORRECTA
                    const response = await fetch("https://playground.4geeks.com/todo/users/auix15", {
                        method: "POST", //CAMBIAR A POST
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(newTasks),
                    });
                    //TRAER LOS DATOS QUE SE CREARON
                    const data = await response.json(); //DATA TIENE EL ID

                    if (!response.ok) throw new Error("Error adding task");
                    //HACER LUEGO DE QUE SE CREO LA NUEVA TAREA
                    const updatedTasks = [...store.tasks, data];
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
                    
                    //EN LA URL PASAR EL TASK/ID?
                    const response = await fetch("https://playground.4geeks.com/todo/users/auix15", {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                        
                    });

                    if (!response.ok) throw new Error("Error deleting task");
                    //BORRAR LUEGO DE QUE SE BORRARA LA TAREA
                    const updatedTasks = store.tasks.filter((_, index) => index !== taskId);

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
