import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import axios from "axios";
import config from "../../../utils/config.json";


const SendProduct = ({ client, products, selectedProducts, setSelectedProducts, handleSendProductSubmit, setIsModalOpen }) => {
  const handleProductSelect = (product) => {
    setSelectedProducts((prevSelectedProducts) => {
      if (prevSelectedProducts.includes(product)) {
        return prevSelectedProducts.filter((p) => p !== product);
      } else {
        return [...prevSelectedProducts, product];
      }
    });
  };

  const handleSendProduct = async () => {
    const productIds = selectedProducts.map((product) => product.id);
    try {
      const response = await axios.post(`${config.apiUrl}/api/orders/create-with-products`, {
        userId: client.id,
        productIds,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      console.log("Productos enviados:", response.data);
      handleSendProductSubmit();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error sending products:", error);
    }
  };

  return (
    <Dialog open={true} onClose={() => setIsModalOpen(false)} maxWidth="sm" fullWidth>
      <DialogTitle>Enviar Productos a {client?.name}</DialogTitle>
      <DialogContent>
        <List>
          {products.map((product) => (
            <ListItem
              key={product.id}
              button
              onClick={() => handleProductSelect(product)}
              sx={{
                backgroundColor: selectedProducts.includes(product) ? "primary.light" : "inherit",
                "&:hover": { backgroundColor: "primary.main", color: "white" },
              }}
            >
              <ListItemAvatar>
                <Avatar src={product.image} />
              </ListItemAvatar>
              <ListItemText primary={product.name} secondary={`$${product.price}`} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsModalOpen(false)} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleSendProduct} color="primary">
          Enviar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SendProduct;