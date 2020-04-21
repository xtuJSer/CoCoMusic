import { expect } from 'chai'
import { getPlayList, getPlayListInfo } from '@/api/playlist'

describe('歌单列表', function () {
  it('PlayList', async function () {
    const data = await getPlayList(165) // 国语
    expect(data.list).to.have.length.above(1)
  })
})
describe('歌单信息', function () {
  it('PlayListInfo', async function () {
    const data = await getPlayListInfo('7099581376') // https://y.qq.com/n/yqq/playlist/7099581376.html#stat=y_new.playlist.dissname
    expect(data.cdlist[0].songlist).to.have.length.above(1)
  })
})
