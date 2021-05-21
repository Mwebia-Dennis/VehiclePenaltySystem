
import React, { useState } from 'react'
import { Grid, Paper } from '@material-ui/core';
import SummaryCards from '../../shared_components/summary_card';
import { SummaryCardItems } from '../../data/summaryCardItems';
import {Line} from 'react-chartjs-2';
import { State } from '../../data/totalPenaltiesPerWeek';
import { useStyles } from './style';
import NotificationCard from '../../shared_components/notification_card';
import Calendar from 'react-calendar';
import DashboardCard from '../../shared_components/dashboard_card';
import 'react-calendar/dist/Calendar.css';

export default (props) => {
    
    
    const [calendarDate, setCalendarDate] = useState(new Date());
    const classes = useStyles();
    return (
        <div>
            <Grid container spacing={3}>
                {
                    SummaryCardItems.map((item, index)=> 
                        <SummaryCards 
                            key={item}
                            color = {item.color} 
                            title = {item.title}
                            value = {item.value} 
                            url = {item.url}
                            icon = {item.icon}
                        />
                    )
                }
            </Grid>

            
            <Paper className={classes.chartCanvas}>
                <Line
                    data={State}
                    options={{
                        
                        responsive:true,
                        maintainAspectRatio: false,
                        title:{
                            display:true,
                            text:'Total Penalties issued this week',
                            fontSize:12
                        },
                        legend:{
                            display:true,
                            position: 'right',
                        },
                    }}
                />
            </Paper>


            <Grid container spacing={2} className={classes.notificationCard}>
                <Grid item xs={12} md={6}>

                    <DashboardCard header="My Notifications" >
                        
                        { [1,2,3,4].map((item, index)=><NotificationCard key={index}/>)}
                    </DashboardCard>
                </Grid>

                <Grid item xs={12} md={6}>
                    
                    <DashboardCard header="Calendar">

                    <Calendar
                                    onChange={setCalendarDate}
                                    defaultValue={calendarDate}
                                    value={calendarDate}
                                    className={classes.calendar}
                                />
                        <Grid 
                            container            
                            direction="column"
                            alignItems="center"
                            justify="center"
                        >

                            <Grid item xs={12} sm={12} md={8}>
                                
                                

                            </Grid>

                        </Grid>
                    </DashboardCard>
                </Grid>
            </Grid>
        </div>
    )
}
