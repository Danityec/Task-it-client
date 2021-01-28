import React from 'react';
import {Card, CardActions, CardContent, Typography} from "@material-ui/core";

const ListItem = (props) => {
    return (
        <Card>
            <CardContent>
                <Typography>
                    {props.itemTitle}
                </Typography>
            </CardContent>
            <CardActions>
                {props.children}
            </CardActions>
        </Card>
    )
}

export default ListItem