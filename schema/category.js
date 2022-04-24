const mongoose = require('mongoose')
const {Schema} = mongoose

const categorySchema = new Schema({
    class: String,
    doc_count: Number,
    word_freq: Object,
    log_prior: Number,
    log_likelihood: Object
})

module.exports = mongoose.model('category', categorySchema)