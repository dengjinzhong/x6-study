
### 使用示例：
```vue
<template>
  <div style="height: 80vh; overflow: hidden">
    <tree-page
      :load-node="loadNode"
    >
      <table-page-demo
        style="padding: 0; background-color: #ffffff"
      />
    </tree-page>
  </div>
</template>

<script>
import TreePage from 'c/Page/TreePage'
import TablePageDemo from '@/views/demo/Page/TablePageDemo'
export default {
  name: 'TreePageDemo',
  components: {
    TreePage, TablePageDemo
  },
  data() {
    return {}
  },
  methods: {
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: 'region' }])
      }
      if (node.level > 1) return resolve([])

      setTimeout(() => {
        const data = [{
          name: 'leaf',
          leaf: true
        }, {
          name: 'zone'
        }]

        resolve(data)
      }, 500)
    }
  }
}
</script>

<style scoped>

</style>

```
