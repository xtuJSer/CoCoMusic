import { expect } from 'chai'
import { search } from '../../../src/api/replace'

describe('音源替换', function () {
  it('replace music', async function () {
    let title = 'ペンギン・ハイウェイのテーマ'
    let singers = ['阿部海太郎']
    let url = await search(title, singers)
    console.log(url)

    title = 'Greenery Rain'
    singers = ['柏大輔']
    url = await search(title, singers)
    console.log(url)
  })
})
