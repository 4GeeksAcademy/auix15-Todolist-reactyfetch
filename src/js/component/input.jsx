import React, { useState } from "react";

const Input = ({ addTask }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTask(inputValue);
      setInputValue("");
    }
  };

  const handleAddClick = () => {
    addTask(inputValue);
    setInputValue("");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Añadir tarea..."
        aria-label="Añadir nueva tarea"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button className="button" onClick={handleAddClick}>
        Añadir
      </button>
    </div>
  );
};

export default Input;
