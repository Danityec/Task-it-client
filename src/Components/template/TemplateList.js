import React, { useEffect, useState }  from 'react';
import Template from './Template';
import './TemplateList.css';


const TemplateList = (props) => {
    const [templateList, setTemplateList] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/api/tasks?templates=true`)
            .then(response => response.json())
            .then(result => setTemplateList(result))
    }, [])

    console.log(templateList)

    const eachTemplate = (item) => {
        return  (<Template key={item._id} item={item} id={item._id}/>) 
    }

    return (
            <div className="templateList">
                {templateList.map(eachTemplate)} 
            </div> 
        )
}

export default TemplateList;