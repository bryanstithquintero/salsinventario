const dotenv = require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const errorHandler = require("./middleWare/errorMiddleware")
const cors = require("cors");
const database = require("./config/database");
const path = require("path");
const productRoute = require("./routes/productRoute");
const provideRoute = require("./routes/providerRoute");
const clientRoute = require("./routes/clientRoute");
const saleRoute = require("./routes/saleRoute");
const cookieParser = require("cookie-parser");

const app = express();

//middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: false })); // express.urlencoded ya incluye bodyParser
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use("/api/products", productRoute);
app.use("/api/providers", provideRoute);
app.use("/api/clients", clientRoute);
app.use("/api/sales", saleRoute);

//routes

app.get("/", (req, res) => {
    res.send("home page");
})

//cloudinary
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

//coneccion a la base de datos
database.mongoConnect();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});

//manejo de errores
app.use(errorHandler);

module.exports = app;
