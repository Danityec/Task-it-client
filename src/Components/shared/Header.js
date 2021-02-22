import React, {useRef, useState} from "react";
import {NavLink, useHistory} from "react-router-dom";
import {Avatar, MenuItem, MenuList, Grow, Popper, ClickAwayListener, Paper, ButtonBase} from "@material-ui/core";
import './Header.css'
import {useCookies} from "react-cookie";

const Header = (props) => {
    let history = useHistory();
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const [cookies, setCookie] = useCookies(['user']);

    const logout = () => {
        fetch(`https://task--it.herokuapp.com/authLogin/logout`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'user': cookies.user.googleID
            }
        })
            .then(result => {
                setCookie('user', '')
                history.push('/')
            })
            .catch(err => console.log(err))
    }

    return (
        <div className={"header"}>
            <div className={'header-content'}>
                {cookies.user && cookies.user.googleID ? (cookies.user.admin ?
                    <NavLink exact to="/admin" className={'logo'}/> :
                    <NavLink exact to="/dashboard" className={'logo'}/>)
                    : <NavLink exact to="/" className={'logo'}/>
                }
                {cookies.user && cookies.user.googleID ? (
                    <div>
                        <Avatar className={'user-avatar'}
                                ref={anchorRef} aria-controls={open ? 'menu-list' : undefined}
                                src={cookies.user.avatar}
                                aria-haspopup="true" onClick={() => setOpen(prevOpen => !prevOpen)}>
                        </Avatar>
                        <Popper open={open} anchorEl={anchorRef.current} placement={'bottom-end'} transition>
                            {({TransitionProps}) => (
                                <Grow {...TransitionProps} style={{transformOrigin: 'right top'}}>
                                    <Paper style={{backgroundColor: '#2A73CC'}}>
                                        <ClickAwayListener onClickAway={() => setOpen(false)}>
                                            <MenuList id="menu-list">
                                                <MenuItem>
                                                    <ButtonBase className={'menu-list-item'}
                                                                style={{color: '#EDF5FF', fontSize: '100%'}}
                                                                onClick={logout}>Logout</ButtonBase>
                                                </MenuItem>
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