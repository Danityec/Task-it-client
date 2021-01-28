import React from 'react';
import './TemplateList.css';
import './Template.css';
import Button from '@material-ui/core/Button';



export default function Template(props){

    function add(){}


    return (
        <div className="template">
            <div className="titleTask">
                <div className="nameTask"/>
                <Button className="iconeChoose" fontSize="small" aria-label="edit" onClick={add} variant="contained" style={{ padding: "1px"}} color="primary">Choose</Button >
            </div>
            <div className="titleCategory">
                <div className="nameCategory"/>

            </div>
            <div className="titleSubTask">
                <div className="nameSubTask"/>
            </div>
        </div>
    )
    
}

