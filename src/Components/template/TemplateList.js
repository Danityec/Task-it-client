import React, {useEffect, useState} from 'react';
import Template from './Template';
import Popup from "../shared/Popup";
import './TemplateList.css';
import TextField from '@material-ui/core/TextField';
import Menu from "../shared/Menu";
import {ButtonBase} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import Header from "../shared/Header";
import axios from "axios";

const TemplateList = (props) => {
    let history = useHistory()

    const [templateList, setTemplateList] = useState([]);
    const [userId] = useState(props.location.userId)
    const [open, setOpen] = useState(false);
    const [taskName, setTaskName] = useState("");
    const [taskCategory, setTaskCategory] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:3000/api/tasks?templates=true`, {withCredentials: true})
            .then(res => setTemplateList(res.data))
            .catch(err => console.log(err))
    }, [])

    const addNewTask = () => {
        const body = {name: taskName, category: taskCategory, userID: userId};
        axios.post(`http://localhost:3000/api/tasks`, body, {withCredentials: true})
            .then(res => history.goBack())
            .catch(err => console.log(err))
    }

    const eachTemplate = (item) => {
        return (<Template key={item._id} item={item}/>)
    }

    return (
        <>
            <Header userId={userId}/>
            <Menu goBack={true} reroute={{pathname: '/dashboard', userId: userId}}>
                <ButtonBase centerRipple={true} onClick={() => setOpen(true)}>
                    <p style={{width: '220px'}}>Creat Task from Scratch</p>
                </ButtonBase>
            </Menu>
            <div className={'template-page'}>
                <div className={'template-list'}>
                    {templateList.map(eachTemplate)}
                </div>
            </div>
            <Popup onSubmit={addNewTask} closePopup={() =>setOpen(false)} title={"New Task"} open={open} isDelete={false}>
                <TextField className="task-name-input" label="Name" onChange={e => setTaskName(e.target.value)}
                           fullWidth value={taskName}/>
                <TextField className="task-category-input" label="Category"
                           onChange={e => setTaskCategory(e.target.value)} fullWidth value={taskCategory}/>
                <p>Add subtasks later in the task page</p>
            </Popup>
        </>
    )
}

export default TemplateList;