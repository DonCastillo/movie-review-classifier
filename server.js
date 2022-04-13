const express = require('express')
const app = express()
const PORT = 3000

console.log('starting the server .....')
// console.log(app)


app.get('/', function(req, res) {
    console.log('Index here')
    res.send(`<h1>Index here</h1>`)
})


app.listen(PORT, function() {
    console.log(`listening on port ${PORT}`)
})