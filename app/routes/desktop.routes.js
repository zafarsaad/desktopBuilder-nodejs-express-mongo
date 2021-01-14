module.exports = app => {
    const desktops = require('../controllers/desktop.controller');

    var router = require('express').Router();

    // Create a new Desktop
    router.post('/', desktops.create);

    // Retrieve all Desktop
    router.get('/', desktops.findAll);

    // Retrieve all Working Desktops
    router.get('/working', desktops.findAllWorking);

    // Retrieve a single Desktop with ID
    router.get('/:id', desktops.findOne);

    // Update a Desktop with ID
    router.put('/:id', desktops.update);

    // Delete a Desktop with ID
    router.delete('/:id', desktops.delete);

    // Delete all Desktops
    router.delete('/', desktops.deleteAll);

    app.use('/api/desktops', router);
};