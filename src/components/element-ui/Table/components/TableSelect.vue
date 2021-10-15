<template>
  <el-select
    :value="vModelValue"
    v-bind="configs"
    :filterable="configs.edits"
    :allow-create="configs.edits"
    @change="modelChange"
    @blur="$emit('blur', $event)"
    @focus="$emit('focus', $event)"
  >
    <el-option
      v-for="item in selectList"
      :key="item.value"
      :disabled="item.disabled"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script>
import { vModelMixin } from '@/mixins'

export default {
  mixins: [vModelMixin],
  props: {
    bindConfig: {
      type: Object,
      default: () => {
        return {
        }
      }
    },
  },
  data() {
    return {
      isEdits: false
    }
  },
  computed: {
    configs() {
      const config = {
        type: this.type,
        size: 'mini',
      }
      return { ...config, ...this.bindConfig }
    },

    selectList() {
      const list = [...this.bindConfig.options]
      return list
    }
  },
}
</script>
