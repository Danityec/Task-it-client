import React from 'react';
import './Template.css';
import {ButtonBase} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {useCookies} from "react-cookie";

const Template = (props) => {
    let history = useHistory()
    const [cookies] = useCookies(['user']);

    const addTaskFromTemplate = () => {
        const body = {userID: cookies.user.googleID};
        fetch(`http://localhost:3000/api/tasks/${props.item.templateID}`, {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body),
        })
            .then(response => {})
            .then(result => history.goBack());
    }

    const eachSubTask = (item, index) => {
        return <div key={index} className="subtask-name">{item.name}</div>
    }

    return (
        <div className="template-card" key={props.key}>
            <div className="template-card-title">
                <p>{props.item.name}</p>
                <ButtonBase centerRipple={true} onClick={addTaskFromTemplate}><p style={{width: '180px'}}>Choose</p>
                </ButtonBase>
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