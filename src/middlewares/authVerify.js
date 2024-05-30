const jwt = require('jsonwebtoken')

const authVerify = (req, res, next) => {
  const header = req.headers['authorization']

  const jwt_token = header && header.split(' ')[1]

  if (!jwt_token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  jwt.verify(jwt_token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' })
    }
    console.log("Auth success...!");
    return next();
  })
}

module.exports = authVerify
