import React from 'react';
import './ListItem.css'
import {Card, CardActions, CardContent, ListItem as MuiListItem} from "@material-ui/core";
import {Link} from "react-router-dom";

const ListItem = (props) => {
    return (
        <MuiListItem className={'list-item'}>
            <Card elevation={0} className={'list-item card'}>
                <CardContent>
                    <p>
                        {props.itemTitle}
                    </p>
                </CardContent>
                <CardActions>
                    <Link to={{pathname: props.pathName, data: props.item, name: props.itemTitle}}>
                        {props.children}
                    </Link>
                </CardActions>
            </Card>
        </MuiListItem>
    )
}

export default ListItem