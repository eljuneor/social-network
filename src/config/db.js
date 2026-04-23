const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('URI recibida:', process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB conectado');
  } catch (error) {
    console.error('Error de conexión:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;