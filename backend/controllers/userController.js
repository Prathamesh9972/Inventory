const bcrypt = require('bcryptjs')
const User = require('../models/userModel')

// Register user
const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' })
    }

    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const userCount = await User.countDocuments()
    const role = userCount === 0 ? 'admin' : 'staff'

    const newUser = new User({
      username,
      password: hashedPassword,
      role
    })

    await newUser.save()

    res.status(201).json({
      id: newUser._id,
      username: newUser.username,
      role: newUser.role
    })
  } catch (err) {
    console.error('Registration failed:', err.message)
    res.status(500).json({ error: 'Registration failed' })
  }
}

// Login user
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' })
    }

    const user = await User.findOne({ username })
    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid username or password' })
    }

    res.status(200).json({
      id: user._id,
      username: user.username,
      role: user.role
    })
  } catch (err) {
    console.error('Login failed:', err.message)
    res.status(500).json({ error: 'Login failed' })
  }
}

module.exports = { registerUser, loginUser }
