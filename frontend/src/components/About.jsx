import Footer from "./Footer";
import Header from "./Header";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow mt-[5rem]"> {/* Espacio para evitar que lo tape el header */}
        <h1 className="text-center text-2xl font-bold">Acerca de nosotros</h1>
        <p className="mt-4 px-6 text-center"> 
          Bienvenido a nuestra página de "Acerca de nosotros". Aquí encontrarás información sobre nuestra misión, visión y valores xd.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default About;
