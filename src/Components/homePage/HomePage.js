import React, {useEffect, useState} from 'react';
import './HomePage.css'
import Menu from "../shared/Menu";
import {ButtonBase} from "@material-ui/core";
import List from "../shared/List";
import {Link, useHistory} from "react-router-dom";
import Header from "../shared/Header";
import axios from "axios";

const HomePage = (props) => {
    let history = useHistory();
    const [taskList, setTaskList] = useState([])
    const [titleList, setTitleList] = useState({})
    const [userId] = useState(props.location.userId)

    useEffect(() => {
        axios.get(`http://localhost:3000/api/tasks?userID=${userId}`, {withCredentials: true})
            .then(res => setTaskList(res.data))
            .catch(err => history.push('/'))
    }, [])

    useEffect(() => {
        taskList.forEach((task) => {
            setTitleList(prevState => ({
                ...prevState, [task._id]: `${task.name}`
            }));
        })
    }, [taskList])

    const checkboxToggle = (id, completed) => {
        const body = {completed: completed}
        axios.post(`http://localhost:3000/api/tasks/${id}`, body, {withCredentials: true})
            .then(res => {
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <Header userId={userId}/>
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