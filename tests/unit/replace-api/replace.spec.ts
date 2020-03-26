import { expect } from 'chai'
import { search } from '../../../src/api/replace'

describe('音源替换', function () {
  it('replace music', async function () {
    let url = await search('ペンギン・ハイウェイのテーマ', ['阿部海太郎'])
    console.log(url)
    url = await search('Greenery Rain', ['柏大輔'])
    console.log(url)
    url = await search('给自己的情书', ['王菲'])
    console.log(url)
  })
})
