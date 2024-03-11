const express = require('express');
const app = express();
const cors = require("cors");


app.use(express.static("public"));

app.use(cors());

require('dotenv').config();

const PORT = process.env.PORT ||process.argv[2] || 8080;

const videosRouter = require('./routes/video');

app.use(express.json());

app.use("/videos",videosRouter);

app.get("/", (req, res) => {
    res.send("Your are in the home page");
})

app.listen(PORT, () => {console.log(`Listening on port ${PORT}`)});

