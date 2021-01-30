import React, {useEffect, useState} from 'react';
import './AdminTask.css'
import Menu from "../shared/Menu";
import {ButtonBase, Modal} from "@material-ui/core";
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import TextField from '@material-ui/core/TextField';
import Popup from "../shared/Popup";

const AdminTask = (props) => {
    const [template, setTemplate] = useState([]);
    const [openReview, setOpenReview] = useState(false);
    const [reviewList, setReviewList] = useState([]);
    const [openAddSubTask, setOpenAddSubTask] = useState(false);
    const [nameSubTask, setNameSubTask] = useState("");
    const [task, setTask] = useState(props.location.data);
    

    useEffect(() => {
        setTask(props.location.data)
    }, [])


    useEffect(() => {
        fetch(`http://127.0.0.1:3000/api/tasks/${props.location.id}`)
            .then(response => response.json())
            .then(result => {
                // console.log(result)
                setTemplate(result)})
    }, [])

    useEffect(() => {
        fetch(`http://127.0.0.1:3000/api/reviews?templateID=${template.templateID}`)
            .then(response => response.json())
            .then(result => {
                setReviewList(result)
            })
    }, [template])

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

    const modalBody = (
        <div className={'review-page'}>
            <ButtonBase className={'modal-close-btn'} onClick={()=>setOpenReview(false)}>
                <CloseRoundedIcon/>
            </ButtonBase>
            <div className={'review-list'}>
                {reviewList.map(eachReview)}
            </div>
        </div>
    );

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
                setOpenAddSubTask(false);
                setTask(result);
            });

    }

    return (
        <>
            <Menu goBack={true}>
                <ButtonBase centerRipple={true} style={{ backgroundColor:'#2A73CC'}} onClick={()=>setOpenReview(true)}><p style={{width: '100px'}}>Reviews</p></ButtonBase>
                <ButtonBase centerRipple={true}><p style={{width: '200px'}}onClick={()=>setOpenAddSubTask(true)} >Create New Subtask</p></ButtonBase>
            </Menu>
            <Popup onSubmit={addNewSubTask} title={"Create Subtask"} open={openAddSubTask}>
                    <TextField className="inputNameSubTask" label="Name"onChange={e => setNameSubTask(e.target.value)}
                        fullWidth value={nameSubTask}>
                    </TextField>
                </Popup>
            <Modal className={'review-modal'} open={openReview} onClose={()=>setOpenReview(false)}>
                {modalBody}
            </Modal>
            <div className={'admin-task-page'}>
                <div className={''}>
                    {template.name}
                </div>
            </div>
        </>)
}

export default AdminTask
