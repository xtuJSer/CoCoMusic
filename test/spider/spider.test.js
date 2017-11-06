const assert = require('assert')
const {singerList} = require('../../src/spider/index')

describe('爬虫模块测试', function () {
  this.timeout(0)
  it('singerList', async function () {
    let data = await singerList({
        type: 'all_all',
        name: 'all',
        page: 1
      })
    assert.strictEqual(data.data.list.length, 100)
  })
})