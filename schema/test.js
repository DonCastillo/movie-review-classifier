const mongoose = require('mongoose')
const {Schema} = mongoose

const testSchema = new Schema({
    raw: String,
    sentiment: Boolean 
})

modeule.exports = mongoose.model('Test', testSchema)