import React, {useEffect, useState} from 'react';
import Template from './Template';
import Popup from "../shared/Popup";
import './TemplateList.css';
import TextField from '@material-ui/core/TextField';
import Menu from "../shared/Menu";
import {ButtonBase} from "@material-ui/core";
import {useHistory} from "react-router-dom";

const userId = '5fecb592690ca7935ccfd762'

const TemplateList = (props) => {
    let history = useHistory()

    const [templateList, setTemplateList] = useState([]);
    const [open, setOpen] = useState(false);
    const [taskName, setTaskName] = useState("");
    const [taskCategory, setTaskCategory] = useState("");

    useEffect(() => {
        fetch(`http://localhost:3000/api/tasks?templates=true`)
            .then(response => response.json())
            .then(result => setTemplateList(result))
    }, [])

    const addNewTask = () => {
        const body = {name: taskName, category: taskCategory, userID: userId};
        fetch(`http://localhost:3000/api/tasks`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body),
        })
            .then(response => response.json())
            .then(result => history.goBack());
    }

    const eachTemplate = (item) => {
        return (<Template key={item._id} item={item}/>)
    }

    return (
        <>
            <Menu goBack={true}>
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