import { Link } from "react-router-dom";
import Header from "./Header";
import portadaImg from "../components/img/Portada.png";
import kabalaImg from "../components/img/kabala.png";
import meditarImg from "../components/img/meditar.png";
import circulosImg from "../components/img/circulos.png";
import integracionesImg from "../components/img/integraciones.png";
import psicoterapiaImg from "../components/img/psicoterapias.png";
import fotoHomeImg from "../components/img/fotoHome.png";

const Principal = () => {
  return (
    <div>
      <Header />
      <div className="mt-[5rem]"> {/* Añadir margen superior para compensar la altura del Header */}
        <section className="bg-gray py-8">
          <div className="container w-[50%] mx-auto flex justify-center space-x-8">
            <Link to="/kabala" className="text-center flex flex-col items-center">
              <div className="bg-white rounded-full w-[100px] h-[100px] flex justify-center items-center">
                <img src={kabalaImg} alt="Escuela Kabalá Viva" className="mx-auto cursor-pointer rounded-full w-[70%] h-[70%]" />
              </div>
              <p className="mt-2">Escuela Kabalá Viva</p>
            </Link>

            <Link to="/circulos" className="text-center flex flex-col items-center">
              <div className="bg-white rounded-full w-[100px] h-[100px] flex justify-center items-center">
                <img src={meditarImg} alt="Círculos de crecimiento" className="mx-auto cursor-pointer rounded-full w-[70%] h-[70%]" />
              </div>
              <p className="mt-2">Círculos de crecimiento</p>
            </Link>

            <Link to="/yoga" className="text-center flex flex-col items-center">
              <div className="bg-white rounded-full w-[100px] h-[100px] flex justify-center items-center">
                <img src={circulosImg} alt="Bienestar corporal" className="mx-auto cursor-pointer rounded-full w-[70%] h-[70%]" />
              </div>
              <p className="mt-2">Bienestar corporal </p>
            </Link>

            <Link to="/integraciones" className="text-center flex flex-col items-center">
              <div className="bg-white rounded-full w-[100px] h-[100px] flex justify-center items-center">
                <img src={integracionesImg} alt="Abordajes holísticos" className="mx-auto cursor-pointer rounded-full w-[70%] h-[70%]" />
              </div>
              <p className="mt-2">Abordajes holísticos</p>
            </Link>

            <Link to="/psicoterapias" className="text-center flex flex-col items-center">
              <div className="bg-white rounded-full w-[100px] h-[100px] flex justify-center items-center">
                <img src={psicoterapiaImg} alt="Psicoterapia" className="mx-auto cursor-pointer rounded-full w-[70%] h-[70%]" />
              </div>
              <p className="mt-2">Psicoterapia</p>
            </Link>
            <Link to="/consultorios" className="text-center flex flex-col items-center">
              <div className="bg-white rounded-full w-[100px] h-[100px] flex justify-center items-center">
                <img src={psicoterapiaImg} alt="Consultorios" className="mx-auto cursor-pointer rounded-full w-[70%] h-[70%]" />
              </div>
              <p className="mt-2">Consultorios</p>
            </Link>
          </div>
        </section>
        <section className="relative">
          <img
            src={portadaImg}
            alt="Yoga Session"
            className="w-full"
          />
        </section>
        <section className="container mx-auto py-8 px-6">
          <h2 className="text-2xl font-bold mb-4">Nuestra Historia</h2>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2">
              <img
                src={fotoHomeImg}
                alt="Nuestra Historia"
                className="w-full"
              />
            </div>
            <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
              <p>
                El Centro Tiféret surgió de un anhelo profundo del alma. Muchas
                años antes de su materialización, ya existía en mi interior con
                creciente intensidad la voluntad de crear un lugar que pudiera dar
                cabida a diferentes formas de abordar la sanación, guiadas siempre
                por el espíritu de equilibrio, armonía y belleza que inspira su
                nombre.
              </p>
              <p>
                En el plano cotidiano, me desempeño como terapeuta individual, de
                parejas y de grupos. También facilito una Maestría en Grupos de
                Crecimiento Inspirados en la sabiduría de la Kabalá, así como los
                Círculos Sagrados.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Principal;
