

import CommuteOutlinedIcon from '@material-ui/icons/CommuteOutlined';
import GavelIcon from '@material-ui/icons/Gavel';
import ReceiptIcon from '@material-ui/icons/Receipt';
import GroupIcon from '@material-ui/icons/Group';


const SummaryIconsStyle = {

    width: '40px',
    height: '40px',
    color: '#4d4d4d',
};
export const SummaryCardItems = [

    {
        id: 'vehicle',
        color: '#0066ff',
        title: 'Yeni araçlar',
        value: '0',
        url: '/vehicle', 
        icon: <CommuteOutlinedIcon style={SummaryIconsStyle} />
    },
    {
        id: 'penalties',
        color: '#ff0000',
        title: 'Yeni cezalar',
        value: '0',
        url: '/penalty', 
        icon: <GavelIcon style={SummaryIconsStyle}/>
    },
    {
        id: 'users',
        color: '#009933',
        title: 'Yeni kullanıcılar',
        value: '0',
        url: '/users', 
        icon: <GroupIcon style={SummaryIconsStyle} />
    },
    {
        id: 'penalties',
        color: '#ffcc00',
        title: 'Yeni cezalar',
        value: '0',
        url: '/penalty', 
        icon: <ReceiptIcon style={SummaryIconsStyle} />
    }

];