const create_category = require('../controller/categories/create_category');
const delete_category = require('../controller/categories/delete_category');
const get_all_category = require('../controller/categories/get_all_category');
const get_category_by_id = require('../controller/categories/get_category_by_id');
const update_category = require('../controller/categories/update_category');

const routerCategory = require('express').Router();

routerCategory.get('/' ,get_all_category )
routerCategory.post('/' ,create_category )
routerCategory.get('/:id' ,get_category_by_id )
routerCategory.delete('/:id' ,delete_category )
routerCategory.put('/:id' ,update_category )
module.exports= routerCategory