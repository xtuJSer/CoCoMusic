export default function (table) {
  return {
    methods: {
      favorite (data) {
        this.$store.dispatch('addFavorite', {
          table,
          data: data || this[table]
        })
      },
      deleteFavorite (mid) {
        this.$store.dispatch('deleteFavorite', {
          table,
          id: mid || this[table][`${table}Mid`]
        })
      },
      /**
       * 在视图中使用这个函数会影响性能，考虑把所有的是否关注信息初始化成一个map
       * @param {String} mid
       */
      isfocus (mid) {
        return this.$store.state.Favorite[table].some(obj => {
          return obj[`${table}Mid`] === (mid || this[table][`${table}Mid`])
        })
      }
    }
  }
}
