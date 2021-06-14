import React , {useContext}from 'react'
import {ResponsiveContainer,AreaChart,XAxis,YAxis,Area,Tooltip,CartesianGrid} from 'recharts';
import {format,parseISO} from 'date-fns';
import WeatherContext from '../context/weatherContext';

 const ReChart = () => {

    const weatherContext = useContext(WeatherContext)

    const {Hour,SunRiseHour,SunSetHour,Data} = weatherContext
     const chartData = [];
        //loop through data (6 days data) and set its necessary data in chartdata array
     Data.forEach((item) => {
         const chartTemp = (item.main.temp - 273.15).toFixed(1);
         const chartTime = item.dt_txt;
         
         chartData.push({
             date: format(parseISO(chartTime),' d MMM HH:mm'),
             temp: +chartTemp
         })
        
     });
     
    return (
        <div className="chartBox">
         <ResponsiveContainer width="100%" height='100%'>
            <AreaChart data={chartData}>
                <Area dataKey="temp" stroke='rgba(0,0,0,0.2)' fill='rgba(112, 148, 193,0.5)' />

                <XAxis dataKey="date" tick={{ fill: Hour < SunRiseHour || Hour >= SunSetHour ? '#f7f7f7' : '#333' }}/>

                <YAxis tickCount={7} axisLine={false} tickLine={false} dataKey="temp" tickFormatter={(number) => `${number}°`} tick={{ fill: Hour < SunRiseHour || Hour >= SunSetHour ? '#f7f7f7' : '#333' }} />
                <Tooltip content={<CustomTooltip />}/>
                <CartesianGrid opacity={0.7} vertical={false}/>
            </AreaChart>
         </ResponsiveContainer>
        </div>
    )
}

function CustomTooltip({active,payload,label}){
    if(active){
        return(
            <div className="tooltip">
                <h3 >temp: {payload[0].value}°</h3>
                <h3>{label}</h3>
            </div>
        )
    }
    return null
}
export default ReChart