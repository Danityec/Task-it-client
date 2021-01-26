import React from "react";
import CopyrightIcon from '@material-ui/icons/Copyright';
import './Footer.css'

const Footer = () => {
    return (
        <div className={"footer"}>
            <CopyrightIcon className={'copy-right'}/>
            <h6>TaskIt 2021</h6>
        </div>
    )
}

export default Footer