const {removeStopwords} = require('stopword')
const stemmer = require('porter-stemmer').stemmer

function tokenizer(string) {

    let tokenizedString = 
        string.toLowerCase()
              .replace(/[^\w\d]/g, ' ')
              .split(' ')
              .filter(word => {
                  return !Number(word) && word.length > 3
                })

    tokenizedString = removeStopwords(tokenizedString)
    tokenizedString = tokenizedString.map(word => stemmer(word))
    tokenizedString = tokenizedString.join(' ')

    return tokenizedString
}


function vocabulary(string) {
    console.log('inside vocabulary')
    let vocabulary = string.split(' ')
    vocabulary = new Set(vocabulary)

    return [...vocabulary]
}


function frequency(vocabulary, tokenized) {
    let frequency = {}
    let tokenizedArray = tokenized.split(' ')

    vocabulary.forEach(v => {
        let count = 0
        tokenizedArray.forEach((t, index) => {
            if (v === t) {
                count++
            }
        })
        frequency[v] = count
    })

    // console.log(frequency)
    return frequency
}

module.exports = {tokenizer, vocabulary, frequency}