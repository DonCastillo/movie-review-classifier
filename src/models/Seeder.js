const fs = require('fs')
const path = require('path')
const train = require('../../schema/train')
const {tokenizer, vocabulary, frequency} = require('./../functions')



class Seeder {

    filePath = ''
    classification = 0

    constructor(filePath, classification) {
        this.filePath = filePath
        this.classification = classification
    }

    async save() {
        console.log(`reading from the file ${this.filePath}`)
        const readStream = fs.createReadStream(this.filePath, 'utf8')

        readStream.on('data', async chunk => {
            const raw = chunk
            const tokenized = tokenizer(chunk)
            const vocabularized = vocabulary(tokenized)
            const wordCount = frequency(vocabularized, tokenized)

            await train.create({
                class: this.classification ? 'pos' : 'neg',
                raw: raw,
                tokenized: tokenized,
                vocabulary: vocabularized,
                word_freq: wordCount
            })
            readStream.destroy()
        })
        
    }
}


module.exports = Seeder