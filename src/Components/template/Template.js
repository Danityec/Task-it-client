import React from 'react';
import './Template.css';
import {ButtonBase} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import axios from "axios";

const Template = (props) => {
    let history = useHistory()

    const addTaskFromTemplate = () => {
        const body = {userID: props.location.userId};
        axios.post(`http://localhost:3000/api/tasks/${props.item.templateID}`, body, {withCredentials: true})
            .then(res => {
                history.goBack()
            })
            .catch(err => console.log(err))
    }

    const eachSubTask = (item) => {
        return <div className="subtask-name">{item.name}</div>
    }

    return (
        <div className="template-card" key={props.key}>
            <div className="template-card-title">
                <p>{props.item.name}</p>
                <ButtonBase centerRipple={true} onClick={addTaskFromTemplate}><p style={{width: '180px'}}>Choose</p></ButtonBase>
            </div>
            <div className="template-card-category">
                {props.item.category}
            </div>
            <div className="template-card-subtasks">
                {props.item.subTask.map(eachSubTask)}
            </div>
        </div>
    )
}

export default Template;