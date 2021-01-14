const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// !Review - What is being done here? What is CORS?
// Why is it 8081 and PORT at 8080?
var corsOptions = {
    origin: "http:/localhost:8081"
};

app.use(cors(corsOptions));

// Parse requests of content-type: application/json !Review
app.use(bodyParser.json());

// Parse requests of content-type: application/x-www-form-urlencoded !Review
app.use(bodyParser.urlencoded({ extended: true }));

// Using connect() method to connect to DB
const db = require('./app/models');
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then( () => {
        console.log('Connected to the database!');
    })
    .catch( err => {
        console.log(`Cannot connect to the database ${err}`);
        process.exit();
    });

// This is just a first route we're creating to test running server.js
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the DesktopBuilder applet!"});
});

require('./app/routes/desktop.routes')(app);

// set a port to listen for requests !Review - can we just say 8080?
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});