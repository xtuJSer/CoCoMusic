import { expect } from 'chai'
import { getVkey, getUrl } from '../../../src/api/song'

describe('获取歌曲key', function () {
  it('getVkey', async function () {
    const data = await getVkey('000KDHyB23K7Eq')
    expect(data.req_0.data.midurlinfo[0].purl).to.be.a('string')
  })
})

describe('歌曲url', function () {
  it('getUrl', async function () {
    const url = await getUrl('000KDHyB23K7Eq')
    expect(url).to.be.a('string')
  })
})
