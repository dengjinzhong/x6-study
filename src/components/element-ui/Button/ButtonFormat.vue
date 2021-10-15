<template>
  <div class="button-list">
    <template
      v-for="item in bindConfig.buttonList"
    >
      <al-button
        v-if="buttonFormat(item, scope)"
        :key="item.prop"
        type="text"
        size="mini"
        v-bind="item"
        @click="$emit('tableEvent', item.prop, scope)"
      >{{ item.label }}</al-button>
    </template>

  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'ButtonFormat',
  props: {
    bindConfig: {
      type: Object,
      default() {
        return {
          buttonList: []
        }
      }
    },
    scope: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  methods: {
    buttonFormat(item, scope) {
      if (_.isFunction(item.format)) {
        return item.format(scope.row, scope)
      } else return true
    }
  }
}
</script>

<style lang="scss" scoped>
.button-list .button-item:not(:first-child){
  margin-left: 10px;
}
</style>
