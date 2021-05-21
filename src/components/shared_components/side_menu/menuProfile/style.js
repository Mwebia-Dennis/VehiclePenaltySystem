
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components'
import {Typography } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({

    root: {

        padding: '10px',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignContent: 'center',
    },
    largeAvatar: {
      width: theme.spacing(12),
      height: theme.spacing(12),
    },
    
    smallAvatar: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    content: {
        fontSize: '13px',
        color: '#ccc',
        padding: '7px',
    },

}));

export const ProfileHeader = styled(Typography)`

    color: #fff;
    padding-top: 10px;
    text-transform: capitalize;

`