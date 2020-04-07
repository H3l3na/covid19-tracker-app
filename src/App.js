import React, { Component } from 'react';
import Cards from "./components/Cards/Cards";
import Chart from "./components/Chart/Chart";
import CountryPicker from "./components/CountryPicker/CountryPicker";
import logo from './logo.svg';
import './App.css';
import styles from "./App.module.css";
import {fetchData} from "./api";
import {fetchDailyData} from "./api";
import CanvasJSReact from './canvasjs/canvasjs.react';
import axios from 'axios';


import image from './images/icons8-virus-free-48.png';
import worldmap from './images/worldmap.png';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var updateInterval = 1000;



class App extends React.Component {
  state = {
    data: {},
    country:'',
  }
  


  async componentDidMount () {
    const data= await fetchData();
    this.setState({data: data});
    
    console.log(data);
  }
  handleCountryChange = async (country) => {
    const fetchedData= await fetchData(country);
    this.setState( {data: fetchedData, country:country});
  }
  handleCountryChangeMap = async (country) => {
    const fetchedData= await fetchDailyData(country);
    this.setState( {data: fetchedData, country:country});
    console.log(country);
  }






  constructor() {
		super();
    this.updateChart = this.updateChart.bind(this);
	}
	componentDidMount(){
    setInterval(this.updateChart, updateInterval);
    
	}
	updateChart = async() =>{
		var dpsColor, dpsTotal = 0, deltaY, yVal;
		var dps = this.chart.options.data[0].dataPoints;
    var chart = this.chart;
    var url='https://covid19.mathdro.id/api';
    
        const {data} = await axios.get(url);
        const modifiedData = {
            confirmed: data.confirmed,
            recovered:data.recovered,
            deaths: data.deaths,
            lastUpdate: data.lastUpdate,
        }
        console.log(modifiedData.confirmed.value);
    dps[0] = {label: "Confirmed", y: modifiedData.confirmed.value, color: dpsColor};
    dps[1] = {label: "Deaths", y: modifiedData.deaths.value, color: dpsColor};
		for (var i = 0; i < dps.length; i++) {
			deltaY = Math.round(2 + Math.random() *(-2-2));
			yVal = deltaY + dps[i].y > 0 ? (deltaY + dps[i].y < 100 ? dps[i].y + deltaY : 100) : 0;
			dpsColor = yVal >= 90 ? "#e40000" : yVal >= 70 ? "#ec7426" : yVal >= 50 ? "#81c2ea" : "#88df86 ";
			
			dpsTotal += yVal;
		}
		chart.options.data[0].dataPoints = dps;
		chart.options.title.text = "Global COVID-19 cases ";
		chart.render();
	}





  render() {





    const options = {
			theme: "ligh1",
			title: {
				text: "Global COVID-19 cases"
			},
			axisY: {
				title: "",
				suffix: "",
			maximum: 2000000
			},
			data: [{
				type: "column",
				yValueFormatString: "#,###",
				indexLabel: "{y}",
				dataPoints: [
					{ label: "Confirmed", y: 0 },
					{ label: "Deaths", y: 0 },
				
				]
			}]
		}








    const { data, country } = this.state;
    return (
      <div >
        <div className="App">
        <div className="App-header">
          <img src={image} align="left"/>
          <h1>COVID-19</h1>
          
        </div>
      </div>

      <div>
        <CanvasJSChart options = {options} 
             onRef = {ref => this.chart = ref} 
        />
      </div>


        <div className="heading">
        
        </div>
        
        <Cards data={data} handleCountryChange={this.handleCountryChange}/>
        <Chart data={data} country={country}/>
        <CountryPicker data={data} handleCountryChange={this.handleCountryChange}/>
      </div>
    )
  }
}
/*class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}*/


export default App;
