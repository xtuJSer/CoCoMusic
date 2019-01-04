export default {
  data () {
    return {
      loading: false,
      page: 0,
      list: [],
      total: 1,
      singerMidSave: ''
    }
  },
  activated () {
    this.init()
  },
  beforeRouteUpdate (to, from, next) {
    next()
    this.init()
  },
  computed: {
    singerMid () {
      return this.$route.params.singerMid
    },
    isEnd () {
      return this.total <= this.page
    }
  },
  methods: {
    init () {
      if (this.singerMidSave === this.singerMid) return
      Object.assign(this, this.$options.data())
      this.getTheList(0)
      this.singerMidSave = this.singerMid
    },
    async getTheList (newPage) {
      this.loading = true
      try {
        let data = await this.getList({
          page: newPage, singerMid: this.singerMid
        })
        this.page = newPage
        this.total = data.total
        this.list = this.list.concat(data.list)
      } catch (error) {
        if (error.message === 'cancel') {
          throw error
        }
        console.error(error)
      }
      this.loading = false
    }
  }
}
