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
    const [userId] = useState(props.location.userId)
    const [userImg] = useState(props.location.userImg)

    useEffect(() => {
        fetch(`http://localhost:3000/api/tasks?userID=${userId}`, {credentials: 'include'})
            .then(response => response.json())
            .then(result => setTaskList(result))
    }, [userId])

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
            <Header userImg={userImg}/>
            <Menu goBack={false}>
                <Link to={{pathname: '/new-task', userId: userId}}>
                    <ButtonBase centerRipple={true}><p style={{width: '180px'}}>Create New Task</p></ButtonBase>
                </Link>
                <Link to={{pathname: '/chats', userId: userId}}>
                    <ButtonBase centerRipple={true} onClick={null} style={{backgroundColor: '#2A73CC'}}><p
                        style={{width: '100px'}}>Chat</p></ButtonBase>
                </Link>
            </Menu>
            <div className={'task-list'}>
                <List checkboxes={true} checkboxToggle={checkboxToggle} userId={userId} dataList={taskList}
                      titleList={titleList} pathName={'/task'}/>
            </div>
        </>)
}

export default HomePage