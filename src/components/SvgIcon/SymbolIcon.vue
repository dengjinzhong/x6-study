<template>
  <svg class="symbol-icon" aria-hidden="true"> <use :xlink:href="`#${iconName}${icon}`" /> </svg>
</template>

<script>
export default {
  name: 'SymbolIcon',
  props: {
    iconName: {
      type: String,
      default: 'aisino-'
    },
    icon: {
      type: String,
      default: 'xitong'
    }
  }
}
</script>

<style scoped>
.symbol-icon{
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  color: inherit;
}
</style>
