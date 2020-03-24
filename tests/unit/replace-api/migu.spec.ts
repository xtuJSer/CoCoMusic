import { expect } from 'chai'
import { search, getLyrics } from '../../../src/api/replace/migu'

let songid: string

describe('migu 音源替换', function () {
  it('searchMusic', function (done) {
    Promise.all([
      search('Lullaby (Live)', ['Jack Johnson', 'Matt Costa']),
      search('You', ['千坂', 'N2V']),
      search('圣诞结', ['陈奕迅'])
    ]).then((data) => {
      expect(data[0].id).length.gt(0)
      expect(data[0].songUrl).length.gt(0)
      expect(data[1].id).length.lte(0)
      expect(data[1].songUrl).length.lte(0)
      expect(data[2].id).length.gt(0)
      expect(data[2].songUrl).length.gt(0)
      // console.log(data[2])
      done()
    }).catch((e) => {
      console.log(e)
      done()
    })
  })
  describe('migu 歌词', function () {
    it('getLyrics', async function () {
      const results = await Promise.all([
        getLyrics('69910433343'),
        getLyrics('')
      ])
      expect(results[0]).length.gt(1)
      expect(results[1]).length.lte(0)
    })
  })
})
