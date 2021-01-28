import React from 'react';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import {List as MuiList, ListItem as MuiListItem, IconButton} from '@material-ui/core';
import ListItem from "./ListItem";

const List = (props) => {
    const eachItem = (item, index) => {
        return (
            <MuiListItem>
                <ListItem key={item._id} itemTitle={item.name}>
                    {props.children}
                    {/*<IconButton>*/}
                    {/*    <ArrowForwardIosRoundedIcon/>*/}
                    {/*</IconButton>*/}
                </ListItem>
            </MuiListItem>
        )
    }

    return (
        <MuiList>
            {props.dataList.map(eachItem)}
        </MuiList>
    )
}

export default List