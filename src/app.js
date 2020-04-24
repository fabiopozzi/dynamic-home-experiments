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
app.get('/', (req, res) => {
    // geolocalizzati, se fallisce usa impostazioni predefinite
    const latitude = 45.45
    const longitude = 8.61

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return console.log(error);
      }

      console.log(forecastData);
    });


    // ottieni meteo

    // ottieni calendario

    // render homepage
    res.render('index')
})

app.listen(port, () => {
    console.log('Server is listening on port ', port)
})