import React from 'react';

const Message = (props) => {
    return (
        <div className={'message'}>
            <p className={'text'}>{props.message}</p>
            <p className={'timestamp'}>{props.timestamp}</p>
        </div>
    )
}

export default Message