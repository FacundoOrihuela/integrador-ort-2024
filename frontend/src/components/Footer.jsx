import React from "react";

const Footer = () => {
  return (
    <footer className="bg-colors-1 text-white py-4">
      <div className="container mx-auto text-center">
        <p>© {new Date().getFullYear()} Centro Tiféret. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
