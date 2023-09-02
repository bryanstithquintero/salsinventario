const dotenv = require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const database = require("./config/database");
const path = require("path");

const app = express();

//middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: false })); // express.urlencoded ya incluye bodyParser
app.use(cors());

//routes

app.get("/", (req, res) => {
    res.send("home page");
})

//coneccion a la base de datos
database.mongoConnect();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});

module.exports = app;
