const responseToFront = require("../../helper/responseToFront")
const categories_model = require("../../models/categories_model")

const delete_category = async (req, res) => {
    const _id= req.params.id
    try {
        await categories_model.findOneAndDelete({ _id })
        res.status(200).json(responseToFront('done' , 200))
    } catch (error) {
        res.status(400).json(responseToFront(error.message, 400))
    }
}
module.exports =delete_category