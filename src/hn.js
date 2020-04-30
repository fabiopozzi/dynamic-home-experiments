const needle = require('needle')

const top_stories = async () => {
    const url = 'https://hn.algolia.com/api/v1/search?tags=front_page'
    let stories = []

    const data = await needle('get', url, { json: true })
    // console.log(data.body.hits)
    for (const key in data.body.hits) {
        const el = data.body.hits[key]
        stories.push({
            title: el.title,
            url: el.url
        })
    }

    return stories
}

module.exports = { top_stories }
