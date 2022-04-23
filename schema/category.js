const mongoose = require('mongoose')
const {Schema} = mongoose

const categorySchema = new Schema({
    class: String,
    doc_count: Number,
    word_freq: Object 
})

module.exports = mongoose.model('category', categorySchema)