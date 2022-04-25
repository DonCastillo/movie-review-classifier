const mongoose = require('mongoose')
const {Schema} = mongoose

const testSchema = new Schema({
    title: String,
    raw: String,
    truncated: String,
    tokenized: String,
    predicted_class: String,
    values: Array,
    timestamp: Date
})

module.exports = mongoose.model('test', testSchema)