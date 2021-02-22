import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
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
import {useCookies} from "react-cookie";

const Task = (props) => {
    let history = useHistory()

    const [task, setTask] = useState(props.location.data);
    const [cookies] = useCookies(['user']);
    const [currentSubTask, setCurrentSubTask] = useState(null);
    const [titleList, setTitleList] = useState({});
    const [emailList, setEmailList] = useState([]);
    const [emailNameList, setEmailNameList] = useState([]);
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
    const [InputError, setInputError] = useState(false);

    useEffect(() => {
        fetch(`https://task--it.herokuapp.com/api/users`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'user': cookies.user.googleID
            }
        })
            .then(response => response.json())
            .then(result => {
                result.forEach(user => setEmailList(prevArray => [...prevArray, {title: user['email']}]))
            })
    }, [])

    useEffect(() => {
        if (task.userID == null) {
            fetch(`https://task--it.herokuapp.com/api/reviews?templateID=${task.templateID}`, {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'user': cookies.user.googleID
                }
            })
                .then(response => response.json())
                .then(result => {
                    setReviewList(result)
                })
        }

        task.subTask.forEach((subTask) => {
            setTitleList(prevState => ({
                ...prevState, [subTask["_id"]]: `${subTask["name"]}`
            }));
        })
        task.sharedWith.forEach((email, i)=>{
            fetch(`https://task--it.herokuapp.com/api/users?email=${email}`, {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'user': cookies.user.googleID
                }
            })
                .then(response => response.json())
                .then(result => {
                    if (!emailNameList.includes(`${result["firstName"]} ${result["lastName"]}`))
                        setEmailNameList(prevState =>
                            [...prevState, `${result["firstName"]} ${result["lastName"]}`]
                        )})
        })

    }, [task])

    const addReview = () => {
        if (nameInput === "" || categoryInput === "") {
            setInputError(true)
            return
        }
        const body = {title: nameInput, reviewBody: categoryInput, userID: cookies.user.googleID, templateID: task.templateID};
        fetch(`https://task--it.herokuapp.com/api/reviews`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'user': cookies.user.googleID
            },
            body: JSON.stringify(body),
        })
            .then(response => response.json())
            .then(result => {
                setOpenReview(false)
                setReviewBtnMessage('Thank You!')
                setCategoryInput('')
                setNameInput('')
                setInputError(false)
            });
    }
    const editTask = () => {
        let shared = []
        if (emailInput != null) {
            shared = task.sharedWith
            shared.push(emailInput.title)
        }
        const body = {name: nameInput, category: categoryInput, sharedWith: shared};
        fetch(`https://task--it.herokuapp.com/api/tasks/${task._id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'user': cookies.user.googleID
            },
            body: JSON.stringify(body),
        })
            .then(response => response.json())
            .then(result => {
                setOpenEditTask(false);
                setTask(result);
                setNameInput('')
                setEmailNameList([])
                setCategoryInput('')
                setEmailInput(null)
            });
    }
    const deleteTask = () => {
        fetch(`https://task--it.herokuapp.com/api/tasks/${task._id}`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'user': cookies.user.googleID
            },
            method: 'DELETE'
        })
            .then(response => {
            })
            .then(result => history.goBack());
    }

    const addNewSubTask = () => {
        if (nameInput === "") {
            setInputError(true)
            return
        }
        const body = {name: nameInput};
        fetch(`https://task--it.herokuapp.com/api/subtasks/${task._id}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'user': cookies.user.googleID
            },
            body: JSON.stringify(body),
        })
            .then(response => response.json())
            .then(result => {
                setOpenAddSubTask(false);
                setTask(result);
                setNameInput('')
                setInputError(false)
            });
    }
    const editSubTask = () => {
        if (nameInput === "") {
            setInputError(true)
            return
        }
        const body = {name: nameInput};
        fetch(`https://task--it.herokuapp.com/api/subtasks/${task._id}/${currentSubTask}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'user': cookies.user.googleID
            },
            body: JSON.stringify(body),
        })
            .then(response => response.json())
            .then(result => {
                setOpenEditSubTask(false);
                setTask(result);
                setNameInput('')
                setInputError(false)
            });
    }
    const deleteSubTask = () => {
        fetch(`https://task--it.herokuapp.com/api/subtasks/${task._id}/${currentSubTask}`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'user': cookies.user.googleID
            },
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
        fetch(`https://task--it.herokuapp.com/api/subtasks/${task._id}/${id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'user': cookies.user.googleID
            },
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(result => {
            })
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
            <TextField label="Name" required value={nameInput} onChange={e => setNameInput(e.target.value)} fullWidth/>
            { InputError ? <p className={'input-error'}>Please fill all required information</p> : null}
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
            <TextField required label="Name" onChange={e => setNameInput(e.target.value)} fullWidth value={nameInput}/>
            { InputError ? <p className={'input-error'}>Please fill all required information</p> : null}
        </Popup>
    )
    const editTaskModal = (
        <Popup onSubmit={editTask} title={"Edit Task"} open={openEditTask}
               closePopup={() => setOpenEditTask(false)} isDelete={false}>
            <TextField label="Name" value={nameInput} onChange={e => setNameInput(e.target.value)}
                       fullWidth/>
            <TextField label="Category" value={categoryInput}
                       onChange={e => setCategoryInput(e.target.value)} fullWidth/>
            <p>Share your task with a TaskIt user </p>
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
            <TextField required label="Title" onChange={e => setNameInput(e.target.value)} fullWidth value={nameInput}/>
            <TextField style={{marginTop: '5%'}} required label="Type here..." multiline rows={3} variant="outlined"
                       onChange={e => setCategoryInput(e.target.value)} fullWidth value={categoryInput}/>
            { InputError ? <p className={'input-error'}>Please fill all required information</p> : null}
        </Popup>
    )

    const reviewBtn = () => {
        if(task.userID) {
            if(task.templateID) {
                return (
                    <ButtonBase style={{backgroundColor: '#2A73CC'}} centerRipple={true}
                                     onClick={() => setOpenReview(true)}>
                        <p style={{width: '200px'}}>{reviewBtnMessage}</p>
                    </ButtonBase>
                )
            } else {
                return null
            }
        } else {
            return (
                <ButtonBase centerRipple={true} disabled={reviewList.length <= 0}
                            onClick={() => setOpenReviewList(true)} style={{backgroundColor: '#2A73CC'}}>
                    <p style={{width: '100px'}}>Reviews</p>
                </ButtonBase>
            )
        }
    }

    return (
        <>
            <Header/>
            <Menu goBack={true} reroute={ cookies.user.admin ? ({pathname: '/admin'}) : ({pathname: '/dashboard'}) }>
                <ButtonBase centerRipple={true} onClick={() => setOpenAddSubTask(true)}>
                    <p style={{width: '200px'}}>Creat New SubTask</p>
                </ButtonBase>
                {reviewBtn()}
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
                            {emailNameList.map((item, i) => <span key={i}>{item}</span>)}
                        </div>
                    ) : null}
                </div>
                <div className={'subtask-list'}>
                    <List checkboxes={ !cookies.user.admin } action={getCurrentSubTask} checkboxeToggle={checkboxToggle}
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