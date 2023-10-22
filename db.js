const mongoose = require('mongoose');

const connectMongoDB = async () => {
    
    await mongoose.connect(process.env.mongoURI);

    mongoose.connection.on('connected',() => {
        console.log("connected to mongo successfully");
    })

    mongoose.connection.on('error',() => {
        console.log("unable to connect");
    })
}

module.exports = connectMongoDB;