const initData = {
  loading: false,
  page: 0,
  total: 1,
  singerMidSave: ''
}
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
  watch: {
    '$route.params.singerMid' (value) {
      console.log(value)
      if (!value) return
      if (this.singerMidSave === value) return
      Object.assign(this, initData)
      this.list = []
      this.getTheList(0)
      this.singerMidSave = value
    }
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
    async getTheList (newPage) {
      this.loading = true
      let data
      try {
        data = await this.getList({
          page: newPage, singerMid: this.singerMid
        })
        this.page = newPage
      } catch (e) {
        console.error(e)
      }
      this.loading = false
      this.total = data.total
      this.list.push(...data.list)
    }
  },
  created () {
    this.getTheList(0)
    this.singerMidSave = this.singerMid
  }
}
