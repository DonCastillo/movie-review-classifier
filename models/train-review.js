const mongoose = require('mongoose')
const {Schema} = mongoose

const trainReviewSchema = new Schema({
    raw: String,
    vocabulary:  Array,
    word_freq: {
        word: String,
        freq: Number 
    },
    word_count: Number
})

modeule.exports = mongoose.model('TestReview', trainReviewSchema)