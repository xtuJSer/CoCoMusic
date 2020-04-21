import { aesEncrypt, rsaEncrypt } from './crypto'
import { MD5 } from './md5'

function getRandomHexString(size) {
  const result = [];
  const choice = '012345679abcdef'.split('');
  for (let i = 0; i < size; i += 1) {
    const index = Math.floor(Math.random() * choice.length);
    result.push(choice[index]);
  }
  return result
  .join('');
}

export function encryptedRequest(text) {
  const modulus = '00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7b72'
    + '5152b3ab17a876aea8a5aa76d2e417629ec4ee341f56135fccf695280104e0312ecbd'
    + 'a92557c93870114af6c9d05c4f7f0c3685b7a46bee255932575cce10b424d813cfe48'
    + '75d3e82047b97ddef52741d546b8e289dc6935b3ece0462db0a22b8e7';
  const nonce = '0CoJUm6Qyw8W8jud';
  const pubKey = '010001';
  text = JSON.stringify(text);
  const secKey = getRandomHexString(16);
  const ivString = '0102030405060708';
  const encText = aesEncrypt(aesEncrypt(text, nonce, ivString), secKey, ivString);
  const encSecKey = rsaEncrypt(secKey, pubKey, modulus);
  const data = {
    params: encText,
    encSecKey,
  };

  return data;
}
