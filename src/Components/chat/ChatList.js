import React, {useEffect, useState} from 'react';
import './ChatList.css'
import Menu from "../shared/Menu";
import {ButtonBase, IconButton} from "@material-ui/core";
import List from "../shared/List";
import Popup from "../shared/Popup";
import TextField from '@material-ui/core/TextField';
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";

const userId = '5fecb592690ca7935ccfd762'
const userID1 = '5fecb592690ca7935ccfd762'
const userID2 = '5fea10ee690ca7935c117922'

const ChatList = (props) => {
    const [chatList, setChatList] = useState([]);
    const [titleList, setTitleList] = useState({});
    const [open, setOpen] = useState(false);
    const [emailChat, setEmailChat] = useState("");

    useEffect(() => {
        fetch(`http://127.0.0.1:3000/api/chats?userID=${userId}`)
            .then(response => response.json())
            .then(result => setChatList(result))
    }, [])

    useEffect(() => {
        let users = []
        chatList.forEach(chat => {
            if (chat['userID1'] === userId)
                users.push(chat['userID2'])
            else
                users.push(chat['userID1'])
        })

        users.forEach((user, index) => {
            fetch(`http://127.0.0.1:3000/api/users/${user}`)
                .then(response => response.json())
                .then(result => {
                    setTitleList(prevState => ({
                        ...prevState, [chatList[index]._id]: `${result.firstName} ${result.lastName}`
                    }));
                })
        })
    }, [chatList])

   
    const addNewChat = () => { 
        const data = { email: emailChat, userID: userID1, userID: userID2};
        console.log(data)
            fetch(`http://localhost:3000/api/chats/`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(result => {handleClose()});

    }

    const handleClose = () => {
        setOpen(false);

    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <>
            <Menu goBack={true}>
                <ButtonBase centerRipple={true} onClick={handleClickOpen}><p style={{width: '150px'}}>New Chat</p></ButtonBase>
            </Menu>
            <div className={'chat-list'}>
                <List dataList={chatList} titleList={titleList} pathName={'/chat'}>
                    <IconButton>
                        <ArrowForwardIosRoundedIcon/>
                    </IconButton>
                </List>

                <Popup onSubmit={addNewChat} title={"New Chat"} text={"Open a new chat with another TaskIt user"} open={open}>
                    <TextField key={1} className="inputEmail"
                            autoFocus
                            margin="dense"
                            id="Email"
                            label="Email"
                            type="Email"
                            onChange={e => setEmailChat(e.target.value)}
                            fullWidth
                            value={emailChat}>
                    </TextField>
                </Popup>
            </div>
        </>
    )
}

export default ChatList