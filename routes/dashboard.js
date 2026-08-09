const getDashboard = require('../controller/getDashboard/getDashboard');

const routerDashboard = require('express').Router();

routerDashboard.get('/' ,getDashboard)

module.exports = routerDashboard