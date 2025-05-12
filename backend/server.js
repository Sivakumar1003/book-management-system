const express = require("express");
require('dotenv').config();
const cors = require('cors');

const userRouter = require("./src/routes/users.routes");
const booksRouter = require('./src/routes/books.routes');

const app = express();
const PORT = process.env.URL_PORT || 5000;

// Enable cors
app.use(cors())

// Parse incoming request bodies
app.use(express.json());
app.use(express.urlencoded({extended: true}))

// Routes
app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the home page." })
});
app.use('/api/users', userRouter);
app.use('/api/books', booksRouter);

// Run server and log port number.
app.listen(PORT, () => {
    console.log(`server is runing in ${PORT}`)
})