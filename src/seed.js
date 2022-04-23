const fs = require('fs')
const path = require('path')

const trainDB = require('./../schema/train')
const testDB = require('./../schema/test')
const corpusDB = require('./../schema/corpus')
const categoryDB = require('./../schema/category')

const Category = require('./models/Category')
const Corpus = require('./models/Corpus')
const Seeder = require('./models/Seeder')


const POS_PATH = './../datasets/train/pos'
const NEG_PATH = './../datasets/train/neg'
const FILE_LIMIT = 2500



function importFiles(classPath, classfication) {
    const directoryPath = path.join(__dirname, classPath)

    return new Promise((resolve, reject) => {
        try {
            const files = fs.readdirSync(directoryPath)
            files.forEach((file, index) => {
                if(index < FILE_LIMIT) {
                    const filePath = path.join(__dirname, `${classPath}/${file}`)
                    const Seed = new Seeder(filePath, classfication);
                    Seed.save()
                }
            });
            resolve() 
        } catch (e) {
            reject(e)
        }
    })
}


async function seed() {
    console.log('start seed')

    // delete all existing files
    await trainDB.deleteMany({})
    await testDB.deleteMany({})
    await corpusDB.deleteMany({})
    await categoryDB.deleteMany({})


    // // import training files
    // await importFiles(POS_PATH, 1)
    // await importFiles(NEG_PATH, 0)

    // // find all training docs for each category
    // const posDocs = await Train.find({ class: 'pos' })
    // const negDocs = await Train.find({ class: 'neg' })

    // // gather category details
    // const posClass = await new Category(posDocs, 'pos').save()
    // const negClass = await new Category(negDocs, 'neg').save()

    // // gather corpus details
    // const corpus = new Corpus()
    // corpus.addCategory(posClass)
    // corpus.addCategory(negClass)
    // corpus.save()


    console.log('final seed')
}


module.exports = seed;