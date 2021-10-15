<!--输入框-搜索树-懒加载-->
<template>
  <el-popover
    v-model="popoverShow"
    placement="bottom"
    width="240"
    trigger="click"
    :disabled="disabled"
  >
    <a-tree
      ref="alTree"
      :load-node="loadNode"
      :tree-data="treeData"
      :tree-size="treeSize"
      :is-lazy="isLazy"
      :is-show-checkbox="isShowCheckbox"
      :is-click-to-check="isClickToCheck"
      :default-expand-keys="defaultExpandKeys"
      :default-check-keys="defaultCheckKeys"
      :element-icon="true"
      :handle-search-self="handleSearchSelf"
      @handleNodeClick="handleNodeClick"
      @checkboxClick="checkboxClick"
      @searchSelfEvent="searchSelfEvent"
    />
    <div slot="reference" class="popover-input">
      <el-input
        v-model="clickLabel"
        size="mini"
        class="tree-input"
        placeholder="请选择"
        :disabled="disabled"
        readonly
      >
        <i slot="suffix" class="el-icon-arrow-down input-icon" :class="{ 'input-focus': popoverShow }" />
      </el-input>
      <al-button v-if="isRefresh" class="test-btn" type="text" @click="refreshNavigation">刷新</al-button>
    </div>
  </el-popover>
</template>

<script>
import { Popover as ElPopover } from 'element-ui'
import { Input as ElInput } from 'element-ui'
import Tree from 'e/Tree'
import AlButton from 'e/Button'
import { vModelMixin } from '@/mixins'
import _ from 'lodash'

