const express = require('express')
const mongoose = require('mongoose')
const seed = require('./src/seed')
const app = express()

const PORT = 3000

console.log('starting the server .....')



// connect to database
mongoose.connect('mongodb://localhost:27017/movie_reviews')
    .then(() => console.log('Connection open'))
    .catch(err => {
        console.log('Connection error')
        console.log(err)
    })


app.get('/', function(req, res) {
    console.log('Index here')
    res.send(`<h1>Index here</h1>`)
})

app.get('/train', function(req, res) {
    console.log('Training files ...')
    train()
    res.send('<h1>Training</h1>');
})

app.get('/seed', async function(req, res) {
    console.log('Seeding files ...')
    await seed();
    res.send('Done seeding')
})


app.listen(PORT, function() {
    console.log(`listening on port ${PORT}`)
})