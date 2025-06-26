import "./Footer.css"
import React from "react"


export default function Footer () {
    return (
        <>
  {/* SECCIÓN CARACTERÍSTICAS */}
  <div className="section-features">
    <img src="/src/assets/Images/Autores destacados.jpg" alt="Autores Destacados" />
  </div>
  <div className="brands">
    <img src="/src/assets/Images/Editoriales.jpg" alt="Editoriales" />
  </div>
  {/* FOOTER */}
  <footer className="footer">
    <div className="footer-section social-media">
      <a href="https://www.facebook.com" target="”_blank”">
        <i className="fab fa-facebook" /> Facebook
      </a>
      <br />
      <a href="https://www.instagram.com" target="”_blank”">
        <i className="fab fa-instagram" /> Instagram
      </a>
      <br />
      <a href="https://www.youtube.com" target="”_blank”">
        <i className="fab fa-youtube" /> Youtube
      </a>
    </div>
    <div className="footer-section copyright">
      <img
        src="/src/assets/Images/Logo/logo.jpg"
        alt="Logo"
        className="footer-logo"
      />
      <p>Copyright © 2025 BLUME Bookstore</p>
      <p>desarrollado por MMB</p>
    </div>
    <div className="footer-section links">
      <h3>BLUME Bookstore</h3>
      <br />
      <a href="/pages/about.html">Sobre Nosotros</a>
      <a href="https://policies.google.com/privacy?hl=es">
        Política de Privacidad
      </a>
      <a href="https://policies.google.com/terms?hl=es">
        Términos y Condiciones
      </a>{" "}
      <br />
      <h3>CONTACTO</h3>
      <br />
      <p>Tel.: +011 4999-9999</p>
      <p>Lunes a Viernes</p>
      <p>De 09hs a 21hs</p>
    </div>
  </footer>
</>

    )
}