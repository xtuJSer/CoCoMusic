const assert = require('assert')
const { getAlbum } = require('../../../src/spider/index')

describe('专辑', function () {
  it('getAlbum', async function () {
    let data = await getAlbum({
      albumMid: '003QQ1JV4RZRX0'
    })
    assert.strictEqual(data.musicList.length, 14)
  })
})
