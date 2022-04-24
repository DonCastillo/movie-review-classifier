const express = require('express')
const mongoose = require('mongoose')
const seedTrain = require('./src/seed-train')
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

app.get('/seed-train', async function(req, res) {
    try {
        console.log('Seeding files ...')
        await seedTrain();
        res.send('Done seeding')
    } catch (e) {
        console.log('Seeding error')
        console.log(e)
        res.send('Seeding error')
    }
})


app.get('/')


app.listen(PORT, function() {
    console.log(`listening on port ${PORT}`)
})