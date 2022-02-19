module.exports = (app) => {
    const App = require("../controllers/app.controllers");
  
    app.post("/create", App.create);

    app.delete("/list/:listId", App.delete);

    app.get("/get-all", App.findAll);
  
    app.get("/list/:listId", App.findOne);
  
    app.put("/list/:listId", App.update);
  
  };