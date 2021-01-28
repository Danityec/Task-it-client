import React from 'react';
import './TemplateList.css';
import './Template.css';
import Button from '@material-ui/core/Button';


const Template = (props) => {
   
   
    return (
        <div className="template">
            
            <div className="titleTask">
                <div className="nameTask">{props.item.name}</div>
                <Button className="iconeChoose" fontSize="small" aria-label="edit" variant="contained" style={{ padding: "1px"}} color="primary">Choose</Button >
            </div>

            <div className="titleCategory">
                <div className="nameCategory" >{props.item.category}</div>
            </div>

            <div className="titleSubTask">
                {/* <div className="nameSubTask" >{props.item.subTask}</div> */}
            </div>
            
        </div>
        )   
    
    
}

export default Template;