import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import ReactRouter from './Router/router';
import './index.css'

ReactDOM.render(
    <Router>
        <ReactRouter/>
    </Router>,
    document.getElementById('root')
);