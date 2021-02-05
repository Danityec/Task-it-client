import React, {useEffect, useState} from 'react';
import './HomePage.css'
import Menu from "../shared/Menu";
import {ButtonBase} from "@material-ui/core";
import List from "../shared/List";
import {Link} from "react-router-dom";

const userId = '5fecb592690ca7935ccfd762'

const HomePage = (props) => {
    const [taskList, setTaskList] = useState([]);
    const [titleList, setTitleList] = useState({});

    useEffect(() => {
        fetch(`http://127.0.0.1:3000/api/tasks?userID=${userId}`)
            .then(response => response.json())
            .then(result => setTaskList(result))
    }, [])

    useEffect(() => {
        taskList.forEach((task) => {
            setTitleList(prevState => ({
                ...prevState, [task._id]: `${task.name}`
            }));
        })
    }, [taskList])

    const checkboxToggle = (id, completed) => {
        const body = {
            completed: completed
        }
        fetch(`http://127.0.0.1:3000/api/tasks/${id}`,
            {headers: {'Content-Type': 'application/json'}, method: 'PUT', body: JSON.stringify(body)})
            .then(response => response.json())
            .then(result => {})
    }

    return (
        <>
            <Menu goBack={false}>
                <Link to='/new-task'>
                    <ButtonBase centerRipple={true}><p style={{width: '180px'}}>Create New Task</p></ButtonBase>
                </Link>
                <Link to='/chats'>
                    <ButtonBase centerRipple={true} onClick={null} style={{ backgroundColor:'#2A73CC'}}><p style={{width: '100px'}}>Chat</p></ButtonBase>
                </Link>
            </Menu>
            <div className={'task-list'}>
                <List checkboxes={true} checkboxToggle={checkboxToggle} dataList={taskList} titleList={titleList}
                      pathName={'/task'}/>
            </div>
        </>)
}

export default HomePage