const assert = require('assert')
const { getSingerMvList } = require('../../../src/spider/index')

describe('歌手mv列表', function () {
  it('SingerMvList', async function () {
    let data = await getSingerMvList({
      singerMid: '004PT6gg3cLvxv',
      page: 0
    })
    // console.log(data.mvList)
    assert.strictEqual(data.mvList.length >= 35, true)
  })
})
