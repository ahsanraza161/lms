const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('token');
  if (!token) {
    return res.status(401).json({
      msg: 'Autorization denied, token missing',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.jwtsecret);
    req.user = decoded.student;

    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ msg: 'Invalid token' });
  }
};
