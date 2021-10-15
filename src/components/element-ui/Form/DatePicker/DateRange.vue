<template>
  <div>
    <date-picker
      v-model="modelValue[0]"
      v-bind="$attrs"
      @value:change="valueChange"
    />
    <span class="range">~</span>
    <date-picker
      v-model="modelValue[1]"
      v-bind="$attrs"
      @value:change="valueChange"
    />
  </div>
</template>

<script>
import DatePicker from './index'

export default {
  name: 'DateRange',
  components: {
    DatePicker
  },
  model: {
    prop: 'modelValue',
    event: 'value:change'
  },
  props: {
    modelValue: {
      type: Array,
      default() {
        return [null, null]
      }
    }
  },
  methods: {
    valueChange(modelValue) {
      this.$emit('formChange', modelValue)
    }
  }
}
</script>

<style lang="scss" scoped>
.range{
  padding: 0 10px;
}
</style>
