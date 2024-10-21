import React from 'react';


const TodoList = ({ tasks, deleteTask }) => {
  const validTasks = Array.isArray(tasks) ? tasks : [];
  return (
    <div className="todo-list">
      {validTasks.length === 0 ? (
        <p><strong>Descansa. No hay nada pendiente ;)</strong></p>
      ) : (
        validTasks.map((task, index) => (
          <div className="todo-item" key={
            index
          }>
          <span>{task.label}</span>
          <button 
            className="delete-btn" 
            onClick={() => deleteTask(task.id)} 
            aria-label={`Eliminar tarea ${task.label}`}
          >
            ❌
          </button>
        </div>
            ))
      )}
      
    </div>

  );
};

export default TodoList;
