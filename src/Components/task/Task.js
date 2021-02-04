import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import './Task.css';
import Menu from "../shared/Menu";
import List from "../shared/List";
import Popup from "../shared/Popup";
import {TextField, ButtonBase} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Autocomplete from "@material-ui/lab/Autocomplete";

const userId = '5fecb592690ca7935ccfd762'

const Task = (props) => {
    let history = useHistory()

    const [task, setTask] = useState(props.location.data);
    const [currentSubTask, setCurrentSubTask] = useState(null);
    const [titleList, setTitleList] = useState({});
    const [emailList, setEmailList] = useState([]);
    const [reviewBtnMessage, setReviewBtnMessage] = useState('Write a Review');

    const [openEditTask, setOpenEditTask] = useState(false);
    const [openDeleteTask, setOpenDeleteTask] = useState(false);
    const [openAddSubTask, setOpenAddSubTask] = useState(false);
    const [openEditSubTask, setOpenEditSubTask] = useState(false);
    const [openDeleteSubTask, setOpenDeleteSubTask] = useState(false);
    const [openReview, setOpenReview] = useState(false);

    const [nameInput, setNameInput] = useState("");
    const [categoryInput, setCategoryInput] = useState("");
    const [emailInput, setEmailInput] = useState(null);

    useEffect(() => {
        setTask(props.location.data)
        fetch(`http://127.0.0.1:3000/api/users`)
            .then(response => response.json())
            .then(result => {
                result.forEach(user => setEmailList(prevArray => [...prevArray, {title: user['email']}]))
            })
    }, [])

    useEffect(() => {
        task.subTask.forEach((subTask) => {
            setTitleList(prevState => ({
                ...prevState, [subTask["_id"]]: `${subTask["name"]}`
            }));
        })
    }, [task])

    const addReview = () => {
        const body = {title: nameInput, reviewBody: categoryInput, userID: userId, templateID: task.templateID};
        fetch(`http://localhost:3000/api/reviews`, {
            method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(body),
        })
            .then(response => response.json())
            .then(result => {
                setOpenReview(false)
                setReviewBtnMessage('Thank You!')
                setCategoryInput('')
                setNameInput('')
            });
    }
    const getUserEmail = () => {
        if (emailInput != null) {
            fetch(`http://127.0.0.1:3000/api/users?email=${emailInput.title}`)
                .then(response => response.json())
                .then(result => {
                    let shared = task.sharedWith
                    shared.push(`${result['firstName']} ${result['lastName']}`)
                    editTask(shared)
                })
        } else {
            editTask(null)
        }
    }
    const editTask = (shared) => {
        const body = {name: nameInput, category: categoryInput, sharedWith: shared};
        fetch(`http://localhost:3000/api/tasks/${task._id}`, {
            method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(body),
        })
            .then(response => response.json())
            .then(result => {
                setOpenEditTask(false);
                setTask(result);
                setNameInput('')
                setCategoryInput('')
                setEmailInput(null)
            });
    }
    const deleteTask = () => {
        fetch(`http://localhost:3000/api/tasks/${task._id}`, {method: 'DELETE'})
            .then(response => {
            })
            .then(result => history.goBack());
    }

    const addNewSubTask = () => {
        const body = {name: nameInput};
        fetch(`http://localhost:3000/api/subtasks/${task._id}`, {
            method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(body),
        })
            .then(response => response.json())
            .then(result => {
                setOpenAddSubTask(false);
                setTask(result);
                setNameInput('')
            });
    }
    const editSubTask = () => {
        const body = {name: nameInput};
        fetch(`http://localhost:3000/api/subtasks/${task._id}/${currentSubTask}`, {
            method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(body),
        })
            .then(response => response.json())
            .then(result => {
                setOpenEditSubTask(false);
                setTask(result);
                setNameInput('')
            });
    }
    const deleteSubTask = () => {
        fetch(`http://localhost:3000/api/subtasks/${task._id}/${currentSubTask}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(result => {
                setOpenDeleteSubTask(false);
                setTask(result)
            });
    }

    const checkboxToggle = (id, completed) => {
        const body = {completed: completed}
        fetch(`http://localhost:3000/api/subtasks/${task._id}/${id}`,
            {headers: {'Content-Type': 'application/json'}, method: 'PUT', body: JSON.stringify(body)})
            .then(response => response.json())
            .then(result => {
            })
    }
    const getCurrentSubTask = (subTask, num) => {
        setCurrentSubTask(subTask)
        if (num === 1) setOpenDeleteSubTask(true)
        else setOpenEditSubTask(true)
    }

    return (
        <div>
            <Menu goBack={true}>
                <ButtonBase centerRipple={true} onClick={() => setOpenAddSubTask(true)}><p
                    style={{width: '200px'}}>Creat New SubTask</p></ButtonBase>
                {task.templateID && task.userID ? (<ButtonBase style={{backgroundColor: '#2A73CC'}} centerRipple={true}
                                                               onClick={() => setOpenReview(true)}><p
                    style={{width: '200px'}}>{reviewBtnMessage}</p></ButtonBase>) : null}
            </Menu>
            <div className="task-page">
                <div className="task-info">
                    <div className="task-title">
                        <h1>{task.name}</h1>
                        <div className={'task-btn-area'}>
                            <Popup onSubmit={deleteTask} title={"Delete Task"} open={openDeleteTask}
                                   closePopup={() => setOpenDeleteTask(false)} isDelete={true}>
                                <p style={{width: '340px'}}>Are you sure you want to delete this Task?</p>
                                <p>the action cannot be undone!</p>
                            </Popup>
                            <Popup onSubmit={getUserEmail} title={"Edit Task"} open={openEditTask}
                                   closePopup={() => setOpenEditTask(false)} isDelete={false}>
                                <TextField label="Name" value={nameInput} onChange={e => setNameInput(e.target.value)}
                                           fullWidth/>
                                <TextField label="Category" value={categoryInput}
                                           onChange={e => setCategoryInput(e.target.value)} fullWidth/>
                                {task.userID ? (
                                    <Autocomplete
                                        style={{width: '100%', paddingTop: '5%'}}
                                        options={emailList} getOptionLabel={(emailList) => emailList.title}
                                        value={emailInput}
                                        onChange={(e, newValue) => {
                                            setEmailInput(newValue)
                                        }}
                                        renderInput={(params) => <TextField {...params} label="Email"/>}/>
                                ) : null}
                            </Popup>
                            <EditIcon fontSize="large" style={{color: '#FFDD65'}}
                                      onClick={() => setOpenEditTask(true)}/>
                            <DeleteIcon fontSize="large" style={{color: '#FF5C5C'}}
                                        onClick={() => setOpenDeleteTask(true)}/>
                        </div>
                    </div>
                    <h2 className="task-category">
                        {task.category}
                    </h2>
                    {task.sharedWith.length ? (
                        <div className="task-shared-list">
                            <h3>Shared with:</h3>
                            {task.sharedWith.map((item, i) => <span key={i}>{item}</span>)}
                        </div>
                    ) : null}

                </div>
                <div className={'subtask-list'}>
                    <List checkboxes={true} action={getCurrentSubTask} checkboxeToggle={checkboxToggle}
                          dataList={task.subTask} titleList={titleList}/>
                </div>
                <Popup onSubmit={addNewSubTask} title={"Create Subtask"} open={openAddSubTask}
                       closePopup={() => setOpenAddSubTask(false)} isDelete={false}>
                    <TextField label="Name" onChange={e => setNameInput(e.target.value)} fullWidth value={nameInput}/>
                </Popup>
                <Popup onSubmit={addReview} title={"Review the task Template"} open={openReview}
                       closePopup={() => setOpenReview(false)} isDelete={false}>
                    <TextField label="Title" onChange={e => setNameInput(e.target.value)} fullWidth value={nameInput}/>
                    <TextField style={{marginTop: '5%'}} label="Type here..." multiline rows={3} variant="outlined"
                               onChange={e => setCategoryInput(e.target.value)} fullWidth value={categoryInput}/>
                </Popup>
                <Popup onSubmit={deleteSubTask} title={"Delete Subtask"} open={openDeleteSubTask}
                       closePopup={() => setOpenDeleteSubTask(false)} isDelete={true}>
                    <p style={{width: '340px'}}>Are you sure you want to delete this subtask?</p>
                    <p>the action cannot be undone!</p>
                </Popup>
                <Popup onSubmit={editSubTask} title={"Edit Subtask"} open={openEditSubTask}
                       closePopup={() => setOpenEditSubTask(false)} isDelete={false}>
                    <TextField label="Name" value={nameInput} onChange={e => setNameInput(e.target.value)} fullWidth/>
                </Popup>
            </div>
        </div>
    )
}

export default Task;