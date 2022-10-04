import jwt from 'jsonwebtoken'

export const createToken = payload => {
  return jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '7 days' })
}

export const decodeToken = token => {
  return jwt.verify(token, process.env.JWT_KEY)
}
