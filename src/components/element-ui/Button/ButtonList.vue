<template>
  <div class="button-list" :style="{ display: inline ? 'inline-block' : 'block' }">
    <template
      v-for="item in buttonList"
    >
      <al-dropdown
        v-if="item.type === 'dropdown'"
        :ref="`dropdown${item.prop}`"
        :key="item.prop"
        class="button-dropdown button-item"
        v-bind="item"
        @handleCommand="handleCommand(item.prop, $event)"
      />
      <component
        :is="item.component"
        v-if="item.component"
        :key="item.prop"
        @buttonClick="$emit('buttonClick', $event)"
      />
      <al-button
        v-if="item.type !== 'dropdown' && !item.isHide"
        :key="item.prop"
        class="button-item"
        :scope="scope"
        v-bind="{ type, size, ...item }"
        @click="$emit('buttonClick', item.prop, scope)"
      >{{ item.label }}</al-button>
    </template>
  </div>
</template>

<script>
import AlButton from './index'
import AlDropdown from '../Dropdown'
export default {
  components: {
    AlButton, AlDropdown
  },
  inheritAttrs: false,
  props: {
    buttonList: {
      type: Array,
      default: () => {
        return []
      }
    },
    scope: {
      type: Object,
      default: () => {
        return {}
      }
    },
    size: {
      type: String,
      default: 'mini'
    },
    type: {
      type: String,
      default: 'primary'
    },
    inline: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleCommand(prop, command) {
      this.$emit('buttonClick', prop, command)
    }
  }
}
</script>

<style lang="scss" scoped>
  .button-list .button-item:not(:first-child){
    margin-left: 10px;
  }
  .button-dropdown{
    height: 28px;
    vertical-align: top;
  }
</style>
