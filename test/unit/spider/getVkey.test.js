const assert = require('assert')
const { getKey } = require('../../../src/spider/index')

describe('专辑', function () {
  it('getKey', async function () {
    let data = await getKey('6363346267')
    assert.strictEqual(data.length > 0, true)
  })
})
