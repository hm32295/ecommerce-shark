const responseToFront = require("../../helper/responseToFront");
const product_model = require("../../models/product_model");


const getReviews = async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await product_model
            .findById(productId)
            .select("reviews")
            // .populate("reviews.user", "name email");

        if (!product) {
            return res
                .status(404)
                .json(responseToFront("Product not found", 404));
        }

        return res
            .status(200)
            .json(
                responseToFront(
                    "Reviews fetched successfully",
                    200,
                    product.reviews
                )
            );

    } catch (error) {
        return res
            .status(500)
            .json(responseToFront(error.message, 500));
    }
};

module.exports = getReviews;