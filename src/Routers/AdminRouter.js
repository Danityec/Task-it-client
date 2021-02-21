import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useCookies} from "react-cookie";

const AdminRouter = ({component: Component, ...rest}) => {
    const [cookies] = useCookies(['user']);

    const isAuthenticated = () => {
        if(cookies.user.googleID) return !!cookies.user.admin
        else return false
    }

    return (
        <Route {...rest} render={props => (
            isAuthenticated() ? <Component {...props} /> : <Redirect to="/"/>
        )}/>
    )
}

export default AdminRouter