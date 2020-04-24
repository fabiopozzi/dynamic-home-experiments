const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/'+ process.env.WEATHER_API_KEY + '/' + latitude + ',' + longitude + '?units=si&lang=it'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('unable to find location.', undefined)
        } else {
            callback(undefined, {
                temperature: body.currently.temperature,
                rain_chance: body.currently.precipProbability,
                icon: body.currently.icon
            })
        }
    })
}

module.exports = forecast
