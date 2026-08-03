const responseToFront = require("../../helper/responseToFront")
const categories_model = require("../../models/categories_model")

const update_category = async (req, res) => {
    const { name, description } = req.body
    const _id = req.params.id
    
    if (!name) return res.status(400).json(responseToFront('please enter name category', 400))
    try {
        const update = await categories_model.findOneAndUpdate({_id}, { name, description } ,)
        res.status(200).json(responseToFront('updated successfully' , 200, update))
    } catch (error) {
        res.status(400).json(responseToFront(error.message , 400))
    }
    
}
module.exports = update_category