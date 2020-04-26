const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./forecast')
require('dotenv').config()


const app = express()
const port = process.env.PORT || 4000

// Define paths for Express configuration
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to use
app.use(express.static(publicDirPath))


// home page
app.get('/', async (req, res) => {
    // TODO: geolocalizzati, se fallisce usa impostazioni predefinite
    const latitude = 45.45
    const longitude = 8.61

    // Meteo
    const forecastData = await forecast(latitude, longitude)
    // TODO: manipolazione icon usando then ed un'altra funzione?
    switch (forecastData.icon) {
        case 'cloudy':
            forecastData.icon = 'wi-cloudy'
            break
        case 'clear-day':
            forecastData.icon = 'wi-day-sunny'
    }
    // HN top 10 usando firebase.

    res.render("index", forecastData);
});

app.listen(port, () => {
    console.log('Server is listening on port ', port)
})