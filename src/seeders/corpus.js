const categoryDB = require('../../schema/category')
const corpusDB = require('../../schema/corpus')

const Corpus = require('../models/Corpus')

async function seedCorpus() {
    await corpusDB.deleteMany({})

    const posCat = await categoryDB.find({ class: 'pos' })
    const negCat = await categoryDB.find({ class: 'neg' })

    // gather corpus details
    const corpus = new Corpus()
    corpus.addCategory(posCat)
    corpus.addCategory(negCat)
    await corpus.save()
}

module.exports = seedCorpus;