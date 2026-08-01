
const responseToFront = require("../../helper/responseToFront");
const product_model = require("../../models/product_model");

const addReview = async (req, res) => {
    const { productId } = req.params;

    const { user, comment ,rating} = req.body;

    if (!user || !comment)return res.status(400).json(responseToFront("User and comment are required", 400));
    
    try {

        const product = await product_model.findById(productId);

        if (!product) return res.status(404).json(responseToFront("Product not found", 404));
        

        product.reviews.push({ user, comment ,rating });

        await product.save();

        return res.status(201) .json(responseToFront("Review added successfully",201,
                    product.reviews[product.reviews.length - 1]));

    } catch (error) {
        return res
            .status(500)
            .json(responseToFront(error.message, 500));
    }
};

module.exports = addReview;