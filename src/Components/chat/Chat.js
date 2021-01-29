import React, {useEffect, useRef, useState} from 'react';
import "./Chat.css";
import {IconButton} from "@material-ui/core";
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import Message from "./Message";
import Menu from "../shared/Menu";

const userId = '5fecb592690ca7935ccfd762'

const Chat = (props) => {
    const [inputMessage, setInputMessage] = useState('');
    const [chat, setChat] = useState(props.location.data);
    const [name, setName] = useState(props.location.name);

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [chat]);

    const eachMessage = (message) => {
        let messageType = 'incoming'
        if (message.senderID === userId)
            messageType = 'outgoing'
        return (
            <Message key={message._id} messageType={messageType} message={message.message}
                     timestamp={message.timestamp}/>
        )
    }

    const sendMessage = () => {
        const body = {
            senderID: userId,
            message: inputMessage
        }
        fetch(`http://127.0.0.1:3000/api/chats/messages/${chat._id}`,
            {headers: {'Content-Type': 'application/json'}, method: 'POST', body: JSON.stringify(body)})
            .then(response => response.json())
            .then(result => {
                setChat(result)
                setInputMessage('')
            })
    }

    return (
        <div>
            <Menu goBack={true} title={true}>
                <h2 className={'chat-title'}>{name}</h2>
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
        </div>
    )
}

export default Chat