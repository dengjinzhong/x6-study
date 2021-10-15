const tablePropsMixin = {
  props: {
    scope: {
      type: Object,
      default: () => ({})
    },
    prop: {
      type: String,
      default: ''
    },
    bindConfig: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    tableRow() {
      return this.scope?.row || {}
    },
    tableColumnValue() {
      return this.tableRow && this.tableRow[this.prop]
    },
    tableColumn() {
      return this.scope?.column
    },
    tableIndex() {
      return this.scope?.$index
    }
  },
  methods: {
    tableEvent(prop) {
      this.$emit('tableEvent', `tableEvent-${prop}`, prop, this.tableRow)
    }
  }
}

export {
  tablePropsMixin
}
