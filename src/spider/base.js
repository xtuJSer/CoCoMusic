import https from 'https'

const defaultConf = {
  'Referer': 'http://y.qq.com/portal/player.html',
  'User-Agent': 'user-agent:Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
  encoding: 'utf8'
}

// 写的真特么恶心

export const request = (url, config = defaultConf) => {
  return new Promise(function (resolve, reject) {
    const request = https.request(url)
    let data = ''

    request.setHeader('Referer', config.Referer)
    request.setHeader('User-Agent', config['User-Agent'])

    request.on('response', (response) => {
      response.setEncoding(defaultConf.encoding)
      response.on('data', (chunk) => {
        data = data + chunk
      })
      response.on('error', error => {
        reject(error)
      })
      response.on('end', () => {
        resolve(data)
      })
    })
    request.end()
  })
}
