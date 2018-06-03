const config = require('./config');
const axios = require('axios');
var emoji = require('node-emoji');

const getOptionsQueried = options => Object.keys(options).reduce((accumulator, key) => `&${key}=${options[key]}`, '');

module.exports = {
    getCurrentWeather: (location, options) => {
        return axios
            .get(`${config.API_ENDPOINT}?q=${location}&appid=${config.API_KEY}${getOptionsQueried(options)}`)
            .then(response => {
                return new Promise((resolve, reject) => {
                    resolve(response.data);
                })
            });
    },

    getWeatherIcon: (weatherCode) => {
        // Thunderstorm
        if (weatherCode < 300) {
            return emoji.emojify(':thunder_cloud_and_rain:');
        }
        // Drizzle
        else if (weatherCode < 500) {
            return emoji.emojify(':partly_sunny_rain:');
        }
        // Rain
        else if (weatherCode < 600) {
            return emoji.emojify(':rain_cloud:');
        }
        // Snow
        else if (weatherCode < 700) {
            return emoji.emojify(':snowman:');
        }
        // Fog
        else if (weatherCode < 800) {
            return emoji.emojify(':fog:');
        }
        // Clear
        else if (weatherCode == 800) {
            return emoji.emojify(':sunny:');
        }
        // Clouds
        return emoji.emojify(':cloud:');
    }

}