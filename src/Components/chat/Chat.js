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
                    {props.chat['messages'].map(eachMessage)}
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

//
// fetch("http://127.0.0.1:3000/api/users", 'GET')
//     .then(response => response.json())
//     .then(result => {})

// let data = [];
//  const fetchData = () => {
//     try {
//         data = fetch("http://127.0.0.1:3000/api/users")
//             .then(res => res.json());
//     } catch (err) {
//         console.log(`Error while fetching data from server: ( ${err})`);
//     }
//     data.map(item => this.add({ id: item.id, txt: item.idea, grp: item.group }));
// }
// fetchData();
