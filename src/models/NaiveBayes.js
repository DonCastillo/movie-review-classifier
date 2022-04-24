const categoryDB = require('./../../schema/category')
const corpusDB = require('./../../schema/corpus')



async function retrieveCategories() {
    let allCategories = []
    let posCat = await categoryDB.findOne({ class: 'pos' }).exec()
    let negCat = await categoryDB.findOne({ class: 'neg' }).exec()
    allCategories.push(posCat)
    allCategories.push(negCat)
    return allCategories
}

async function corpusVoc() {
    let corpus = await corpusDB.findOne({}).exec()
    return Object.keys(corpus.word_freq)
}

async function corpusDocCount() {
    let corpus = await corpusDB.findOne({}).exec()
    return corpus.doc_count
}

async function summationCategoryCorpus(corpusVoc, classWordFreq) {

    return corpusVoc.reduce((sum, corpusWord) => {
        if (!classWordFreq[corpusWord]) {
            sum += 1
        } else {
            sum += (classWordFreq[corpusWord] + 1)
        }
        return sum
    }, 0)
}


class NaiveBayes 
{


    static async train() 
    {   
        console.log('Training files in NaiveBayes.train()...')
        const V = await corpusVoc()
        const C = await retrieveCategories()
        const Ndoc = await corpusDocCount()

        
        // let corpusVocSample = ['dog', 'cat', 'mouse', 'bird']
        // let classWordFreqSample = {'dog': 1, 'mouse': 5}

        // console.log('===== summation cat corpus ==========')
        // let x = await summationCategoryCorpus(corpusVocSample, classWordFreqSample)
        // console.log(x)
        // console.log('===== summation cat corpus ==========')


        C.forEach(async c => {
            let classProb = {}
            let Nc = c.doc_count
            let summation = await summationCategoryCorpus(V, c.word_freq)

            classProb['class'] = c.class
            classProb['logprior'] = Math.log10(Nc / Ndoc)
            classProb['loglikelihood'] = {}

            V.forEach(async w => {
                let countWC = 0
                if (!c.word_freq[w]) {
                    countWC += 1
                } else {
                    countWC += (c.word_freq[w] + 1)
                }
                classProb['loglikelihood'][w] = Math.log10(countWC / summation)
            })  

            // store stats
            let condition = { class: c.class }
            let update = { 
                log_prior: classProb['logprior'], 
                log_likelihood: classProb['loglikelihood'] 
            }
            await categoryDB.findOneAndUpdate(condition, update)
        })





    }
}


module.exports = NaiveBayes