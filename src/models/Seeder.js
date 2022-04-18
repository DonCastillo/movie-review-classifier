const fs = require('fs')
const path = require('path')
const Train = require('../../schema/train')
const {tokenizer, vocabulary, frequency} = require('./../functions')



class Seeder {

    filePath = ''

    constructor(filePath) {
        this.filePath = filePath;
    }

    readFile() {
        console.log(`reading from the file ${this.filePath}`)
        const readStream = fs.createReadStream(this.filePath, 'utf8')
        // console.log(readStream)
        readStream.on('data', async chunk => {
            const raw = chunk
            const tokenized = tokenizer(chunk)
            const vocabularized = vocabulary(tokenized)
            const wordCount = frequency(vocabularized, tokenized)

            const train = new Train({
                raw: raw,
                tokenized: tokenized,
                vocabulary: vocabularized,
                word_freq: wordCount
            })

            train.save()
            readStream.destroy()
        })
        
    }

    save() {

    }



    run() {
        return 'Hello' + this.filePath
    }
}


module.exports = Seeder