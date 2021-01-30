import React from 'react';
import './Template.css';
import {ButtonBase} from "@material-ui/core";

const Template = (props) => {
    const eachSubTask = (index) => {
        return <div className="subtask-name">{index.name}</div>
    }

    return (
        <div className="template-card">
            <div className="template-card-title">
                <p>{props.item.name}</p>
                <ButtonBase centerRipple={true}><p style={{width: '180px'}}>Choose</p></ButtonBase>
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