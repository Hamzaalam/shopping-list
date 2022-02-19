const App = require("../models/list.models");

// Create and Save a new list
exports.create = (req, res) => {
  const list = new App({
    name: req.body.name,
    products: req.body.products,
  });
  console.log("create list ===> ", list);
  list
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error occurred while creating the list.",
      });
    });
};

// Retrieve all lists from the database.
exports.findAll = (req, res) => {
  App.find()
    .then((data) => {
      console.log("Retrived all lists");
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving lists.",
      });
    });
};

// Delete a list with the specified listId in the request
exports.delete = (req, res) => {
    App.findByIdAndRemove(req.params.listId)
      .then((data) => { 
          if (!data) {
          return res.status(404).send({
            message: "List not found with id " + req.params.listId,
          });
        }
        console.log(`====> list ${req.params.id} is successfully deleted`)
        res.send({ message: "List deleted successfully!" });
      })
      .catch((err) => {
        if (err.kind === "ObjectId" || err.name === "NotFound") {
          return res.status(404).send({
            message: "List not found with id " + req.params.listId,
          });
        }
        return res.status(500).send({
          message: "Could not delete list with id " + req.params.listId,
        });
      });
  };

// Find a single list with a listId
exports.findOne = (req, res) => {
  App.findById(req.params.listId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Message not found with id " + req.params.listId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Message not found with id " + req.params.listId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving message with id " + req.params.listId,
      });
    });
};

// Update a list identified by the listId in the request
exports.update = (req, res) => {
  App.findByIdAndUpdate(
    req.params.listId,
    {
      name: req.body.name,
      products: req.body.products,
    },
    { new: true }
  )
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Message not found with id " + req.params.listId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Message not found with id " + req.params.listId,
        });
      }
      return res.status(500).send({
        message: "Error updating message with id " + req.params.listId,
      });
    });
};


