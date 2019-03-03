#!/usr/bin/env node
const argv = require('minimist')(process.argv.slice(2));
const weatherService = require('./weatherService');
const cTable = require('console.table');
const config = require('./config');
const fs = require('fs');
const path = require('path');

const apikeyFile = path.resolve(__dirname, 'openweatherapikey');

let { _: locations, ...optionalParams } = argv;

if (typeof optionalParams.apikey !== 'undefined') {
    fs.writeFileSync(apikeyFile, optionalParams.apikey);
}

// Get api key
let apikey = '';
try {
    apikey = fs.readFileSync(apikeyFile, 'utf8');
    if (apikey === '')
        throw new Exception();
    weatherService.setApiKey(apikey);
}
catch (e) {
    console.log('You have to set the openweather apikey');
    console.log('show-me-the-weather --apikey=XXXXXXX');
    process.exit();
}


if (locations.length === 0) {
    console.log
        (
        `You must specify at least one location
v.g:
show-me-the-weather [locationA locationB]`
        );
    process.exit();
}

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



