const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const register = asyncHandler(async (req, res) => {
  const { username, password, email, role } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const foundUser = await User.findOne({ username }).exec();

  if (foundUser) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    password: hashedPassword,
    email,
    role: [],
  });

  await newUser.save();

  res.status(201).json({ message: 'User created' });
});

// @desc Login
// @route POST /auth
// @access Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const foundUser = await User.findOne({ email }).exec();

  if (!foundUser || !foundUser.active) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const match = await bcrypt.compare(password, foundUser.password);

  if (!match) return res.status(401).json({ message: 'Unauthorized' });

  const accessToken = jwt.sign(
    {
      UserInfo: {
        userId: foundUser._id,
        email: foundUser.email,
        roles: foundUser.role,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    {
      email: foundUser.email,
      userId: foundUser._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '1d' }
  );

  // Create secure cookie with refresh token
  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  // Send accessToken containing username and roles
  res.json({ accessToken });
});

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Forbidden' });

      const foundUser = await User.findOne({ username: decoded.username });

      if (!foundUser) return res.status(401).json({ message: 'Unauthorized' });

      const accessToken = jwt.sign(
        {
          UserInfo: {
            userId: foundUser._id,
            username: foundUser.username,
            roles: foundUser.role,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
      );
      res.json({ accessToken });
    })
  );
};

// @desc Logout
// @route POST /auth/logout
// @access Public - to clear a cookie
const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'None' });
  res.json({ message: 'Logged out' });
};

// Use `module.exports` to export functions
module.exports = {
  register,
  login,
  refresh,
  logout
};
