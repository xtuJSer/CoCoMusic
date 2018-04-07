export function generateRouterMixins ({watchName, sourceId, methodsName, methodsParams, initData}) {
  return {
    watch: {
      [watchName] (value) {
        if (!value) return
        if (this[sourceId] === value) return
        this.$common.objectCopy(initData, this)
        this[methodsName](...methodsParams)
        this[sourceId] = value
      }
    }
  }
}
