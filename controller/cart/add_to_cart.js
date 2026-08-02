exports.addToCart = async (req, res) => {
    console.log("addToCart function called");

    res.status(200).json({
        message: "Product added successfully"
    });
};