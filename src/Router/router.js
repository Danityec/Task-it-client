import React from 'react';
import {Route} from 'react-router-dom';
import Header from "../Components/shared/Header";
import Footer from "../Components/shared/Footer";

const ReactRouter = () => {
    return (
        <>
            <Header/>
            <Route exact path='/' component={'ss'}/>
            <Footer/>
        </>
    )
}

export default ReactRouter