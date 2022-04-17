function train() {
    console.log('traning inside')
}


module.exports = train;


// Ndoc = number of documens
// Nc = number of documents per class (pos, neg)
// logprior of each class where log(Nc/Ndoc)
// V = vocabulary of D as computed by