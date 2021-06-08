
import React, { useEffect, useState } from 'react'
import { Divider, Grid, Paper, Typography } from '@material-ui/core';
import SummaryCards from '../../shared_components/summary_card';
import { SummaryCardItems } from '../../data/summaryCardItems';
import {Line,Doughnut } from 'react-chartjs-2';
import { State } from '../../data/totalPenaltiesPerWeek';
import { PaymentData } from '../../data/paymentData';
import { useStyles } from './style';
import MenuCard from '../../shared_components/menu_card';
import Calendar from 'react-calendar';
import DashboardCard from '../../shared_components/dashboard_card';
import 'react-calendar/dist/Calendar.css';
import DataProgressRateCard from '../../shared_components/DataProgressRateCard'
import { useDispatch, useSelector } from 'react-redux';
import { getAllStatistics } from '../../../store/reducers/statistics/statistics.actions';
import ProgressSpinner from '../../shared_components/ProgressBarSpinner'

export default (props) => {
    
    
    const [calendarDate, setCalendarDate] = useState(new Date());
    const classes = useStyles();
    const dispatch = useDispatch()
    const statisticsReducer = useSelector((state) => state.statisticsReducer)
    const menuReducer = useSelector(state => state.menuReducer)
    
    const summaryCardItems = SummaryCardItems.map((item)=>{

        if(item.id === 'vehicle') {
            const total = statisticsReducer.todayTotalVehicles
            item.value = total?total:0
            return item
        }else if(item.id === 'penalties') {
            const total = statisticsReducer.todayTotalPenalties
            item.value = total?total:0
            return item
        }else if(item.id === 'users') {
            const total = statisticsReducer.users
            item.value = total?total:0
            return item
        }
        return item

    })

    const getGraphData = (data) => {

        const labels = []
        const vehicleData = []
        const penaltyData = []

        if("vehicleWeeklydata" in statisticsReducer.data) {
            const allData = statisticsReducer.data.vehicleWeeklydata
            for(let i=allData.length-1; i>=0; i--) {
                for (const key in allData[i]) {
                    labels.push( key )
                    vehicleData.push( allData[i][key] )
                    penaltyData.push( statisticsReducer.data.penaltyWeeklydata[i][key] )
                }
            }
        }
        data.labels = labels
        data.datasets["0"].data = vehicleData
        data.datasets["1"].data = penaltyData

        return data
    }

    useEffect(() => {
        
        dispatch(getAllStatistics())

    }, [])


    return (
        

        <div>

            {
                statisticsReducer.loading?
                    <ProgressSpinner />

                :
                <>
                    <Grid container spacing={1}>
                        {
                            summaryCardItems.map((item, index)=> 
                                <SummaryCards 
                                    key={index}
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
                                data={getGraphData(State)}
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
                            <DataProgressRateCard value={Math.round(statisticsReducer.data.usersMonthlyIncrease)} color="#00cc66" dataType="Users"/>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <DataProgressRateCard value={Math.round(statisticsReducer.data.penaltiesMonthlyIncrease)} color="#36a2eb" dataType="Penalties" />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <DataProgressRateCard value={Math.round(statisticsReducer.data.vehicleMonthlyIncrease)} color="#ffcc00" dataType="Vehicles"/>
                        </Grid>
                    </Grid>


                    <Grid container spacing={2} className={classes.notificationCard}>

                        
                        <Grid item xs={12} md={4}>

                            <DashboardCard header="Payments Report" >
                                <Doughnut 

                                    
                                    data={()=>{
                                        PaymentData.datasets["0"].data = [
                                            Math.round(statisticsReducer.data.paidPayment),
                                            Math.round(statisticsReducer.data.pendingPayment)
                                        ]
                                        return PaymentData
                                    }}
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

                            <DashboardCard header="All Menu Categories" >
                                
                                { 
                                    menuReducer.loading?
                                        <ProgressSpinner />
                                    :
                                    Array.isArray(menuReducer.data) && menuReducer.data.length > 0?
                                        menuReducer.data.map((item)=>(
                                            <MenuCard 
                                                key={item.id}
                                                menu_id={item.id}
                                                menu_name = {item.name}
                                                created_at = {item.created_at}
                                            />)
                                        )
                                    :<div>0 results found</div>
                                }
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
                </>
                
            }
        </div>
    )
}
