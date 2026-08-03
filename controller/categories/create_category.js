const responseToFront = require("../../helper/responseToFront")
const categories_model = require("../../models/categories_model")

const create_category = async (req, res) => {
    const { description, name } = req.body
    if (!name) res.status(400).json(responseToFront('please Enter name category', 400))
    
    try {
        const create = await categories_model.create({
            name , description
        })
        res.status(201).json(responseToFront('create successfully', 201 ,create))
    } catch (error) {
        res.status(400).json(responseToFront(error.message, 400))
    }
}
module.exports = create_category