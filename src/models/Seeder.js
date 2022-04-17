const fs = require('fs')
const path = require('path')
const TrainReview = require('../../schema/train-review')



class Seeder {

    filePath = ''

    constructor(filePath) {
        this.filePath = filePath;
    }



    run() {
        return 'Hello' + this.filePath
    }
}


module.exports = Seeder