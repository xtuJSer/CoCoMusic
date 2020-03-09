import { expect } from 'chai'
import { searchMusic } from '../../../src/api/search'

describe('搜索歌曲', function () {
  it('searchMusic', async function () {
    const data = await searchMusic('初音未来')
    expect((data.zhida.zhida_singer || {}).singerName).to.be.equal('初音未来 (初音ミク)')
  })
})
