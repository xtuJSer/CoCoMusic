import { expect } from 'chai'
import { search, getLyrics } from '../../../../src/api/repalce/migu'

let songid: string

describe('migu 音源替换', function () {
  it('searchMusic', async function () {
    const data = await search('晴天', '周杰伦')
    expect(data.id).not.be.an('')
    expect(data.songUrl).not.be.an('')
    songid = data.id
    // console.log(data)
  })
})

describe('migu 歌词', () => {
  it('getLyrics', async () => {
    const data = await getLyrics(songid)
    // console.log(data)
    expect(data).length.gte(0)
  })
})
