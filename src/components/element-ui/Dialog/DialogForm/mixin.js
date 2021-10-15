import DialogForm from './index'
export default {
  components: {
    DialogForm
  },
  data() {
    return {
      dialogVisible: false,
      saveApi: () => {}
    }
  },
  methods: {
    showDialog() {
      this.dialogVisible = true
    },
    closeDialog() {
      this.dialogVisible = false
    },
    confirm() {
      const data = this.formatterData()
      this.saveApi(data).then(data => {
        this.$emit('saveSuccess', data)
        this.closeDialog()
      }).catch(error => {
        console.error(error)
      })
    },
    formatterData() {
      if (this.formData && this.formData.getForm) {
        return this.formData.getForm()
      } else {
        return this.formData
      }
    }
  }
}
