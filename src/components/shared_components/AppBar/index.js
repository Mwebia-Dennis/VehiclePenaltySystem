
import React, { useState } from 'react'
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/MailOutline';
import NotificationsIcon from '@material-ui/icons/NotificationsActiveOutlined';
import MoreIcon from '@material-ui/icons/MoreVert';
import { useStyles } from './style';
import Profile from '../../../images/profile.jpeg';
import { Avatar } from '@material-ui/core';
import { useNavigate } from 'react-router';


export default (props) => {
    
  const classes = useStyles();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isLoggedIn = false;
  const loggedOutMenu = [
        {
            name:"Login",
            url: "auth/login"
        },
        {
            name:"Sign Up",
            url: "auth/signup"
        },
    ];
  const loggedInMenu = [
        {
            name:"Edit Profile",
            url: "auth/edit-profile"
        },
        {
            name:"Logout",
            url: "auth/logout"
        },
    ];
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = (url) => {
    setAnchorEl(null);
    handleMobileMenuClose();
    navigate(url)
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {
                isLoggedIn?
                    loggedInMenu.map((item, index)=>(

                        <MenuItem key={index} onClick={()=>handleMenuClose(item.url)}>{item.name}</MenuItem>
                    ))
                :
                    loggedOutMenu.map((item, index)=>(

                        <MenuItem key={index} value={item.url} onClick={()=>handleMenuClose(item.url)}>{item.name}</MenuItem>
                    ))

            }
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
            <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="secondary">
                <MailIcon />
                </Badge>
            </IconButton>
            <p>Messages</p>
            </MenuItem>
            <MenuItem>
            <IconButton aria-label="show 11 new notifications" color="inherit">
                <Badge badgeContent={11} color="secondary">
                <NotificationsIcon />
                </Badge>
            </IconButton>
            <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
            >
                
                <Avatar alt="Dennis Gitonga" src={Profile} className={classes.small} />
            </IconButton>
            <p>Profile</p>
            </MenuItem>
        </Menu>
    );


    return (

        <>

            <Toolbar className={ classes.toolbar }>
                <Typography className={classes.title} variant="h6" noWrap>
                    Vehicle Penalty
                </Typography>
                <div className={classes.grow} />
                <div className={classes.sectionDesktop}>
                    <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <MailIcon />
                    </Badge>
                    </IconButton>
                    <IconButton aria-label="show 17 new notifications" color="inherit">
                    <Badge badgeContent={17} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                    </IconButton>
                    <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                    >
                        
                        <Avatar alt="Dennis Gitonga" src={Profile} className={classes.small} />
                    </IconButton>
                </div>
                <div className={classes.sectionMobile}>
                    <IconButton
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    color="inherit"
                    >
                    <MoreIcon />
                    </IconButton>
                </div>
            </Toolbar>

                    
            {renderMobileMenu}
            {renderMenu}
        </>


    );

}
