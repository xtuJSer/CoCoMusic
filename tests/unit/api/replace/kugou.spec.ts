import { expect } from 'chai'
import { search, getLyrics } from '../../../../src/api/repalce/kugou'

let songid: string

describe('kugou 音源替换', function () {
  it('searchMusic', async function () {
    const data = await search('十年', '陈奕迅')
    expect(data.id).not.equal('')
    expect(data.songUrl).not.equal('')
    songid = data.id
    // console.log(data)
  })
})

describe('kugou 歌词', function () {
  it('getLyrics', async function () {
    const data = await getLyrics(songid)
    expect(data).length.gt(0)
    // console.log(data)
  })
})
