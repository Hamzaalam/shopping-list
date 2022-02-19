const express = require('express'); 
const bodyParser = require('body-parser');
const { PORT, MONGODB_URL } = require('./config/app.config');
const path = require('path');
const mongoose = require("mongoose");
const port = PORT || 4000;

mongoose.Promise = global.Promise;
mongoose.connect(MONGODB_URL, 
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log("Error while connecting to database", err);
    process.exit();
  });

const app = express();

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '../shopping-list/client/build')));

require("./routes/app.routes.js")(app);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname , "../shopping-list/client/build", "index.html"));
});

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port 🚀 ${port}`)); //Line 6