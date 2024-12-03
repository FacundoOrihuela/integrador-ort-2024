import React, { useContext } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { UserContext } from "../context/UserContext";

const Principal = () => {
  const { user } = useContext(UserContext);
  

  return (
    <div>
      <Header />
      <Sidebar />
      <main>
      <h1 style={{ justifyContent: "center", alignItems: "center", padding: "150px" }}>
                Bienvenido {user ? user.name : ""}
            </h1>
        <section className="bg-gray-100 py-8">
          <div className="container mx-auto flex justify-around">
            <div className="text-center">
              <img src="/path-to-your-image/yoga.png" alt="Kabalá Viva Icon" className="mx-auto" />
              <p className="mt-2 text-gray-700">Kabalá Viva</p>
            </div>
            <div className="text-center">
              <img src="/path-to-your-image/yoga.png" alt="Círculos Icon" className="mx-auto" />
              <p className="mt-2 text-gray-700">Círculos</p>
            </div>
            <div className="text-center">
              <img src="/path-to-your-image/yoga.png" alt="Yoga y Meditación Icon" className="mx-auto" />
              <p className="mt-2 text-gray-700">Yoga y Meditación</p>
            </div>
            <div className="text-center">
              <img src="/path-to-your-image/yoga.png" alt="Integraciones Icon" className="mx-auto" />
              <p className="mt-2 text-gray-700">Integraciones</p>
            </div>
            <div className="text-center">
              <img src="/path-to-your-image/yoga.png" alt="Psicoterapias Icon" className="mx-auto" />
              <p className="mt-2 text-gray-700">Psicoterapias</p>
            </div>
          </div>
        </section>
        <section className="relative">
          <img src="/path-to-your-image/yoga.png" alt="Yoga Session" className="w-full" />
          <div className="absolute inset-0 flex justify-center items-center">
            <img src="/path-to-your-image/yoga.png" alt="Tiferet Logo" className="h-40 w-40" />
          </div>
        </section>
        <section className="py-8">
          <div className="container mx-auto flex flex-col md:flex-row items-center">
            <div className="md:w-1/2">
              <img src="/path-to-your-image/yoga.png" alt="Musicians" className="w-full" />
            </div>
            <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
              <h2 className="text-2xl font-bold text-gray-800">Nuestra Historia</h2>
              <p className="mt-4 text-gray-700">
                El Centro Tiferet surgió de un anhelo profundo del alma...
              </p>
              <p className="mt-4 text-gray-700">
                En el plano cotidiano, me desempeño como terapeuta...
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Principal;
