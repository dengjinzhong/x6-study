<template>
  <el-popover
    v-model="popoverShow"
    placement="bottom"
    width="240"
    trigger="click"
  >
    <new-tree
      ref="selectTree"
      is-select
      show-checkbox
      :default-props="defaultProps"
      :data="data"
      :lazy="lazy"
      :load-node="lazy ? treeLoadNode : undefined"
      @handleCheck="handleCheck"
      @handleNodeClick="handleNodeClick"
    />
    <div slot="reference" class="popover-input">
      <el-input placeholder="请选择" :value="inputValue" size="mini" readonly />
      <i class="el-icon-arrow-down input-icon" :class="{ 'input-focus': popoverShow }" />
    </div>
  </el-popover>
</template>

<script>
import { Popover as ElPopover, Input as ElInput } from 'element-ui'
import newTree from 'e/Tree/newTree'
import { vModelMixin } from '@/mixins'
export default {
  name: 'SelectTree',
  components: {
    ElPopover, ElInput, newTree
  },
  mixins: [
    vModelMixin
  ],
  props: {
    /**
     * 懒加载数据传输
     */
    loadNode: Function,
    /**
     * 树形结构数据
     */
    data: {
      type: Array,
      default() {
        return []
      }
    },
    /**
     * 是否开启懒加载
     */
    lazy: {
      type: Boolean,
      default: true
    },
    /**
     * 数据属性名配置
     */
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
     * 单选还是多选
     */
    isRadio: {
      type: Boolean,
      default: true
    },
    /**
     * 单选是否可以清空
     */
    isRadioClear: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      popoverShow: false,
      isModelChang: false,
      isStartOpen: true,
      inputValue: '', // 输入框回显内容
    }
  },
  watch: {
    modelValue(val) {
      if (!this.isModelChang) {
        this.expandCheckNodes(val)
      }
      this.isModelChang = false
    },
  },
  mounted() {
    if (!this.lazy) {
      this.treeWriteBack()
    }
  },
  methods: {
    treeLoadNode(node, resolve) {
      // 单选懒加载数据支持数据回显
      if (this.isRadio && this.loadNode) {
        this.loadNode(node, list => {
          this.treeWriteBack()
          resolve(list)
        })
      } else {
        this.loadNode(node, list => {
          this.treeWriteBack()
          resolve(list)
        })
      }
    },
    // 数据回写
    treeWriteBack() {
      if (this.isStartOpen && this.$_.isArray(this.modelValue) && this.modelValue.length > 0) {
        this.expandCheckNodes(this.modelValue)
        this.isStartOpen = false
      } else {
        return false
      }
    },
    handleCheck(data) {
      if (this.isRadio) {
        this.selectTreeRadio(data)
      } else {
        this.$emit('handleCheckChange', data, status)
      }
    },
    handleNodeClick(data) {
      if (this.isRadio) {
        this.selectTreeRadio(data)
      } else {
        // this.$emit('handleCheckChange', data, status)
      }
    },
    /**
     * 单选逻辑
     */
    selectTreeRadio(data) {
      const { id } = data
      let checkValue = null
      if (this.vModelValue === id) {
        if (this.isRadioClear) {
          this.setCheckedKeys([])
          this.inputValue = ''
          this.modelChange([])
        } else {
          this.setCheckedKeys([id])
          return false
        }
      } else {
        checkValue = data
        this.inputValue = data.label
        this.setCheckedKeys([id])
        const parentIds = this.$refs.selectTree.getParentID(id)
        this.modelChange(parentIds)
      }
      this.popoverShow = false
      this.isModelChang = true
      /**
       * 单选值发生变动事件
       *
       * @event handleCheckChange
       * @param checkValue {Object} 当前选中节点 data
       */
      this.$emit('handleCheckChange', checkValue)
      this.$emit('formItemEvent', { event: 'handleCheckChange', data: checkValue })
    },
    /**
     * 设置树组件选中元素
     * @param keys {Array} 需要选中元素的id
     * @public
     */
    setCheckedKeys(keys) {
      this.$refs.selectTree.setCheckedKeys(keys)
      this.setInputValue(keys)
    },
    /**
     * 设置选择框文本内容
     * @param keys {Array} 当前数据ID
     * @public
     */
    setInputValue(keys) {
      const key = keys[0]
      const length = keys.length
      let { label = '' } = this.$refs.selectTree.getNode(key)
      if (length > 1) {
        label += '+' + length
      }
      this.inputValue = label
    },
    /**
     * 依次展开元素
     * @param keys
     * @param callback
     * @public
     */
    expandNodes(keys, callback) {
      this.$refs.selectTree.expandNodes(keys, callback)
    },
    /**
     * 依次展开元素并选择元素
     * @param keys {Array} 需要展开的数据
     * @public
     */
    expandCheckNodes(keys) {
      this.$nextTick(() => {
        const checkId = this.$_.last(keys)
        this.$refs.selectTree.expandNodes(keys, () => {
          this.setCheckedKeys([checkId])
        })
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.popover-input{
  position: relative;
  display: inline-block;
  .input-icon{
    position: absolute;
    top: 6px;
    right: 6px;
    color: #C0C4CC;
    transition: transform .3s;
  }
  .input-focus{
    transform: rotate(-180deg)
  }
}
</style>
