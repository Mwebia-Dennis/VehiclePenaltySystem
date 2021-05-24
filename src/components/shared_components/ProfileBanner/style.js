
import { makeStyles } from '@material-ui/core/styles';
import Bg from '../../../images/bg.jpg';




export const useStyles = makeStyles((theme) => ({

    root: {
        width: '100%',
        height: '500px',
        backgroundImage: `url(${Bg})`,
        position : 'relative',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        paddingTop: '70px',
    },
    overlay: {
        position : 'absolute',
        top: '0',
        left: '0',
        right: '0',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.8)',
        zIndex: '5',
    },
    content: {

        zIndex: '10',
    },
    profile: {

        width: theme.spacing(20),
        height: theme.spacing(20),
        zIndex: '10',
        [theme.breakpoints.down('sm')]: {
            width: theme.spacing(15),
            height: theme.spacing(15),
        }
    },
    title: {
        fontSize: '25px',
        fontWeight: 'bold',
        color: '#fff',
        zIndex: '10',
        textAlign: 'center',
        marginTop: '10px',
    },
    link: {
        fontSize: '16px',
        color: '#fff',
        zIndex: '10',
        textAlign: 'center',
        marginTop: '10px',

    },
    button: {
        zIndex: '10',
        marginTop: '15px',
    },
    icon: {
        margin: '0'
    },
    btnLink: {
        fontSize: '25px',
        color: '#fff',
        textDecoration: 'none',
    },

}))