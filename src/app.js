const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./forecast')
const hn = require('./hn')
const news = require('./news')
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
    // manipolazione usando altra funzione
    switch (forecastData.icon) {
        case 'cloudy':
            forecastData.icon = 'wi-cloudy'
            break
        case 'clear-day':
            forecastData.icon = 'wi-day-sunny'
    }
    // HN top 10 usando firebase.
    const HNstories = await hn.top_stories()

    // Top new ANSA
    const ANSAnews = await news.ansa()

    //console.log( { forecastData, stories })
    res.render("index", {
        forecastData,
        HNstories,
        ANSAnews 
    });
});

// comments
app.get('/comments/:id', async (req, res) => {
    const comments = await hn.story_comments(req.params.id)

    console.log(comments)
})

app.listen(port, () => {
    console.log('Server is listening on port ', port)
})