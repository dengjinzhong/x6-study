<template>
  <el-container class="page-container">
    <el-aside class="page-aside">
      <a-tree
        ref="alTree"
        v-loading="treeLoading"
        :tree-data="treeData"
        :load-node="loadNode"
        :is-lazy="isLazy"
        :default-props="defaultProps"
        :default-expand-all="defaultExpandAll"
        :default-expand-keys="defaultTreeId"
        :default-check-keys="defaultTreeId"
        :expand-on-click-node="expandOnClickNode"
        v-on="$listeners"
      />
    </el-aside>
    <el-main class="page-main">
      <slot />
    </el-main>
  </el-container>
</template>

<script>
import { Container as ElContainer, Aside as ElAside, Main as ElMain } from 'element-ui'
import Tree from 'e/Tree'
export default {
  name: 'TreePage',
  components: {
    ATree: Tree, ElContainer, ElAside, ElMain
  },
  props: {
    /**
     * 加载子树数据的方法，仅当 lazy 属性为true 时生效
     */
    loadNode: {
      type: Function,
      required: false,
      default: () => {}
    },
    /**
     * 展示数据
     */
    treeData: {
      type: Array,
      required: false
    },
    /**
     *  是否懒加载子节点
     */
    isLazy: {
      type: Boolean,
      default: true
    },
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    /**
     *  是否正在加载节点
     */
    treeLoading: {
      type: Boolean,
      default: false
    },
    /**
     * 点击树节点是否同时展开收缩树
     */
    expandOnClickNode: {
      type: Boolean,
      required: false
    },
    defaultProps: {
      type: Object,
      default: () => {
        return {
          children: 'children',
          label: 'name',
          isLeaf: function(data) {
            return !data.packageFlag
          }
        }
      }
    },
    treePathData: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {}
  },
  computed: {
    defaultTreeId() {
      return this.treePathData
    }
  },
  methods: {
    getTreeRefs() {
      return this.$refs.alTree.getRefs()
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
