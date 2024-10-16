import React from 'react';
import TodoItem from './todoItem';


const TodoList = ({ tasks, removeTask }) => {
  const validTasks = Array.isArray(tasks) ? tasks : [];
  return (
    <div className="todo-list">
      {validTasks.length === 0 ? (
        <p><strong>Descansa. No hay nada pendiente ;)</strong></p>
      ) : (
        validTasks.map((task, index) => (
          <TodoItem
            key={index}
            id={index}
            text={task.label}
            deleteTask={removeTask}
          />
        ))
      )}
      
    </div>
  );
};

export default TodoList;
