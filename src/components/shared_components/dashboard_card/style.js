
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({

    root: {

        padding: 0,
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
        maxHeight: '500px',
        overflowY: 'auto',
    },
    header: {
        width : '100%',
        padding: '10px',
        fontWeight: 'bold',
        fontSize: '25px',
        position: 'sticky',
        top: '0',
        zIndex: '10',
        background: '#fff',
    },
    divider: {
        
        marginTop: '10px',
    },
    body: {
        padding: '10px',
    },

  }));