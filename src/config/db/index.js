const mongoose = require('mongoose')

async function connect(){
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        // useCreateIndex: true,
        console.log("connect successfully!")
    } catch (error) {
        console.log("connect fail!")
    }
    
}

module.exports = {connect}