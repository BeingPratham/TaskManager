const jwt = require('jsonwebtoken');
const User = require('../models/User');


const secretKey = process.env.SECRET_KEY || 'default_secret_key';

const generateToken = (user) => {
  return jwt.sign({ user_id: user._id }, secretKey, { expiresIn: '10h' });
};

exports.createUser = async (req, res) => {
    try {
      console.log("Hello")
      const { phone_number, priority } = req.body;
  
      const newUser = new User({ phone_number, priority });
      console.log(newUser);
      const savedUser = await newUser.save();
  
      const token = generateToken(savedUser);
      console.log(token);
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
