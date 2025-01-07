import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const AboutTiferet = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />
      
      {/* Contenido principal */}
      <div className="flex-grow mt-[7rem] max-w-3xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6 text-center">¿Qué es Tiferet?</h1>
        <div className="space-y-6 text-left text-lg leading-relaxed">
          <p>
            El Centro Tiféret surgió de un anhelo profundo del alma. Muchos años antes de su materialización, ya latía en mi interior con creciente intensidad la voluntad de crear un lugar que pudiera dar cabida a diferentes formas de abordar la sanación, guiadas siempre por el espíritu de equilibrio, armonía y belleza que inspira su nombre.
          </p>
          <p>
            Guardianar la concreción, el sostenimiento en el tiempo, y el crecimiento del Centro en todas sus dimensiones, ha sido desde el inicio mi función. En el ejercicio de la misma a lo largo de 15 años, he notado que el compromiso que siento con esta loable tarea es tal que abarca la totalidad de mi ser.
          </p>
          <p>
            Tomo conciencia entonces que, más que una función, ser la “custodia” del espíritu de Tiferet, se ha convertido para mí en una bellísima misión de vida.
          </p>
          <p>
            En el plano cotidiano, me desempeño como terapeuta individual, de parejas y de grupos. También facilito junto a Graciela Epstein los Grupos de Crecimiento Inspirados en la sabiduría de la kabalá, así como los Círculos Sagrados.
          </p>
          <p>
            Aquel anhelo original hoy es una realidad que tiene vida propia. Y como tal late, vibra, se transforma, florece, y crece progresivamente, cobijando nuevas propuestas que se tejen creativamente, atrayendo personas cuyos caminos resuenan con el espíritu que nos convoca.
          </p>
          <p>
            En el entramado estamos todos, sostenidos siempre por la frase: “sólo juntos". Somos protagonistas y testigos asombrados de la gestación de una nueva forma de comunicación entre los seres humanos. Comprobando que la sanación es posible cuando aprendemos a convivir en armonía siendo cada uno tal cual es, y ocupando su lugar único en el círculo humano.
          </p>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutTiferet;
