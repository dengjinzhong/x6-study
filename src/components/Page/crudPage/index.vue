<!--增删改查-->
<template>
  <div class="table-page">
    <al-table-page
      v-bind="tableConfig"
      :table-data="tableData"
      @buttonClick="buttonClick"
    />
  </div>
</template>

<script>
export default {
  name: 'CRUDPage',
  props: {
    tableConfig: {
      required: true,
      type: Object
    },
    tableData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    readList() {},
    buttonClick(prop) {
      switch (prop) {
        case 'create':
          break
        case 'delete':
          break
        case 'recall':
          break
        case 'release':
          break
        case 'refresh':
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.table-page{
  height: 100%;
}
</style>
