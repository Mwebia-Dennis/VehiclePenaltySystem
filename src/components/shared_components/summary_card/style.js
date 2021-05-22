import { Box, Paper, Typography } from '@material-ui/core';
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles';



export const useStyles = makeStyles((theme) => ({

    root: {
        
        [theme.breakpoints.down('sm')]: {
            margin: '10px 20px',
        }
    },
    title: {
        fontSize: '15px',
        color: '#fff',
        marginTop: '8px',
    },
    link: {

        color: '#595959',
        textDecoration: 'none',
        listStyleType: 'none',
        display: 'block',
        marginTop: '15px',
        position: 'relative',
        right: '10px',
        textAlign: 'right',
        color: '#fff',
        
      '&:hover': {
          textDecoration: 'underline',
      }
    },
    divider: {
        marginTop: '15px',
    },

}));

export const Card = styled(Paper)`

    border-radius: 20px;
    padding: 20px;
    width: 100%;

`
export const IconBox = styled(Box)`

    width: 70px;
    height: 70px;
    border: 1px solid #000;
    color: #d9d9d9;
    padding: 15px;
    border-radius: 30%;

`
export const NumberHeader = styled(Typography)`
    font-weight: bold;
    font-size: 30px;
    color: #fff;
    padding-top: 15px;
`