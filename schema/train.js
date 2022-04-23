const mongoose = require('mongoose')
const {Schema} = mongoose

const trainSchema = new Schema({
    class: String,
    raw: String,
    tokenized: String,
    vocabulary:  Array,
    word_freq: Object
})

module.exports = mongoose.model('train', trainSchema)