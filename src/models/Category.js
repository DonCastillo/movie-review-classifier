const category = require('../../schema/category')

class Category {

    docs = []
    className = ''

    constructor(docs, className) {
        this.docs = docs
        this.className = className
    }

    wordFreq() {
        let allWordFreq = {}
        allWordFreq = this.docs.reduce((allWordFreq, doc) => {
            for (const [word, count] of Object.entries(doc.word_freq)) {
                if(!allWordFreq[word]) {
                    allWordFreq[word] = 0;
                }
                allWordFreq[word] += count;
            }
            return allWordFreq
        }, {})

        return allWordFreq
    }


    docCount() {
        return this.docs.length
    }


    save() {
        return category.create({
            class: this.className,
            word_freq: this.wordFreq(),
            doc_count: this.docCount()
        })
    }
}

module.exports = Category