import React from 'react';
import {Route} from 'react-router-dom';
import Header from "../Components/shared/Header";
import Footer from "../Components/shared/Footer";
// import Menu from "../Components/shared/Menu";
// import HomePage from "../Components/homePage/HomePage";
import TemplateList from "../Components/template/TemplateList";
// import ChatList from "../Components/chat/ChatList";
// import Chat from "../Components/chat/Chat";
// import Task from "../Components/task/Task";


const ReactRouter = () => {
    return (
        <>
            <Header/>
            {/* <Menu/> */}
            
            {/* <Route exact path='/' component={HomePage}/> */}
            <Route path='/new-task' component={TemplateList}/>
            {/* <Route path='/chats' component={ChatList}/>
            <Route path='/chat' component={Chat}/>
            <Route path='/task' component={Task}/> */}

            <Footer/>
        </>
    )
}

export default ReactRouter