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
app.use(express.static(path.join(__dirname, 'assets')));
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
    try {
        await NaiveBayes.train()
        res.status(200).send({response: 'Training the corpus', data: {}})
    } catch (error) {
        console.error(error.message)
        res.status(500).send({response: 'Failed to train the corpus', error: error.message})
    } 
})


app.post('/reviews', async function(req, res) {
    try {
        const {title, review} = req.body
        await NaiveBayes.test(title, review)
        res.status(200).send({response: 'ok', data: {}})
    } catch (error) {
        console.error(error.message)
        res.status(500).send({response: 'error', error: error.message})
    }  
})


app.delete('/reviews', async function(req, res) {
    try {
        await testDB.deleteMany({})
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


app.get('/reviews/:id', async function(req, res) {
    try {
        const {id} = req.params
        const review = await testDB.findById(id)
        res.render('review', {review})
    } catch (error) {
        console.error(error.message)
        res.status(500).send({response: 'error', error: error.message})
    }
})


app.get('/seed/train', async function(req, res) {
    try {
        await seedTrain();
        res.status(200).send({response: 'Done importing files', data: {}})
    } catch (error) {
        console.error(error.message)
        res.status(500).send({response: 'Failed to import files', error: error.message})
    }
})


app.get('/seed/category', async function(req, res) {
    try {
        await seedCategory();
        res.status(200).send({response: 'Done evaluating categories', data: {}})
    } catch (error) {
        console.error(error.message)
        res.status(500).send({response: 'Failed to evaluate categories', error: error.message})
    }
})


app.get('/seed/corpus', async function(req, res) {
    try {
        await seedCorpus();
        res.status(200).send({response: 'Done evaluating corpus', data: {}})
    } catch (error) {
        console.error(error.message)
        res.status(500).send({response: 'Failed to evaluate corpus', error: error.message})
    }
})

app.get('/seed/', async function(req, res) {
    try {
        res.render('seed')
    } catch (error) {
        console.error(error.message)
        res.send('Seeding error')
    }
})


app.listen(PORT, function() {
    console.log(`listening on port ${PORT}`)
})