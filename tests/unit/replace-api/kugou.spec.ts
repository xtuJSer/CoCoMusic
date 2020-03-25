import { expect } from 'chai'
import { search, getLyrics } from '../../../src/api/replace/kugou'

describe('kugou 音源替换', function () {
  it('searchMusic', async function () {
    const datas = await Promise.all([
      search('ペンギン・ハイウェイのテーマ', ['阿部海太郎'])
    ])
    for (const data of datas) {
      // console.log(data)
      expect(data.id).length.gt(0)
      expect(data.songUrl).length.gt(0)
    }
  })
})

describe('kugou 歌词', function () {
  it('getLyrics', async function () {
    const datas = await Promise.all([
      getLyrics('d2711ca4a50ed0c9769e9b986d0338ef'),
      getLyrics('')
    ])
    // for (const data of datas) {
    //   console.log(data)
    // }
    expect(datas[0]).length.gt(0)
    expect(datas[1]).length.lte(0)
  })
})
