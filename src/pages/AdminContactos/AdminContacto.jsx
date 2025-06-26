import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./AdminContacto.css";

export default function AdminContacto() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editUserId, setEditUserId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    country: "",
    birthdate: ""
  });

  useEffect(() => {
    const URL_USUARIOS = "https://685b755e89952852c2d9975f.mockapi.io/usuarios";

    async function fetchUsuarios() {
      try {
        const res = await fetch(URL_USUARIOS);
        if (!res.ok) throw new Error(`Error al cargar usuarios: ${res.status}`);
        const data = await res.json();
        setUsuarios(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUsuarios();
  }, []);

  const formatDate = (fecha) => {
    const date = new Date(fecha);
    if (isNaN(date)) return fecha;
    const dia = String(date.getDate()).padStart(2, "0");
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const año = date.getFullYear();
    return `${dia}/${mes}/${año}`;
  };

  const formatDateISO = (fecha) => {
    const date = new Date(fecha);
    if (isNaN(date)) return "";
    const año = date.getFullYear();
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const dia = String(date.getDate()).padStart(2, "0");
    return `${año}-${mes}-${dia}`;
  };

  const handleEditClick = (usuario) => {
    setEditUserId(usuario.id);
    setEditFormData({
      name: usuario.name,
      email: usuario.email,
      country: usuario.country,
      birthdate: formatDateISO(usuario.birthdate)
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveClick = async (id) => {
    try {
      const res = await fetch(`https://685b755e89952852c2d9975f.mockapi.io/usuarios/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editFormData)
      });
      if (!res.ok) throw new Error("Error al actualizar usuario");
      const updatedUser = await res.json();

      setUsuarios((prev) =>
        prev.map((usuario) => (usuario.id === id ? updatedUser : usuario))
      );
      setEditUserId(null);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleCancelClick = () => {
    setEditUserId(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que querés eliminar este usuario?")) {
      try {
        const res = await fetch(`https://685b755e89952852c2d9975f.mockapi.io/usuarios/${id}`, {
          method: "DELETE"
        });
        if (!res.ok) throw new Error("Error al eliminar usuario");
        setUsuarios((prev) => prev.filter((u) => u.id !== id));
      } catch (err) {
        alert(err.message);
      }
    }
  };

  if (loading) return <div>Cargando usuarios...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="admin-contacto-container">
      <div className="header-actions">
        <h2>Lista de Usuarios Registrados</h2>
        <NavLink to="/register" className="btn-new-user">
          Nuevo Usuario
        </NavLink>
      </div>
      {usuarios.length === 0 ? (
        <p>No hay usuarios registrados.</p>
      ) : (
        <table className="contact-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>País</th>
              <th>Fecha de Nacimiento</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) =>
              editUserId === usuario.id ? (
                <tr key={usuario.id}>
                  <td>
                    <input
                      type="text"
                      name="name"
                      value={editFormData.name}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      name="email"
                      value={editFormData.email}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="country"
                      value={editFormData.country}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      name="birthdate"
                      value={editFormData.birthdate}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <button className="edit-btn" onClick={() => handleSaveClick(usuario.id)}>
                      Guardar
                    </button>
                    <button className="delete-btn" onClick={handleCancelClick}>
                      Cancelar
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={usuario.id}>
                  <td>{usuario.name}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.country}</td>
                  <td>{formatDate(usuario.birthdate)}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEditClick(usuario)}>
                      Editar
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(usuario.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
