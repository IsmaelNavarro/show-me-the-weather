const weatherService = require('./weatherService');

let location = process.argv[2];

weatherService
    .getCurrentWeather(location)
    .then( response => {
        console.log(`Current temp in ${location} is: ${response.main.temp} ºC`);
    })
