import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import Footer from "./Footer";
import Header from "./Header";

import portadaImg1 from "../components/img/portrait1.jpg";
import portadaImg2 from "../components/img/portrait2.jpg";
import portadaImg3 from "../components/img/portrait3.jpg";
import logoSinTexto from "../components/img/logoSinTexto.png";

const images = [portadaImg1, portadaImg2, portadaImg3];

const MainContent = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col min-h-screen bg-cover bg-center"
    >
      <Header />
      <div className="flex-1 flex flex-col justify-center items-center relative w-full h-full overflow-hidden">
        <Swiper
          modules={[Pagination, Autoplay, EffectFade]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          effect="fade"
          speed={2000}
          className="shadow-lg w-full h-full relative"
        >
          <img
            src={logoSinTexto}
            alt="Logo"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-200 h-auto"
          />
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div
                className="w-full h-screen bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <Footer />
    </motion.div>
  );
};

export default MainContent;
