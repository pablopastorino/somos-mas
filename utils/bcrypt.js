import bCrypt from 'bcrypt'

export const createHash = password => {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null)
}

export const validatePassword = (password, userPassword) => {
  return bCrypt.compareSync(password, userPassword)
}
