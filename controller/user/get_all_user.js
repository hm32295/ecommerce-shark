const responseToFront = require("../../helper/responseToFront")
const users_model = require("../../models/users_model")

const getAllUser = async (req, res) => {
    try {
        const users = await users_model.find({})
        res.status(200).json(responseToFront('done',200 , users))
    } catch (error) {
        res.status(500).json(responseToFront(error.message , 500))
    }
}
module.exports = getAllUser