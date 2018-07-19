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
      isfocus (mid) {
        return this.$store.state.Favorite[table].some(obj => {
          return obj[`${table}Mid`] === (mid || this[table][`${table}Mid`])
        })
      }
    }
  }
}
