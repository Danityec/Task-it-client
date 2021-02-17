import React from 'react';
import './Login.css'
import {GoogleLogin} from 'react-google-login'
import Header from "../shared/Header";
import {useHistory} from "react-router-dom";

const Login = (props) => {
    let history = useHistory();

    const googleSuccess = async (response) => {
        const body = {token: response.tokenId}
        fetch(`http://localhost:3000/authLogin`, {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body),
        })
            .then(response => response.json())
            .then(result => {
                let path = '/dashboard'
                if (result.admin) path = '/admin'
                history.push(path)
            });
    }

    const googleFailure = (response) => {
        console.log(response);
    }

    return (
        <>
            <div className={'login-page'}>
                <Header/>
                <div className={'login-circle'}/>
                <div className={'login-content'}>
                    <div className={'login-btn'}>
                        <h1>get productive!</h1>
                        <GoogleLogin
                                     clientId='554171649210-i97q2kqu31t4hg021qdpmjn9kbobor0h.apps.googleusercontent.com'
                                     onSuccess={googleSuccess}
                                     onFailure={googleFailure}
                        />
                    </div>
                    <div className={'login-text'}>
                        <p>create and manage tasks and subtasks</p>
                        <p>start from ready made templates</p>
                        <p>share your tasks with your <br/> team, family or friends</p>
                        <p>keep in touch with an <br/> inter-platform chat service</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login