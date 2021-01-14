const db = require('../models');
const Desktop = db.desktops;

// Crate and Save a new Desktop
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({ message: "Name cannot be empty" });
        return;
    }

    // Create a Desktop
    const desktop = new Desktop({
        name: req.body.name,
        cpu: req.body.cpu,
        gpu: req.body.gpu,
        cost: req.body.cost,
        yearbuilt: req.body.yearbuilt,
        working: req.body.working ? req.body.working : false
    });

    // Save the Desktop in the DB
    desktop
        .save(desktop)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating & saving the Desktop"
            });
        });
};

// Retreive all Desktops from the database
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {}

    Desktop.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving the Desktop"
            });
        });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Desktop.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: `No Desktop with ID ${id} found` })
            else res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: `Error retreiving Desktop with ID = ${id}` })
        })
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update cannot be empty"
        });
    }

    const id = req.params.id;

    Desktop.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Desktop with id = ${id}. Desktop possibly not found.`
                });
            } else res.send({ message: "Desktop was updated successfully!" });
        })
        .catch(err => {
            res.status(500).send({
                message: `Error updating Desktop with ID = ${id}.`
            })
        })
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Desktop.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Desktop with ID = ${id}. Maybe Desktop was not found?`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Could not find Desktop with ID = ${id}.`
            })
        })
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Desktop.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Desktops were deleted successfully!`
            })
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Desktops."
            });
        });
};

// Find all published Tutorials
exports.findAllWorking = (req, res) => {
    Desktop.find({ working: true })
        .then( data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retriving working Desktops"
            });
        });
};