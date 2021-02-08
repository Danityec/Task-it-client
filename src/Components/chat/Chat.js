import React, {useEffect, useRef, useState} from 'react';
import "./Chat.css";
import {IconButton} from "@material-ui/core";
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import Message from "./Message";
import Menu from "../shared/Menu";
import Header from "../shared/Header";
import axios from "axios";

// const userId = '106859904573047383930'

const Chat = (props) => {
    const [inputMessage, setInputMessage] = useState('');
    const [chat, setChat] = useState(props.location.data);
    const messagesEndRef = useRef(null)
    const [userId] = useState(props.location.userId)

    useEffect(() => {
        scrollToBottom()
    }, [chat]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const sendMessage = () => {
        const body = {
            senderID: userId,
            message: inputMessage
        }
        axios.post(`http://localhost:3000/api/chats/messages/${chat._id}`, body, {withCredentials: true})
            .then(res => {
                setChat(res.data)
                setInputMessage('')
            })
            .catch(err => console.log(err))
    }

    const eachMessage = (message) => {
        let messageType = 'incoming'
        if (message.senderID === userId)
            messageType = 'outgoing'
        return (
            <Message key={message._id} messageType={messageType} message={message.message} timestamp={message.timestamp}/>
        )
    }

    return (
        <>
            <Header userId={userId}/>
            <Menu goBack={true} title={true} reroute={{pathname: '/chats', userId: userId}}>
                <h2 className={'chat-title'}>{props.location.name}</h2>
            </Menu>
            <div className={'chat-container'}>
                <div className={'chat-window'}>
                    <div className={'message-area'}>
                        {chat.messages.map(eachMessage)}
                        <div ref={messagesEndRef} />
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