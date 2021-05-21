
import { fade, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({

    toolbar: {

        width: '100%',
    },
    grow: {
      flexGrow: 1,
    },
    title: {
      display: 'block',
      marginRight: '30px',
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    small: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
  }));