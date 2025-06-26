import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./AdminProductos.css";

const API_URL = import.meta.env.VITE_MOCKAPI_URL;

export default function AdminProductos() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    title: "",
    price: "",
    image: "",
    descripcion: "",
    ingreso: "",
    categoria: "",
    rating: "",
    reviews: "",
    status: ""
  });
  const [editingId, setEditingId] = useState(null);

  const formRef = useRef(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(API_URL);
      setProducts(res.data);
    } catch (error) {
      alert("Error al obtener productos: " + error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "rating") {
      if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
        setForm({ ...form, [name]: value });
      }
    } else if (name === "reviews") {
      if (value === "" || /^[0-9]*$/.test(value)) {
        setForm({ ...form, [name]: value });
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const formatPriceForMockAPI = (priceStr) => {
    let onlyNumbers = priceStr.replace(/[^\d]/g, "");
    if (!onlyNumbers) return "";
    let number = parseInt(onlyNumbers, 10);
    if (isNaN(number)) return "";
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
  };

  const formatPriceDisplay = (price) => {
    if (typeof price === "string" && price.startsWith("$")) return price;
    let onlyNumbers = ("" + price).replace(/[^\d]/g, "");
    if (!onlyNumbers) return price;
    let number = parseInt(onlyNumbers, 10);
    if (isNaN(number)) return price;
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      title,
      price,
      image,
      descripcion,
      ingreso,
      categoria,
      rating,
      reviews,
      status
    } = form;

    if (
      !title ||
      !price ||
      !image ||
      !descripcion ||
      !ingreso ||
      !categoria ||
      rating === "" ||
      reviews === "" ||
      !status
    ) {
      alert("Todos los campos son obligatorios");
      return;
    }

    const priceFormatted = formatPriceForMockAPI(price);
    if (!priceFormatted) {
      alert("Precio inválido");
      return;
    }

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, {
          title,
          price: priceFormatted,
          image,
          descripcion,
          ingreso: Math.floor(new Date(ingreso).getTime() / 1000),
          categoria,
          rating: parseFloat(rating),
          reviews: parseInt(reviews, 10),
          status
        });
        alert("Producto actualizado con éxito");
      } else {
        await axios.post(API_URL, {
          title,
          price: priceFormatted,
          image,
          descripcion,
          ingreso: Math.floor(new Date(ingreso).getTime() / 1000),
          categoria,
          rating: parseFloat(rating),
          reviews: parseInt(reviews, 10),
          status
        });
        alert("Producto creado con éxito");
      }
      setEditingId(null);
      setForm({
        title: "",
        price: "",
        image: "",
        descripcion: "",
        ingreso: "",
        categoria: "",
        rating: "",
        reviews: "",
        status: ""
      });
      fetchProducts();
    } catch (error) {
      alert("Error al guardar producto: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        alert("Producto eliminado");
        fetchProducts();
      } catch (error) {
        alert("Error al eliminar producto: " + error.message);
      }
    }
  };

  const handleEdit = (product) => {
    setForm({
      title: product.title,
      price: product.price,
      image: product.image,
      descripcion: product.descripcion,
      ingreso: product.ingreso
        ? new Date(product.ingreso * 1000).toISOString().slice(0, 10)
        : "",
      categoria: product.categoria,
      rating: product.rating !== undefined ? product.rating.toString() : "",
      reviews: product.reviews !== undefined ? product.reviews.toString() : "",
      status: product.status || ""
    });
    setEditingId(product.id);
    // Scroll directo al formulario
    formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main>
      <h1>ADMINISTRADOR DE PRODUCTOS</h1>

      <form onSubmit={handleSubmit} className="form-container" ref={formRef}>
        <input
          type="text"
          name="title"
          placeholder="Nombre del producto"
          value={form.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="price"
          placeholder="Precio (ej: 20900)"
          value={form.price}
          onChange={handleChange}
        />
        <input
          type="url"
          name="image"
          placeholder="URL de la imagen"
          value={form.image}
          onChange={handleChange}
        />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
        />
        <input
          type="date"
          name="ingreso"
          value={form.ingreso}
          onChange={handleChange}
        />
        <select name="categoria" value={form.categoria} onChange={handleChange}>
          <option value="">Selecciona categoría</option>
          <option value="Novela">Novela</option>
          <option value="Historia">Historia</option>
          <option value="Filosofía">Filosofía</option>
          <option value="Infantil">Infantil</option>
          <option value="Otros">Otros</option>
        </select>
        <input
          type="number"
          step="0.1"
          min="0"
          max="5"
          name="rating"
          placeholder="Rating (0 a 5)"
          value={form.rating}
          onChange={handleChange}
        />
        <input
          type="number"
          min="0"
          name="reviews"
          placeholder="Número de reviews"
          value={form.reviews}
          onChange={handleChange}
        />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="">Selecciona estado</option>
          <option value="Disponible">Disponible</option>
          <option value="Sin Stock">Sin Stock</option>
        </select>
        <button type="submit">{editingId ? "Actualizar" : "Crear"}</button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setForm({
                title: "",
                price: "",
                image: "",
                descripcion: "",
                ingreso: "",
                categoria: "",
                rating: "",
                reviews: "",
                status: ""
              });
            }}
            style={{ marginLeft: "10px" }}
          >
            Cancelar
          </button>
        )}
      </form>

      <table className="product-table">
        <thead>
          <tr>
            <th>IMAGEN</th>
            <th>PRODUCTO</th>
            <th>DESCRIPCIÓN</th>
            <th>INGRESO</th>
            <th>PRECIO</th>
            <th>RATING</th>
            <th>REVIEWS</th>
            <th>STATUS</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <img
                  src={product.image}
                  alt={product.title}
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
              </td>
              <td>{product.title}</td>
              <td>{product.descripcion}</td>
              <td>
                {product.ingreso
                  ? new Date(product.ingreso * 1000).toLocaleDateString()
                  : "Sin fecha"}
              </td>
              <td>{formatPriceDisplay(product.price)}</td>
              <td>{product.rating ?? "-"}</td>
              <td>{product.reviews ?? "-"}</td>
              <td>{product.status ?? "-"}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(product)}
                  title="Editar"
                >
                  <i className="fa-solid fa-pen" />
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(product.id)}
                  title="Eliminar"
                >
                  <i className="fa-solid fa-trash" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

