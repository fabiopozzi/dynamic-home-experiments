const express = require('express')
const bootstrap = require('bootstrap')


const app = express()
const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log('Server is listening on port ', port)
}