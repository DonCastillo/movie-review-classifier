const express = require('express')
const app = express()
const PORT = 3000
const train = require('./src/train');

console.log('starting the server .....')
// console.log(app)


app.get('/', function(req, res) {
    console.log('Index here')
    res.send(`<h1>Index here</h1>`)
})

app.get('/train', function(req, res) {
    console.log('Training files ...')
    train()
    res.send('<h1>Training</h1>');
})

app.get('/seed', function(req, res) {
    console.log('Seeding files ...')
    res.send('Done seeding')
})


app.listen(PORT, function() {
    console.log(`listening on port ${PORT}`)
})