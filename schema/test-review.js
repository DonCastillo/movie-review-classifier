const mongoose = require('mongoose')
const {Schema} = mongoose

const testReviewSchema = new Schema({
    raw: String,
    sentiment: Boolean 
})

modeule.exports = mongoose.model('TestReview', testReviewSchema)