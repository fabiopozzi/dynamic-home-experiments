let Parser = require('rss-parser');

const ansa = async () => {
    const url = 'https://www.ansa.it/sito/ansait_rss.xml'
    let parser = new Parser();
    let feed = await parser.parseURL(url)
    let news = []
    // console.log(feed.title);
    
    feed.items.forEach(item => {
        news.push({
            title: item.title,
            url: item.link
        })
    });
    return news
}

module.exports = {
    ansa
}