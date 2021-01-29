import React, {useEffect, useState} from 'react';
import './HomePage.css'
import Menu from "../shared/Menu";
import {ButtonBase, CardActions, IconButton} from "@material-ui/core";
import List from "../shared/List";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
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
        console.log('checkboxToggle: ' + id)
        const body = {
            completed: completed
        }
        fetch(`http://127.0.0.1:3000/api/tasks/${id}`,
            {headers: {'Content-Type': 'application/json'}, method: 'PUT', body: JSON.stringify(body)})
            .then(response => response.json())
            .then(result => {
                console.log(result)
            })
    }

    return (
        <>
            <Menu goBack={false}>
                <ButtonBase centerRipple={true}><p style={{width: '180px'}}>Create New Task</p></ButtonBase>
                <Link to='/chats'>
                    <ButtonBase centerRipple={true} onClick={null}><p style={{width: '100px'}}>Chat</p></ButtonBase>
                </Link>
            </Menu>
            <div className={'task-list'}>
                <List checkboxes={true} checkboxToggle={checkboxToggle} dataList={taskList} titleList={titleList}
                      pathName={'/task'}>
                    <IconButton>
                        <ArrowForwardIosRoundedIcon/>
                    </IconButton>
                </List>
            </div>
        </>)
}

export default HomePage