import React from 'react';
import Menu from "../shared/Menu";
import {Button, IconButton} from "@material-ui/core";
import List from "../shared/List";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import Chat from "./Chat";

const ChatList = (props) => {
    const newChatPopup = () => {
        return (
            <div>
                {/*<Popup></Popup>*/}
            </div>
        )
    }

    const goToChat = () => {
        return (
            <Chat messageList={null}/>
        )
    }

    return (
        <>
            <Menu goBack={true} goTo={'/'}>
                <Button onClick={newChatPopup}>New Chat</Button>
            </Menu>
            <div>
                <List dataList={null} >
                    <IconButton onClick={goToChat}>
                        <ArrowForwardIosRoundedIcon/>
                    </IconButton>
                </List>
            </div>
        </>
    )
}

export default ChatList