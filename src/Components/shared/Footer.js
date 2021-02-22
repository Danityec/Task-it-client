import React, {useState} from "react";
import CopyrightIcon from '@material-ui/icons/Copyright';
import './Footer.css'
import Popper from '@material-ui/core/Popper';
import {ClickAwayListener, Fab} from '@material-ui/core';


const Footer = () => {
    const [quote, setQuote] = useState("")
    const [author, setAuthor] = useState("")
    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);

    const quoteAPI = () => {
        fetch(`https://task--it.herokuapp.com/quotes`, {credentials: 'include'})
            .then(response => response.json())
            .then(result => {
                setQuote(result[0].q)
                setAuthor(result[0].a)
                setOpen(true)
            })
    }

    return (
        <>
            <div className={"footer"}>
                <CopyrightIcon className={'copy-right'}/>
                <h6>TaskIt 2021</h6>
            </div>
            <div className={'btn-placement'}>
                <Fab className={'quote-btn'} variant="extended" size="small"
                     style={{backgroundColor: '#84BCFF', color: '#25265E'}} aria-label="add"
                     onClick={(e) => {
                         setAnchorEl(e.currentTarget);
                         // if (open) setOpen(false)
                         quoteAPI()
                     }}>
                    <p> inspire me ! </p>
                </Fab>
            </div>
            <ClickAwayListener onClickAway={() => setOpen(false)}>
                <Popper open={open} anchorEl={anchorEl} placement={'top-end'}
                        style={{minWidth: '200px', width: 'fit-content', marginBottom: '0.5%', maxHeight: '125px'}}>
                    <div className={'popper'}>
                        <p>Quote of the Day</p>
                        <p className={'quote'}>"{quote}"</p>
                        <p className={'author'}>{author}</p>
                    </div>
                </Popper>
            </ClickAwayListener>
        </>
    )
}

export default Footer