import React, {useEffect, useState} from 'react';
import './ChatList.css'
import Menu from "../shared/Menu";
import {ButtonBase, IconButton} from "@material-ui/core";
import List from "../shared/List";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";

const userId = '5fecb592690ca7935ccfd762'

const ChatList = (props) => {
    const [chatList, setChatList] = useState([]);
    const [titleList, setTitleList] = useState({});

    useEffect(() => {
        fetch(`http://127.0.0.1:3000/api/chats?userID=${userId}`)
            .then(response => response.json())
            .then(result => setChatList(result))
    }, [])

    useEffect(() => {
        let users = []
        chatList.forEach(chat => {
            if (chat['userID1'] === userId)
                users.push(chat['userID2'])
            else
                users.push(chat['userID1'])
        })

        users.forEach(user => {
            fetch(`http://127.0.0.1:3000/api/users/${user}`)
                .then(response => response.json())
                .then(result => {
                    setTitleList(prevState => ({
                        ...prevState, [user]: `${result.firstName} ${result.lastName}`
                    }));
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

    return (
        <>
            <Menu goBack={true}>
                <ButtonBase onClick={newChatPopup}>New Chat</ButtonBase>
            </Menu>
            <div className={'chat-list'}>
                <List dataList={chatList} titleList={titleList} pathName={'/chat'}>
                    <IconButton>
                        <ArrowForwardIosRoundedIcon/>
                    </IconButton>
                </List>
            </div>
        </>
    )
}

export default ChatList