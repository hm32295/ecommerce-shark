exports.getCart = async (req, res) => {
    console.log("getCart function called");

    res.status(200).json({
        message: "Cart retrieved successfully"
    });
};