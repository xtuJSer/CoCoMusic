import { expect } from 'chai'
import { getVkey, getUrl } from '../../../src/api/song'

describe('get Vkey', function () {
  it('get Vkey', async function () {
    const data = await getVkey('000KDHyB23K7Eq')
    expect(data.req_0.data.midurlinfo[0].purl).to.be.a('string')
  })
})

describe('get Vkey', function () {
  it('getUrl', async function () {
    const url = await getUrl('000KDHyB23K7Eq')
    expect(url).to.be.a('string')
  })
})
