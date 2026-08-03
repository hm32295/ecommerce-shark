const responseToFront = require("../../helper/responseToFront")
const users_model = require("../../models/users_model")

const unBlockUser = async (req, res) => {
    const { userId } = req.params 
    try {
        const user = await users_model.findById( userId , "isBlocked");
        if (!user) return res.status(404).json(responseToFront('not found'))
        user.isBlocked = false
        await user.save()
        res.status(200).json(responseToFront('done' ,200, user))
    } catch (error) {
        res.status(500).json(responseToFront(error.message, 500))
    }
}
module.exports = unBlockUser