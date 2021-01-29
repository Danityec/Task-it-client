import React from 'react';
import './Message.css'

const Message = (props) => {
    return (
        <div className={`message ${props.messageType}`}>
            <p className={`text ${props.messageType}`}>{props.message}</p>
            <p className={'timestamp'}>{props.timestamp}</p>
        </div>
    )
}

export default Message