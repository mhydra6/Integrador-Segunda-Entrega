import React from 'react'
import './Contacto.css'

export default function Contacto() {
  return (
<>
    <h1>CONTACTO</h1>
    <section className="contact-section">
      <form className="contact-form">
        <h2>Formulario de Contacto</h2>
        <br />
        <label htmlFor="name">Nombre Completo</label>
        <input type="text" id="name" name="name" required="" maxLength={50} />
        <label htmlFor="email">Correo Electrónico</label>
        <input
          type="email"
          id="email"
          name="email"
          required=""
          maxLength={100}
        />
        <label htmlFor="message">Mensaje</label>
        <textarea
          id="message"
          name="message"
          required=""
          maxLength={500}
          defaultValue={""}
        />
        <button type="submit">Enviar</button>
      </form>
      <div className="map">
        <h3>Donde estamos</h3>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2595.5429642426207!2d-58.415766725146575!3d-34.60461745754413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca8b0dbcd567%3A0xd9485256d1ada6b6!2sGallo%20353%2C%20C1172ABG%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e1!3m2!1ses!2sar!4v1739059950711!5m2!1ses!2sar"
          width="100%"
          height={400}
          allowFullScreen=""
          loading="lazy"
        />
      </div>
    </section>

</>

  )
}
