const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
mongoose.connect('mongodb://0.0.0.0:27017/Task_management', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(1);
});

app.use(bodyParser.json());
app.use(express.json());
app.use('/auth', authRoutes); //This is for creating users 
app.use('/tasks', taskRoutes); // This is for our apis to create tasks and all


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
