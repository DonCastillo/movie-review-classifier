const Seeder = require('./models/Seeder');
const fs = require('fs')
const path = require('path')

const TRAIN_POS_DIR = path.join(__dirname, './../data/train/pos')
const TRAIN_NEG_DIR = path.join(__dirname, './../data/train/neg')


function seed() {
    console.log('start seed')

    console.log(TRAIN_POS_DIR)
    console.log(TRAIN_NEG_DIR)
    const posFiles = fs.readdirSync(TRAIN_POS_DIR)
    const negFiles = fs.readdirSync(TRAIN_NEG_DIR)

    console.log(posFiles)
    console.log(negFiles)

    console.log('final seed')
}


module.exports = seed;


// Ndoc = number of documens
// Nc = number of documents per class (pos, neg)
// logprior of each class where log(Nc/Ndoc)
// V = vocabulary of D
        // voc of each files to create class voc
        // voc of each class to create doc voc
