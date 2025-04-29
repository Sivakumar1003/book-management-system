const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the home page." })
})

app.listen(PORT, () => {
    console.log(`server is runing in ${PORT}`)
})