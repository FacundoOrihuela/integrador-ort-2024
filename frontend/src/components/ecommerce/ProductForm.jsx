import React, { useState } from 'react';

const ProductForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', parseFloat(price));
    formData.append('stock', parseInt(stock, 10));
    formData.append('categoryId', parseInt(categoryId, 10));
    if (image) {
      formData.append('image', image);
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required />
      <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="Stock" required />
      <input type="number" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} placeholder="Category ID" required />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProductForm;