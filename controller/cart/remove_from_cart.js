exports.removeFromCart = async (req, res) => {
    console.log("removeFromCart function called");

    res.status(200).json({
        message: "Product removed successfully"
    });
};