import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import DafnaHistory from "../components/img/DafnaHistory.png";

const History = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-grow mt-[8rem] flex justify-center">
        <div className="max-w-4xl w-full px-4">
          <div className="flex flex-col md:flex-row justify-center gap-8">
            <div className="max-w-[50%] text-left space-y-4">
              <h1 className="text-3xl font-bold mb-4 text-center md:text-left">
                Entrevista a Dafna Curielarda
              </h1>
              <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center md:text-left">
                ‘Solo Juntos’
              </h2>
              <p className="text-center md:text-left">
                Dafna nos comparte cómo surgió Tiferet y su visión sobre la
                importancia del bienestar emocional. Una historia de pasión y
                compromiso por ayudar a otros a encontrar su equilibrio.
              </p>
            </div>

            <div className="flex justify-center">
              <img
                src={DafnaHistory}
                alt="Dafna Foto sobre la historia de Tiferet"
                className="w-full max-w-[400px] rounded-lg shadow-lg"
              />
            </div>
          </div>

          <div className="mt-8 space-y-6 text-base">

            <p className="mt-4 text-center md:text-left">
              <strong>¿Cómo surge este espacio en tu vida?</strong>
            </p>
            <p className="text-center md:text-left">
              Siempre supe que algún día iba a crear un espacio así. Siempre me
              acompañó una clara visión del proyecto hacia el que quería ir: gestar
              un espacio para traer más amor al mundo.
            </p>

            <p className="mt-4 text-center md:text-left">
              Siendo joven, creía ingenuamente que quienes compartían mi entorno
              cercano, ya sea en el círculo familiar, social, laboral o académico,
              también compartían el mismo sueño. Craso error. Con dolor y desilusión,
              tomé conciencia que no era así. Cada uno, por supuesto, tenía su propio
              sueño y su propia visión de mundo.
            </p>

            <p className="mt-4 text-center md:text-left">
              Como solía adaptarme bien a las necesidades externas, durante muchos
              años callé mi sentir y ‘seguí la corriente’. Hasta que en determinado
              momento la molestia interior por no serme fiel a mí, y el insistente
              llamado interno a hacer algo respecto a lo que sentía, se hicieron
              incómodamente presentes. Me pregunté qué hacer: si dejar en el olvido
              y silenciar el anhelo, o escuchar mi corazón y moverme hacia la
              materialización de mi visión. Queda claro que elegí el segundo camino,
              más incierto y desafiante.
            </p>

            <p className="mt-4 text-center md:text-left">
              <strong>¿Qué es lo que te impulsaba?</strong>
            </p>
            <p className="text-center md:text-left">
              Me impulsaba una parte de mí que siempre ha estado presente. Siempre. 
              Como una semilla. Un espacio interno que no tiene forma, y no ocupa
              ningún espacio en ningún tiempo. Es una certeza difícil de conceptualizar.
              Y a su vez es lo más real que anida en mí. Ese es el mismo espacio
              interior que me “llama” a volver siempre que me distraigo en mi vida
              confundiendo mis prioridades (que, confieso, lo hago bien seguido), y
              continúa guiándome cada día.
            </p>

            <p className="mt-4 text-center md:text-left">
              <strong>¿Esa voz podría ser el propósito del alma?</strong>
            </p>
            <p className="text-center md:text-left">
              Si. Esa voz es el propósito de mi alma en esta experiencia de vida.
            </p>

            <p className="mt-4 text-center md:text-left">
              <strong>¿Cómo influye tu entorno socio-cultural en todo esto?</strong>
            </p>
            <p className="text-center md:text-left">
              Nací y viví dentro del seno de una familia judía tradicional. Con mis
              padres, ambos de bendita memoria, he logrado conectarme desde el amor y
              el agradecimiento, habiendo sanado y atravesado varias capas de mi
              personalidad.
            </p>

            <p className="mt-4 text-center md:text-left">
              Desde el lugar de la tradición, siempre sentía que algo me faltaba. Una
              parte de mí permanecía sedienta. Llegué a creer que en el judaísmo no
              había más nada para mi sed espiritual, y comencé a incursionar en otras
              tradiciones milenarias. Encontré algunos caminos místicos que se alineaban
              más con lo que estaba necesitando. Algo se calmó en mí. De todas formas,
              sentía que aun así necesitaba integrar mi propia raíz.
            </p>

            <p className="mt-4 text-center md:text-left">
              Hasta que “casualmente” di con una clase de Kabalá con el profesor Salo
              Sapov, que su memoria sea bendita. Siempre recuerdo aquella primera
              conexión con esta sabiduría. Cuando escuché lo que decía el profesor,
              todo mi cuerpo resonó, despertó. ¡Lo que tanto buscaba simplemente estaba
              ahí! Tenía la sensación de haber vuelto a casa. Sentía que mis células
              “recordaban”.
            </p>

            <p className="mt-4 text-center md:text-left">
              <strong>¿Y ahí surgió Tiféret?</strong>
            </p>
            <p className="text-center md:text-left">
              Sí, ahí surgió Tiféret. Primero, en la dimensión del propósito y de las
              ideas. Por años estaba claro para mí, que en algún momento iba a crear
              un Centro terapéutico que se llamara Tiféret.
            </p>

            <p className="mt-4 text-center md:text-left">
              Fue mágica la concreción de este lugar. Las sincronías acompañaron todo el
              proceso. En ese período aún trabajaba dentro de la comunidad judía
              institucionalizada, hasta que llegó el momento en que supe que tenía que
              dar el salto, pues necesitaba entregarme cien por ciento a esta creación.
            </p>

            <p className="mt-4 text-center md:text-left">
              Tuve el apoyo invalorable de mi marido, quien siempre confió en mí y vio
              mi potencial para la realización del proyecto. Me estimuló y acompañó en
              todo el proceso y aún lo sigue haciendo. Gracias a ello, en el 2004 nace
              el Centro Tiféret.
            </p>

            <p className="mt-4 text-center md:text-left">
              <strong>¿Qué significa Tiféret?</strong>
            </p>
            <p className="text-center md:text-left">
              Tiféret hace referencia a una de las Sefirót del Árbol de la Vida de la
              Kabalá. Las Sefirót son diez y se traducen como esferas, cualidades del
              alma, o manifestaciones del Infinito dentro del mundo creado. La Sefirá de
              Tiféret simboliza las cualidades de equilibrio, armonía y belleza, y es el
              espíritu que nos convoca.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default History;
