import React, {useEffect, useState} from 'react';
import './AdminHomePage.css'
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
                console.log(result)
                setTemplate(result)})
    }, [])

    return (
        <>
            <Menu goBack={true}>
                <ButtonBase centerRipple={true}><p style={{width: '200px'}}>Create New Subtask</p></ButtonBase>
                <ButtonBase centerRipple={true}><p style={{width: '100px', backgroundColor:'#2A73CC'}}>Reviews</p></ButtonBase>
            </Menu>
            <div className={''}>
                <div className={''}>
                    {template.name}
                </div>
            </div>
        </>)
}

export default AdminTask