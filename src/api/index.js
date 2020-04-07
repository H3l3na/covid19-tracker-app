import axios from "axios";

const url='https://covid19.mathdro.id/api';
const urlDaily='https://covid19.mathdro.id/api/daily';

export const fetchData = async (country) => {
    let changeableUrl = url;
    if (country){
        changeableUrl=`${url}/countries/${country}`;
    }
    try {
        const {data} = await axios.get(changeableUrl);
        const modifiedData = {
            confirmed: data.confirmed,
            recovered:data.recovered,
            deaths: data.deaths,
            lastUpdate: data.lastUpdate,
        }
        return modifiedData;
    }
    catch(error){

    }
}

export const fetchDailyData = async (country) => {
    let changeableUrl = urlDaily;
    if (country){
        changeableUrl=`${url}/countries/${country}`;
       
    }
    try {
        const {data} = await axios.get(changeableUrl);
        const modifiedData = data.map((dailyData)=>({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }));
        return modifiedData;
    }
    catch(error){
        return error;
    }
}

const urlCountries = 'https://covid19.mathdro.id/api/countries';

export const countries = async () => {
    try {
        const {data: {countries}} = await axios.get(urlCountries);
        return countries.map((country)=>country.name);
    }
    catch(error){
        return error;
    }
};