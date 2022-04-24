const fs = require('fs')
const path = require('path')

const trainDB = require('../schema/train')
const testDB = require('../schema/test')

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


async function seedTrain() {

    // delete all existing files
    await trainDB.deleteMany({})
    await testDB.deleteMany({})

    // import training files
    await importFiles(POS_PATH, 1)
    await importFiles(NEG_PATH, 0)
}


module.exports = seedTrain;