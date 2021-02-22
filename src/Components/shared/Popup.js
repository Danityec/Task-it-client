import React from 'react';
import './Popup.css';
import {ButtonBase, Modal} from "@material-ui/core";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";

const Popup = (props) => {
    const deleteBtn = () => {
        return (
            <>
                <ButtonBase className={'ok-btn'} centerRipple={true} onClick={props.closePopup}>
                    <p style={{width: '120px'}}>No, Go back</p>
                </ButtonBase>
                <ButtonBase className={'delete-btn'} centerRipple={true} onClick={props.onSubmit}>
                    <p style={{width: '120px'}}>Yes, Delete</p>
                </ButtonBase>
            </>
        )
    }

    const okBtn = () => {
        return (
            <ButtonBase className={'ok-btn'} centerRipple={true} onClick={props.onSubmit}>
                <p style={{width: '30px'}}>OK</p>
            </ButtonBase>
        )
    }

    const renderModal = () => {
        return (
            <div className={'popup-modal'}>
                <div className={'modal-title-area'}>
                    <h1>{props.title}</h1>
                    <ButtonBase className={'modal-close-btn'} onClick={props.closePopup}>
                        <CloseRoundedIcon/>
                    </ButtonBase>
                </div>
                <div className={'modal-content-area'}>
                    {props.children}
                </div>
                <div className={'modal-btn-area'}>
                    {props.isDelete ? deleteBtn() : okBtn()}
                </div>
            </div>
        )
    }

    return (
        <Modal open={props.open} onClose={props.closePopup}>
            {renderModal()}
        </Modal>
    )
}

export default Popup;