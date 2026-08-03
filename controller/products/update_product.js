const responseToFront = require("../../helper/responseToFront");
const product_model = require("../../models/product_model");

const editProduct = async (req, res) => {
    const _id = req.params.id
    
        const {
            title,
            description,
            price,
            stock,
            category,
            brand,
            image
        } = req.body;

        if (!title || !description || !stock || !category) {
            return res.status(400).json(responseToFront('please enter all data'));
        }
    try {
        const update  = await product_model.findOneAndUpdate({_id}, {
            title,
            description,
            price,
            stock,
            category,
            brand,
            image
        })
        res.status(200).json(responseToFront('updated successfully', 200 ))
    } catch (error) {
        res.status(500).json(responseToFront(error.message , 500))
    }
 }
module.exports =editProduct