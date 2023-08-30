const mongoose = require("mongoose");
const uri = process.env.uri;


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