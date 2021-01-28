import React from 'react';
import {Card, CardActions, CardContent, ListItem as MuiListItem, Typography} from "@material-ui/core";

const ListItem = (props) => {
    return (
        <MuiListItem>
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
        </MuiListItem>
    )
}

export default ListItem