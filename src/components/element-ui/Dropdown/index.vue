<template>
  <el-dropdown :trigger="trigger" :placement="placement" v-bind="$attrs" @command="handleCommand">
    <al-button :icon="icon" type="primary" @click="handleClick">
      {{ labelText }}<i class="el-icon-arrow-down el-icon--right" />
    </al-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="item in options"
        :key="item.prop"
        :command="item"
        :disabled="item.disabled"
        :divided="item.divided"
      >{{ item.label }}</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
import { Dropdown as ElDropdown, DropdownItem as ElDropdownItem } from 'element-ui'
import AlButton from 'e/Button'
export default {
  name: 'Dropdown',
  components: {
    ElDropdown, ElDropdownItem, AlButton
  },
  inheritAttrs: false,
  props: {
    options: {
      type: Array,
      default: () => []
    },
    trigger: {
      type: String,
      default: 'click'
    },
    label: {
      type: String,
      default: '更多菜单'
    },
    icon: {
      type: String,
      default: ''
    },
    placement: {
      type: String,
      default: 'bottom-start'
    }
  },
  data() {
    return {
      labelText: this.label
    }
  },
  methods: {
    handleCommand(command) {
      this.$emit('handleCommand', command)
    },
    handleClick() {
      const length = this.options.length
      if (length === 0) {
        this.$emit('handleCommand', 'no-command')
      } else {
        this.$emit('handleClick', 'command-click')
      }
    },
    setLabel(label) {
      this.labelText = label
    }
  }
}
</script>

<style scoped>

</style>
