import { useState, forwardRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';

//API calls
import { put } from "../../../api/api-calls";

// Themes
import {ThemeProvider} from "@mui/material/styles";
import darkTheme from '../../../common/themes/DarkTheme';

// Animation for dialog open
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProductCardEdit({ product, setProducts }) {
  const [open, setOpen] = useState(false);

    // Event handlers
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        attemptPut();
        setOpen(false);
    };

  const [selectedName, setSelectedName] = useState(product.name);
  const [selectedPrice, setSelectedPrice] = useState(product.price);
  const [selectedWeight, setSelectedWeight] = useState(product.weight);

  const handleFieldModification = (event, type) => {
    switch (type) {
    case "name":
        setSelectedName(event.target.value);
    break;

    case "price":
        setSelectedPrice(event.target.value);
    break;

    case "weight":
        setSelectedWeight(event.target.value);
    break;

    default:
      break;
    }
  }

  async function attemptPut() {
    let modifiedProduct = {
      "name": selectedName,
      "price": selectedPrice,
      "weight": selectedWeight
  }
    put(product.id, modifiedProduct, "products", setProducts);
}

  return (
    <ThemeProvider theme={darkTheme}>
        <IconButton onClick={handleClickOpen}><EditIcon /></IconButton>
            <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}>
                <AppBar sx={{ position: 'relative', color: '#D9D9D9'}} >
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Edit product:
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleConfirm}>
                            EDIT
                        </Button>
                    </Toolbar>
                </AppBar>

                <Box
        component="form"
        sx={{
            '& .MuiTextField-root': { 
                m: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                width: '98.5%'},
        }}
        noValidate
        autoComplete="off"
            >
            <TextField
            required
            id="name"
            label="Product Name"
            variant="filled"
            value={selectedName}
            onChange={(event) => handleFieldModification(event, "name")}
            />
            <TextField
            id="price"
            label="Price"
            type="number"
            variant="filled"
            value={selectedPrice}
            onChange={(event) => handleFieldModification(event, "price")}
            />
            <TextField
            id="weight"
            label="Weight (grams)"
            type="number"
            variant="filled"
            value={selectedWeight}
            onChange={(event) => handleFieldModification(event, "weight")}
            />
        </Box>
            </Dialog>
    </ThemeProvider>
  );
}