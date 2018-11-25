const assert = require('assert')
const { getCategory } = require('../../../src/spider/index')

describe('专辑', function () {
  it('getCategory', async function () {
    let data = await getCategory()
    assert.strictEqual(data.length, 6)
  })
})
