const fs = require('fs')
const path = require('path')

const trainDB = require('../../schema/train')
const testDB = require('../../schema/test')

const Seeder = require('../models/Seeder')

const POS_PATH = './../../datasets/train/pos'
const NEG_PATH = './../../datasets/train/neg'
const FILE_LIMIT = 2500



async function importFiles(classPath, classfication) {
    const directoryPath = path.join(__dirname, classPath)

    return new Promise(async (resolve, reject) => {
        try {
            const files = fs.readdirSync(directoryPath)
            files.forEach(async (file, index) => {
                if(index < FILE_LIMIT) {
                    const filePath = path.join(__dirname, `${classPath}/${file}`)
                    const Seed = new Seeder(filePath, classfication);
                    await Seed.save()
                }
            });
            resolve() 
        } catch (e) {
            reject(e)
        }
    })
}


async function seedTrain() {
    return new Promise(async (resolve, reject) => {
        try {
            // delete all existing files
            await trainDB.deleteMany({})
            await testDB.deleteMany({})

            // import training files
            await importFiles(POS_PATH, 1)
            await importFiles(NEG_PATH, 0)
            resolve()
        } catch (e) {
            reject(e)
        }
    })
    
}


module.exports = seedTrain;