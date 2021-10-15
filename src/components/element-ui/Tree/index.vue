<template>
  <div class="tree" :class="treeSize">
    <div v-if="isSearch" class="tree-search">
      <el-input v-model="filterText" size="mini" placeholder="输入关键字进行过滤" @formItemEvent="searchChangeEvent" />
    </div>
    <el-tree
      ref="tree"
      class="tree-node"
      :props="defaultProps"
      highlight-current
      check-strictly
      :check-on-click-node="isClickToCheck"
      node-key="id"
      :lazy="isLazy"
      :data="treeData"
      :expand-on-click-node="expandOnClickNode"
      :load="loadNode"
      :show-checkbox="isShowCheckbox"
      :filter-node-method="filterNode"
      :default-expand-all="defaultExpandAll"
      :default-expanded-keys="defaultExpandKeys"
      :default-checked-keys="defaultCheckKeys"
      @node-click="handleNodeClick"
      @node-expand="handleNodeExpand"
      @check-change="checkboxClick"
    >
      <span slot-scope="{ node, data }">
        <span :title="node.label">
          <al-symbol-icon
            v-if="!elementIcon"
            class="item-icon"
            :icon="data.icon || data.defaultIcon"
            :icon-name="data.iconName || 'aisino-'"
          />
          <i v-if="elementIcon" class="element-icon" :class="data.icon" />
          {{ node.label }}
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
import { Tree as ElTree } from 'element-ui'
import ElInput from 'e/Form/Input'
export default {
  name: 'Tree',
  components: {
    ElTree, ElInput
  },
  props: {
    loadNode: {
      type: Function,
      required: true
    },
    iconConfig: {
      type: Object,
      default: () => {
        return {
          iconProp: 'icon',
          iconName: 'aisino-',
          defaultIcon: ''
        }
      }
    },
    defaultProps: {
      type: Object,
      default: () => ({
        label: 'label'
      })
    },
    treeSize: {
      type: String,
      default: '',
    },
    isLazy: {
      type: Boolean,
      default: true,
    },
    isSearch: {
      type: Boolean,
      default: true,
    },
    defaultExpandAll: {
      type: Boolean,
      default: false,
    },
    expandOnClickNode: {
      type: Boolean,
      default: false,
    },
    isShowCheckbox: {
      type: Boolean,
      default: false,
    },
    isClickToCheck: {
      type: Boolean,
      default: true,
    },
    treeData: {
      type: Array,
      default: () => [],
    },
    elementIcon: {
      type: Boolean,
      default: false,
    },
    defaultExpandKeys: {
      type: Array,
      default: () => [],
    },
    defaultCheckKeys: {
      type: Array,
      default: () => [],
    },
    /**
     * 是否自定义处理搜索事件
     * 默认 false 非自定义
     */
    handleSearchSelf: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      filterText: '',
    }
  },
  watch: {
    filterText(val) {
      if (!this.handleSearchSelf) {
        this.$refs.tree.filter(val)
      } else {
        return false
      }
    }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data[this.defaultProps.label].indexOf(value) !== -1
    },
    handleNodeClick(data, node, val) {
      if (data.disabled) { return false }
      this.$emit('handleNodeClick', data, node)
    },
    getRefs() {
      return this.$refs.tree
    },
    // 复选框点击
    checkboxClick(node, status, leafStatus) {
      this.$emit('checkboxClick', { node: node, status: status })
    },
    //  节点展开
    handleNodeExpand(data, node, val) {
      this.$emit('handleNodeExpand', data)
    },
    //  搜索栏失去焦点或者回车
    searchChangeEvent(prop) {
      if (!this.handleSearchSelf) {
        return false
      } else {
        const { event, value } = prop
        if (event === 'keyupEnter') {
          this.$emit('searchSelfEvent', value)
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.tree{
  height: 100%;
  background-color: #ffffff;
  .tree-search{
    height: 40px;
    line-height: 40px;
    //max-width: 250px;
  }
  .tree-node{
    height: calc(100% - 40px);
    overflow: auto;
    .element-icon {
      color:#238efe;
      margin-right: 5px;
    }
  }
}

.small-size{
  overflow: hidden;
  .tree-node {
    max-height: 300px;
    overflow-y: scroll;
  }
}
</style>
