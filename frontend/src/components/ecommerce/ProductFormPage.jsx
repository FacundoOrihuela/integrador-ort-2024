// ProductFormPage.jsx
import React from 'react';
import ProductForm from './ProductForm';
import config from "../../utils/config.json";

const ProductFormPage = () => {
  const handleSubmit = (formData) => {
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviarlo a tu API
    fetch(`${config.apiUrl}/api/products`, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log('Producto creado:', data);
        // Puedes agregar lógica adicional aquí, como redirigir al usuario o mostrar un mensaje de éxito
      })
      .catch(error => {
        console.error('Error al crear el producto:', error);
        // Puedes agregar lógica adicional aquí, como mostrar un mensaje de error
      });
  };

  return (
    <div>
      <h1>Crear Producto</h1>
      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
};

export default ProductFormPage;