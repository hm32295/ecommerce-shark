const responseToFront = require("../../helper/responseToFront");
const product_model = require("../../models/product_model");

const getSingleProduct = async (req, res) => {
    const _id = req.params.id
    

    try {
        const product =await product_model.findById(_id).populate('category' ,'name')
        res.status(200).json(responseToFront('done', 200 ,product))
    } catch (error) {
        res.status(500).json(responseToFront(error.message , 500))
    }
 }
module.exports =getSingleProduct