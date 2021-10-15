<template>
  <div class="item-click" :class="!isClick? 'not-click':''">
    <al-symbol-icon v-if="tableColumnIcon" class="item-icon" :style="tableColumnIconStyle" :icon="tableColumnIcon" :icon-name="tableItemConfig.iconName" />
    <a v-if="isClick" ref="itemClick" :style="itemStyle" @click="buttonClick">
      <span v-if="isHtml" v-html="tableColumnValue" />
      <span v-else>{{ tableColumnValue | rowFilter(tableColumnValue,tableRow, bindConfig) }}</span>
    </a>
    <span v-else>{{ tableColumnValue }}</span>
  </div>
</template>

<script>
import { tablePropsMixin } from 'e/Table/tableMixins'
import _ from 'lodash'

export default {
  name: 'TableItemClick',
  filters: {
    rowFilter(value, row, { formatter, emptyValue = '--' }) {
      // 如果定义了格式化函数，返回格式化内容
      if (formatter && _.isFunction(formatter)) {
        return formatter(row)
      } else if (_.isNil(value) || value === '') {
        return emptyValue
      }
      return value
    }
  },
  mixins: [tablePropsMixin],
  inheritAttrs: false,
  props: {
    bindConfig: {
      type: Object,
      default: () => {
        return {
          iconProp: 'icon',
          iconName: 'aisino-',
          defaultIcon: ''
        }
      }
    }
  },
  computed: {
    tableItemConfig() {
      return {
        iconProp: 'icon',
        iconName: 'aisino-',
        defaultIcon: '',
        ...this.bindConfig
      }
    },
    tableColumnIcon() {
      const { iconProp, defaultIcon } = this.tableItemConfig
      if (_.isFunction(defaultIcon)) {
        return defaultIcon(this.tableRow)
      } else {
        return this.tableRow[iconProp] || defaultIcon
      }
    },
    tableColumnIconStyle() {
      const { iconStyle } = this.tableItemConfig
      if (_.isFunction(iconStyle)) {
        return iconStyle(this.tableRow)
      } else {
        return iconStyle || ''
      }
    },
    itemStyle() {
      const { itemStyle } = this.tableItemConfig
      if (_.isFunction(itemStyle)) {
        return itemStyle(this.tableRow)
      } else {
        return itemStyle || ''
      }
    },
    isClick() {
      const { formatter, isItem } = this.tableItemConfig
      if (_.isBoolean(formatter)) return formatter
      else if (_.isFunction(formatter)) return formatter(isItem ? this.tableColumnValue : this.tableRow)
      else return true
    },
    isHtml() {
      const { isHtml } = this.bindConfig
      return isHtml || false
    }
  },
  methods: {
    buttonClick() {
      this.$emit('tableEvent', 'tableItemClick', this.prop, this.scope)
    }
  }
}
</script>

<style lang="scss" scoped>
  .item-click{
    color: #007BEA;
    cursor: pointer;
    &.not-click {
      color: #606266;
      cursor: default;
    }
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    .item-icon{
      margin-right: 6px;
    }

  }
</style>
