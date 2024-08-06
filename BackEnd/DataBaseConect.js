const mongoose = require('mongoose');
const mogoURL ="mongodb://localhost:27017/inotebook";
const connectToMongo = async () => {
  try {
    await mongoose.connect(mogoURL);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
  }
};

module.exports = connectToMongo;