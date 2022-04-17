const fs = require('fs')
const path = require('path')
const DATA_DIR = path.join(__dirname, '../../data/train/')

class Seeder {

    filePath = ''

    constructor(filePath) {
        this.filePath = filePath;
    }

    run() {
        let filenames = fs.readdirSync(DATA_DIR)
        return filenames

        // return DATA_DIR
    }
}


module.exports = Seeder