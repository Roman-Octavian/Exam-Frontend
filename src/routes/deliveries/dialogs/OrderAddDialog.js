import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// API calls
import { get, post } from "../../../api/api-calls";

export default function OrderAddDialog({delivery, setOrders}) {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState({});

  const handleFieldModification = (event, type) => {
    switch (type) {
    case "quantity":
        setSelectedQuantity(event.target.value);
    break;

    case "product":
        setSelectedProduct(event.target.value);
    break;

    default:
      break;
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    get("products", setProducts);
  }, []);

  async function attemptPost() {
    const order = {
      "quantity": selectedQuantity,
      "product": selectedProduct,
      "delivery": delivery
  }
    post(order, "orders", setOrders);
}

  return (
    <div>
        <Button onClick={handleClickOpen} sx={{ m: 2}} variant="outlined" startIcon={<AddIcon />}>
            New Order
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Order</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="quantity"
                        label="Quantity"
                        type="number"
                        value={selectedQuantity}
                        fullWidth
                        variant="standard"
                    />
                    <FormControl sx={{ m: 1}} fullWidth>
                <InputLabel id="demo-simple-select-label">Product</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Product"
            >
                {products.length > 0 
                ? products.map((product) => (
                    <MenuItem
                        key = {product.id}
                    >{product.name}</MenuItem>
                ))
                : <p>No products available</p>
            }
            </Select>
            </FormControl>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Add</Button>
                </DialogActions>
      </Dialog>
    </div>
  );
}