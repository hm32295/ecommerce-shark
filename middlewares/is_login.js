const usersCollection = require("../models/users_model");
const jwt = require("jsonwebtoken");

const is_login_middleware = async (req, res, next) => {
    const token = req.cookies?.token;
    try {
        if (!token) {
            return res.status(401).json({
                status_code: "401",
                msg: "Please Login Firstly",
                data: null
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await usersCollection.findById(decoded.id);

        if (!user) {
            return res.status(404).json({
                status_code: "404",
                msg: "User Not Found",
                data: null
            });
        }

        if (user.isBlocked) {
            return res.status(403).json({
                status_code: "403",
                msg: "This User Is Blocked",
                data: null
            });
        }

        if (user.inactive) {
            return res.status(403).json({
                status_code: "403",
                msg: "This Account Is Inactive",
                data: null
            });
        }

        req.user = user;

        next();

    } catch (error) {
        return res.status(401).json({
            status_code: "401",
            msg: "Invalid Or Expired Token",
            data: null
        });
    }
};

module.exports = is_login_middleware;