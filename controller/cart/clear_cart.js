exports.clearCart = async (req, res) => {
    console.log("clearCart function called");

    res.status(200).json({
        message: "Cart cleared successfully"
    });
};