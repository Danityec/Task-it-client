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

    useEffect(() => {
        quoteAPI();
    }, []);

    const quoteAPI = (e) => {
        fetch(`https://zenquotes.io/api/random`, {
            headers: {'Content-Type': 'application/json'},
            // credentials: 'include',
            mode: 'no-cors',
            method: 'GET',
        })
            .then(response => response.json())
            .catch(err=>console.log(err))
            .then(result => {
                console.log(result)
                setQuote(result.q);
                setAuthor(result.a);
                // console.log(result.a)
                setOpen(!open);
            })
            .catch(err=>console.log(err))
    }

    return (
        <>
            <div className={"footer"}>
                <CopyrightIcon className={'copy-right'}/>
                <h6>TaskIt 2021</h6>
            </div>
            <div className={'buttonDiv'}>
                <ButtonBase id={'btn'} className={'buttonBase'} type="button" style={{backgroundColor: '#34B467'}}
                            onClick={(e) => { setAnchorEl(e.currentTarget); setOpen(!open); quoteAPI(e);}}>
                    <p>New Quote</p>
                </ButtonBase>
            </div>
            <Popper open={open} anchorEl={anchorEl} placement={'top-end'}>
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