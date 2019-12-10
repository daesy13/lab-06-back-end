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
    console.log(geoData);
    //const locationResult = geoData.results[0];
    const location = new Location(geoData.results[0]);
    return location;
  }
  
  function Location(coordinates){
    this.city = city;
    this.latitude = coordinates.geometry.location.lat;
    this.longitude = coordinates.geometry.location.lng;
  }

function responseFunction(request, response){
    const locData = handleLocationRequest(search.query.data);
    response.send(locData);
}


app.get('/location', responseFunction);






app.listen(PORT,() => console.log('server initiated'));
