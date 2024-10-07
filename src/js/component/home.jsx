import React from "react";
import { Context } from "../store/appContext";
import TodoList from "./todoList.jsx";

const Home = () => {
  const { store, actions } = useContext(Context);

  return (
      <div>
          <TodoList todos={store.todos} deleteTodo={actions.deleteTodo} />
      </div>
  );
};

export default Home;
