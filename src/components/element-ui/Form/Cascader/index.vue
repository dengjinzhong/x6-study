<template>
  <el-cascader
    ref="cascader"
    v-model="vModelValue"
    :options="options"
    :props="props"
    :collapse-tags="collapseTags"
    :size="size"
    v-bind="$attrs"
    @change="cascaderChange"
  />
</template>

<script>
import { Cascader as ElCascader } from 'element-ui'
import { vModelMixin } from '@/mixins'

export default {
  name: 'Cascader',
  components: {
    ElCascader
  },
  mixins: [vModelMixin],
  props: {
    prop: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'mini'
    },
    options: {
      type: Array,
      default: () => []
    },
    props: {
      type: Object,
      default: () => ({})
    },
    collapseTags: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    cascaderChange(event) {
      const node = this.$refs.cascader.getCheckedNodes()
      this.$emit('formItemEvent', {
        event: 'cascaderChange',
        prop: this.prop,
        node: node,
        value: event
      })
    }
  }
}
</script>
