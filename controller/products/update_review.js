const responseToFront = require("../../helper/responseToFront");
const product_model = require("../../models/product_model");

const updateReview = async (req, res) => {
    const { productId, reviewId } = req.params;

    const { comment } = req.body;
 
        try {
            const product = await product_model.findById(productId);
            
            if (!product) {
                return res
                .status(404)
                .json(responseToFront("Product not found", 404));
            }
            
        const review = product.reviews.id(reviewId);
        if (comment !== undefined) {
                review.comment = comment;
            }

        if (!review) {
            return res
                .status(404)
                .json(responseToFront("Review not found", 404));
        }

      

        await product.save();

        return res
            .status(200)
            .json(
                responseToFront(
                    "Review updated successfully",
                    200,
                    review
                )
            );

    } catch (error) {
        return res
            .status(500)
            .json(responseToFront(error.message, 500));
    }
};

module.exports = updateReview;