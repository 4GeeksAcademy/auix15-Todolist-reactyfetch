import React, { useState } from "react";

const UserForm = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null); // Estado para almacenar el usuario creado
  const [error, setError] = useState(null); // Estado para manejar errores

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch(`https://playground.4geeks.com/todo/users/${username}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data); // Guarda la respuesta en el estado
      } else {
        const errorData = await response.json();
        setError(errorData.detail); // Manejar el error
      }
    } catch (error) {
      setError("Error de red: " + error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={handleInputChange}
          placeholder="Nombre de usuario"
          required
        />
        <button className="button" type="submit">Crear Usuario</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>} {/* Mostrar errores */}
      
      {user && (
        <div>
          <p><strong>Usuario Creado</strong></p>
          <p>Nombre: {user.name}</p>
          <p>ID: {user.id}</p>
        </div>
      )}
    </div>
  );
};

export default UserForm;
