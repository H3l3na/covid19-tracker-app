import React from "react";
import {Card, CardContent, Typography, Grid} from '@material-ui/core';
import  './Cards.module.css';
import CountUp from 'react-countup';
import cx from 'classnames';

const Cards = ({data: {confirmed, recovered, deaths, lastUpdate}}) => {
    if (!confirmed){
        return "Loading...";
    }
    return (
        <div className="container">
            <Grid container spacing={3} justify="center">
                <Grid item component={Card} xs={12} md={3} className="card infected">
                    <CardContent>
                    <Typography variant="h5">Infected</Typography>
                        <Typography color="textSecondary" gutterBottom>
                            <CountUp start={0} end={confirmed.value} duration={3.5} separator=","/>
                        </Typography>
                        <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                        <Typography variant="body2">Number of active cases of COVID-19</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className="card recovered">
                    <CardContent>
                    <Typography variant="h5">Recovered</Typography>
                        <Typography color="textSecondary" gutterBottom>
                        <CountUp start={0} end={recovered.value} duration={3.5} separator=","/>
                        </Typography>
                        <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                        <Typography variant="body2">Number of recovered cases of COVID-19</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className="card deaths">
                    <CardContent>
                    <Typography variant="h5">Deaths</Typography>
                        <Typography color="textSecondary" gutterBottom>
                        <CountUp start={0} end={deaths.value} duration={3.5} separator=","/>
                        </Typography>
                        <Typography color="textSecondary">
                        {new Date(lastUpdate).toDateString()}
                        </Typography>
                        <Typography variant="body2">Number of deaths caused by COVID-19</Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    )
}

export default Cards;