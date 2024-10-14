const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const session = require("express-session"); // For session management

const app = express();
const port = 3000;

// Middleware (need to send information back and forth from server.js to where you fetch data)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // Serve static files from 'public' directory (tell express where to get files)

// Session middleware (express-session (keeps cookies and info during whole session))
app.use(
    session({
        secret: "keyboard cat", // Copied from document
        resave: false,
        saveUninitialized: true,
    })
);

//Create database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root", // MySQL username (this is standard for xampp)
    password: "", // MySQL password
    database: "ecommerce",
});

// Connect to database
db.connect((err) => {
    if (err) throw err;
    console.log("Connected to database");
});

// Landing page
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/home.html"); // Need to send a file to user, __dirname is a univseral variable to find the directory of this app
});

// EDIT BELOW

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
