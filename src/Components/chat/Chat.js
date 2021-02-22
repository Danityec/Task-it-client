import React, {useEffect, useRef, useState} from 'react';
import "./Chat.css";
import {IconButton} from "@material-ui/core";
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import Message from "./Message";
import Menu from "../shared/Menu";
import Header from "../shared/Header";
import {useCookies} from "react-cookie";
import {useHistory} from "react-router-dom";

const Chat = (props) => {
    let history = useHistory();
    const [inputMessage, setInputMessage] = useState('');
    const [chat, setChat] = useState(props.location.data);
    const messagesEndRef = useRef(null)
    const [cookies] = useCookies(['user']);

    useEffect(() => {
        scrollToBottom()
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
    }

    const sendMessage = () => {
        const body = {senderID: cookies.user.googleID, message: inputMessage}
        fetch(`https://task--it.herokuapp.com/api/chats/messages/${chat._id}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'user': cookies.user.googleID
            },
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(result => {
                setChat(result)
                setInputMessage('')
            })
    }

    const eachMessage = (message) => {
        let messageType = 'incoming'
        if (message.senderID === cookies.user.googleID)
            messageType = 'outgoing'
        return (
            <Message key={message._id} messageType={messageType} message={message.message}
                     timestamp={message.timestamp}/>
        )
    }

    return (
        <>
            <Header/>
            <Menu goBack={true} title={true} reroute={{pathname: '/chats'}}>
                <h2 className={'chat-title'}>{props.location.name}</h2>
            </Menu>
            <div className={'chat-container'}>
                <div className={'chat-window'}>
                    <div className={'message-area'}>
                        {chat.messages.map(eachMessage)}
                        <div ref={messagesEndRef}/>
                    </div>
                    <div className={'input-area'}>
                        <input type={'text'} name={'message'} value={inputMessage}
                               onChange={e => setInputMessage(e.target.value)}/>
                        <IconButton onClick={sendMessage}>
                            <SendRoundedIcon/>
                        </IconButton>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat