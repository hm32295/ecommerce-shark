const responseToFront = require("../../helper/responseToFront")
const product_model = require("../../models/product_model")

const getProduct = async (req, res) => {
   
        const {
            category,
            brand,
            min_price,
            max_price,
            title
        } = req.query;
    let filter = {};
    if(category) filter.category = category
    if(brand) filter.brand = brand
    if (title) {
        if (title) {
            filter.$or = [
                {
                    title: { $regex: title, $options: "i" }},
                { 
                    description: {$regex: title, $options: "i"}
                }
            ];
        }
    }
    if (min_price || max_price) {
        filter.price = {}
        if(min_price) filter.price.$gte = Number(min_price)
        if(max_price) filter.price.$lte = Number(max_price)
    }
    try {
        const products = await product_model.find(filter, 'title description price stock  category  brand image')
            .populate('category', 'name')
        res.status(200).json(responseToFront('done' ,200 , products))
    } catch (error) {
        res.status(500).json(responseToFront(error.message, 500))
    }
}
module.exports = getProduct