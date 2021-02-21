import React, {useEffect, useState} from 'react';
import './ChatList.css'
import Menu from "../shared/Menu";
import {ButtonBase} from "@material-ui/core";
import List from "../shared/List";
import Popup from "../shared/Popup";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Header from "../shared/Header";
import {useCookies} from "react-cookie";

const ChatList = (props) => {
    const [chatList, setChatList] = useState([]);
    const [titleList, setTitleList] = useState({});
    const [open, setOpen] = useState(false);
    const [emailList, setEmailList] = useState([]);
    const [emailValue, setEmailValue] = useState(null);
    const [cookies] = useCookies(['user']);

    useEffect(() => {
        fetch(`http://localhost:3000/api/chats?userID=${cookies.user.googleID}`, {credentials: 'include'})
            .then(response => response.json())
            .then(result => setChatList(result))
    }, [cookies.user.googleID])

    useEffect(() => {
        fetch(`http://localhost:3000/api/users`, {credentials: 'include'})
            .then(response => response.json())
            .then(result => {
                result.forEach(user => {
                    setEmailList(prevArray => [...prevArray, {title: user['email']}])
                })
            })
    }, [chatList])

    useEffect(() => {
        let users = []
        chatList.forEach(chat => {
            if (chat['userID1'] === cookies.user.googleID)
                users.push(chat['userID2'])
            else
                users.push(chat['userID1'])
        })

        users.forEach((user, index) => {
            fetch(`http://localhost:3000/api/users/${user}`, {credentials: 'include'})
                .then(response => response.json())
                .then(result => {
                    setTitleList(prevState => ({
                        ...prevState, [chatList[index]._id]: `${result.firstName} ${result.lastName}`
                    }));
                })
        })
    }, [chatList, cookies.user.googleID])

    const addNewChat = () => {
        fetch(`http://localhost:3000/api/users?email=${emailValue.title}`, {credentials: 'include'})
            .then(response => response.json())
            .then(result => {
                const body = {userID1: cookies.user.googleID, userID2: result['_id']};
                fetch(`http://localhost:3000/api/chats/`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(body),
                })
                    .then(response => response.json())
                    .then(result => {
                        setOpen(false)
                        setChatList(result)
                    });
            })
    }

    return (
        <>
            <Header/>
            <Menu goBack={true} reroute={{pathname: '/dashboard'}}>
                <ButtonBase centerRipple={true} onClick={() => setOpen(true)}>
                    <p style={{width: '150px'}}>New Chat</p>
                </ButtonBase>
            </Menu>
            <div className={'chat-list-page'}>
                <div className={'chat-list'}>
                    <List dataList={chatList} titleList={titleList} pathName={'/chat'}/>
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