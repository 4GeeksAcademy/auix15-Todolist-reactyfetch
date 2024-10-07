import React from 'react';

const TodoItem = ({ id, text, deleteTask }) => {
  return (
    <div className="todo-item">
      <span>{text}</span>
      <button 
        className="delete-btn" 
        onClick={() => deleteTask(id)} 
        aria-label={`Eliminar tarea ${text}`}
      >
        ❌
      </button>
    </div>
  );
};

export default TodoItem;
