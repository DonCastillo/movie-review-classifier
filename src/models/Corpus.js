const corpus = require('../../schema/corpus')


class Corpus {

    categories = []

    constructor() {

    }


    addCategory(categoryObj) {
        this.categories.push(categoryObj)
    }


    docCount() {
        let totalDocCount = 0
        totalDocCount = this.categories.reduce((sum, category) => {
            return sum + category.doc_count
        }, 0)
        return totalDocCount
    }


    wordFreq() {
        let allWordFreq = {}
        allWordFreq = this.categories.reduce((allWordFreq, category) => {
            for (const [word, count] of Object.entries(category.word_freq)) {
                if(!allWordFreq[word]) {
                    allWordFreq[word] = 0;
                }
                allWordFreq[word] += count;
            }
            return allWordFreq
        }, {})
        return allWordFreq
    }


    async save() {
        // console.log(this.categories)
        return await corpus.create({
            doc_count: this.docCount(),
            word_freq: this.wordFreq()
        })
    }
}


module.exports = Corpus