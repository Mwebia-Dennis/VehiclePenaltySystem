import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { useStyles } from './style';
import { Button, Divider, Drawer, Link, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { SideMenuItems } from '../../data/sideMenuItems';
import { useNavigate } from 'react-router-dom';
import { Close } from '@material-ui/icons';
import DropDownMenu from './drop_down_menu'


export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false)
  const navigate = useNavigate()
  
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

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleSideMenuNav = (url) => {
    navigate(url)
  }


  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
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
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (

    <>
        <div className={classes.grow}>
        <AppBar position="static">
            <Toolbar>
            <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
            >
                <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
                Vehicle Penalty
            </Typography>
            <div className={classes.menu_items_container}>

                {SideMenuItems.map((item, index) => {
                    
                    if(index < 4) {
                        return (
                            <Button key={index} className={classes.button} href={item.url}  startIcon={item.icon}>
                                {item.item}
                            </Button>
                        )
                    }})
                }

                <DropDownMenu menuItems={SideMenuItems.filter((item, index) => index >= 4)} />

            </div>
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
                <AccountCircle />
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
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
        </div>
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>

            
            <div className={classes.list}>

                <Typography variant="h6" className={classes.sideMenuHeader}>
                    Vehicle Penalty
                    <IconButton onClick={toggleDrawer} className={classes.closeIcon} >
                        <Close />
                    </IconButton>
                </Typography>
                

            </div>
            <Divider  className={classes.divider} />
                
            <div className={classes.list}>
                <List>
                    {SideMenuItems.map((item, index) => (
                        <ListItem button key={index} onClick={()=>{handleSideMenuNav(item.url)}}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.item} />
                        </ListItem>
                        ))
                    }
                </List>
            </div>

        </Drawer>
    </>
  );
}
