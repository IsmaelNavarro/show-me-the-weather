const weatherService = require('./weatherService');
const cTable = require('console.table');

if(process.argv && process.argv.length < 3) {
    console.log
    (
`You must specify one location
v.g:
node index.js [location]`          
    );
    process.exit();
}

let location = process.argv[2];

weatherService
    .getCurrentWeather(location)
    .then( response => {
        console.table([
            {
                location: `${weatherService.getWeatherIcon(response.weather.id)} ${location}`,
                temperature: `${response.main.temp}ºC`,
                humidity: `${response.main.humidity}%`,

            }
        ])
    })
