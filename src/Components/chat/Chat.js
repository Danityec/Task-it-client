import React, {useState} from 'react';
import {IconButton, List as MuiList} from "@material-ui/core";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import Message from "./Message";

const Chat = (props) => {
    const [inputMessage, setInputMessage] = useState('');

    const eachMessage = (message) => {
        return (
            <Message key={message._id} message={message.message} timestamp={message.timestamp}/>
        )
    }

    return (
        <div>
            <div>
                <IconButton to={'/chats'}>
                    <ArrowBackIosRoundedIcon/>
                </IconButton>
                <h2>{'name'}</h2>
            </div>
            <div className={'chat-window'}>
                <div className={'message-area'}>
                    {props.messageList.map(eachMessage)}
                </div>
                <div className={'input-area'}>
                    <input type={'text'} name={'message'} value={inputMessage}
                           onChange={e => setInputMessage(e.target.value)}/>
                    <IconButton onClick={null}>
                        <SendRoundedIcon/>
                    </IconButton>
                </div>
            </div>
        </div>
    )
}

export default Chat