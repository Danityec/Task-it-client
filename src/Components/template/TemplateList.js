import React, {useEffect, useState} from 'react';
import Template from './Template';
import Popup from "../shared/Popup";
import './TemplateList.css';
import TextField from '@material-ui/core/TextField';
import Menu from "../shared/Menu";
import {ButtonBase} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import Header from "../shared/Header";
import {useCookies} from "react-cookie";

const TemplateList = (props) => {
    let history = useHistory()

    const [templateList, setTemplateList] = useState([]);
    const [cookies] = useCookies(['user']);
    const [open, setOpen] = useState(false);
    const [taskName, setTaskName] = useState("");
    const [taskCategory, setTaskCategory] = useState("");
    const [InputError, setInputError] = useState(false);

    useEffect(() => {
        fetch(`https://task--it.herokuapp.com/api/tasks?templates=true`, {credentials: 'include'})
            .then(response => response.json())
            .then(result => setTemplateList(result))
    }, [])

    const addNewTask = () => {
        if (taskName === "" || taskCategory === "") {
            setInputError(true)
            return
        }
        const body = {name: taskName, category: taskCategory, userID: cookies.user.googleID};
        fetch(`https://task--it.herokuapp.com/api/tasks`, {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body),
        })
            .then(response => response.json())
            .then(result => history.goBack());
    }

    const eachTemplate = (item, i) => {
        return (<Template key={i} item={item}/>)
    }

    return (
        <>
            <Header/>
            <Menu goBack={true} reroute={{pathname: '/dashboard'}}>
                <ButtonBase centerRipple={true} onClick={() => setOpen(true)}>
                    <p style={{width: '220px'}}>Creat Task from Scratch</p>
                </ButtonBase>
            </Menu>
            <div className={'template-page'}>
                <div className={'template-list'}>
                    {templateList.map(eachTemplate)}
                </div>
            </div>
            <Popup onSubmit={addNewTask} closePopup={() => setOpen(false)} title={"New Task"} open={open}
                   isDelete={false}>
                <TextField required className="task-name-input" label="Name" onChange={e => setTaskName(e.target.value)}
                           fullWidth value={taskName}/>
                <TextField required className="task-category-input" label="Category"
                           onChange={e => setTaskCategory(e.target.value)} fullWidth value={taskCategory}/>
                { InputError ? <p className={'input-error'}>Please fill all required information</p> : null}
                <p>Add subtasks later in the task page</p>
            </Popup>
        </>
    )
}

export default TemplateList;