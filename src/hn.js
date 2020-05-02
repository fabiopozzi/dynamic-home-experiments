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
            url: el.url,
            num_comments: el.num_comments,
            storyId: el.objectID
        })
    }

    return stories
}

const story_comments = async (storyId) => {
    const url = `https://hn.algolia.com/api/v1/search?tags=comment,story_${storyId}`
    const data = await needle('get', url, { json: true })
    let comments = []

    // console.log(data)
    for (const key in data.body.hits) {
        const comment = data.body.hits[key]
        comments.push({
            author: comment.author,
            comment_text: comment.comment_text,
        })
    }

    return comments
}

module.exports = {
    top_stories,
    story_comments
}
