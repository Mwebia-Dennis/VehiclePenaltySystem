
import { makeStyles } from '@material-ui/core/styles';



export const useStyles = makeStyles((theme) => ({

    root: {
        width: '40%',
        marginLeft: '30%',
        padding: '20px 50px 50px 50px',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            marginLeft: '0',
            padding: '10px',
        }
    },
    header: {
        padding: '10px 0',
        fontWeight: 'bold',
        fontSize: '27px',
        textAlign: 'center',
    },
    textfield: {

        marginTop: '3px',
    },
    submitBtn: {
        marginTop: '35px',
    },

}))