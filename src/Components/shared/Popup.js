import React from 'react';
import './Popup.css';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';


const Popup = (props) => {
   

    return (
        <div className="popup">
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
    )

}

export default Popup;