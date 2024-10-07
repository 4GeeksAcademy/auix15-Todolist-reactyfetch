import React from 'react';
import TodoItem from './todoItem';


const TodoList = ({ tasks, removeTask }) => {
  return (
    <div className="todo-list">
      {tasks.length === 0 ? (
        <p><strong>Descansa. No hay nada pendiente ;)</strong></p>
      ) : (
        tasks.map((task, index) => (
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
