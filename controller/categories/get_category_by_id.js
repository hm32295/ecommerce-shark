const responseToFront = require("../../helper/responseToFront")
const categories_model = require("../../models/categories_model")

const get_category_by_id = async (req, res) => {
    const _id = req.params.id
    
    try {
        const category = await categories_model.findOne({ _id })
        if (category) return res.status(200).json(responseToFront('done', 200, category))
        res.status(200).json('no category' ,200)
    } catch (error) {
        res.status(400).json(responseToFront(error.message, 400))
    }
    
}
module.exports = get_category_by_id