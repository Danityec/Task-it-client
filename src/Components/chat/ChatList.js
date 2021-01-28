import React, {useEffect, useState} from 'react';
import './ChatList.css'
import Menu from "../shared/Menu";
import {ButtonBase, CardActions, IconButton} from "@material-ui/core";
import List from "../shared/List";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import Chat from "./Chat";
import {Link, Redirect} from "react-router-dom";

const ChatList = (props) => {
    const [chatList, setChatList] = useState([]);
    const [titleList, setTitleList] = useState({});

    useEffect(() => {
        fetch(`http://127.0.0.1:3000/api/chats?userID=${'5fecb592690ca7935ccfd762'}`)
            .then(response => response.json())
            .then(result => setChatList(result))
    }, [])

    useEffect(() => {
        let users = []
        let chatIDs = []
        let i = 0
        chatList.forEach(chat => {
            chatIDs.push(chat._id)
            if (chat['userID1'] == '5fecb592690ca7935ccfd762')
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
                    i += 1
                })
            // setTitleList(prevState => ({
            //     ...prevState, [chatIDs[i]]: `${result.firstName} ${result.lastName}`
            //     // setTitleList( titleList[chatIDs[i]] = `${result.firstName} ${result.lastName}`)
            // })

            // })
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
        fetch(`http://127.0.0.1:3000/api/chats/${id}`)
            .then(response => response.json())
            .then(result => {
                // console.log(result)
                // return (<Link to={{pathname: "/chat", result}}/>)
                return <Redirect to={{pathname: "/chat", result}}/>
            })
    }


    // console.log(titleList)
    // console.log(chatList)

    return (
        <>
            <Menu goBack={true} goTo={'/'}>
                <ButtonBase onClick={newChatPopup}>New Chat</ButtonBase>
            </Menu>
            <div className={'chat-list'}>
                <List dataList={chatList} titleList={titleList} pathName={'/chat'}>
                    {/*<Link to={{pathname: "/chat", chat: chatList[0]}}>*/}
                    <IconButton>
                        <ArrowForwardIosRoundedIcon/>
                    </IconButton>
                    {/*</Link>*/}
                </List>
            </div>
        </>
    )
}

export default ChatList