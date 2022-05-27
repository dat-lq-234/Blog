const mongoose = require('mongoose')

async function connect(){
    try {
        await mongoose.connect('mongodb+srv://dat-lq:datlq234@cluster0.oy3st.mongodb.net/?retryWrites=true&w=majority');
        // useCreateIndex: true,
        console.log("connect successfully!")
    } catch (error) {
        console.log("connect fail!")
    }
    
}

module.exports = {connect}