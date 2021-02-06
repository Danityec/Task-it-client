import React, { useRef, useState } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { Avatar, MenuItem, MenuList, Grow, Popper, ClickAwayListener, Paper } from "@material-ui/core";
import './Header.css'
// import axios from 'axios';
import { SettingsInputAntennaTwoTone } from "@material-ui/icons";


const Header = (props) => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    // const [logout, setLogout] = useState(false);


    const logout = () => {
        // localStorage.removeItem("token");
        // setLogout(true)
        fetch(`http://localhost:3000/authLogin/logout`, {
            method: 'GET',
        })
        .then(res => {
                console.log(res);
                  return <Redirect to="/" push={true}/>
              })            
        .catch(err => console.log(err))
}


return (
    <div className={"header"}>
        <div className={'header-content'}>
            <NavLink exact to="/" className={'logo'} />
            {props.userId ? (
                <div>
                    <Avatar className={'user-avatar'}
                        ref={anchorRef} aria-controls={open ? 'menu-list' : undefined}
                        aria-haspopup="true" onClick={() => setOpen(prevOpen => !prevOpen)}>
                    </Avatar>
                    <Popper open={open} anchorEl={anchorRef.current} placement={'bottom-end'} transition>
                        {({ TransitionProps }) => (
                            <Grow {...TransitionProps} style={{ transformOrigin: 'right top' }}>
                                <Paper style={{ backgroundColor: '#2A73CC' }}>
                                    <ClickAwayListener onClickAway={() => setOpen(false)}>
                                        <MenuList id="menu-list">
                                            <MenuItem><NavLink className={'menu-list-item'} to='/account'>Account</NavLink></MenuItem>
                                            <MenuItem><NavLink className={'menu-list-item'} to='/my-reviews'>My Reviews</NavLink></MenuItem>
                                            <MenuItem><button className={'menu-list-item'} onClick={logout} >Logout</button></MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>)}
                    </Popper>
                </div>
            ) : null}

        </div>
    </div>
)
}

export default Header