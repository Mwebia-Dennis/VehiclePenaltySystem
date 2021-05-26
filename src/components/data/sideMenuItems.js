import BarChartIcon from '@material-ui/icons/BarChart';
import CommuteIcon from '@material-ui/icons/Commute';
import GavelIcon from '@material-ui/icons/Gavel';
import ReceiptIcon from '@material-ui/icons/Receipt';
import GroupIcon from '@material-ui/icons/Group';
import { AccountCircle, LibraryAdd } from '@material-ui/icons';

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
        item: 'Add Menu',
        url: '/category/data',
        icon: <LibraryAdd />
    },
    {
        item: 'Users',
        url: '/users',
        icon: <GroupIcon />
    },
    {
        item: 'Edit Profile',
        url: '/profile',
        icon: <AccountCircle />
    },
]