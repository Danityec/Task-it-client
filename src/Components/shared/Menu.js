import React from 'react';
import './Menu.css'
import {IconButton} from "@material-ui/core";
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import {useHistory} from "react-router-dom";

const Menu = (props) => {
    let history = useHistory()

    const goBackBtn = () => {
        return (
            <IconButton onClick={() => history.goBack()} style={{color: '#2A73CC'}}>
                <ArrowBackIosRoundedIcon/>
            </IconButton>
        )
    }

    return (
        <div className={'menu-bar'}>
            <div className={`menu-bar-wrapper ${props.title ? " title" : ""}`}>
                <div className={'menu-back'}>
                    {props.goBack ? goBackBtn() : null }
                </div>
                <div className={'menu-btn-area'}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default Menu