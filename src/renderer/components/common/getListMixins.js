// 混入 获取各种列表的逻辑
export function generateGetListMixins ({methodsName, loadingName, pageName, initData, spiderMethod, spiderMethodParams, listDataName, operation = 'overwrite'}) {
  return {
    data () {
      return {
        ...initData,
        [loadingName]: false,
        [pageName]: 0
      }
    },
    methods: {
      async [methodsName] (newPage) {
        this[loadingName] = true
        let params = {}
        Object.keys(spiderMethodParams).forEach(e => (params[e] = this[spiderMethodParams[e]]))
        params.page = newPage
        let data
        try {
          data = await spiderMethod(params)
          this[pageName] = newPage
        } catch (e) {
          console.error(e)
        }
        this[loadingName] = false
        Object.keys(data).forEach(e => (e !== listDataName && (this[e] = data[e])))
        operation === 'append' && this[listDataName].push(...data[listDataName]) // 主要是为了不改变原来数组的引用所以采用 push 追加
        operation === 'overwrite' && (this[listDataName] = data[listDataName])
      }
    }
  }
}
