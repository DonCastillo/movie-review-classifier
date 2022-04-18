const mongoose = require('mongoose')
const {Schema} = mongoose

const trainSchema = new Schema({
    raw: String,
    tokenized: String,
    vocabulary:  Array,
    word_freq: Object
})

module.exports = mongoose.model('Train', trainSchema)