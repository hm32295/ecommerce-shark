const responseToFront = require("../../helper/responseToFront");
const product_model = require("../../models/product_model");

const deleteReview = async (req, res) => {
    const { productId, reviewId } = req.params;

    try {
        const product = await product_model.findById(productId);

        if (!product) {
            return res
                .status(404)
                .json(responseToFront("Product not found", 404));
        }

        const review = product.reviews.id(reviewId);

        if (!review) {
            return res
                .status(404)
                .json(responseToFront("Review not found", 404));
        }

        review.deleteOne();

        await product.save();

        return res
            .status(200)
            .json(
                responseToFront(
                    "Review deleted successfully",
                    200
                )
            );

    } catch (error) {
        return res
            .status(500)
            .json(responseToFront(error.message, 500));
    }
};

module.exports = deleteReview;