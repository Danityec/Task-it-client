import React, {useEffect, useState} from 'react';
import './AdminHomePage.css'
import Menu from "../shared/Menu";
import {ButtonBase, IconButton} from "@material-ui/core";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import {Link} from "react-router-dom";


const AdminHomePage = (props) => {
    const [templateList, setTemplateList] = useState([]);
    const [lengthList, setLength] = useState({});

    useEffect(() => {
        fetch(`http://127.0.0.1:3000/api/tasks?templates=true`)
            .then(response => response.json())
            .then(result => setTemplateList(result))
    }, [])

    useEffect(() => {
        templateList.forEach((template, index) => {
            fetch(`http://127.0.0.1:3000/api/reviews?templateID=${template.templateID}`)
                .then(response => response.json())
                .then(result => {
                    setLength(prevState => ({
                        ...prevState, [template._id]: `${result.length}`
                    }));
                })
        })
    }, [templateList])

    const eachTemplate = (item) => {
        return (
            <div>
                <div>
                    <div>{item.name}</div>
                    <Link to='/admin/template'>
                        <IconButton>
                            <ArrowForwardIosRoundedIcon/>
                        </IconButton>
                    </Link>
                </div>
                <div>{lengthList[item._id]} Reviews</div>
            </div>
        )
    }

    return (
        <>
            <Menu goBack={false}>
                <ButtonBase centerRipple={true}><p style={{width: '180px'}}>Create New Template</p></ButtonBase>
            </Menu>
            <div className={'admin-template-list'}>
                { templateList.map(eachTemplate) }
            </div>
        </>)
}

export default AdminHomePage