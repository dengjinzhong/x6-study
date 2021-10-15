<template>
  <al-input v-model="tableRow[prop]" />
</template>

<script>
import Input from 'e/Form/Input'
import { tablePropsMixin } from '../tableMixins'

export default {
  name: 'TableInput',
  components: {
    AlInput: Input
  },
  mixins: [tablePropsMixin]
}
</script>

<style scoped>

</style>
