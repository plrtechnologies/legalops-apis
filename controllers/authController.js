
const User = require('../models/userModel');  // Adjust if needed
const jwt = require('jsonwebtoken');

// Signup Controller
const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create new user
    const newUser = await User.create(name, email, password);
 
    res.status(201).json({
      message: 'User created successfully',
    
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};


// Login Controller
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Validate password (ensure User.validatePassword compares the hashed passwords)
    const isMatch = await User.validatePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
// Generate JWT token with user ID as payload
const payload = { userId: user.id };
const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });  // Token expires in 1 hour

res.status(200).json({
  message: 'Login successful',
  token: token,  // Send the JWT token to the client
});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};



// Get User Profile (with JWT)
const getUserProfile = async (req, res) => {
  const userId = req.user.userId;  // Get userId from the decoded token

  try {
    // Fetch the user from the database by their userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Exclude sensitive data like password
    const { password, ...userProfile } = user;

    res.status(200).json({
      message: 'User profile fetched successfully',
      user: userProfile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};


module.exports = {
  signup,
  login,
  getUserProfile
};