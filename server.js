const express = require('express')
const mongoose = require('mongoose')
const seedTrain = require('./src/seeders/train')
const seedCategory = require('./src/seeders/category')
const seedCorpus = require('./src/seeders/corpus')
const NaiveBayes = require('./src/models/NaiveBayes')
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

app.get('/train', async function(req, res) {
    await NaiveBayes.train()
    res.send('<h1>Training</h1>');
})

app.get('/seed/train', async function(req, res) {
    try {
        await seedTrain();
        res.send('Done seeding')
    } catch (e) {
        console.log(e)
        res.send('Seeding error')
    }
})

app.get('/seed/category', async function(req, res) {
    try {
        await seedCategory();
        res.send('Done seeding')
    } catch (e) {
        console.log(e)
        res.send('Seeding error')
    }
})


app.get('/seed/corpus', async function(req, res) {
    try {
        await seedCorpus();
        res.send('Done seeding')
    } catch (e) {
        console.log(e)
        res.send('Seeding error')
    }
})


app.listen(PORT, function() {
    console.log(`listening on port ${PORT}`)
})