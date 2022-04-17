const mongoose = require('mongoose')
const {Schema} = mongoose

const meta = new Schema({
    doc_count: Number,
    word_freq: {
        word: String,
        freq: Number
    },
    vocabulary: Array,
    negative: {
        sentiment: Boolean,
        doc_count: Number,
        log_prior: Number,
        log_likelihood: Number,
        word_freq: {
            word: String,
            freq: Number
        }
    },
    positive: {
        sentiment: Boolean,
        doc_count: Number,
        log_prior: Number,
        log_likelihood: Number,
        word_freq: {
            word: String,
            freq: Number
        }
    }
})

modeule.exports = mongoose.model('Meta', meta)