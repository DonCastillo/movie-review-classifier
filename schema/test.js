const mongoose = require('mongoose')
const {Schema} = mongoose

const testSchema = new Schema({
    raw: String,
    tokenized: String,
    predicted_class: String 
})

module.exports = mongoose.model('test', testSchema)