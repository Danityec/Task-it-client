import React from 'react';
import {Route} from 'react-router-dom';
import Footer from "../Components/shared/Footer";
import HomePage from "../Components/homePage/HomePage";
import TemplateList from "../Components/template/TemplateList";
import ChatList from "../Components/chat/ChatList";
import Chat from "../Components/chat/Chat";
import Task from "../Components/task/Task";
import AdminHomePage from "../Components/admin/AdminHomePage";
import Login from "../Components/login/Login";
import UserRouter from "./UserRouter";
import AdminRouter from "./AdminRouter";

const ReactRouter = () => {
    return (
        <>
            <Route exact path='/' component={Login}/>
            <UserRouter path='/dashboard' component={HomePage}/>
            <UserRouter path='/new-task' component={TemplateList}/>
            <UserRouter path='/chats' component={ChatList}/>
            <UserRouter path='/chat' component={Chat}/>
            <UserRouter path='/task' component={Task}/>
            <AdminRouter exact path='/admin' component={AdminHomePage}/>
            <AdminRouter path='/admin/template' component={Task}/>

            <Footer/>
        </>
    )
}

export default ReactRouter