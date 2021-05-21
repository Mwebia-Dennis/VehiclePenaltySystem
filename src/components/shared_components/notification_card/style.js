
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({

    container: {

        padding: theme.spacing(3)
    },
    notifImage: {
      width: theme.spacing(8),
      height: theme.spacing(8),
    },
    notifHeader: {
      fontWeight: 'bold',
      color: 'rgba(0,0,0,.7)',
    },
    notifDescription: {

      fontSize: '14px',
    },
    notifTime: {
      fontSize: '12px',
      marginTop: '10px',
    },
  }));