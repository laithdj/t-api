const Crypto = require('crypto-js')

module.exports = {
    encryptPassword: async (text) => {
    return await Crypto.AES.encrypt(text, process.env.ENCRYPTION_SECRET).toString()
  },
    decryptPassword: async (cipher) => {
    return await Crypto.AES.decrypt(cipher, process.env.ENCRYPTION_SECRET).toString(Crypto.enc.Utf8)
  },
    verifyPassword: async (userPassword, dbPassword) => {
    return userPassword === (await decryptPassword(dbPassword))
  }
  
}

const decryptPassword = (cipher) => {
  return Crypto.AES.decrypt(cipher, process.env.ENCRYPTION_SECRET).toString(Crypto.enc.Utf8)
}