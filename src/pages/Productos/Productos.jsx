import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Productos.css";

const API_URL = import.meta.env.VITE_MOCKAPI_URL;

export default function Productos() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // Estado para cantidad
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`${API_URL}/${id}`)
        .then(res => setProduct(res.data))
        .catch(err => {
          console.error("Error al traer el producto", err);
          setProduct(null);
        });
    }
  }, [id]);

  if (!product) return <p>Cargando producto...</p>;

  // Funciones para manejar la cantidad
  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  return (
    <main>
      <div className="product-detail">
        <div className="box-2">
          <img
            src={product.image || 'https://via.placeholder.com/300'}
            alt={product.title}
            className="product-image-large"
          />
        </div>
        <div className="box-1">
          <h2>{product.title}</h2>
          <p><strong>Descripción:</strong> {product.descripcion}</p>
          <p><strong>Precio:</strong> {product.price}</p>
          <p><strong>Status:</strong> {product.status}</p>
          <p><strong>Rating:</strong> {product.rating} ⭐</p>
          <p><strong>Reviews:</strong> {product.reviews}</p>

          {/* Controles de cantidad */}
          <div className="quantity-controls" style={{ display: "flex", alignItems: "center", gap: "10px", margin: "10px 0" }}>
            <button onClick={decreaseQuantity} className="quantity-button">-</button>
            <span>{quantity}</span>
            <button onClick={increaseQuantity} className="quantity-button">+</button>
          </div>

          <button className="buy-button">Comprar</button>
          <button className="add-to-cart-button">Añadir al carrito</button>
          <br />
          <button className="back-button" onClick={() => navigate("/")}>
            Volver a la tienda
          </button>
        </div>
      </div>
    </main>
  );
}
