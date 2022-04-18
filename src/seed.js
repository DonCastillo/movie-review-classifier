const Seeder = require('./models/Seeder');
const fs = require('fs')
const path = require('path')
const Train = require('./../schema/train')

const POS_PATH = './../datasets/train/pos'
const NEG_PATH = './../data/train/neg'
const TRAIN_POS_DIR = path.join(__dirname, POS_PATH)
const TRAIN_NEG_DIR = path.join(__dirname, NEG_PATH)
const FILE_LIMIT = 2500


async function seed() {
    console.log('start seed')

    await Train.deleteMany({});

    console.log(TRAIN_POS_DIR)
    console.log(TRAIN_NEG_DIR)
    const posFiles = fs.readdirSync(TRAIN_POS_DIR)
    const negFiles = fs.readdirSync(TRAIN_NEG_DIR)

    posFiles.forEach((file, index) => {
        if(index < FILE_LIMIT) 
        {
            const filePath = path.join(__dirname, `${POS_PATH}/${file}`)
            console.log(filePath)
            console.log(index)
            const Seed = new Seeder(filePath);
            Seed.readFile()
        }
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
