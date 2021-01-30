import React, { useEffect, useState } from 'react';
import './Task.css';
import Menu from "../shared/Menu";
import { ButtonBase, IconButton } from "@material-ui/core";
import List from "../shared/List";
import Popup from "../shared/Popup";
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const Task = (props) => {
    const [open, setOpen] = useState(false);
    const [nameSubTask, setNameSubTask] = useState("");
    const [task, setTask] = useState(props.location.data);
    const [titleList, setTitleList] = useState({});


    useEffect(() => {
        setTask(props.location.data)
    }, [])


    useEffect(() => {
        task.subTask.forEach((subTask) => {
            setTitleList(prevState => ({
                ...prevState, [subTask["_id"]]: `${subTask["name"]}`
            }));
        })
    }, [task])


    const addNewSubTask = () => {
        const data = { name: nameSubTask  };
        console.log(data)
        fetch(`http://localhost:3000/api/subtasks/${task._id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(result => { 
                console.log(result)
                handleClose();
                setTask(result);
            });

    }
    const handleClose = () => {
        setOpen(false);

    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const checkboxToggle = (id, completed) => {
        const body = {
            completed: completed
        }
        fetch(`http://localhost:3000/api/subtasks/${task._id}/${id}`,
            { headers: { 'Content-Type': 'application/json' }, method: 'PUT', body: JSON.stringify(body) })
            .then(response => response.json())
            .then(result => {
                console.log(result)
            })
    }



    return (

        <div className="Task">
            <Menu goBack={true}>
                <ButtonBase centerRipple={true} onClick={handleClickOpen}><p style={{ width: '200px' }}>Creat New SubTask</p></ButtonBase>
                {task.templateID ? (
                <ButtonBase style={{ backgroundColor:'#2A73CC'}} centerRipple={true} onClick={handleClickOpen}><p style={{ width: '200px' }}>Write a Review</p></ButtonBase>
                ): null }
            </Menu>

            <div className="taskList">

                <List checkboxes={true} checkboxeToggle={checkboxToggle} dataList={task.subTask} titleList={titleList}>
                    <EditIcon fontSize="large" style={{ color:'#FFDD65'}}/>
                    <DeleteIcon fontSize="large" style={{ color:'#FF5C5C'}}/>
                </List>

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