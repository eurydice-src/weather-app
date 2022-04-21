import React from 'react';
import ReactDOM from 'react-dom/client';

import "./index.css"

const API = "https://api.openweathermap.org/data/2.5/weather?"
const KEY = ""

var fetchedURL

var latitude = 0
var longitude = 0 

navigator.geolocation.getCurrentPosition(function(position) {
  latitude = (position.coords.latitude);
  longitude = (position.coords.longitude);
},
function(){alert("please enable location or i wont work :(")}
);
  

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

var temperature = 273.15
var station = "..."
var state = "--"
var sunset
var sunsetUnix
var iconUrl

function getWeather() {
  return fetch(fetchedURL)
  .then((response) => response.json())
  .then((jsonData) => {
    temperature = jsonData.main.temp
    station = jsonData.name
    state = jsonData.weather[0].main

    sunset = new Date(1000*jsonData.sys.sunset).toLocaleTimeString()
    sunsetUnix = jsonData.sys.sunset

    iconUrl = "http://openweathermap.org/img/wn/"+jsonData.weather[0].icon+"@4x.png"
    
  })
  .catch((error) => {
    console.error(error);
  });
}

function tick() {
  const element = (
    <div id="main">
      <h1>Weather App</h1>
      <img style={{float:"left"}}src={iconUrl}/> 
      <div style={{float:"left"}}>
        <h2>It is {new Date().toLocaleTimeString()}.</h2>
        <h2>The current temperature in {station} is {Math.round(temperature-273.15)}°C</h2>
        <h2>Sunset is at {sunset} or about {Math.floor( (Math.round(sunsetUnix - (new Date()).getTime() / 1000))/60 )} Minutes from now</h2>
        <br/>
        <h2>It's {state}</h2>
        <p><a href="https://eurydice-src.github.io">go back</a></p>
      </div>
    </div>

  );
  fetchedURL = API+"lat="+latitude+"&lon="+longitude+"&appid="+KEY
  getWeather()
  root.render(element);
}

 
tick()
setInterval(tick, 1000);



