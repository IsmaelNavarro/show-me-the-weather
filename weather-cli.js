#!/usr/bin/env node
const argv = require('minimist')(process.argv.slice(2));
const weatherService = require('./weatherService');
const cTable = require('console.table');

if (process.argv && process.argv.length < 3) {
    console.log
        (
        `You must specify one location
v.g:
node index.js [location]`
        );
    process.exit();
}

let locations = argv['_'];

let requests = [];

locations.forEach(location => {
    requests.push(weatherService.getCurrentWeather(location));
});

Promise
    .all(requests)
    .then(values => {

        let output = [];
        values.forEach(value => {
            output.push(
                {
                    location: `${weatherService.getWeatherIcon(value.weather.id)}  ${value.name}`,
                    temperature: `${value.main.temp}ºC`,
                    humidity: `${value.main.humidity}%`,
                }
            );
        });
        console.table(output);

    });



