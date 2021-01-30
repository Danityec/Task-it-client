import React from 'react';
import './TemplateList.css';
import './Template.css';
import Button from '@material-ui/core/Button';


const Template = (props) => {
    

    const eachSubTask = (index) => {
        return  <div className="nameSubTask">{index.name}</div>
    }
   
    return (
        <div className="template">
            
            <div className="titleTask">
                <div className="nameTask">{props.item.name}</div>
                <Button className="iconeChoose" aria-label="edit" variant="contained" style={{ padding: "1px"}, { backgroundColor:'#2A73CC'}} >Choose</Button >
            </div>

            <div className="titleCategory">
                <div className="nameCategory" >{props.item.category}</div>
            </div>

            <div className="titleSubTask">
                {props.item.subTask.map(eachSubTask)}
                {props.children}
                <div className="nameSubTask" ></div>
            </div>
            
        </div>
        )   
    
    
}

export default Template;