import React, {useRef, useState} from "react";
import {NavLink} from "react-router-dom";
import {Avatar, MenuItem, MenuList, Grow, Popper, ClickAwayListener, Paper} from "@material-ui/core";
import './Header.css'

const Header = () => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return
        }
        setOpen(false);
    };

    return (
        <div className={"header"}>
            <div className={'header-content'}>
                <NavLink exact to="/" className={'logo'}/>
                <div>
                    <Avatar className={'user-avatar'}
                            ref={anchorRef} aria-controls={open ? 'menu-list-grow' : undefined}
                            aria-haspopup="true" onClick={handleToggle}>
                    </Avatar>
                    <Popper open={open} anchorEl={anchorRef.current} role={undefined} placement={'bottom-end'} transition disablePortal>
                        {({ TransitionProps, placement }) => (
                            <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom-end' ? 'right top' : 'right bottom'}}>
                                <Paper style={{backgroundColor: '#2A73CC'}}>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList id="menu-list-grow">
                                            <MenuItem><NavLink className={'menu-list-text'} to='/account'>Account</NavLink></MenuItem>
                                            <MenuItem><NavLink className={'menu-list-text'} to='/my-reviews'>My Reviews</NavLink></MenuItem>
                                            <MenuItem><NavLink className={'menu-list-text'} to='/logout'>Logout</NavLink></MenuItem>
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