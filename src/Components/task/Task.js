import React, { useEffect, useState }  from 'react';
import './Task.css';
import Menu from "../shared/Menu";
import {ButtonBase, IconButton} from "@material-ui/core";
// import List from "../shared/List";
import Popup from "../shared/Popup";
import TextField from '@material-ui/core/TextField';

const Task = (props) => {
    const [open, setOpen] = useState(false);
    const [nameSubTask, setNameSubTask] = useState("");

    const addNewSubTask = () => { 
        const data = { name: nameSubTask};
        console.log(data)
            fetch(`http://localhost:3000/api/subtasks/{userID}`, {
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
            <div className="Task">
                <Menu goBack={true}>
                <ButtonBase centerRipple={true} onClick={handleClickOpen}><p style={{width: '200px'}}>Creat New SubTask</p></ButtonBase>
                </Menu>

                <div className="taskList">
                {/* <List dataList={chatList} titleList={titleList} pathName={'/chat'}>
                    <IconButton>
                        <ArrowForwardIosRoundedIcon/>
                    </IconButton>
                </List> */}

                <Popup onSubmit={addNewSubTask} title={"Create Subtask"} open={open}>
                    <TextField key={1} className="inputNameSubTask"
                            autoFocus
                            margin="dense"
                            id="Name"
                            label="Name"
                            type="Name"
                            onChange={e => setNameSubTask(e.target.value)}
                            fullWidth
                            value={nameSubTask}>
                    </TextField>
                </Popup>
            </div>
        </div> 
    )    
}

export default Task;