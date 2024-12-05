import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

const Cart = () => {
    const { cart, removeFromCart } = useContext(CartContext);

    const calculateSubtotal = () => {
        return cart.reduce((total, item) => total + item.priceAtAddition * item.quantity, 0);
    };

    return (
        <div className="absolute top-16 right-0 w-64 bg-white shadow-lg p-4">
            <h2 className="text-lg font-bold mb-4">Carrito de Compras</h2>
            {cart.length === 0 ? (
                <p>El carrito está vacío</p>
            ) : (
                <ul>
                    {cart.map((item) => (
                        <li key={item.id} className="relative flex mb-2">
                            <div className="w-2/3 flex flex-col">
                                <span className="font-bold">{item.Product.name}</span>
                                <span>{item.quantity}x ${item.priceAtAddition}</span>
                            </div>
                            <div className="w-1/3">
                                <img 
                                    src={`http://localhost:3001${item.Product.image}`} 
                                    alt={item.Product.name} 
                                    className="w-full h-16 object-cover" 
                                />
                            </div>
                            <button
                                onClick={() => removeFromCart(item.productId)}
                                className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded-full"
                            >
                                &times;
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            <div className="mt-4">
                <h3 className="text-lg font-bold">Subtotal: ${calculateSubtotal().toFixed(2)}</h3>
            </div>
        </div>
    );
};

export default Cart;