const product_model = require("../../models/product_model");
const responseToFront = require("../../helper/responseToFront");
const deleteProduct = async (req, res) => {
        const _id = req.params.id
    try {
       const deletedProduct = await product_model.findOneAndDelete({ _id })
        
        if (!deletedProduct) return res.status(404).json(responseToFront("Product not found" ,400));

        res.status(200).json(responseToFront('done', 200 ))
    } catch (error) {
        res.status(500).json(responseToFront(error.message , 500))
    }
 }

module.exports = deleteProduct