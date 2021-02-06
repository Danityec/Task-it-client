import React from 'react';
import axios from 'axios';

import './Login.css'
import {GoogleLogin} from 'react-google-login'
import Header from "../shared/Header";
import {useHistory} from "react-router-dom";

const Login = (props) => {
    let history = useHistory();

    const googleSuccess = async (response) => {
        const tmp = {
            token: response.tokenId
        }
    console.log('fff')
        axios.post('http://localhost:3000/authLogin', tmp, {withCredentials: true, credentials: 'include'})
            .then(res => {
                console.log(res.data)
                history.push({
                    pathname: '/dashboard',
                    data: res.data
                })
            })
            .catch(err => console.log(err))
    }

    const googleFailure = (response) => {
        console.log(response);
    }

    return (
        <>
            <Header/>
            <div className={'login-page'}>
                <GoogleLogin className={'login-btn'}
                             clientId='554171649210-i97q2kqu31t4hg021qdpmjn9kbobor0h.apps.googleusercontent.com'
                             onSuccess={googleSuccess}
                             onFailure={googleFailure}
                />
            </div>
        </>
    )
}

export default Login