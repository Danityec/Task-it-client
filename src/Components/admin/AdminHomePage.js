import React, {useEffect, useState} from 'react';
import './AdminHomePage.css'
import Menu from "../shared/Menu";
import {ButtonBase, IconButton} from "@material-ui/core";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import {Link} from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Popup from "../shared/Popup";
import Header from "../shared/Header";

const AdminHomePage = (props) => {
    const [templateList, setTemplateList] = useState([]);
    const [lengthList, setLength] = useState({});
    const [openAddTemplate, setOpenAddTemplate] = useState(false);
    const [templateName, setTemplateName] = useState("");
    const [templateCategory, setTemplateCategory] = useState("");
    const [InputError, setInputError] = useState(false);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        setRefresh(false)
        fetch(`http://localhost:3000/api/tasks?templates=true`, {credentials: 'include'})
            .then(response => response.json())
            .then(result => setTemplateList(result))
    }, [refresh])

    useEffect(() => {
        templateList.forEach((template) => {
            fetch(`http://localhost:3000/api/reviews?templateID=${template.templateID}`, {credentials: 'include'})
                .then(response => response.json())
                .then(result => {
                    setLength(prevState => ({
                        ...prevState, [template._id]: `${result.length}`
                    }));
                })
        })
    }, [templateList])

    const addNewTemplate = () => {
        if (templateName === "" || templateCategory === "") {
            setInputError(true)
            return
        }
        const data = {name: templateName, category: templateCategory};
        fetch(`http://localhost:3000/api/tasks/`, {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(result => {
                setOpenAddTemplate(false)
                setInputError(false)
                setRefresh(true)
            })
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
            <Header/>
            <Menu goBack={false}>
                <ButtonBase centerRipple={true} onClick={() => {
                    setOpenAddTemplate(true)
                }}><p style={{width: '200px'}}>Create New Template</p></ButtonBase>
            </Menu>
            <Popup onSubmit={addNewTemplate} title={"New Template"} open={openAddTemplate}
                   closePopup={() => setOpenAddTemplate(false)}>
                <TextField required className="template-name-input" label="Name" onChange={e => setTemplateName(e.target.value)}
                           fullWidth value={templateName}/>
                <TextField required className="template-category-input" label="Category"
                           onChange={e => setTemplateCategory(e.target.value)} fullWidth value={templateCategory}/>
                { InputError ? <p className={'input-error'}>Please fill all required information</p> : null}
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