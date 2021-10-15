<template>
  <el-steps class="al-steps" :active="vModelValue" finish-status="success">
    <el-step
      v-for="item in stepList"
      :key="item.value"
      :title="item.title"
    />
  </el-steps>
</template>

<script>
import { Steps as ElSteps, Step as ElStep } from 'element-ui'
import { vModelMixin } from '@/mixins'

export default {
  name: 'Steps',
  components: {
    ElSteps, ElStep
  },
  mixins: [vModelMixin],
  props: {
    stepList: {
      type: Array,
      default: () => {}
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.al-steps{
  margin-top: 10px;
  ::v-deep .el-step{
    .el-step__line {
      top: 20px;
      left: 8px;
      height: 4px;
    }
    .is-success {
      .el-step__line {
        background-color: #7FCE7C;
      }
    }
    .el-step__main {
      .el-step__title {
        font-weight: normal;
        &.is-success {
          color: #7FCE7C;
        }
        &.is-process {

        }
        &.is-wait {
          color: #B2B2B2;
        }
      }
    }
    .el-step__icon {
      width: 44px;
      height: 44px;
      line-height: 44px;
      border: none;
      background-color: rgba(127,206,124,0.36);
      .el-step__icon-inner{
        color: #7FCE7C;
        width: 28px;
        height: 28px;
        line-height: 28px;
        background-color: #7FCE7C;
        border-radius: 50%;
        &:before {
          color:#fff;
          font-size: 15px;
          font-weight: 700;
        }
      }
    }

  }
}
</style>
