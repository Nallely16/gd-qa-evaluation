import CryptoJS from 'crypto-js'

const SECRET_KEY = 'key-secret'

export function encryptData(data: object): string {
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString()
  return ciphertext
}

export function decryptData(ciphertext: string): object {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY)
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8)
  return JSON.parse(decryptedData)
}