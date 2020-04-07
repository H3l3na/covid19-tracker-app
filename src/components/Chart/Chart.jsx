import React, {useState, useEffect} from "react";
import {fetchDailyData} from "../../api";
import {Line, Bar} from "react-chartjs-2";
import {countries} from "../../api";
import "./Chart.module.css";

const Chart = ({data: {confirmed, recovered, deaths}, country}) => {
    const [dailyData, setDailyData] = useState({});
    useEffect(()=>{
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData(country));
        }
        fetchAPI();
    }, []);
    

/*
const lineChart = (
    dailyData.length
    ?
    (<Line 
        data={{
            labels: dailyData.map(({date})=>date),
            datasets: [{
               data: dailyData.map(({confirmed})=>confirmed),
               label: 'Infected',
               borderColor: 'gray',
            }, {
                data: dailyData.map(({deaths})=>deaths),
                label: 'Deaths',
                borderColor: 'gray',
            }],
        }}
    />) : null
);*/
const lineChart = ( 
    dailyData.length
    ?(
    <Line
       data= {{
           labels: dailyData.map(({date})=>date),
           datasets:[{
               data: dailyData.map(({confirmed})=>confirmed),
               label: 'Infected',
               fill: true,
               borderColor: 'orange',
           },{
               data: dailyData.map(({deaths})=>deaths),
               label: 'Deaths',
               fill: true,
               borderColor: 'red',
           }

        ]
       }}
    />) : null


);

const barChart = (
    confirmed ? (
      <Bar
        data={{
          labels: ['Infected', 'Recovered', 'Deaths'],
          datasets: [
            {
              label: 'People',
              backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
              data: [confirmed.value, recovered.value, deaths.value],
            },
          ],
        }}
        options={{
          legend: { display: false },
          title: { display: true, text: `Current state in ${country}` },
        }}
      />
    ) : null
  );



    

return (
    <div className='lineChart'>
        {country?
        barChart:lineChart}
    </div>
)

}


export default Chart;