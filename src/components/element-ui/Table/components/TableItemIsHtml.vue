<template>
  <div class="item-is-html">
    <span v-if="isHtml" v-html="tableColumnValue" />
    <span v-else>{{ tableColumnValue }}</span>
  </div>
</template>
<script>
import { tablePropsMixin } from '../tableMixins'
export default {
  name: 'TableItemIsHtml',
  components: {},
  mixins: [tablePropsMixin],
  inheritAttrs: false,
  props: {
    bindConfig: {
      type: Object,
      default: () => {
        return {
          isHtml: false
        }
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    isHtml() {
      const { isHtml } = this.bindConfig
      return isHtml || false
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>

</style>
