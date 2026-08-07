const responseToFront = require("../../helper/responseToFront");
const product_model = require('../../models/product_model')

const createProduct = async (req, res) => {
    const image = req.file?.path
     
    try {

        const {
            title,
            description,
            price,
            stock,
            category,
            brand,
        } = req.body;

        if (!title || !description || !stock || !category) {
            return res.status(400).json(responseToFront('please enter all data'));
        }

        const product = await product_model.create({
            title,
            description,
            price,
            stock,
            category,
            brand,
            image
        });

        return res.status(201).json(responseToFront('add successfully' ,201 ,product));

    } catch (error) {

        return res.status(500).json(responseToFront(error.message, 500));

    }
};

module.exports =   createProduct
