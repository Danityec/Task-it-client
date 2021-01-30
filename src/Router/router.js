import React from 'react';
import {Route} from 'react-router-dom';
import Header from "../Components/shared/Header";
import Footer from "../Components/shared/Footer";
import HomePage from "../Components/homePage/HomePage";
import TemplateList from "../Components/template/TemplateList";
import ChatList from "../Components/chat/ChatList";
import Chat from "../Components/chat/Chat";
import Task from "../Components/task/Task";
import AdminHomePage from "../Components/admin/AdminHomePage";
import AdminTask from "../Components/admin/AdminTask";

const ReactRouter = () => {
    return (
        <>
            <Header/>  

            <Route exact path='/' component={HomePage}/>
            <Route path='/new-task' component={TemplateList}/>
            <Route path='/chats' component={ChatList}/>
            <Route path='/chat' component={Chat}/>
            <Route path='/task' component={Task}/> 
            <Route exact path='/admin' component={AdminHomePage}/>
            <Route path='/admin/template' component={AdminTask}/>  

            <Footer/>
        </>
    )
}

export default ReactRouter