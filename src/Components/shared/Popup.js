import React, { useState } from 'react';
import './Popup.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import { SignalCellularNull } from '@material-ui/icons';


const Popup = (props) => {
    const [open, setOpen] = useState(false);
   

    return (
        <div className="popup">
            <div className="newTask">
               
                <Dialog open={props.open} aria-labelledby="form-dialog-title">

                    <DialogTitle className="titlePopupNewTask" id="form-dialog-title" >{props.title}</DialogTitle>

                    <DialogContent>
                        {props.children}
                    </DialogContent>
                    
                    <DialogContentText className="popupTextNewTask">{props.text}</DialogContentText>
                    <DialogActions>
                        <Button className="buttonOK" variant="contained" color="primary" onClick={props.onSubmit} >
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )

}

export default Popup;