export default {
  name: 'InputSearchTree',
  components: { ATree: Tree, ElPopover, ElInput, AlButton },
  mixins: [vModelMixin],
  props: {
    treeSize: {
      type: String,
      default: '',
    },
    /**
     * 是否懒加载
     * 默认 true 为懒加载
     */
    isLazy: {
      type: Boolean,
      default: true,
    },
    /**
     * 是否显示复选框
     */
    isShowCheckbox: {
      type: Boolean,
      default: false,
    },
    /**
     * 是否为单选
     * 默认单选
     */
    radioCheckbox: {
      type: Boolean,
      default: true,
    },
    /**
     * 是否在点击节点的时候选中节点
     * 默认点击不选中复选框
     */
    isClickToCheck: {
      type: Boolean,
      default: false,
    },
    /**
     * 是否需要刷新按钮
     */
    isRefresh: {
      type: Boolean,
      default: false,
    },
    /**
     * 树结构数据 - 懒加载方法
     */
    loadNode: {
      type: Function,
      default: () => {}
    },
    /**
     * 树结构数据 - 全部加载
     */
    allTreeData: {
      type: Function,
      default: () => {}
    },
    /**
     * 获取懒加载id 路径
     */
    getPath: {
      type: Function,
      default: () => {}
    },
    /**
     * 表单总数据
     */
    formData: {
      type: Object,
      default: () => {
        return {
        }
      }
    },
    /**
     * 是否自定义处理搜索事件
     * 默认 false 非自定义
     */
    handleSearchSelf: {
      type: Boolean,
      default: false,
    },
    /**
     * 是否禁用树组件
     */
    disabled: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      popoverShow: false,
      clickLabel: '',
      treeData: [],
      defaultExpandKeys: [], // 默认展开数组
      defaultCheckKeys: [], // 默认选中数组
      checkBoxData: [], // 选中复选框的数据
      clickNodeData: [], // 点击选中的节点
      nodePathList: [], // 节点路径数组
    }
  },
  computed: {
    showSelectId() {
      return this.formData.showSelectId
    }
  },
  watch: {
    /**
     * 联动 - 回显选择节点
     */
    showSelectId(newVal, oldVal) {
      this.getTreePath(newVal)
    }
  },
  created() {
    // 非懒加载 - 设置treeData
    if (!this.isLazy) {
      this.allTreeData(false).then(data => { this.treeData = data })
    }
    this.$nextTick(() => {
      const value = _.isArray(this.vModelValue) ? this.vModelValue[0] : this.vModelValue
      if (value) { // 编辑 - 设置节点回显
        if (this.isLazy) { // 懒加载
          this.getTreePath(value)
        } else { // 非懒加载
          this.setNodeOrKeyCheck(value, true)
          this.hasTargetNode(value)
        }
      }
    })
  },
  methods: {
    // 选中-点击树节点- 默认单选
    handleNodeClick(data) {
      if (!this.isClickToCheck) { // 点击节点不可选中复选框
        if (this.radioCheckbox) { // true 单选
          this.clickLabel = data.label
          this.vModelValue = data.value
          this.popoverShow = false
          this.$emit('formItemEvent', { event: 'inputTreeChange', prop: data, })
        } else { // false 多选
          const index = this.clickNodeData.findIndex(item => item.id === data.id)
          if (index === -1) { // 选中
            this.clickNodeData.push(data)
          } else { // 取消
            this.clickNodeData.splice(index, 1)
          }
          const showData = this.handleCheckNodeData(this.clickNodeData)
          this.clickLabel = showData.label
          this.vModelValue = showData.value
          this.$emit('formItemEvent', { event: 'inputTreeChange', prop: showData, })
        }
      }
    },
    // 获取节点路径
    getTreePath(key) {
      this.getPath(key).then(data => {
        this.nodePathList = data
        this.hasRootNode()
      })
    },
    // 根节点数据是否已生成
    hasRootNode() {
      setTimeout(() => {
        const nodeList = this.$refs.alTree.$refs.tree.root.childNodes
        nodeList.length ? this.autoNodeExpand(this.nodePathList, nodeList) : this.hasRootNode()
      }, 200)
    },
    // 懒加载 - 自动展开节点
    async autoNodeExpand(list, nodeList) {
      const targetId = list.shift()
      const isSplit = targetId.indexOf('&&') === -1 // 包含&&字符要拆分
      let targetNode = null
      if (isSplit) {
        targetNode = nodeList.find(item => item.data.value === targetId)
      } else {
        const temp = targetId.split('&&')[1]
        targetNode = nodeList.find(item => item.data.modelCode === temp)
      }

      // 展开当前节点
      list.length ? targetNode.expand(() => {
        this.autoNodeExpand(list, targetNode.childNodes)
      }) : this.handleNodeClick(targetNode.data)
    },
    // 非懒加载 - 目标节点数据是否已生成
    hasTargetNode(target) {
      setTimeout(() => {
        const node = this.getTreeNode(target)
        node ? this.handleNodeClick(node.data) : this.hasTargetNode(target)
      }, 200)
    },
    //  点击复选框  单选/多选
    checkboxClick(data) {
      const { node, status } = data
      if (status) { // 选中
        if (this.radioCheckbox && this.checkBoxData.length > 0) { // 单选 - 已勾选,则取消之前选择
          this.setNodeOrKeyCheck(this.checkBoxData[0], false)
        }
        this.checkBoxData.push(node)
      } else { // 取消
        const index = this.checkBoxData.findIndex(item => item.id === node.id)
        this.checkBoxData.splice(index, 1)
      }
      const showData = this.handleCheckNodeData(this.checkBoxData)
      this.clickLabel = showData.label
      this.vModelValue = showData.value
      this.$emit('formItemEvent', {
        event: 'checkBoxChange',
        prop: this.checkBoxData,
      })
    },
    //  处理点击-多选-节点数据
    handleCheckNodeData(list) {
      const nameList = []; const valueList = []
      list.forEach(item => {
        nameList.push(item.label)
        valueList.push(item.value)
      })
      const label = nameList.join(',')
      const value = valueList.join(',')
      return { label, value }
    },
    //  通过data/key选中/取消节点
    setNodeOrKeyCheck(value, isCheck) {
      this.$refs.alTree.$refs.tree.setChecked(value, isCheck, false)
    },
    //  通过data/key获取节点node
    getTreeNode(value) {
      return this.$refs.alTree && this.$refs.alTree.$refs.tree.getNode(value)
    },
    // 刷新-按钮
    refreshNavigation() {
      const promise = this.allTreeData(true)
      promise.then(data => { this.treeData = data })
    },
    //   自定义搜索事件
    searchSelfEvent(value) {
      this.$emit('formItemEvent', {
        event: 'searchSelfEvent',
        prop: value,
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.popover-input{
  position: relative;
  display: inline-block;
  .input-icon{
    position: absolute;
    height: 100%;
    line-height: 28px;
    width: 25px;
    font-size: 14px;
    text-align: center;
    right: 0px;
    color: #C0C4CC;
    transition: transform .3s;
  }
  .input-focus{
    transform: rotate(-180deg)
  }
}
</style>
