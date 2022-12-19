// React hooks
import { useState, useEffect, forwardRef } from "react";
// React Material UI library components
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from "@mui/material/IconButton";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
// API calls
import { deleteById } from "../../../api/api-calls";

// Animation for confirmation dialog
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
    });

export default function ProductCardDelete({product, setProducts}) {

    // State
    const [confirmationOpen, setConfirmationOpen] = useState(false);

    // Event handlers
    const handleConfirmationOpen = (event) => {
        if (event)event.stopPropagation();
        setConfirmationOpen(true);
    };
    const handleConfirmationClose = (event) => {
        if (event) event.stopPropagation();
        setConfirmationOpen(false);
    };
    const handleDelete = (event) => {
        if (event) event.stopPropagation();
        deleteById(product.id, "products");
        setProducts((current) => current.filter((item) => item.id !== product.id));  
    }
    
    return (
        <>
            <IconButton onClick={handleConfirmationOpen}><DeleteForeverIcon /></IconButton>
                    <Dialog
                        open={confirmationOpen}
                        TransitionComponent={Transition}
                        onClose={handleConfirmationClose}
                        aria-describedby="alert-dialog-slide-description"
                    >
                    <DialogTitle>WARNING: This action is permanent!</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            {'Are you sure you want to delete the product ' + '"' + product.name + '"?'}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color="error" onClick={handleDelete}>Yes</Button>
                        <Button onClick={handleConfirmationClose}>No</Button>
                    </DialogActions>
                </Dialog>
        </>
    );
}