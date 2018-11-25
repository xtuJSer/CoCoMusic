const assert = require('assert')
const { getSingerInfo } = require('../../../src/spider/index')

describe('歌手信息', function () {
  it('singerInfo', async function () {
    let data = await getSingerInfo({
      singerMid: '004PT6gg3cLvxv'
    })
    assert.strictEqual(data.data[0].info[0].basic[0].item[0].value[0], '鹿乃') // 华语歌手一定是超过100个的
  })
})
