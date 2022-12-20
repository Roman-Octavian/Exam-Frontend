import { useState, useEffect, forwardRef } from 'react';
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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Divider  from '@mui/material/Divider';

import OrderElement from './OrderElement.js'
import OrderAddDialog from './OrderAddDialog.js';

//API calls
import { put, get } from "../../../api/api-calls";

// Themes
import {ThemeProvider} from "@mui/material/styles";
import darkTheme from '../../../common/themes/DarkTheme';

// Animation for dialog open
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeliveryCardEdit({ delivery, setDeliveries }) {
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

    const [selectedDate, setSelectedDate] = useState(delivery.date);
    const [selectedDestination, setSelectedDestination] = useState(delivery.destination);
    const [selectedWarehouse, setSelectedWarehouse] = useState(delivery.warehouse);

    const handleFieldModification = (event, type) => {
        switch (type) {
        case "date":
            setSelectedDate(event.target.value);
        break;
        case "destination":
            setSelectedDestination(event.target.value);
        break;
        case "warehouse":
            setSelectedWarehouse(event.target.value);
        break;
        default:
          break;
        }
    }

    const [orders, setOrders] = useState([]);

    const addOrder = () => {
       
    }

    useEffect(() => {
        get("orders", setOrders);

    }, [])

  async function attemptPut() {
    let modifiedDelivery = {
        "date": selectedDate,
        "destination": selectedDestination,
        "warehouse": selectedWarehouse
  }
    put(delivery.id, modifiedDelivery, "deliveries", setDeliveries);
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
                            Edit delivery:
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
            id="date"
            label="Delivery Date"
            type="date"
            variant="filled"
            value={selectedDate}
            onChange={(event) => handleFieldModification(event, "date")}
            />
            <TextField
            id="destination"
            label="Destination"
            variant="filled"
            value={selectedDestination}
            onChange={(event) => handleFieldModification(event, "destination")}
            />
            <FormControl sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-label">Origin</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedWarehouse}
            label="Origin"
            onChange={(event) => handleFieldModification(event, "warehouse")}
            >
                <MenuItem value={"Warehouse 1"}>Warehouse 1</MenuItem>
                <MenuItem value={"Warehouse 2"}>Warehouse 2</MenuItem>
                <MenuItem value={"Warehouse 3"}>Warehouse 3</MenuItem>
            </Select>
            </FormControl>
            <OrderAddDialog delivery = {delivery} setOrders = {setOrders}/>
            <Divider />
            {orders.length > 0
            ? orders.map((order, index) => (
                order.delivery.id === delivery.id ?
                (<OrderElement 
                    order = {order}
                    delivery = {delivery}
                    key = {index}
                />)
                : null
            ))
            : <p>No orders created yet.</p>
            }
        </Box>
            </Dialog>
    </ThemeProvider>
  );
}