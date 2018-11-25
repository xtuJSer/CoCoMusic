const assert = require('assert')
const { getPlayListInfo } = require('../../../src/spider/index')

describe('歌曲搜索', function () {
  it('getPlayListInfo', async function () {
    let data = await getPlayListInfo('4190874314')
    assert.strictEqual(data.list.length > 0, true)
  })
})
