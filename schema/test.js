const mongoose = require('mongoose')
const {Schema} = mongoose

const testSchema = new Schema({
    raw: String,
    sentiment: Boolean 
})

module.exports = mongoose.model('test', testSchema)