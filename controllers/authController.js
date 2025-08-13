const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const role = req.clientType || 'frontend';

  try {
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const newUser = await User.create(name, email, password, role);

    res.status(201).json({
      message: 'User created successfully',
      user_id: newUser.user_id,
      email: newUser.email,
      role: newUser.role
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const role = req.clientType || 'frontend';

  try {
    const user = await User.findByEmail(email);
    if (!user || user.role !== role) {
      return res.status(400).json({ error: 'Invalid credentials or role mismatch' });
    }

    const isMatch = await User.validatePassword(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const payload = { userId: user.user_id, role }; // ✅ user_id must be correct
    const secret = role === 'backend' ? process.env.JWT_SECRET_BACKEND : process.env.JWT_SECRET_FRONTEND;
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful',
      token,
      user_id: user.user_id
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const getUserProfile = async (req, res) => {
  try {
    console.log('Decoded user from JWT:', req.user); // ✅ DEBUG
    const user = await User.findById(req.user.userId); // ✅ should match DB field
    if (!user) return res.status(404).json({ error: 'User not found' });

    const { password, ...userProfile } = user;
    res.status(200).json({ message: 'User profile fetched successfully', user: userProfile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = { signup, login, getUserProfile };
