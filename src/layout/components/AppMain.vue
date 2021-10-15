<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss">
.app-main {
  /*50 = navbar  */
  height: calc(100vh - 51px);
  width: 100%;
  position: relative;
  overflow: hidden;
  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }

  .el-scrollbar__bar.is-vertical {
    right: 0px;
  }

  .el-scrollbar {
    height: 100%;
  }

  .el-scrollbar__view{
    height: 100%;
  }
}
.fixed-header+.app-main {
  padding-top: 50px;
}
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
