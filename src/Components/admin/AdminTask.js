import React, {useEffect, useState} from 'react';
import './AdminTask.css'
import Menu from "../shared/Menu";
import {ButtonBase, IconButton} from "@material-ui/core";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import {Link} from "react-router-dom";


const AdminTask = (props) => {
    const [template, setTemplate] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:3000/api/tasks/${props.location.id}`)
            .then(response => response.json())
            .then(result => {
                // console.log(result)
                setTemplate(result)})
    }, [])

    return (
        <>
            <Menu goBack={true}>
                <Link to={{pathname: '/admin/reviews', template: template}}>
                    <ButtonBase centerRipple={true} style={{ backgroundColor:'#2A73CC'}}><p style={{width: '100px'}}>Reviews</p></ButtonBase>
                </Link>
                <ButtonBase centerRipple={true}><p style={{width: '200px'}}>Create New Subtask</p></ButtonBase>
            </Menu>
            <div className={'admin-task-page'}>
                <div className={''}>
                    {template.name}
                </div>
            </div>
        </>)
}

export default AdminTask