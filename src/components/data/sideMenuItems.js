import BarChartIcon from '@material-ui/icons/BarChart';
import CommuteIcon from '@material-ui/icons/Commute';
import GavelIcon from '@material-ui/icons/Gavel';
import ReceiptIcon from '@material-ui/icons/Receipt';
import GroupIcon from '@material-ui/icons/Group';

export const SideMenuItems = [
    {
        item: 'Dashboard',
        url: '/home',
        icon: <BarChartIcon />
    },
    {
        item: 'Add Vehicle',
        url: '/vehicle',
        icon: <CommuteIcon />
    },
    {
        item: 'Add Penalty',
        url: '/penalty',
        icon: <GavelIcon />
    },
    {
        item: 'Users',
        url: '/users',
        icon: <GroupIcon />
    },
    {
        item: 'Invoices',
        url: '/invoices',
        icon: <ReceiptIcon />
    }
]