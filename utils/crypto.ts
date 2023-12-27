import CryptoJS from 'crypto-js';

const { NEXT_PUBLIC_CRYPTO_SECRET: key } = process.env;

export const generateCrypto = (value: string | number | boolean) => {
  if (!value) return;

  if (key) {
    return CryptoJS.AES.encrypt(String(value), key).toString();
  }
};

export const decodingCrypto = (value: string | number | boolean) => {
  if (!value) return;

  if (key) {
    return CryptoJS.AES.decrypt(String(value), key).toString(CryptoJS.enc.Utf8);
  }
};
