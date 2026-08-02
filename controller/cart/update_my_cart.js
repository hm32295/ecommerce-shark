exports.updateCart = async (req, res) => {
    console.log("updateCart function called");

    res.status(200).json({
        message: "Cart updated successfully"
    });
};