import React, { useEffect, useState } from 'react';
import './AdminHomePage.css'
import Menu from "../shared/Menu";
import { ButtonBase, IconButton } from "@material-ui/core";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Popup from "../shared/Popup";
import Header from "../shared/Header";

// const userId = '106859904573047383930'

const AdminHomePage = (props) => {
    const [templateList, setTemplateList] = useState([]);
    const [lengthList, setLength] = useState({});
    const [openAddTemplate, setOpenAddTemplate] = useState(false);
    const [templateName, setTemplateName] = useState("");
    const [templateCategory, setTemplateCategory] = useState("");
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        setUserId(props.location.userId)
        fetch(`http://127.0.0.1:3000/api/tasks?templates=true`)
            .then(response => response.json())
            .then(result => setTemplateList(result))
    }, [])

    useEffect(() => {
        templateList.forEach((template) => {
            fetch(`http://127.0.0.1:3000/api/reviews?templateID=${template.templateID}`)
                .then(response => response.json())
                .then(result => {
                    setLength(prevState => ({
                        ...prevState, [template._id]: `${result.length}`
                    }));
                })
        })
    }, [templateList])

    const addNewTemplate = () => {
        const data = { name: templateName, category: templateCategory, };
        console.log(data)
        fetch(`http://localhost:3000/api/tasks/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setOpenAddTemplate(false);
            });
    }

    const eachTemplate = (item) => {
        return (
            <div key={item._id} className={'template-card'}>
                <div className={'card-header'}>
                    <div>{item.name}</div>
                    <Link to={{ pathname: '/admin/template', data: item}}>
                        <IconButton>
                            <ArrowForwardIosRoundedIcon />
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
                <ButtonBase centerRipple={true} onClick={() => {setOpenAddTemplate(true) }}><p style={{ width: '200px' }}>Create New Template</p></ButtonBase>
            </Menu>
            <Popup onSubmit={addNewTemplate} title={"New Template"} open={openAddTemplate} closePopup={() =>setOpenAddTemplate(false)} >
                <TextField className="template-name-input" label="Name" onChange={e => setTemplateName(e.target.value)}
                    fullWidth value={templateName} />
                <TextField className="template-category-input" label="Category"
                    onChange={e => setTemplateCategory(e.target.value)} fullWidth value={templateCategory} />
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