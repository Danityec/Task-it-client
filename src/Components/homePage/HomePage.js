import React, {useEffect, useState} from 'react';
import './HomePage.css'
import Menu from "../shared/Menu";
import {ButtonBase} from "@material-ui/core";
import List from "../shared/List";
import {Link} from "react-router-dom";
import Header from "../shared/Header";

const HomePage = (props) => {
    const [taskList, setTaskList] = useState([])
    const [titleList, setTitleList] = useState({})
    const [user] = useState(props.location.user)

    useEffect(() => {
        fetch(`http://localhost:3000/api/tasks?userID=${user.googleID}`, {credentials: 'include'})
            .then(response => response.json())
            .then(result => setTaskList(result))
    }, [])

    useEffect(() => {
        console.log(taskList)
        taskList.forEach((task) => {
            setTitleList(prevState => ({
                ...prevState, [task._id]: `${task.name}`
            }));
        })
    }, [taskList])

    const checkboxToggle = (id, completed) => {
        const body = {completed: completed}
        fetch(`http://localhost:3000/api/tasks/${id}`, {
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
            <Header user={user}/>
            <Menu goBack={false}>
                <Link to={{pathname: '/new-task', userId: user.googleID}}>
                    <ButtonBase centerRipple={true}><p style={{width: '180px'}}>Create New Task</p></ButtonBase>
                </Link>
                <Link to={{pathname: '/chats', userId: user.googleID}}>
                    <ButtonBase centerRipple={true} onClick={null} style={{backgroundColor: '#2A73CC'}}><p
                        style={{width: '100px'}}>Chat</p></ButtonBase>
                </Link>
            </Menu>
            <div className={'task-list'}>
                <List checkboxes={true} checkboxToggle={checkboxToggle} userId={user.googleID} dataList={taskList}
                      titleList={titleList} pathName={'/task'}/>
            </div>
        </>)
}

export default HomePage