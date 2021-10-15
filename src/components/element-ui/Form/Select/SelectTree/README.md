## 使用示例
使用过程中所有数据必须含有 ID

**必须有ID** **必须有ID** **必须有ID**
```vue
<template>
  <div class="page-table-wrapper">
    <div class="page-table-container">
      <h2 style="margin: 20px 0">懒加载数据</h2>
      <select-tree v-model="value1" :load-node="loadNode" :default-props="props1" />
      {{ value1 }}
      <h2 style="margin: 20px 0">树形结构数据</h2>
      <select-tree v-model="value2" :lazy="false" :data="data" />
      {{ value2 }}
      <h2 style="margin: 20px 0">懒加载默认选中， 主动选中</h2>
      <select-tree v-model="value3" :load-node="loadNode" :default-props="props1" />
      {{ value3 }} <el-button type="primary" size="mini" @click="value3 = [1, 3, 5]">切换选中</el-button>
    </div>
  </div>
</template>

<script>
import SelectTree from 'e/Form/Select/SelectTree'
import { Button as ElButton } from 'element-ui'
let index = 0
export default {
  name: 'SelectTreePage',
  components: {
    SelectTree, ElButton
  },
  data() {
    return {
      value1: [],
      value2: [],
      value3: [1, 3, 5],
      props1: {
        children: 'children',
        label: 'name',
        isLeaf: 'leaf',
        disabled: 'disabled'
      },
      data: []
    }
  },
  created() {
    this.getTreeData()
  },
  methods: {
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: 'region', id: index++ }])
      }
      if (node.level > 3) return resolve([])

      setTimeout(() => {
        const data = [{
          name: 'leaf',
          id: index++,
          leaf: true
        }, {
          name: 'one',
          id: index++,
        }, {
          name: 'two',
          id: index++,
          disabled: true
        }]

        resolve(data)
      }, 500)
    },
    getTreeData() {
      setTimeout(() => {
        this.data = [{
          label: '一级 1',
          id: '0',
          children: [{
            label: '二级 1-1',
            id: '1',
            children: [{
              label: '三级 1-1-1',
              id: '2',
            }]
          }]
        }, {
          label: '一级 2',
          id: '3',
          children: [{
            label: '二级 2-1',
            id: '4',
            children: [{
              label: '三级 2-1-1',
              id: '45',
            }]
          }, {
            label: '二级 2-2',
            id: '5',
            children: [{
              label: '三级 2-2-1',
              id: '6',
            }]
          }]
        }, {
          label: '一级 3',
          id: '7',
          children: [{
            label: '二级 3-1',
            id: '8',
            children: [{
              label: '三级 3-1-1',
              id: '9',
            }]
          }, {
            label: '二级 3-2',
            id: '10',
            children: [{
              label: '三级 3-2-1',
              id: '11',
            }]
          }]
        }]
      }, 2000)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

```