import React, {useEffect, useState} from 'react';
import './AdminHomePage.css'
import Menu from "../shared/Menu";
import {ButtonBase, IconButton} from "@material-ui/core";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import {Link} from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Popup from "../shared/Popup";
import Header from "../shared/Header";
import axios from "axios";

const AdminHomePage = (props) => {
    const [templateList, setTemplateList] = useState([]);
    const [lengthList, setLength] = useState({});
    const [openAddTemplate, setOpenAddTemplate] = useState(false);
    const [templateName, setTemplateName] = useState("");
    const [templateCategory, setTemplateCategory] = useState("");
    const [userId] = useState(props.location.userId)

    useEffect(() => {
        axios.get(`http://localhost:3000/api/tasks?templates=true`, {withCredentials: true})
            .then(res => setTemplateList(res.data))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        templateList.forEach((template) => {
            axios.get(`http://localhost:3000/api/reviews?templateID=${template.templateID}`, {withCredentials: true})
                .then(res => {
                    setLength(prevState => ({
                        ...prevState, [template._id]: `${res.data.length}`
                    }))
                })
                .catch(err => console.log(err))
        })
    }, [templateList])

    const addNewTemplate = () => {
        const data = {name: templateName, category: templateCategory,};
        console.log(data)
        axios.post(`http://localhost:3000/api/tasks/`, data, {withCredentials: true})
            .then(res => {
                console.log(res.data)
                setOpenAddTemplate(false);
            })
            .catch(err => console.log(err))
    }

    const eachTemplate = (item) => {
        return (
            <div key={item._id} className={'template-card'}>
                <div className={'card-header'}>
                    <div>{item.name}</div>
                    <Link to={{pathname: '/admin/template', data: item}}>
                        <IconButton>
                            <ArrowForwardIosRoundedIcon/>
                        </IconButton>
                    </Link>
                </div>
                <div>
                    {lengthList[item._id]} Reviews
                </div>
            </div>
        )
    }

    return (
        <>
            <Header userId={userId}/>
            <Menu goBack={false}>
                <ButtonBase centerRipple={true} onClick={() => {
                    setOpenAddTemplate(true)
                }}><p style={{width: '200px'}}>Create New Template</p></ButtonBase>
            </Menu>
            <Popup onSubmit={addNewTemplate} title={"New Template"} open={openAddTemplate}
                   closePopup={() => setOpenAddTemplate(false)}>
                <TextField className="template-name-input" label="Name"
                           onChange={e => setTemplateName(e.target.value)}
                           fullWidth value={templateName}/>
                <TextField className="template-category-input" label="Category"
                           onChange={e => setTemplateCategory(e.target.value)} fullWidth value={templateCategory}/>
            </Popup>
            <div className={'admin-template-page'}>
                <div className={'admin-template-list'}>
                    {templateList.map(eachTemplate)}
                    <div className={'spacer'}/>
                </div>
            </div>
        </>
    )
}

export default AdminHomePage