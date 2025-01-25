import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Header from "./Header";
import Footer from "./Footer";

import imgIntegrante1 from "../components/img/dafna1.png";
import imgIntegrante2 from "../components/img/maria1.png";
import imgIntegrante3 from "../components/img/sandra1.png";
import imgIntegrante4 from "../components/img/lucia1.png";
import imgIntegrante5 from "../components/img/stefania1.png";
import imgIntegrante6 from "../components/img/diego1.png";

const coordinationTeam = [
  { img: imgIntegrante1, nombre: "DAFNA CURIEL" },
  { img: imgIntegrante2, nombre: "MARÍA INÉS GARAY" },
  { img: imgIntegrante3, nombre: "SANDRA GIRONA" },
];

const CommunicationTeam = [
  { img: imgIntegrante2, nombre: "MARÍA INÉS GARAY" },
  { img: imgIntegrante6, nombre: "DIEGO BENTANCOR" },
  { img: imgIntegrante4, nombre: "LUCIA" },
  { img: imgIntegrante5, nombre: "STEFANIA" },
  { img: imgIntegrante3, nombre: "SANDRA GIRONA" },
];

const MemberSlide = ({ member }) => (
  <div className="flex flex-col items-center relative group">
    <img
      src={member.img}
      alt={member.nombre}
      className="w-36 h-36 object-cover rounded-full mb-6 p-2 bg-white shadow-lg transform transition-transform duration-300 hover:scale-105"
    />
    <p className="absolute bottom-0 bg-black bg-opacity-60 text-white text-sm py-1 px-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      {member.nombre}
    </p>
  </div>
);

const SoloJuntos = () => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <div className="flex-grow my-[3rem] px-4">
      <h1 className="text-center text-3xl font-semibold mb-6 text-gray-800">
        Equipo Coordinador
      </h1>
      <div className="w-full max-w-4xl mx-auto"> {/* Hacemos el Swiper más pequeño */}
        <Swiper
          modules={[Pagination, Navigation]}
          pagination={{ clickable: true }}
          navigation={true}
          loop={true}
          spaceBetween={30}
          slidesPerView={3}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="shadow-xl bg-white rounded-lg p-6"
        >
          {coordinationTeam.map((member, index) => (
            <SwiperSlide key={index}>
              <MemberSlide member={member} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <h1 className="text-center text-3xl font-semibold mb-6 mt-12 text-gray-800">
        Equipo de Comunicación
      </h1>

      <div className="w-full max-w-5xl mx-auto"> {/* Hacemos el Swiper más grande */}
        <Swiper
          modules={[Pagination, Navigation]}
          pagination={{ clickable: true }}
          navigation={true}
          loop={true}
          spaceBetween={30}
          slidesPerView={4}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className="shadow-xl bg-white rounded-lg p-6"
        >
          {CommunicationTeam.map((member, index) => (
            <SwiperSlide key={index}>
              <MemberSlide member={member} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
    <Footer />
  </div>
);

export default SoloJuntos;
