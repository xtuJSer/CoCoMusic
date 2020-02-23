import { expect } from 'chai'
import { getSingerList, getSingerMusicList, getSingerAlbumList } from '../../../src/api/singer'

describe('歌手列表', function () {
  it('singerList', async function () {
    const data = await getSingerList()
    expect(data.singerlist).to.have.length.least(80)
  })
})
describe('歌手歌曲列表', function () {
  it('getSingerMusicList', async function () {
    const data = await getSingerMusicList('001fNHEf1SFEFN')
    expect(data.singerMid).to.equal('001fNHEf1SFEFN')
    expect(data.songList).to.have.length.above(1)
  })
})
describe('歌手专辑列表', function () {
  it('getSingerAlbumList', async function () {
    const data = await getSingerAlbumList('001fNHEf1SFEFN')
    expect(data.singerMid).to.equal('001fNHEf1SFEFN')
    expect(data.albumList).to.have.length.above(1)
  })
})
