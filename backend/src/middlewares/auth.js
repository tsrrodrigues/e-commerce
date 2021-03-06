const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

module.exports = (req, res, next) => {
  // TOKEN
  const authHeader = req.headers.authorization

  if (!authHeader) return res.status(401).send({ error: 'No token provided' })

  const parts = authHeader.split(' ')

  if (parts.length !== 2) return res.status(401).send({ error: 'Token Error' })

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ error: authHeader })

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) return res.status(401).send({ error: 'Invalid token' })

    req.userId = decoded.id
    req.userAccessLevel = decoded.access_level
    return next()
  })
}
