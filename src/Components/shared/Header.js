import React, {useRef, useState} from "react";
import {NavLink} from "react-router-dom";
import {Avatar, MenuItem, MenuList, Grow, Popper, ClickAwayListener, Paper} from "@material-ui/core";
import './Header.css'

const Header = () => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    return (
        <div className={"header"}>
            <div className={'header-content'}>
                <NavLink exact to="/" className={'logo'}/>
                <div>
                    <Avatar className={'user-avatar'}
                            ref={anchorRef} aria-controls={open ? 'menu-list' : undefined}
                            aria-haspopup="true" onClick={() => setOpen(prevOpen => !prevOpen)}>
                    </Avatar>
                    <Popper open={open} anchorEl={anchorRef.current} placement={'bottom-end'} transition>
                        {({TransitionProps}) => (
                            <Grow {...TransitionProps} style={{transformOrigin: 'right top'}}>
                                <Paper style={{backgroundColor: '#2A73CC'}}>
                                    <ClickAwayListener onClickAway={() => setOpen(false)}>
                                        <MenuList id="menu-list">
                                            <MenuItem><NavLink className={'menu-list-item'} to='/account'>Account</NavLink></MenuItem>
                                            <MenuItem><NavLink className={'menu-list-item'} to='/my-reviews'>My Reviews</NavLink></MenuItem>
                                            <MenuItem><NavLink className={'menu-list-item'} to='/logout'>Logout</NavLink></MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>)}
                    </Popper>
                </div>
            </div>
        </div>
    )
}

export default Header