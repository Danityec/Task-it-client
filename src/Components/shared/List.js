import React from 'react';
import {List as MuiList, ListItem as MuiListItem} from '@material-ui/core';
import ListItem from "./ListItem";

const List = (props) => {
    const eachItem = (item, index) => {
        return (
            <ListItem key={item._id} itemTitle={props.titleList[index]}>
                {props.children}
            </ListItem>
        )
    }

    return (
        <MuiList>
            {props.dataList.map(eachItem)}
        </MuiList>
    )
}

export default List