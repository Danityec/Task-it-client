import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {useCookies} from 'react-cookie'

const UserRouter = ({component: Component, ...rest}) => {
    const [cookies] = useCookies(['user']);

    const check = () => {
        console.log(rest)
        if (cookies.user)
            return true
        else
            return false
    }
    return (
        <Route {...rest} render={props => (
            check() ? <Component {...props} /> : <Redirect to="/"/>
        )}/>
    )
}

export default UserRouter