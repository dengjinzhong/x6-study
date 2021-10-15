<template>
  <al-form
    ref="mainSearch"
    class="search-form"
    :form-data="searchForm"
    :form-list="mainSearch"
    :form-config="mainConfig"
    v-on="$listeners"
  >
    <template slot="append">
      <el-form-item class="search-info" :prop="searchInfo ? searchInfo.prop : 'searchButton'">
        <al-input
          v-if="searchInfo"
          v-model="searchForm[searchInfo.prop]"
          class="search-info-input"
          append-icon="el-icon-search"
          v-bind="searchInfo.bindConfig"
          @formItemEvent="formItemEvent"
        >
          <al-popover v-if="attachSearch.length" slot="prepend" :width="popoverNowWidth">
            <div
              class="search-main"
              :style="{ width: `${popoverNowWidth - 20}px` }"
            >
              <al-form
                ref="attachSearch"
                :form-data="searchForm"
                :form-list="attachSearch"
                :form-config="attachConfig"
              />
              <div class="attach-search-button">
                <al-button icon="el-icon-search" @click="searchClick">搜索</al-button>
                <al-button icon="el-icon-refresh" @click="resetForm">重置</al-button>
              </div>
            </div>
            <al-button slot="reference" class="search-info-button reference-button">综合搜索 <i class="el-icon-arrow-down" /></al-button>
          </al-popover>
          <!--          <al-button slot="append" class="search-info-button append-button" icon="el-icon-search" @click="searchClick" />-->
        </al-input>
        <al-button v-else class="search-button" icon="el-icon-search" @click="searchClick">搜索</al-button>
      </el-form-item>
    </template>
  </al-form>
</template>

<script>
import { FormItem as ElFormItem } from 'element-ui'
import AlForm from 'e/Form'
import AlPopover from 'e/Popover'
import AlInput from 'e/Form/Input'
import AlButton from 'e/Button'
export default {
  name: 'SearchForm',
  components: {
    AlForm, AlPopover, AlInput, AlButton, ElFormItem
  },
  inheritAttrs: false,
  props: {
    /**
     * 搜索表单表单对象
     * 搜索所有配置的属性需全部在该对象中赋值，
     * 否则重置时会出现表单选项无法输入问题
     */
    searchForm: {
      type: Object,
      default: () => ({})
    },
    /**
     * 搜索表单外搜索配置内容
     */
    searchList: {
      type: Array,
      default: () => []
    },
    /**
     * 外层搜索最多数量（默认为2）
     * 即搜索数量大于当前值会采用综合展开搜索形式
     * 外层搜索最后一个必须采用输入框
     */
    mainMax: {
      type: Number,
      default: 2
    },
    /**
     * 展开搜索弹出框宽度
     * 如果不指定值， 展开搜索数量小于四个一行展示， width = 420
     * 展开搜索数量大于等于四个两行展示， width = 640
     */
    popoverWidth: {
      type: Number,
      default: 0
    },
    /**
     * 外层搜索表单项配置
     */
    mainConfig: {
      type: Object,
      default: () => ({})
    },
    /**
     * 展开层搜索表单项配置
     */
    attachConfig: {
      type: Object,
      default: () => ({})
    },
    closeInfoSearch: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      searchInfo: null,
      mainSearch: [],
      attachSearch: [],
      popoverNowWidth: ''
    }
  },
  created() {
    this.initSearchForm(this.searchList)
  },
  methods: {
    /**
     * 初始化表单
     * 当搜索条件个数大于 mainMax(外层搜索最多数量)
     * 多余搜索条件会隐藏至展开层，外层搜索右侧会添加综合搜索下拉按钮
     *
     * @param {Array} searchList 搜索条件
     */
    initSearchForm(searchList) {
      const mainMax = this.mainMax
      const length = searchList.length
      if (length > mainMax) {
        this.mainSearch = searchList.slice(0, mainMax - 1)
        this.searchInfo = searchList[mainMax - 1]
        if (this.searchInfo.component !== 'input') {
          console.error('搜索表单综合搜索处应设置为输入搜索 --- prop:' + this.searchInfo.prop)
        }
        this.attachSearch = searchList.slice(mainMax)
        const attachLength = this.attachSearch.length
        if (this.popoverWidth > 0) {
          this.popoverNowWidth = this.popoverWidth
        } else {
          if (attachLength < 4) {
            this.popoverNowWidth = '420'
          } else {
            this.popoverNowWidth = '640'
          }
        }
      } else {
        const searchInfo = searchList[length - 1]
        if (searchInfo && searchInfo.component === 'input' && !this.closeInfoSearch) {
          this.searchInfo = searchInfo
          this.mainSearch = searchList.slice(0, length - 1)
        } else {
          this.searchInfo = null
          this.mainSearch = searchList
        }
      }
    },
    searchClick() {
      /**
       * 搜索事件
       *
       * @event searchClick
       */
      console.log('searchClick')
      this.$emit('searchClick')
    },
    resetForm() {
      this.$refs.mainSearch.resetFieldsForm()
      this.$refs.attachSearch.resetFieldsForm()
    },
    formItemEvent(data) {
      const event = data.event
      if (event === 'keyupEnter' || event === 'inputAppendClick') {
        this.searchClick()
      } else {
        this.$emit('formItemEvent', data)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search-form{
  ::v-deep {
    .el-form-item{
      margin-bottom: 0;
      .el-input__inner{
        width: 200px;
      }
    }
    .el-form-item__label{
      height: 28px;
      line-height: 28px;
    }
    .el-form-item__content{
      height: 28px;
      line-height: 28px;
      width: auto; // 解决表单 200px 问题
    }
  }
  .search-info-input ::v-deep {
    .el-input-group__append{
      cursor: pointer;
      background: #409EFF;
      color: #fff;
      border-color: #409EFF;
      height: 28px;
      padding: 0;
    }
    .input-append{
      padding: 0 20px;
    }
  }
  .search-info {
    .el-input-group--prepend ::v-deep .el-input__inner{
      border-left: 0;
    }
    .search-info-button{
      background: #409EFF;
      color: #fff;
      border-color: #409EFF;
      height: 28px;
    }
    .reference-button{
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    .append-button{
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
  .search-button{
    vertical-align: top;
  }
}
.search-main{
  width: 620px;
  margin: 0 auto;
  .search-button{
    text-align: right;
    margin: 0 10px;
  }
  .attach-search-button{
    text-align: right;
  }
}
</style>
