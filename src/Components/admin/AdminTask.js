import React, {useEffect, useState} from 'react';
import './AdminTask.css'
import Menu from "../shared/Menu";
import {ButtonBase, Modal} from "@material-ui/core";
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';


const AdminTask = (props) => {
    const [template, setTemplate] = useState([]);
    const [open, setOpen] = useState(false);
    const [reviewList, setReviewList] = useState([]);

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
            <ButtonBase className={'modal-close-btn'} onClick={()=>setOpen(false)}>
                <CloseRoundedIcon/>
            </ButtonBase>
            <div className={'review-list'}>
                {reviewList.map(eachReview)}
            </div>
        </div>
    );

    return (
        <>
            <Menu goBack={true}>
                <ButtonBase centerRipple={true} style={{ backgroundColor:'#2A73CC'}} onClick={()=>setOpen(true)}><p style={{width: '100px'}}>Reviews</p></ButtonBase>
                <ButtonBase centerRipple={true}><p style={{width: '200px'}}>Create New Subtask</p></ButtonBase>
            </Menu>
            <Modal className={'review-modal'} open={open} onClose={()=>setOpen(false)}>
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
