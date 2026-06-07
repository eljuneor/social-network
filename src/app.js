const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
 
const app = express();
 
connectDB();
 
app.use(cors());
app.use(express.json());
 
// Rutas
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/posts', require('./routes/post.routes'));
app.use('/api/comments', require('./routes/comment.routes'));
app.use('/api/users', require('./routes/user.routes'));
 
module.exports = app;
 