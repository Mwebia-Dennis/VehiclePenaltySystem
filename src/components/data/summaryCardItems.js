

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
        color: '#0066ff',
        title: 'New Vehicles',
        value: '1000',
        url: '/vehicle', 
        icon: <CommuteOutlinedIcon style={SummaryIconsStyle} />
    },
    {
        color: '#ff0000',
        title: 'New Penalties',
        value: '200',
        url: '/penalty', 
        icon: <GavelIcon style={SummaryIconsStyle}/>
    },
    {
        color: '#009933',
        title: 'New Users',
        value: '1668',
        url: '/users', 
        icon: <GroupIcon style={SummaryIconsStyle} />
    },
    {
        color: '#ffcc00',
        title: 'Total Penalties',
        value: '100',
        url: '/penalty', 
        icon: <ReceiptIcon style={SummaryIconsStyle} />
    }

];