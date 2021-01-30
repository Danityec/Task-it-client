import React, { useEffect, useState } from 'react';
import './Task.css';
import Menu from "../shared/Menu";
import { ButtonBase, IconButton } from "@material-ui/core";
import List from "../shared/List";
import Popup from "../shared/Popup";
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import { TramRounded } from '@material-ui/icons';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';


const userId = '5fecb592690ca7935ccfd762'

const Task = (props) => {
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openReview, setOpenReview] = useState(false);
    const [openEditTask, setOpenEditTask] = useState(false);
    const [openDeleteTask, setOpenDeleteTask] = useState(false);

    const [nameSubTask, setNameSubTask] = useState("");
    const [task, setTask] = useState(props.location.data);

    const [titleList, setTitleList] = useState({});

    const [newNameSubTask, setNewNameSubTask] = useState("");
    // const [subTask, setSubTask] = useState(props.location.data);

    const [taskName, setTaskName] = useState("");
    const [taskCategory, setTaskCategory] = useState("");

    const [titleReview, setTitleReview] = useState("");
    const [bodyReview, setBodyReview] = useState("");

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

    // useEffect(() => {
    //     setSubTask(props.location.data)
    // }, [])

    const addReview = () => {
        const data = { title: titleReview, reviewBody: bodyReview, userID: userId , templateID: task.templateID };
        console.log(data)
        fetch(`http://localhost:3000/api/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setOpenReview(false);
            });
    }
    const editTask = () => {
        const data = { name: taskName, category: taskCategory, userID: userId };
        console.log(data)
        fetch(`http://localhost:3000/api/subtasks/${task._id}/${task.subTask._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setOpenEdit(false);
                // setSubTask(result);
            });
    }

    const addNewSubTask = () => {
        const data = { name: nameSubTask };
        fetch(`http://localhost:3000/api/subtasks/${task._id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setOpenAdd(false);
                setTask(result);
            });

    }

    const editSubTask = () => {
        const data = { name: newNameSubTask };
        console.log(data)
        fetch(`http://localhost:3000/api/subtasks/${task._id}/${task.subTask._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setOpenEdit(false);
                // setSubTask(result);
            });
    }

    const DeleteSubTask = () => {
        const data = { name: nameSubTask };
        // console.log(data)
        fetch(`http://localhost:3000/api/subtasks/${task._id}/${task.subTask._id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setOpenDelete(false);

            });
    }

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
                <ButtonBase centerRipple={true} onClick={() => { setOpenAdd(true) }}><p style={{ width: '200px' }}>Creat New SubTask</p></ButtonBase>
                {task.templateID ? (
                    <ButtonBase style={{ backgroundColor: '#2A73CC' }} centerRipple={true} onClick={() => { setOpenReview(true) }}><p style={{ width: '200px' }}>Write a Review</p></ButtonBase>
                ) : null}
            </Menu>

            <div className="taskList">
                <div className="infoTask">
                    <h1 className="infoTitle"  >
                        <EditIcon onSubmit={editTask} fontSize="large" style={{ color: '#FFDD65' }} title={"Create Subtask"} text={"Share the task with TaskIt users"} onClick={openEditTask}></EditIcon>
                        <DeleteIcon fontSize="large" style={{ color: '#FF5C5C' }} onClick={openDeleteTask}></DeleteIcon>
                    </h1>
                    <h2 className="infoCategory"></h2>
                    <h3 className="infoShared"></h3>
                </div>

                <Popup onSubmit={addNewSubTask} title={"Create Subtask"} open={openAdd}>
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
                <Popup onSubmit={addReview} title={"Review the task Template"} open={openReview}>
                    <TextField key={1}
                        autoFocus
                        margin="dense"
                        id="Title"
                        label="Title"
                        type="Title"
                        onChange={e => setTitleReview(e.target.value)}
                        fullWidth
                        value={titleReview}>
                    </TextField>
                    <TextareaAutosize key={2} className="bodyReview"
                        rowsMax={4}
                        aria-label="maximum height"
                        placeholder="Reviews"
                        onChange={e => setBodyReview(e.target.value)}
                        fullWidth
                        value={bodyReview}>
                    </TextareaAutosize>
                </Popup>
                <Popup onSubmit={DeleteSubTask} title={"Delete Subtask"} open={openDelete} text={"Are you sure you want to delete this subtask?"}>
                    <text>the action cannot be undone!</text>
                    <Button className="buttonOK" variant="contained" style={{ backgroundColor: '#FF5C5C' }} onClick={props.onSubmit}>No, Save my subtask</Button>
                </Popup>
                <Popup onSubmit={editSubTask} title={"Edit Subtask"} open={openEdit}>
                    <TextField key={2} className="inputEditSubTask"
                        autoFocus
                        margin="dense"
                        id="Name"
                        label="Name"
                        type="Name"
                        value={newNameSubTask}
                        onChange={e => setNewNameSubTask(e.target.value)}
                        fullWidth>
                    </TextField>
                </Popup>
                <List checkboxes={true} checkboxeToggle={checkboxToggle} dataList={task.subTask} titleList={titleList}>
                    <EditIcon fontSize="large" style={{ color: '#FFDD65' }} onClick={() => setOpenEdit(true)}></EditIcon>
                    <DeleteIcon fontSize="large" style={{ color: '#FF5C5C' }} onClick={() => setOpenDelete(true)}></DeleteIcon>
                </List>
            </div>
        </div>
    )
}

export default Task;