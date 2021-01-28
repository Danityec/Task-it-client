import React from 'react';
import './Menu.css'
import {IconButton} from "@material-ui/core";
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import {NavLink} from "react-router-dom";

const Menu = (props) => {
    const goBackBtn = () => {
        return (
            <div className={'menu-back'}>
                <IconButton to={props.goTo} style={{ color: '#2A73CC'}}>
                    <ArrowBackIosRoundedIcon/>
                </IconButton>
            </div>
        )
    }

    return (
        <div className={'menu-bar'}>
            <div className={'menu-bar-wrapper'}>
                {props.goBack ? goBackBtn() : null}
                <div className={'menu-btn-area'}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default Menu