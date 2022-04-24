const categoryDB = require('../schema/category')
const trainDB = require('../schema/train')

const Category = require('./models/Category')


async function seedCategory() {
    await categoryDB.deleteMany({})

    // find all training docs for each category
    const posDocs = await trainDB.find({ class: 'pos' })
    const negDocs = await trainDB.find({ class: 'neg' })

    // gather category details
    await new Category(posDocs, 'pos').save()
    await new Category(negDocs, 'neg').save()
}

module.exports = seedCategory;