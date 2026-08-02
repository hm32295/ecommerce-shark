const responseToFront = require("../../helper/responseToFront")
const users_model = require("../../models/users_model")

const getSingleUser = async (req, res) => {
    const { userId } = req.params
    try {   
        const user = await users_model.findById(userId)
        if (!user) return res.status(404).json(responseToFront('sorry, this user is not found'))
        res.status(200).json(responseToFront('done' , 200, user))
    } catch (error) {
        res.status(500)
    }
}
module.exports = getSingleUser