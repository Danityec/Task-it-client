import React, {useEffect, useState} from 'react';
import Menu from "../shared/Menu";
import {Button, ButtonBase, IconButton} from "@material-ui/core";
import List from "../shared/List";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import Chat from "./Chat";

const ChatList = (props) => {
    const [chatList, setChatList] = useState([]);
    const [titleList, setTitleList] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:3000/api/chats?userID=${'5fecb592690ca7935ccfd762'}`)
            .then(response => response.json())
            .then(result => setChatList(result))
    }, [])

    useEffect(() => {
        let users = []
        chatList.forEach(chat => {
            if (chat['userID1'] == '5fecb592690ca7935ccfd762')
                users.push(chat['userID2'])
            else
                users.push(chat['userID1'])
        })

        users.forEach(user => {
            fetch(`http://127.0.0.1:3000/api/users/${user}`)
                .then(response => response.json())
                .then(result => {
                    setTitleList(prevTitleList => [...prevTitleList, `${result.firstName} ${result.lastName}`])
                })
        })
    }, [chatList])

    const newChatPopup = () => {
        return (
            <div>
                {/*<Popup></Popup>*/}
            </div>
        )
    }

    const goToChat = (id) => {
        let chat = {}
        fetch(`http://127.0.0.1:3000/api/chats/${'5fee0b99814bdc51a097080a'}`)
            .then(response => response.json())
            .then(result => console.log(result))

        return (
            <Chat chat={chat}/>
        )
    }

    return (
        <>
            <Menu goBack={true} goTo={'/'}>
                <ButtonBase onClick={newChatPopup}>New Chat</ButtonBase>
            </Menu>
            <div>
                <List dataList={chatList} titleList={titleList}>
                    <IconButton onClick={goToChat}>
                        <ArrowForwardIosRoundedIcon/>
                    </IconButton>
                </List>
            </div>
        </>
    )
}

export default ChatList