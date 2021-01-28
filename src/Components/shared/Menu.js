import React from 'react';
import {IconButton} from "@material-ui/core";
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import {NavLink} from "react-router-dom";

const Menu = (props) => {
    const goBackBtn = () => {
        return (
            <div>
                <IconButton to={props.goTo}>
                    <ArrowBackIosRoundedIcon/>
                </IconButton>
            </div>
        )
    }

    return (
        <div>
            {props.goBack ? goBackBtn : null}
            <div>
                {props.children}
            </div>
        </div>
    )
}

export default Menu