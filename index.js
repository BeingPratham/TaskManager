const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.json());
app.use('/auth', authRoutes); //This is for creating users 
app.use('/tasks', taskRoutes); // This is for our apis to create tasks and all


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
