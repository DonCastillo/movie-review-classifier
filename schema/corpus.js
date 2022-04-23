const mongoose = require('mongoose')
const {Schema} = mongoose

const corpusSchema = new Schema({
    doc_count: Number,
    word_freq: Object
})

module.exports = mongoose.model('corpus', corpusSchema)