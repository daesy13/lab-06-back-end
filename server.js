'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const cors = require('cors')
app.use(cors());

require('dotenv').config();


app.use(express.static('./public'));

function handleLocationRequest(query){
    const geoData = require('./data/geo.json');

    const location = new Location(geoData.results[0]);
    return location;
  }


  function Location(coordinates){
    this.formatted_query = coordinates.formatted_address;
    this.latitude = coordinates.geometry.location.lat;
    this.longitude = coordinates.geometry.location.lng;

  }

  function Weather(location){
    this.forecast = location.summary;
    this.time = new Date(location.time * 1000).toDateString();
  }

function weatherSearch(request, response){
    const weather = weatherResponse(request.query.data);
    response.send(weather);
}

  function weatherResponse(location){
    let darkSky = require('./data/darksky.json');
    let weatherArray = [];
    darkSky.daily.data.forEach(forecast => weatherArray.push(new Weather(forecast)));
    return weatherArray; 
  }

function responseFunction(request, response){
    const locData = handleLocationRequest(request.query.data);
    response.send(locData);
}



app.get('/location', responseFunction);
app.get('/weather', weatherSearch);

app.listen(PORT,() => console.log('server initiated'));
