import React from 'react';
import './Menu.css'
import {IconButton} from "@material-ui/core";
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import {useHistory} from "react-router-dom";

const Menu = (props) => {
    let history = useHistory()

    const goBackBtn = () => {
        return (
            <div className={'menu-back'}>
                <IconButton onClick={() => history.goBack()} style={{ color: '#2A73CC'}}>
                    <ArrowBackIosRoundedIcon/>
                </IconButton>
            </div>
        )
    }

    return (
        <div className={'menu-bar'}>
            <div className={`menu-bar-wrapper ${props.title ? " title" : ""}`} >
                {props.goBack ? goBackBtn() : null}
                <div className={'menu-btn-area'}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default Menu