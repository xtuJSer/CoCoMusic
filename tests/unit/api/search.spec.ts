import { expect } from 'chai'
import { search, searchPlayList } from '../../../src/api/search'

describe('搜索歌曲', function () {
  it('searchMusic', async function () {
    const data = await search('song', '初音未来')
    expect(data.song.list).to.have.length.above(1)
    expect((data.zhida.zhida_singer || {}).singerName).to.be.equal('初音未来')
  })
})
describe('搜索Mv', function () {
  it('searchMv', async function () {
    const data = await search('mv', '初音未来')
    expect(data.mv.list).to.have.length.above(1)
  })
})
describe('搜索专辑', function () {
  it('searchAlbum', async function () {
    const data = await search('album', '初音未来')
    expect(data.album.list).to.have.length.above(1)
  })
})
describe('搜索歌单', function () {
  it('searchPlayList', async function () {
    const data = await searchPlayList('初音未来')
    expect(data.list).to.have.length.above(1)
  })
})
