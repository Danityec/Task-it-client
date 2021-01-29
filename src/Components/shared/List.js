import React from 'react';
import './List.css'
import ListItem from "./ListItem";

const List = (props) => {

    const eachItem = (item, index) => {
        let name = ''
        if (props.titleList[item.userID1])
            name = props.titleList[item.userID1]
        else
            name = props.titleList[item.userID2]

        return (
            <ListItem key={item._id} item={item} itemTitle={name} pathName={props.pathName}>
                {props.children}
            </ListItem>
        )
    }

    return (
        <div className={'list'}>
            {props.dataList.map(eachItem)}
        </div>
    )
}

export default List