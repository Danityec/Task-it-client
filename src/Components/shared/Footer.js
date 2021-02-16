import React, { useEffect, useState } from "react";
import CopyrightIcon from '@material-ui/icons/Copyright';
import './Footer.css'
import Popper from '@material-ui/core/Popper';
import { ButtonBase} from '@material-ui/core';


const Footer = () => {
    const [quote, setQuote] = useState("")
    const [author, setAuthor] = useState("")
    const [open, setOpen] = useState(true)


    useEffect(() => {
        quoteAPI();
    }, []);

    const quoteAPI = () => {
        fetch(`https://zenquotes.io/api/random`, {
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            method: 'GET',
        })
            .then(response => response.json())
            .then(result => {
                setQuote(result.q);
                console.log(result.q)
                setAuthor(result.a);
                console.log(result.a)
            })
    }

    return (
        <>
            <div className={'footer-page'}>
                <div className={"footer"}>
                    <CopyrightIcon className={'copy-right'} />
                    <h6>TaskIt 2021</h6>
                </div>
                <div className={'buttonDiv'}>
                    <ButtonBase className={'buttonBase'} type="button" onChange={e => setQuote(e.q)} onClick={() => setOpen(!open)} style={{backgroundColor: '#34B467'}}>
                        <p>New Quote</p>
                    </ButtonBase>
                </div>
            </div >
            <Popper open={open}>
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