<template>
  <div class="tree" :class="{ 'select-tree': isSelect }">
    <div v-if="isSearch" class="tree-search">
      <el-input v-model="filterText" clearable size="mini" placeholder="输入关键字进行过滤" />
    </div>
    <el-tree
      ref="tree"
      class="tree-node"
      :data="data"
      :load="loadNode"
      :props="defaultProps"
      :lazy="lazy"
      node-key="id"
      :show-checkbox="showCheckbox"
      :check-strictly="checkStrictly"
      :expand-on-click-node="expandOnClickNode"
      :filter-node-method="filterNode"
      highlight-current
      v-bind="$attrs"
      @node-click="handleNodeClick"
      @check-change="handleCheckChange"
      @check="handleCheck"
    >
      <div slot-scope="{ node, data }">
        <al-symbol-icon
          v-if="iconType === 'symbol-icon'"
          :icon="data.icon || iconConfig.defaultIcon"
          :icon-name="iconConfig.iconName"
        />
        <i v-if="iconType === 'element-icon'" :class="data.icon" />
        <span>{{ node.label }}</span>
      </div>
    </el-tree>
  </div>
</template>

<script>
import { Tree as ElTree } from 'element-ui'
export default {
  name: 'NewTree',
  components: { ElTree },
  props: {
    loadNode: Function,
    data: Array,
    lazy: {
      type: Boolean,
      default: true
    },
    defaultProps: {
      type: Object,
      default() {
        return {
          children: 'children',
          label: 'label',
          disabled: 'disabled'
        }
      }
    },
    /**
     * 是否显示搜索框
     */
    isSearch: {
      type: Boolean,
      default: true
    },
    /**
     * 是否为下拉选择树
     */
    isSelect: {
      type: Boolean,
      default: false
    },
    /**
     * 是否显示选择框
     */
    showCheckbox: {
      type: Boolean,
      default: false
    },
    /**
     * 是否点击主体内容展开下层
     */
    expandOnClickNode: {
      type: Boolean,
      default: false
    },
    /**
     * 父节点选择是否与子节点联动
     */
    checkStrictly: {
      type: Boolean,
      default: true
    },
    /**
     * 图标类型
     * symbol-icon
     * element-icon
     */
    iconType: {
      type: String,
      default: ''
    },
    /**
     * 图标配置
     * 默认图标和配置
     */
    iconConfig: {
      type: Object,
      default: () => {
        return {
          iconName: 'aisino-',
          defaultIcon: ''
        }
      }
    },
  },
  data() {
    return {
      filterText: ''
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    // 获取数据中真实对应的值
    getPropsKey(key, data) {
      const defaultProps = this.defaultProps
      const keyValue = defaultProps[key]
      if (keyValue && this.$_.isFunction(keyValue)) {
        return keyValue(data)
      } else {
        return keyValue ? data[keyValue] : data[key]
      }
    },
    // 获取数据缓存
    getNodesMap() {
      return this.$refs.tree.store.nodesMap
    },
    /**
     * 获取当前 id 选择路径 ID
     */
    getParentID(id) {
      const nodesMap = this.getNodesMap()
      const parentId = []
      let node = nodesMap[id]
      while (node.parent) {
        parentId.unshift(node.data.id)
        node = node.parent
      }
      return parentId
    },
    filterNode(value, data) {
      if (!value) return true
      const labelValue = this.getPropsKey('label', data)
      return labelValue.includes(value)
    },
    handleNodeClick(data, Node) {
      const disabledValue = this.getPropsKey('disabled', data)
      if (disabledValue) {
        Node.expand()
      } else {
        this.$emit('handleNodeClick', data)
      }
    },
    handleCheckChange(node, status) {
      this.$emit('handleCheckChange', { node: node, status: status })
    },
    handleCheck(data) {
      this.$emit('handleCheck', data)
    },
    /**
     * 展开树结构
     * @param keyList {Array} 依次展开的树节点 id
     * @param callback
     */
    expandNodes(keyList, callback) {
      const tree = this.$refs.tree
      function expandNode(list) {
        const id = list.shift()
        if (id) {
          const node = tree.getNode(id)
          if (node) {
            node.expand(() => {
              expandNode(list)
            })
          }
        } else {
          if (callback) callback()
        }
      }
      expandNode([...keyList])
    },
    getNode(id) {
      return this.$refs.tree.getNode(id)
    },
    setCheckedKeys(keys) {
      this.$refs.tree.setCheckedKeys(keys)
    }
  }
}
</script>

<style lang="scss" scoped>
.tree{
  height: 100%;
  background-color: #ffffff;
  .tree-search{
    height: 40px;
    line-height: 40px;
  }
  .tree-node{
    height: calc(100% - 40px);
    overflow: auto;
    // 修复无法横向滚动问题
    ::v-deep>.el-tree-node{
      min-width:100%;
      display: inline-block;
    }
  }
}
.select-tree{
  overflow: hidden;
  .tree-node {
    max-height: 300px;
    overflow-y: scroll;
  }
}
</style>
