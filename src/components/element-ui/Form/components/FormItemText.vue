<template>
  <div class="label" :style="{ color }">{{ vModelValue }}</div>
</template>

<script>
import { vModelMixin } from '@/mixins'
export default {
  name: 'FormItemText',
  mixins: [vModelMixin],
  inheritAttrs: false,
  props: {
    color: {
      type: String,
      default: '#8a8a8a'
    }
  }
}
</script>
