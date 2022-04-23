const Seeder = require('./models/Seeder')
const fs = require('fs')
const path = require('path')
const Train = require('./../schema/train')
const Category = require('./models/Category')
const Corpus = require('./models/Corpus')
const mongoose = require('mongoose')
// const Train = require('./../schema/train')

const POS_PATH = './../datasets/train/pos'
const NEG_PATH = './../datasets/train/neg'
const TRAIN_POS_DIR = path.join(__dirname, POS_PATH)
const TRAIN_NEG_DIR = path.join(__dirname, NEG_PATH)
const FILE_LIMIT = 2500


// const seedingPos = new Promise((resolve, reject) => {
//     try {
//         const posFiles = fs.readdirSync(TRAIN_POS_DIR)
//         posFiles.forEach((file, index) => {
//             if(index < FILE_LIMIT) {
//                 const filePath = path.join(__dirname, `${POS_PATH}/${file}`)
//                 const Seed = new Seeder(filePath, 1);
//                 Seed.save()
//             }
//         });
//         resolve() 
//     } catch (e) {
//         reject(e)
//     }
// })

// const seedingNeg = new Promise((resolve, reject) => {
//     try {
//         const negFiles = fs.readdirSync(TRAIN_NEG_DIR)
//         negFiles.forEach((file, index) => {
//             if(index < FILE_LIMIT) {
//                 const filePath = path.join(__dirname, `${NEG_PATH}/${file}`)
//                 const Seed = new Seeder(filePath, 0);
//                 Seed.save()
//             }
//         });
//         resolve()
//     } catch (e) {
//         reject(e)
//     }
// })


// async function countClassWordFreq(classDocs, className) {

//     const classWordFreq = classDocs.reduce((classWordFreq, doc) => {
//         for (const [word, count] of Object.entries(doc.word_freq)) {
//             if(!classWordFreq[word]) {
//                 classWordFreq[word] = 0;
//             }
//             classWordFreq[word] += count;
//         }
//         return classWordFreq
//     }, {})

//     await Class.create({class: className, word_freq: classWordFreq})
// }




async function seed() {
    console.log('start seed')

    // find all training docs for each category
    const posDocs = await Train.find({ class: 'pos' })
    const negDocs = await Train.find({ class: 'neg' })

    // gather category details
    const posClass = await new Category(posDocs, 'pos').save()
    const negClass = await new Category(negDocs, 'neg').save()

    // gather corpus details
    const corpus = new Corpus()
    corpus.addCategory(posClass)
    corpus.addCategory(negClass)
    corpus.save()

    

    console.log('final seed')
}


module.exports = seed;