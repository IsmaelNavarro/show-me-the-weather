const config = require('./config');
const axios = require('axios');

module.exports = {
    getCurrentWeather: (location) => {
         return axios
            .get(`${config.API_ENDPOINT}&q=${location}&appid=${config.API_KEY}`)
            .then(response => {
                return new Promise((resolve, reject) => {
                    resolve(response.data);
                })
            });
    }
}