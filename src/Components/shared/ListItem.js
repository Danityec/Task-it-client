import React, {useState} from 'react';
import './ListItem.css'
import {Card, CardActions, CardContent, Checkbox, ListItem as MuiListItem} from "@material-ui/core";
import {Link} from "react-router-dom";

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
                    { props.checkboxes ? <Checkbox checked={checked} onChange={handleChange}/> : null }
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