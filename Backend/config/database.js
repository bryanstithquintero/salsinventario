const mongoose = require("mongoose");
const uri = "mongodb+srv://bryanquinterog:apisena2023@clustersena.hnciuy6.mongodb.net/?retryWrites=true&w=majority";


exports.mongoConnect = async () => {
    const mongoStringConnection = uri;
    try {
        await mongoose.connect(mongoStringConnection);
        console.log("db conect succesful");
    } catch (error) {
        console.log(error);
        throw new Error("error en conexión");
    }
};