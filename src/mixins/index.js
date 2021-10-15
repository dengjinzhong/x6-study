const vModelMixin = {
  model: {
    prop: 'modelValue',
    event: 'value:change'
  },
  props: {
    modelValue: {
      default: null
    },
    prop: {
      type: String,
      default: ''
    }
  },
  computed: {
    vModelValue: {
      get() {
        return this.modelValue
      },
      set(val) {
        this.modelChange(val)
      }
    }
  },
  methods: {
    modelChange(val) {
      this.$emit('value:change', val)
      this.$emit('formChange', val)
    }
  }
}

const deleteConfirmMixin = {
  methods: {
    // 是否有选中
    isDeleteSelect(length, text) {
      const message = text || '请选择需要删除的数据'
      if (length === 0) {
        this.$message.info(message)
        return false
      } else {
        return true
      }
    },
    deleteConfirm(msg, length) {
      const message = msg || `确定要删除选中的${length}条数据吗？`
      return new Promise((resolve, reject) => {
        this.$confirm(message, '提示', {
          confirmButtonClass: 'el-button--info',
          confirmButtonText: '取消',
          cancelButtonClass: 'el-button--primary',
          cancelButtonText: '确定',
          closeOnClickModal: false,
          closeOnPressEscape: false,
          distinguishCancelAndClose: true,
          type: 'warning',
          callback: action => {
            if (action === 'cancel') {
              resolve(true) // 确认
            } else {
              resolve(false) // 取消
            }
          }
        })
      })
    },
  }
}

const exportConfirmMixin = {
  methods: {
    // 是否有选中
    isExportSelect(length, text) {
      const message = text || '请选择需要导出的数据'
      if (length === 0) {
        this.$message.info(message)
        return false
      } else {
        return true
      }
    },
    exportConfirm(msg, length) {
      const message = msg || `确定要导出选中的${length}条数据吗？`
      return new Promise((resolve, reject) => {
        this.$confirm(message, '提示', {
          confirmButtonClass: 'el-button--info',
          confirmButtonText: '取消',
          cancelButtonClass: 'el-button--primary',
          cancelButtonText: '确定',
          closeOnClickModal: false,
          closeOnPressEscape: false,
          distinguishCancelAndClose: true,
          type: 'warning',
          callback: action => {
            if (action === 'cancel') {
              resolve(true) // 确认
            } else {
              resolve(false) // 取消
            }
          }
        })
      })
    },
  }
}

const selectTableMixin = {
  data() {
    return {
      selectTableList: []
    }
  },
  computed: {
    selectTableLength() {
      return this.selectTableList.length
    }
  },
  methods: {
    handleSelectionChange(val) {
      console.log(val)
      this.selectTableList = val
    },
  }
}

const dialogMixin = {
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    showDialog(callback) {
      callback && callback()
      this.dialogVisible = true
    },
    closeDialog(callback) {
      callback && callback()
      this.dialogVisible = false
    },
  }
}

const tablePageMixin = {
  data() {
    return {
      pageData: {
        pageSize: 20,
        pageNum: 1,
        total: 0
      }
    }
  },
  methods: {
    getPageTableList() {
      console.error('请先配置表格请求API')
    },
    handleSizeChange(val) {
      this.pageData.pageSize = val
      this.pageData.pageNum = 1
      this.getPageTableList()
    },
    handleCurrentChange(val) {
      this.pageData.pageNum = val
      this.getPageTableList()
    },
  }
}

export {
  vModelMixin, // v-model
  deleteConfirmMixin, // 删除确认
  selectTableMixin, // 表格选择
  dialogMixin, // 弹窗组件
  tablePageMixin, // 弹窗组件
  exportConfirmMixin, // 导出确认
}
