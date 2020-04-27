const needle = require('needle')

const hn = async () => {
    const url = 'https://hn.algolia.com/api/v1/search?tags=front_page'

    const data = await needle('get', url, { json: true })
    console.log(data.body.hits)
    // adesso impacchetta e mostra
}

//module.exports = forecast

hn()