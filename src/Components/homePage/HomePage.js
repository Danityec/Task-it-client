import React, {useEffect, useState} from 'react';
import './HomePage.css'
import Menu from "../shared/Menu";
import {ButtonBase} from "@material-ui/core";
import List from "../shared/List";
import {Link} from "react-router-dom";
import Header from "../shared/Header";
import {useCookies} from "react-cookie";

const HomePage = (props) => {
    const [taskList, setTaskList] = useState([])
    const [titleList, setTitleList] = useState({})
    const [cookies] = useCookies(['user']);

    useEffect(() => {
        let tasks = []
        const myHeaders = new Headers({
            'Content-Type': 'application/json',
            'user': cookies.user.googleID
        });
        fetch(`https://task--it.herokuapp.com/api/tasks?userID=${cookies.user.googleID}`, {
                credentials: 'include',
                headers: myHeaders
            })
            .then(response => response.json())
            .then(result => {
                console.log(result)
                tasks = tasks.concat(result)
                fetch(`https://task--it.herokuapp.com/api/tasks?email=${cookies.user.email}`, {
                    credentials: 'include',
                    headers: {'user': cookies.user}
                })
                    .then(response => response.json())
                    .then(resultTwo => {
                        tasks = tasks.concat(resultTwo)
                        setTaskList(tasks)
                    })
            })
    }, [cookies.user.email, cookies.user.googleID])

    useEffect(() => {
        taskList.forEach((task) => {
            setTitleList(prevState => ({
                ...prevState, [task._id]: `${task.name}`
            }));
        })
    }, [taskList])

    const checkboxToggle = (id, completed) => {
        const body = {completed: completed}
        fetch(`https://task--it.herokuapp.com/api/tasks/${id}`, {
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            method: 'PUT',
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(result => {})
    }

    return (
        <>
            <Header/>
            <Menu goBack={false}>
                <Link to={{pathname: '/new-task'}}>
                    <ButtonBase centerRipple={true}><p style={{width: '180px'}}>Create New Task</p></ButtonBase>
                </Link>
                <Link to={{pathname: '/chats'}}>
                    <ButtonBase centerRipple={true} onClick={null} style={{backgroundColor: '#2A73CC'}}><p
                        style={{width: '100px'}}>Chat</p></ButtonBase>
                </Link>
            </Menu>
            <div className={'task-list'}>
                <List checkboxes={true} checkboxToggle={checkboxToggle} dataList={taskList}
                      titleList={titleList} pathName={'/task'}/>
            </div>
        </>)
}

export default HomePage