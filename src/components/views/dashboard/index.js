
import React, { useState } from 'react'
import { Divider, Grid, Paper, Typography } from '@material-ui/core';
import SummaryCards from '../../shared_components/summary_card';
import { SummaryCardItems } from '../../data/summaryCardItems';
import {Line,Doughnut } from 'react-chartjs-2';
import { State } from '../../data/totalPenaltiesPerWeek';
import { PaymentData } from '../../data/paymentData';
import { useStyles } from './style';
import NotificationCard from '../../shared_components/notification_card';
import Calendar from 'react-calendar';
import DashboardCard from '../../shared_components/dashboard_card';
import 'react-calendar/dist/Calendar.css';
import DataProgressRateCard from '../../shared_components/DataProgressRateCard'

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

            
            <Paper style={{margin: '15px 0'}}>

                <Typography className={classes.header}>Total penalties and vehicles</Typography>
                <Divider style={{margin: '15px 0',}}/>
                <div  className={classes.chartCanvas}>
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

                </div>
            </Paper>


            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <DataProgressRateCard value={66} color="#00cc66" dataType="Users"/>
                </Grid>
                <Grid item xs={12} md={4}>
                    <DataProgressRateCard value={60} color="#36a2eb" dataType="Penalties" />
                </Grid>
                <Grid item xs={12} md={4}>
                    <DataProgressRateCard value={79} color="#ffcc00" dataType="Vehicles"/>
                </Grid>
            </Grid>


            <Grid container spacing={2} className={classes.notificationCard}>

                
                <Grid item xs={12} md={4}>

                    <DashboardCard header="Payments Report" >
                        <Doughnut 

                            
                            data={PaymentData}
                            options={{
                                
                                responsive:true,
                                maintainAspectRatio: true,
                                legend:{
                                    display:true,
                                    position: 'right',
                                },
                            }}
                        
                        />
                    </DashboardCard>

                </Grid>
                <Grid item xs={12} md={4}>

                    <DashboardCard header="My Notifications" >
                        
                        { [1,2,3,4].map((item, index)=><NotificationCard key={index}/>)}
                    </DashboardCard>
                </Grid>

                <Grid item xs={12} md={4}>
                    
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
