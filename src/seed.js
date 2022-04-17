const Seeder = require('./models/Seeder');
const fs = require('fs')
const path = require('path')

const POS_PATH = './../data/train/pos'
const NEG_PATH = './../data/train/neg'
const TRAIN_POS_DIR = path.join(__dirname, POS_PATH)
const TRAIN_NEG_DIR = path.join(__dirname, NEG_PATH)


async function seed() {
    console.log('start seed')

    console.log(TRAIN_POS_DIR)
    console.log(TRAIN_NEG_DIR)
    const posFiles = fs.readdirSync(TRAIN_POS_DIR)
    const negFiles = fs.readdirSync(TRAIN_NEG_DIR)

    await posFiles.forEach(file => {
        const filePath = path.join(__dirname, `${POS_PATH}/${file}`)
        const Seed = new Seeder(filePath);
        console.log(Seed.run())


        
    });

    // console.log(posFiles)
    // console.log(negFiles)

    console.log('final seed')
}


module.exports = seed;


// Ndoc = number of documens
// Nc = number of documents per class (pos, neg)
// logprior of each class where log(Nc/Ndoc)
// V = vocabulary of D
        // voc of each files to create class voc
        // voc of each class to create doc voc
