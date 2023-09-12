const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
 
  console.log(token);

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_SECRETKEY, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }
    console.log("successful auth")
  });
  next();
};

module.exports = auth;
