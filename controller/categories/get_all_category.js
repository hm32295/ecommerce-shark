const responseToFront = require("../../helper/responseToFront")
const categories_model = require("../../models/categories_model")

const get_all_category = async (req, res) => {
    try {
        const data = await categories_model.find({}, "name description createdAt")
        
        res.status(200).json(responseToFront('done' , 200, data, await categories_model.find({}).countDocuments()))
    } catch (error) {
        res.status(400).json(responseToFront(error.message ,400))
    }
}
module.exports = get_all_category