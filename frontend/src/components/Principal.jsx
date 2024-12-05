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
            <section className="bg-gray-100 py-8">
                <div className="container mx-auto flex justify-center space-x-8">
                    <div className="text-center">
                        <Link to="/kabala">
                            <img src={kabalaImg} alt="Kabalá Viva" className="mx-auto cursor-pointer" />
                            <p className="mt-2">Kabalá Viva</p>
                        </Link>
                    </div>
                    <div className="text-center">
                        <Link to="/circulos">
                            <img src={meditarImg} alt="Círculos" className="mx-auto cursor-pointer" />
                            <p className="mt-2">Círculos</p>
                        </Link>
                    </div>
                    <div className="text-center">
                        <Link to="/yoga">
                            <img src={circulosImg} alt="Yoga y Meditación" className="mx-auto cursor-pointer" />
                            <p className="mt-2">Yoga y Meditación</p>
                        </Link>
                    </div>
                    <div className="text-center">
                        <Link to="/integraciones">
                            <img src={integracionesImg} alt="Integraciones" className="mx-auto cursor-pointer" />
                            <p className="mt-2">Integraciones</p>
                        </Link>
                    </div>
                    <div className="text-center">
                        <Link to="/psicoterapias">
                            <img src={psicoterapiaImg} alt="Psicoterapias" className="mx-auto cursor-pointer" />
                            <p className="mt-2">Psicoterapias</p>
                        </Link>
                    </div>
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
    );
};

export default Principal;
