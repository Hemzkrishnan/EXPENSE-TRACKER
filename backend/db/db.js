const mongoose = require('mongoose');

const db = async () => {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(process.env.MONGO_URL);
        console.log('You are now connected to the Database!!!');
    } catch (error) {
        console.log('You are not connected to the Database!!!', error);   
    }
}

module.exports = { db }