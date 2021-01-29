import React, { useEffect, useState } from 'react';
import './Popup.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';



const Popup = (props) => {
    const [open, setOpen] = useState(false);
    const data = { task: 'task' };
    
    useEffect(() => {
        fetch(`http://localhost:3000/api/tasks` , {
            method: 'POST',
            body: JSON.stringify(data),
          })
        .then(response => response.json())
        .then(data => {console.log('Success:', data);})
        .catch((error) => {console.error('Error:', error);}); 
        
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div className="popup">
            <div className="newTask">
                <Button variant="contained" color="primary" onClick={handleClickOpen}>
                    Creat Task from Scratch
                </Button>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle className="titlePopupNewTask" id="form-dialog-title">New Task</DialogTitle>
                    <DialogContent>
                        <TextField className="inputNameTask"
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            type="Name"
                            fullWidth
                        />
                        <TextField className="inputCategory"
                            autoFocus
                            margin="dense"
                            id="Category"
                            label="Category"
                            type="Category"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogContentText className="popupTextNewTask">
                        Add subTask later in the task page
                    </DialogContentText>
                    <DialogActions>
                        <Button className="buttonOK" variant="contained" color="primary" onClick={handleClose} >
                            OK
                        </Button>
                        <Button className="buttonCANCEL" variant="contained" color="primary" onClick={handleClose}>
                            CANCEL
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )

}

export default Popup;