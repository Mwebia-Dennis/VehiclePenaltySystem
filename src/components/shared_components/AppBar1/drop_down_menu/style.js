
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import styled from 'styled-components'
import { Button } from '@material-ui/core';

import { fade, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({

  btn: {
    
    '&:hover': {
      backgroundColor: 'transparent',
      border: 'none',
      boxShadow: 'none',
      textDecoration: 'underline'
    },

  }

}))

export const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));
  
 export const StyledMenuItem = withStyles((theme) => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem)

  export const MoreButton = styled(Button)`

    background: inherit;
    border: none;
    box-shadow: none;
    color: #fff;

`