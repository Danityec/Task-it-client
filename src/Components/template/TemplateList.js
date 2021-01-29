import React, { useEffect, useState }  from 'react';
import Template from './Template';
import Popup from "../shared/Popup";
import './TemplateList.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Menu from "../shared/Menu";
import {ButtonBase, IconButton} from "@material-ui/core";




const userId = '5fecb592690ca7935ccfd762'

const TemplateList = (props) => {
    const [templateList, setTemplateList] = useState([]);
    const [open, setOpen] = useState(false);
    const [taskName, setTaskName] = useState("");
    const [taskCategory, setTaskCategory] = useState("");

    useEffect(() => {
        fetch(`http://localhost:3000/api/tasks?templates=true`)
            .then(response => response.json())
            .then(result => setTemplateList(result))
    }, [])


    const eachTemplate = (item) => {
        return  (<Template key={item._id} item={item} id={item._id}/>) 
    }

    const addNewTask = () => { 
        const data = { name: taskName, category: taskCategory, userID: userId};
        console.log(data)
            fetch(`http://localhost:3000/api/tasks`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(result => {handleClose()});

    }

  
    const handleClose = () => {
        setOpen(false);

    };
    const handleClickOpen = () => {
        setOpen(true);
    };

  


    return (
            <div className="templateList">
                <Menu goBack={true}>
                <ButtonBase centerRipple={true} onClick={handleClickOpen}><p style={{width: '220px'}}>Creat Task from Scratch</p></ButtonBase>
                </Menu>
                {templateList.map(eachTemplate)}

                <Popup onSubmit={addNewTask} title={"New Task"} text={"Add subTask later in the task page"} open={open}>
                    <TextField key={1} className="inputNameTask"
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            type="Name"
                            onChange={e => setTaskName(e.target.value)}
                            fullWidth
                            value={taskName}>
                    </TextField>
                    <TextField key={2} className="inputCategory"
                            autoFocus
                            margin="dense"
                            id="Category"
                            label="Category"
                            type="Category"
                            fullWidth
                            onChange={e => setTaskCategory(e.target.value)}
                            value={taskCategory}>
                    </TextField>
                </Popup>
            </div> 
        )
}

export default TemplateList;