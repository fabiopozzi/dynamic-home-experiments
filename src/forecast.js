const needle = require('needle')

const forecast = async (latitude, longitude) => {
    const url = 'https://api.darksky.net/forecast/'+ process.env.WEATHER_API_KEY + '/' + latitude + ',' + longitude + '?units=si&lang=it'

    const data = await needle('get', url, { json: true })
    return {
      temperature: data.body.currently.temperature,
      rain_chance: data.body.currently.precipProbability,
      icon: data.body.currently.icon,
    }
}

module.exports = forecast
