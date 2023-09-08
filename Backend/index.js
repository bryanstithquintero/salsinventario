const dotenv = require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const errorHandler = require("./middleWare/errorMiddleware")
const cors = require("cors");
const database = require("./config/database");
const path = require("path");
const productRoute = require("./routes/productRoute");
const cookieParser = require("cookie-parser");

const app = express();

//middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: false })); // express.urlencoded ya incluye bodyParser
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use("/api/products", productRoute);

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

//manejo de errores
app.use(errorHandler);

module.exports = app;
