import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import {
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Button,
  ClickAwayListener,
} from "@mui/material";
import {
  Remove as RemoveIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

const Cart = ({ onClose }) => {
  const { cart, removeFromCart, decreaseQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  const calculateSubtotal = () => {
    return cart.reduce(
      (total, item) => total + item.priceAtAddition * item.quantity,
      0
    );
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <ClickAwayListener onClickAway={onClose}>
      <Box className="absolute top-16 right-0 w-80 bg-white shadow-lg p-4" sx={{ overflowX: 'hidden' }}>
        <Typography variant="h6" className="text-black font-bold mb-4">
          Carrito de Compras
        </Typography>
        {cart.length === 0 ? (
          <Typography className="text-black">El carrito está vacío</Typography>
        ) : (
          <List sx={{ maxHeight: "300px", overflowY: "auto" }}>
            {cart.map((item) => {
              // Extraer la ruta relativa de la URL de Cloudinary
              const cloudinaryUrl = new URL(item.Product.image);
              const relativePath = cloudinaryUrl.pathname;

              // Construir la URL de Imgix basada en la ruta relativa
              const imgixUrl = `https://tiferet-689097844.imgix.net${relativePath}`;

              return (
                <ListItem key={item.id} className="flex mb-2" sx={{ alignItems: 'center', overflowX: "hidden"  }}>
                  <ListItemAvatar>
                    <Avatar
                      src={`${imgixUrl}?w=64&h=64&fit=crop`}
                      alt={item.Product.name}
                      className="w-16 h-16 object-cover"
                    />
                  </ListItemAvatar>
                  <Box sx={{ flex: '1 1 auto', maxWidth: '200px', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    <Typography className="font-bold text-black">{item.Product.name}</Typography>
                    <Typography className="text-black">{item.quantity}x ${item.priceAtAddition}</Typography>
                  </Box>
                  <Box className="flex">
                    <IconButton
                      onClick={() => decreaseQuantity(item.productId)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded-full"
                    >
                      <RemoveIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => removeFromCart(item.productId)}
                      className="bg-red-500 text-white px-2 py-1 rounded-full"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </ListItem>
              );
            })}
          </List>
        )}
        <Box className="mt-4">
          <Typography variant="h6" className="text-black font-bold">
            Subtotal: ${calculateSubtotal().toFixed(2)}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ color: "white" }}
            className="w-full mt-4"
            onClick={handleCheckout}
          >
            Comprar
          </Button>
        </Box>
      </Box>
    </ClickAwayListener>
  );
};

export default Cart;
