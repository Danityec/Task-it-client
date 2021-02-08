import React, {useEffect, useState} from 'react';
import './Task.css';
import Menu from "../shared/Menu";
import List from "../shared/List";
import Popup from "../shared/Popup";
import {TextField, ButtonBase, Modal, IconButton} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Autocomplete from "@material-ui/lab/Autocomplete";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import Header from "../shared/Header";
import axios from "axios";

const Task = (props) => {
    const [task, setTask] = useState(props.location.data);
    const [userId] = useState(props.location.userId)
    const [currentSubTask, setCurrentSubTask] = useState(null);
    const [titleList, setTitleList] = useState({});
    const [emailList, setEmailList] = useState([]);
    const [reviewList, setReviewList] = useState([]);
    const [reviewBtnMessage, setReviewBtnMessage] = useState('Write a Review');

    const [openEditTask, setOpenEditTask] = useState(false);
    const [openDeleteTask, setOpenDeleteTask] = useState(false);
    const [openAddSubTask, setOpenAddSubTask] = useState(false);
    const [openEditSubTask, setOpenEditSubTask] = useState(false);
    const [openDeleteSubTask, setOpenDeleteSubTask] = useState(false);
    const [openReview, setOpenReview] = useState(false);
    const [openReviewList, setOpenReviewList] = useState(false);

    const [nameInput, setNameInput] = useState("");
    const [categoryInput, setCategoryInput] = useState("");
    const [emailInput, setEmailInput] = useState(null);

    useEffect(() => {
       axios.post(`http://localhost:3000/api/users`, {withCredentials: true})
            .then(res => {
                res.data.forEach(user => setEmailList(prevArray => [...prevArray, {title: user['email']}]))
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        if (task.userID == null) {
            axios.get(`http://localhost:3000/api/reviews?templateID=${task.templateID}`, {withCredentials: true})
                .then(res => setReviewList(res.data))
                .catch(err => console.log(err))
        }

        task.subTask.forEach((subTask) => {
            setTitleList(prevState => ({
                ...prevState, [subTask["_id"]]: `${subTask["name"]}`
            }));
        })
    }, [task])

    const addReview = () => {
        const body = {title: nameInput, reviewBody: categoryInput, userID: userId, templateID: task.templateID};

        axios.post(`http://localhost:3000/api/reviews`, body, {withCredentials: true})
            .then(res => {
                setOpenReview(false)
                setReviewBtnMessage('Thank You!')
                setCategoryInput('')
                setNameInput('')
            })
            .catch(err => console.log(err))
    }
    const getUserEmail = () => {
        if (emailInput != null) {

            axios.get(`http://localhost:3000/api/users?email=${emailInput.title}`, {withCredentials: true})
                .then(res => {
                    let shared = task.sharedWith
                    shared.push(`${res.data['firstName']} ${res.data['lastName']}`)
                    editTask(shared)
                })
                .catch(err => console.log(err))
        } else {
            editTask(null)
        }
    }
    const editTask = (shared) => {
        const body = {name: nameInput, category: categoryInput, sharedWith: shared};

        axios.put(`http://localhost:3000/api/tasks`, body, {withCredentials: true})
            .then(res => {
                setOpenEditTask(false);
                setTask(res.data);
                setNameInput('')
                setCategoryInput('')
                setEmailInput(null)
            })
            .catch(err => console.log(err))
    }
    const deleteTask = () => {
        axios.delete(`http://localhost:3000/api/tasks/${task._id}`, {withCredentials: true})
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }

    const addNewSubTask = () => {
        const body = {name: nameInput};
        axios.post(`http://localhost:3000/api/subtasks/${task._id}`, body, {withCredentials: true})
            .then(res => {
                setOpenAddSubTask(false);
                setTask(res.data);
                setNameInput('')
            })
            .catch(err => console.log(err))
    }
    const editSubTask = () => {
        const body = {name: nameInput};
        axios.put(`http://localhost:3000/api/subtasks/${task._id}/${currentSubTask}`, body, {withCredentials: true})
            .then(res => {
                setOpenEditSubTask(false);
                setTask(res.data);
                setNameInput('')
            })
            .catch(err => console.log(err))
    }
    const deleteSubTask = () => {
        axios.delete(`http://localhost:3000/api/subtasks/${task._id}/${currentSubTask}`, {withCredentials: true})
            .then(res => {
                setOpenDeleteSubTask(false);
                setTask(res.data)
            })
            .catch(err => console.log(err))
    }

    const checkboxToggle = (id, completed) => {
        const body = {completed: completed}
        axios.put(`http://localhost:3000/api/subtasks/${task._id}/${id}`, body, {withCredentials: true})
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }
    const getCurrentSubTask = (subTask, num) => {
        setCurrentSubTask(subTask)
        if (num === 1) setOpenDeleteSubTask(true)
        else setOpenEditSubTask(true)
    }

    const eachReview = (item) => {
        return (
            <div key={item._id} className={'review-card'}>
                <div className={'card-header'}>
                    {item.title}
                </div>
                <div>
                    {item.reviewBody}
                </div>
            </div>
        )
    }

    const reviewListModal = (
        <Modal className={'review-modal'} open={openReviewList} onClose={() => setOpenReviewList(false)}>
            <div className={'review-page'}>
                <ButtonBase className={'modal-close-btn'} onClick={() => setOpenReviewList(false)}>
                    <CloseRoundedIcon/>
                </ButtonBase>
                <div className={'review-list'}>
                    {reviewList.map(eachReview)}
                </div>
            </div>
        </Modal>
    )
    const editSubTaskModal = (
        <Popup onSubmit={editSubTask} title={"Edit Subtask"} open={openEditSubTask}
               closePopup={() => setOpenEditSubTask(false)} isDelete={false}>
            <TextField label="Name" value={nameInput} onChange={e => setNameInput(e.target.value)} fullWidth/>
        </Popup>
    )
    const deleteSubTaskModal = (
        <Popup onSubmit={deleteSubTask} title={"Delete Subtask"} open={openDeleteSubTask}
               closePopup={() => setOpenDeleteSubTask(false)} isDelete={true}>
            <p style={{width: '340px'}}>Are you sure you want to delete this subtask?</p>
            <p>the action cannot be undone!</p>
        </Popup>
    )
    const createSubTaskModal = (
        <Popup onSubmit={addNewSubTask} title={"Create Subtask"} open={openAddSubTask}
               closePopup={() => setOpenAddSubTask(false)} isDelete={false}>
            <TextField label="Name" onChange={e => setNameInput(e.target.value)} fullWidth value={nameInput}/>
        </Popup>
    )
    const editTaskModal = (
        <Popup onSubmit={getUserEmail} title={"Edit Task"} open={openEditTask}
               closePopup={() => setOpenEditTask(false)} isDelete={false}>
            <TextField label="Name" value={nameInput} onChange={e => setNameInput(e.target.value)}
                       fullWidth/>
            <TextField label="Category" value={categoryInput}
                       onChange={e => setCategoryInput(e.target.value)} fullWidth/>
            {task.userID ? (
                <Autocomplete
                    style={{width: '100%', paddingTop: '5%'}}
                    options={emailList} getOptionLabel={(emailList) => emailList.title} value={emailInput}
                    onChange={(e, newValue) => setEmailInput(newValue)}
                    renderInput={(params) => <TextField {...params} label="Email"/>}/>
            ) : null}
        </Popup>
    )
    const deleteTaskModal = (
        <Popup onSubmit={deleteTask} title={"Delete Task"} open={openDeleteTask}
               closePopup={() => setOpenDeleteTask(false)} isDelete={true}>
            <p style={{width: '340px'}}>Are you sure you want to delete this Task?</p>
            <p>the action cannot be undone!</p>
        </Popup>
    )
    const createReviewModal = (
        <Popup onSubmit={addReview} title={"Review the task Template"} open={openReview}
               closePopup={() => setOpenReview(false)} isDelete={false}>
            <TextField label="Title" onChange={e => setNameInput(e.target.value)} fullWidth value={nameInput}/>
            <TextField style={{marginTop: '5%'}} label="Type here..." multiline rows={3} variant="outlined"
                       onChange={e => setCategoryInput(e.target.value)} fullWidth value={categoryInput}/>
        </Popup>
    )

    return (
        <>
            <Header userId={userId}/>
            <Menu goBack={true} reroute={{pathname: '/dashboard', userId: userId}}>
                <ButtonBase centerRipple={true} onClick={() => setOpenAddSubTask(true)}>
                    <p style={{width: '200px'}}>Creat New SubTask</p>
                </ButtonBase>
                {task.templateID && task.userID ?
                    (
                        <ButtonBase style={{backgroundColor: '#2A73CC'}} centerRipple={true}
                                    onClick={() => setOpenReview(true)}>
                            <p style={{width: '200px'}}>{reviewBtnMessage}</p>
                        </ButtonBase>
                    ) : (
                        <ButtonBase centerRipple={true} disabled={reviewList.length <= 0}
                                    onClick={() => setOpenReviewList(true)} style={{backgroundColor: '#2A73CC'}}>
                            <p style={{width: '100px'}}>Reviews</p>
                        </ButtonBase>
                    )}
            </Menu>
            <div className="task-page">
                <div className="task-info">
                    <div className="task-title">
                        <h1>{task.name}</h1>
                        <div className={'task-btn-area'}>
                            <IconButton onClick={() => setOpenEditTask(true)}>
                                <EditIcon fontSize="large" style={{color: '#FFDD65'}}/>
                            </IconButton>
                            <IconButton onClick={() => setOpenDeleteTask(true)}>
                                <DeleteIcon fontSize="large" style={{color: '#FF5C5C'}}/>
                            </IconButton>
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
                {editSubTaskModal}
                {deleteSubTaskModal}
                {createSubTaskModal}
                {editTaskModal}
                {deleteTaskModal}
                {createReviewModal}
                {reviewListModal}
            </div>
        </>
    )
}

export default Task;