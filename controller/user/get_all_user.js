const responseToFront = require("../../helper/responseToFront")
const users_model = require("../../models/users_model")

const getAllUser = async (req, res) => {
    const {
        page = 1,
        size = 5,
    } = req.query

    try {
        const users = await users_model.find({})
            .skip((page -1) * size)
            .limit(size)
        
        res.status(200).json(responseToFront('done',200 , users,await users_model.find({}).countDocuments()))
    } catch (error) {
        res.status(500).json(responseToFront(error.message , 500))
    }
}
module.exports = getAllUser