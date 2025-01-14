import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation"; // Asegúrate de importar la navegación

import Header from "./Header";
import Footer from "./Footer";

import imgIntegrante1 from "../components/img/diego1.png";
import imgIntegrante2 from "../components/img/cecilia1.png";
import imgIntegrante3 from "../components/img/maria1.png";
import imgIntegrante4 from "../components/img/max1.png";
import imgIntegrante5 from "../components/img/steffano1.png";
import imgIntegrante6 from "../components/img/dafna1.png";

const SoloJuntos = () => {
  const images = [
    { src: imgIntegrante1, name: "Integrante 1" },
    { src: imgIntegrante2, name: "Diego" },
    { src: imgIntegrante3, name: "Maria" },
    { src: imgIntegrante4, name: "Stefania" },
    { src: imgIntegrante5, name: "Adriana" },
    { src: imgIntegrante6, name: "Deborah" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow mt-[2rem]">
        <h1 className="text-center text-2xl font-bold mb-6">Equipo de Tiferet</h1>
        <div className="w-full max-w-5xl mx-auto">
          {/* Swiper para 3 personas en la parte superior */}
          <Swiper
            modules={[Pagination, Navigation]}
            pagination={{ clickable: true }}
            navigation={true} // Activa la navegación
            loop={true}
            spaceBetween={20}
            slidesPerView={3}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="shadow-lg bg-white rounded-lg p-4"
          >
            {images.slice(0, 3).map((image, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col items-center relative group">
                  {/* Imagen del integrante */}
                  <img
                    src={image.src}
                    alt={image.name}
                    className="w-40 h-40 object-cover rounded-full mb-4 p-2 bg-white shadow-md"
                  />
                  {/* Nombre que solo aparece al hacer hover */}
                  <p className="text-lg font-semibold mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{image.name}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <h1 className="text-center text-2xl font-bold mb-6 mt-8">Equipo de Tiferet</h1>

          {/* Swiper para 4 personas en la parte inferior */}
          <Swiper
            modules={[Pagination, Navigation]}
            pagination={{ clickable: true }}
            navigation={true} // Activa la navegación
            loop={true}
            spaceBetween={20}
            slidesPerView={4}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            className="shadow-lg bg-white rounded-lg p-4"
          >
            {images.slice(3).map((image, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col items-center relative group">
                  {/* Imagen del integrante */}
                  <img
                    src={image.src}
                    alt={image.name}
                    className="w-40 h-40 object-cover rounded-full mb-4 p-2 bg-white shadow-md"
                  />
                  {/* Nombre que solo aparece al hacer hover */}
                  <p className="text-lg font-semibold mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{image.name}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SoloJuntos;
