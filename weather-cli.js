#!/usr/bin/env node
const argv = require('minimist')(process.argv.slice(2));
const weatherService = require('./weatherService');
const cTable = require('console.table');
const config = require('./config');

if (process.argv && process.argv.length < 3) {
    console.log
        (
        `You must specify at least one location
v.g:
node index.js [locationA locationB]`
        );
    process.exit();
}

let { _: locations, ...optionalParams } = argv;

let options = Object.assign({}, config.DEFAULT_OPTIONS);
Object.keys(optionalParams)
        .filter(key => key in config.DEFAULT_OPTIONS)
        .forEach(key => options[key] = optionalParams[key]);

let requests = [];

locations.forEach(location => {
    requests.push(weatherService.getCurrentWeather(location, options));
});

Promise
    .all(requests)
    .then(values => {

        let output = [];
        values.forEach(value => {
            output.push(
                {
                    location: `${weatherService.getWeatherIcon(value.weather.id)}  ${value.name}`,
                    temperature: `${value.main.temp}º`,
                    humidity: `${value.main.humidity}%`,
                }
            );
        });
        console.table(output);

    });



