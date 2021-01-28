import React from 'react';
import Menu from "../shared/Menu";
import {Button, IconButton} from "@material-ui/core";
import List from "../shared/List";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";

const ChatList = (props) => {
    const new_chat_popup = () => {
        return (
            <div>
                {/*<Popup></Popup>*/}
            </div>
        )
    }

    return (
        <>
            <Menu goBack={true} goTo={'/'}>
                <Button onClick={new_chat_popup}>New Chat</Button>
            </Menu>
            <div>
                <List dataList={null} >
                    <IconButton onClick={'/chat'}>
                        <ArrowForwardIosRoundedIcon/>
                    </IconButton>
                </List>
            </div>
        </>
    )
}

export default ChatList