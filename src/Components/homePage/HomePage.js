import React, {useEffect, useState} from 'react';
import './HomePage.css'
import Menu from "../shared/Menu";
import {ButtonBase} from "@material-ui/core";
import List from "../shared/List";
import {Link} from "react-router-dom";
import Header from "../shared/Header";
import axios from "axios";

// const userId = '106859904573047383930'

const HomePage = (props) => {
    const [taskList, setTaskList] = useState([])
    const [titleList, setTitleList] = useState({})
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        setUserId(props.location.userId)
        console.log("userId: "+props.location.userId)
    }, [])

    useEffect(() => {
        fetch(`http://127.0.0.1:3000/api/tasks?userID=${userId}`)
            .then(response => response.json())
            .then(result => setTaskList(result))
        // axios.get(`http://127.0.0.1:3000/api/tasks?userID=${userId}`, {withCredentials: true, credentials: 'include'})
        //     .then(res => {
        //         console.log(res.data)
        //         setTaskList(res.data)
        //     })
        //     .catch(err => console.log(err))
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
        fetch(`http://127.0.0.1:3000/api/tasks/${id}`,
            {headers: {'Content-Type': 'application/json'}, method: 'PUT', body: JSON.stringify(body)})
            .then(response => response.json())
            .then(result => {})
    }

    return (
        <>
            <Header userId={userId}/>
            <Menu goBack={false}>
                <Link to={{pathname: '/new-task', userId: userId}}>
                    <ButtonBase centerRipple={true}><p style={{width: '180px'}}>Create New Task</p></ButtonBase>
                </Link>
                <Link to={{pathname: '/chats', userId: userId}}>
                    <ButtonBase centerRipple={true} onClick={null} style={{ backgroundColor:'#2A73CC'}}><p style={{width: '100px'}}>Chat</p></ButtonBase>
                </Link>
            </Menu>
            <div className={'task-list'}>
                <List checkboxes={true} checkboxToggle={checkboxToggle} userId={userId} dataList={taskList} titleList={titleList} pathName={'/task'}/>
            </div>
        </>)
}

export default HomePage