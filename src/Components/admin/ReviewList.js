import React, {useEffect, useState} from 'react';
import './ReviewList.css'
import Menu from "../shared/Menu";
import {ButtonBase, IconButton} from "@material-ui/core";
import {Link} from "react-router-dom";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";

const ReviewList = (props) => {
    const [template, setTemplate] = useState(props.location.template);
    const [reviewList, setReviewList] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:3000/api/reviews?templateID=${template.templateID}`)
            .then(response => response.json())
            .then(result => {
                setReviewList(result)
            })
    }, [])

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

    return (
        <>
            <Menu goBack={true} title={true}>
                <h2 className={'review-title'}>{template.name}</h2>
            </Menu>
            <div className={'review-page'}>
                <div className={'review-list'}>
                    {reviewList.map(eachReview)}
                </div>
            </div>
        </>)
}

export default ReviewList