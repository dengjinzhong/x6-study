<template>
  <span ref="child">
    <input
      ref="inputFile"
      class="input-file"
      type="file"
      :accept="accept"
      @change="exportData"
    >
    <al-input v-model="ExcelName" :size="size" placeholder="" :disabled="true">
      <el-button slot="append" type="primary" :size="size" @click="btnClick">浏览</el-button>
    </al-input>
    <el-button v-if="isUpdate" class="update-button" :disabled="fileDisabled" :size="size" type="primary" @click="buttonClick">{{ buttonText }}</el-button>
  </span>
</template>

<script>
import { vModelMixin } from '@/mixins'
import AlInput from 'e/Form/Input'

export default {
  components: {
    AlInput
  },
  mixins: [vModelMixin],
  props: {
    accept: {
      type: String,
      default: '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
    },
    isUpdate: {
      type: String,
      default: ''
    },
    buttonText: {
      type: String,
      default: '上传'
    },
    size: {
      type: String,
      default: 'mini'
    }
  },
  data() {
    return {
      ExcelName: ''
    }
  },
  computed: {
    fileDisabled() {
      return typeof this.vModelValue === 'string'
    }
  },
  watch: {
    vModelValue(val) {
      if (!val) this.ExcelName = ''
      else if (typeof val === 'string') {
        this.ExcelName = val
      }
    }
  },
  methods: {
    btnClick() {
      this.$refs.inputFile.click()
    },
    clearInput() {
      this.$refs.inputFile.value = ''
      this.ExcelName = ''
      this.vModelValue = null
    },
    buttonClick() {
      this.$emit('buttonClick', this.isUpdate, this.vModelValue)
    },
    exportData(event) {
      if (!event || !event.currentTarget.files.length) {
        // this.$message.error('请选择导入文件')
        this.ExcelName = ''
        this.vModelValue = null
        return false
      } else {
        this.ExcelName = event.currentTarget.files['0'].name
        // 拿取文件对象
        const f = event.currentTarget.files[0]
        this.vModelValue = f
        this.$refs.inputFile.type = 'text'
        this.$refs.inputFile.type = 'file'
      }
    }
  }
}
</script>

<style scoped>
  .input-file {
    height: 28px;
    display: none;
  }
  .update-button{
    height: 28px;
  }
</style>
