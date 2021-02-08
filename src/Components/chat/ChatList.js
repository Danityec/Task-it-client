import React, {useEffect, useState} from 'react';
import './ChatList.css'
import Menu from "../shared/Menu";
import {ButtonBase} from "@material-ui/core";
import List from "../shared/List";
import Popup from "../shared/Popup";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Header from "../shared/Header";
import axios from "axios";

const ChatList = (props) => {
    const [chatList, setChatList] = useState([]);
    const [titleList, setTitleList] = useState({});
    const [open, setOpen] = useState(false);
    const [emailList, setEmailList] = useState([]);
    const [emailValue, setEmailValue] = useState(null);
    const [userId] = useState(props.location.userId)

    useEffect(() => {
        axios.get(`http://localhost:3000/api/chats?userID=${userId}`, {withCredentials: true})
            .then(res => setChatList(res.data))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:3000/api/users/`, {withCredentials: true})
            .then(res => {
                res.data.forEach(user => {
                    setEmailList(prevArray => [...prevArray, {title: user['email']}])
                })
            })
            .catch(err => console.log(err))

        let users = []
        chatList.forEach(chat => {
            if (chat['userID1'] === userId)
                users.push(chat['userID2'])
            else
                users.push(chat['userID1'])
        })

        users.forEach((user, index) => {
            axios.get(`http://localhost:3000/api/users/${user}`, {withCredentials: true})
                .then(res => {
                    setTitleList(prevState => ({
                        ...prevState, [chatList[index]._id]: `${res.data.firstName} ${res.data.lastName}`
                    }));
                })
                .catch(err => console.log(err))
        })
    }, [chatList])

    const addNewChat = () => {
        axios.get(`http://localhost:3000/api/users?email=${emailValue.title}`, {withCredentials: true})
            .then(res => {
                const body = {userID1: userId, userID2: res.data['_id']};
                axios.post(`http://localhost:3000/api/chats/`, body, {withCredentials: true})
                    .then(res => {
                        setOpen(false)
                        setChatList(res.data)
                    })
                    .catch(err => console.log(err))
            }).catch(err => console.log(err))
    }

    return (
        <>
            <Header userId={userId}/>
            <Menu goBack={true} reroute={{pathname: '/dashboard', userId: userId}}>
                <ButtonBase centerRipple={true} onClick={() => setOpen(true)}>
                    <p style={{width: '150px'}}>New Chat</p>
                </ButtonBase>
            </Menu>
            <div className={'chat-list-page'}>
                <div className={'chat-list'}>
                    <List dataList={chatList} userId={userId} titleList={titleList} pathName={'/chat'}/>
                </div>
                <Popup onSubmit={addNewChat} closePopup={() => setOpen(false)} title={"New Chat"} open={open}
                       isDelete={false}>
                    <p>open a new chat with another TaskIt user</p>
                    <Autocomplete
                        style={{width: '100%', paddingTop: '5%'}}
                        options={emailList} getOptionLabel={(emailList) => emailList.title} value={emailValue}
                        onChange={(e, newValue) => {
                            setEmailValue(newValue)
                        }}
                        renderInput={(params) => <TextField {...params} label="Email"/>}/>
                </Popup>
            </div>
        </>
    )
}

export default ChatList