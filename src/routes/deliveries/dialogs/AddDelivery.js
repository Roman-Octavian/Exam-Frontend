import { useState, forwardRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

//API calls
import { post } from "../../../api/api-calls";

// Themes
import {ThemeProvider} from "@mui/material/styles";
import darkTheme from '../../../common/themes/DarkTheme';

// Animation for dialog open
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddDelivery({ setDeliveries }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    attemptPost();
    setOpen(false);

  };

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState("");

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

  async function attemptPost() {
    const delivery = {
      "date": selectedDate,
      "destination": selectedDestination,
      "warehouse": selectedWarehouse
  }
    post(delivery, "deliveries", setDeliveries);
}

  return (
    <ThemeProvider theme={darkTheme}>

        <div>
            <Fab 
                color="#D9D9D9" 
                aria-label="add" 
                style={{ position: "fixed",  bottom: "70px", right: "50px"}}
                onClick={handleClickOpen}>
                <AddIcon />
            </Fab>
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
                            Create new delivery:
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleConfirm}>
                            CREATE
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
        </Box>
            </Dialog>
        </div>

    </ThemeProvider>
  );
}