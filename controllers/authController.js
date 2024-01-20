const jwt = require('jsonwebtoken');
const User = require('../models/User');


const secretKey = process.env.SECRET_KEY;

const generateToken = (user) => {
  return jwt.sign({ user_id: user._id }, secretKey, { expiresIn: '1h' });
};

exports.createUser = async (req, res) => {
    try {
      const { phone_number, priority } = req.body;
  
      const newUser = new User({ phone_number, priority });
      const savedUser = await newUser.save();
  
      const token = generateToken(savedUser);
  
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
