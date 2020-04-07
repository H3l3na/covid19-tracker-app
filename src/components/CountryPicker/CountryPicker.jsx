import React, {useState, useEffect} from "react";
import {NativeSelect, FormControl} from "@material-ui/core";

import './CountryPicker.module.css';
import {countries} from '../../api';

const CountryPicker = ({ handleCountryChange }) => {
    const [fetchedCountries, setFetchedCountries]=useState([]);
    useEffect  (() => {
        const fetchCountries = async () => {
            setFetchedCountries(await countries());
        }
        fetchCountries();
    }, []);
    return (
        <div className="form">
        <FormControl className="formControl">
            <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
                <option value=''>Global</option>
                {fetchedCountries.map((country, i)=><option key={i} value={country} >{country}</option>)}
            </NativeSelect>
        </FormControl>
        </div>
    )
}

export default CountryPicker;