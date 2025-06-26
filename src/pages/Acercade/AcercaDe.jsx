import React from 'react'
import "./AcercaDe.css"

export default function AcercaDe() {
  return (
<>
  {/* PRINCIPAL */}
  <main>
    <h1>QUIENES SOMOS?</h1>
    <br />
    <section className="about-section">
      <p>
        Somos una libreria independiente dedicada a la creación, publicación y
        distribución de libros que inspiran, educan y entretienen. Nuestra
        pasión por la literatura nos impulsa a ofrecer una cuidada selección de
        obras de autores emergentes y consolidados, abarcando una amplia
        variedad de géneros. Nuestro compromiso es proporcionar a los lectores
        una experiencia única y enriquecedora, brindando libros que no solo
        cuentan historias, sino que también invitan a reflexionar y crecer.
      </p>
      <br />
      <img
        className="banner-store"
        src="/src/assets/images/Nosotros.jpg"
        alt="Nosotros"
      />
      <br />
      <h2>¿Quiénes Somos?</h2>
      <br />
      <p>
        En <strong>Blume Bookstore</strong>, creemos en el poder transformador
        de los libros. Somos una editorial apasionada por dar voz a historias
        que inspiran, educan y entretienen. Nuestro compromiso es descubrir y
        publicar obras que dejen huella en los lectores, ofreciendo contenido de
        calidad en géneros que van desde la narrativa contemporánea hasta la
        divulgación cultural.
      </p>
      <br />
      <h2>Nuestra Historia</h2>
      <br />
      <p>
        Blume Bookstore nació en 2010, fundada por un grupo de escritores,
        editores y apasionados de la literatura que soñaban con crear una
        plataforma para autores talentosos de todo el mundo. Desde sus primeros
        pasos, nuestra editorial se ha destacado por ofrecer un espacio para
        voces originales y narrativas que desafían lo convencional. A lo largo
        de los años, hemos crecido hasta convertirnos en una referencia dentro
        del mundo editorial, publicando títulos que abarcan desde literatura
        contemporánea hasta ensayos filosóficos, pasando por poesía y narrativa
        infantil.
      </p>
      <br />
      <h2>Nuestra Misión</h2>
      <br />
      <p>
        En Blume Bookstore, nuestra misión es sencilla pero profunda:
        democratizar la lectura y fomentar el amor por los libros en todas sus
        formas. Creemos en el poder de las historias para cambiar vidas, y
        queremos asegurarnos de que cada libro que publicamos sea una puerta
        abierta a nuevas ideas, emociones y perspectivas. Nuestra meta es llegar
        a todos los rincones del mundo literario, llevando nuestras
        publicaciones a lectores de todas las edades y gustos, y contribuyendo a
        que el acto de leer se mantenga como un disfrute personal e
        intransferible.
      </p>
      <br />
      <h2>Nuestro Equipo</h2>
      <br />
      <p>
        Contamos con un equipo diverso de escritores, editores, diseñadores y
        expertos en marketing literario que trabajan incansablemente para
        ofrecer publicaciones de la más alta calidad. Cada uno de nuestros
        miembros tiene una profunda conexión con el mundo de la literatura y
        está comprometido con la misión de Blume Bookstore. Nos enorgullece
        ofrecer un servicio personalizado a nuestros autores, ayudándoles a
        transformar sus ideas en libros que conecten con los lectores. Además,
        trabajamos estrechamente con librerías, bibliotecas y plataformas
        digitales para asegurarnos de que nuestros títulos lleguen al mayor
        número de personas posible.
      </p>
      <br />
      <div className="about-team">
        <div className="team-member">
          <img src="/src/assets/Images/Desarrollador.jpg" alt="Desarrollador" />
          <p>Desarrollado por</p>
          <h3>MMB</h3>
        </div>
      </div>
    </section>
  </main>
</>

  )
}
