export default function (table) {
  return {
    methods: {
      favorite () {
        this.$store.dispatch('addFavorite', {
          table,
          data: this[table]
        })
      },
      deleteFavorite () {
        this.$store.dispatch('deleteFavorite', {
          table,
          id: this[table][`${table}Mid`]
        })
      }
    },
    computed: {
      isfocus () {
        return this.$store.state.Favorite[table].some(obj => {
          return obj[`${table}Mid`] === this[table][`${table}Mid`]
        })
      }
    }
  }
}
