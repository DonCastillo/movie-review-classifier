const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const seedTrain = require('./src/seeders/train')
const seedCategory = require('./src/seeders/category')
const seedCorpus = require('./src/seeders/corpus')
const NaiveBayes = require('./src/models/NaiveBayes')
const testDB = require('./schema/test')
const app = express()

const PORT = 3000


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.json())

console.log('starting the server .....')



// connect to database
mongoose.connect('mongodb://localhost:27017/movie_reviews')
    .then(() => console.log('Connection open'))
    .catch(err => {
        console.log('Connection error')
        console.log(err)
    })


app.get('/', function(req, res) {
    res.render('home');
})

app.get('/train', async function(req, res) {
    await NaiveBayes.train()
    res.send('<h1>Training</h1>');
})

app.post('/test', async function(req, res) 
{
    try {
        const {title, review} = req.body
        await NaiveBayes.test(title, review)
        res.status(200).send({response: 'ok', data: {}})
    } catch (error) {
        console.error(error.message)
        res.status(500).send({response: 'error', error: error.message})
    }  
})

app.get('/reviews', async function(req, res) {
    try {
        const allReviews = await testDB.find({}).sort('-timestamp')
        res.status(200).send({response: 'ok', data: allReviews})
    } catch (error) {
        console.error(error.message)
        res.status(500).send({response: 'error', error: error.message})
    }
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