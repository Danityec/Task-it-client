import React, {useEffect, useState} from "react";
import CopyrightIcon from '@material-ui/icons/Copyright';
import './Footer.css'
import Popper from '@material-ui/core/Popper';
import {ButtonBase} from '@material-ui/core';


const Footer = () => {
    const [quote, setQuote] = useState("")
    const [author, setAuthor] = useState("")
    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);

    const quoteAPI = () => {
        fetch(`http://localhost:3000/quotes`, {credentials: 'include'})
            .then(response => response.json())
            .then(result => {
                setQuote(result[0].q);
                setAuthor(result[0].a);
            })
    }

    return (
        <>
            <div className={"footer"}>
                <CopyrightIcon className={'copy-right'}/>
                <h6>TaskIt 2021</h6>
            </div>
            <div className={'buttonDiv'}>
                <ButtonBase className={'buttonBase'} type="button" style={{backgroundColor: '#34B467'}}
                            onClick={(e) => {
                                quoteAPI();
                                setAnchorEl(e.currentTarget);
                                setOpen(!open);
                            }}>
                    <p>New Quote</p>
                </ButtonBase>
            </div>
            <Popper open={open} anchorEl={anchorEl} placement={'top-end'}
            style={{ minWidth: '200px', width: 'fit-content'}}>
                <div className={'popper'}>
                    <p>Quote of the Day</p>
                    <p className={'quote'}>{quote}</p>
                    <p className={'author'}>{author}</p>
                </div>
            </Popper>

        </>
    )
}

export default Footer