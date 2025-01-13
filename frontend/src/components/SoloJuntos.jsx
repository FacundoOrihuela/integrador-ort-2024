import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import Header from "./Header";
import Footer from "./Footer";

import imgIntegrante1 from "../components/img/Integrante1.png";
import imgIntegrante2 from "../components/img/Diego.png";
import imgIntegrante3 from "../components/img/Maria.png";
import imgIntegrante4 from "../components/img/Stefania.png";
import imgIntegrante5 from "../components/img/Adriana.png";
import imgIntegrante6 from "../components/img/Deborah.png";

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
      <div className="flex-grow mt-[7rem]">
        <h1 className="text-center text-2xl font-bold mb-6">Equipo de Tiferet</h1>
        <div className="w-full max-w-5xl mx-auto">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 }, // 2 slides en pantallas medianas
              1024: { slidesPerView: 3 }, // 3 slides en pantallas grandes
            }}
            className="shadow-lg"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col items-center">
                  <img
                    src={image.src}
                    alt={image.name}
                    className="w-40 h-40 object-cover rounded-full mb-4"
                  />
                  <p className="text-lg font-semibold mb-6">{image.name}</p> {/* Espacio adicional con mb-6 */}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <h1 className="text-center text-2xl font-bold mb-6 mt-8">Equipo de Tiferet</h1>

            <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 }, // 2 slides en pantallas medianas
              1024: { slidesPerView: 3 }, // 3 slides en pantallas grandes
            }}
            className="shadow-lg"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col items-center">
                  <img
                    src={image.src}
                    alt={image.name}
                    className="w-40 h-40 object-cover rounded-full mb-4"
                  />
                  <p className="text-lg font-semibold mb-6">{image.name}</p> {/* Espacio adicional con mb-6 */}
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
