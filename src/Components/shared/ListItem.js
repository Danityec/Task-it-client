import React, {useState} from 'react';
import './ListItem.css'
import {Card, CardActions, CardContent, Checkbox, IconButton, ListItem as MuiListItem} from "@material-ui/core";
import {Link} from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";

const ListItem = (props) => {
    const [checked, setChecked] = useState(props.item.completed);

    const handleChange = (event) => {
        setChecked(event.target.checked);
        props.checkboxeToggle(props.item._id, !checked)
    };

    return (
        <MuiListItem className={'list-item'}>
            <Card elevation={0} className={'list-item card'}>
                <CardContent className={'card-content'}>
                    {props.checkboxes ? <Checkbox color="primary" checked={checked} onChange={handleChange}/> : null}
                    <Link to={{pathname: props.pathName, data: props.item, name: props.itemTitle}}>
                            {props.itemTitle}
                    </Link>
                </CardContent>
                <CardActions>
                    {props.action ? (
                        <>
                            <IconButton>
                                <EditIcon fontSize="large" style={{color: '#FFDD65'}} onClick={() => {props.action(props.item._id, 2)}}/>
                            </IconButton>
                            <IconButton>
                                <DeleteIcon fontSize="large" style={{color: '#FF5C5C'}} onClick={() => {props.action(props.item._id, 1)}}/>
                            </IconButton>
                        </>
                        ) : (
                        <Link to={{pathname: props.pathName, data: props.item, name: props.itemTitle}} >
                            <IconButton>
                                <ArrowForwardIosRoundedIcon/>
                            </IconButton>
                        </Link>
                        ) }

                </CardActions>
            </Card>
        </MuiListItem>
    )
}

export default ListItem

// onClick={()=>props.action(props.item._id)}