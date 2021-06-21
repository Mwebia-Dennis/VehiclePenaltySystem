import BarChartIcon from '@material-ui/icons/BarChart';
import CommuteIcon from '@material-ui/icons/Commute';
import GavelIcon from '@material-ui/icons/Gavel';
import GroupIcon from '@material-ui/icons/Group';
import { AccountCircle, LibraryAdd } from '@material-ui/icons';

export const SideMenuItems = [
    {
        item: 'Gösterge Paneli',
        url: '/home',
        icon: <BarChartIcon />
    },
    {
        item: 'Araç Ekle',
        url: '/vehicle',
        icon: <CommuteIcon />
    },
    {
        item: 'Ceza Ekle',
        url: '/penalty',
        icon: <GavelIcon />
    },
    {
        item: 'Menü Ekle',
        url: '/category/data',
        icon: <LibraryAdd />
    },
    {
        item: 'kullanıcı ekle',
        url: '/users',
        icon: <GroupIcon />
    },
    {
        item: 'profili Düzenle',
        url: '/profile/current-user',
        icon: <AccountCircle />
    },
]