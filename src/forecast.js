const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/'+ process.env.WEATHER_API_KEY + '/' + latitude + ',' + longitude + '?units=si&lang=it'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('unable to find location.', undefined)
        } else {
            const temp = body.currently.temperature
            const rain_chance = body.currently.precipProbability
            callback(undefined, `Al momento ci sono ${temp}°C fuori. Le probabilità di pioggia sono ${rain_chance}%.`)
        }
    })
}

module.exports = forecast
